declare namespace DiscoverySources {
  type Context = {
    sources: Source[];
    isLoadingSources: boolean;
    errorLoadingSources?: Error;
    isDeletingSource: boolean;
    errorDeletingSource?: Error;
    isCreatingSource: boolean;
    errorCreatingSource?: Error;
    isDownloadingSource: boolean;
    errorDownloadingSource?: Error;
    isPolling: boolean;
    listSources: () => Promise<Source[]>;
    deleteSource: (id: string) => Promise<Source>;
    createSource: (name: string, sourceSshKey: string) => Promise<Source>;
    downloadSource: (sourceName: string, sourceSshKey: string) => Promise<void>;
    startPolling: (delay: number) => void;
    stopPolling: () => void;
  };
}
