import React, {
  useCallback,
  useState,
  type PropsWithChildren,
} from "react";
import { useAsyncFn, useInterval } from "react-use";
import { type SourceApiInterface } from "@migration-planner-ui/api-client/apis";
import { useInjection } from "@migration-planner-ui/ioc";
import { Symbols } from "#/main/Symbols";
import { Context } from "./Context";

export const Provider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const sourceApi = useInjection<SourceApiInterface>(Symbols.SourceApi);

  const [listSourcesState, listSources] = useAsyncFn(async () => {
    const sources = await sourceApi.listSources();
    return sources;
  });

  const [deleteSourceState, deleteSource] = useAsyncFn(async (id: string) => {
    const deletedSource = await sourceApi.deleteSource({ id });
    return deletedSource;
  });

  const [createSourceState, createSource] = useAsyncFn(async (name: string, sshKey: string) => {
    const createdSource = await sourceApi.createSource({
      sourceCreate: { name, sshKey },
    });
    return createdSource;
  });

  const [downloadSourceState, downloadSource] = useAsyncFn(
    async (sourceName: string, sourceSshKey: string): Promise<void> => {
      const anchor = document.createElement("a");
      anchor.download = sourceName + ".ova";

      const newSource = await createSource(sourceName, sourceSshKey);
      // TODO(jkilzi): See: ECOPROJECT-2192. 
      // Then don't forget to  remove the '/planner/' prefix in production.
      // const image = await sourceApi.getSourceImage({ id: newSource.id }); // This API is useless in production
      // anchor.href = URL.createObjectURL(image); // Don't do this...
      anchor.href = `/planner/api/v1/sources/${newSource.id}/image`;

      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    }
  );

  const [isPolling, setIsPolling] = useState(false);
  const [pollingDelay, setPollingDelay] = useState<number | null>(null);
  const startPolling = useCallback(
    (delay: number) => {
      if (!isPolling) {
        setPollingDelay(delay);
        setIsPolling(true);
      }
    },
    [isPolling]
  );
  const stopPolling = useCallback(() => {
    if (isPolling) {
      setPollingDelay(null);
      setIsPolling(false);
    }
  }, [isPolling]);
  useInterval(() => {
    listSources();
  }, pollingDelay);

  const ctx: DiscoverySources.Context = {
    sources: listSourcesState.value ?? [],
    isLoadingSources: listSourcesState.loading,
    errorLoadingSources: listSourcesState.error,
    isDeletingSource: deleteSourceState.loading,
    errorDeletingSource: deleteSourceState.error,
    isCreatingSource: createSourceState.loading,
    errorCreatingSource: createSourceState.error,
    isDownloadingSource: downloadSourceState.loading,
    errorDownloadingSource: downloadSourceState.error,
    isPolling,
    listSources,
    deleteSource,
    createSource,
    downloadSource,
    startPolling,
    stopPolling,
  };

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
};

Provider.displayName = "DiscoverySourcesProvider";
