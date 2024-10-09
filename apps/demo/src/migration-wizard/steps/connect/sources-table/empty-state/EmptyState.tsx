import React, { useCallback, useState } from "react";
import {
  Button,
  EmptyState as PFEmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateIcon,
} from "@patternfly/react-core";
import { ExclamationCircleIcon, SearchIcon } from "@patternfly/react-icons";
import globalDangerColor200 from "@patternfly/react-tokens/dist/esm/global_danger_color_200";
import { useDiscoverySources } from "#/migration-wizard/contexts/discovery-sources/Context";
import { DiscoverySourceSetupModal } from "./DiscoverySourceSetupModal";

export const EmptyState: React.FC = () => {
  const discoverySourcesContext = useDiscoverySources();

  const [
    shouldShowDiscoverySourceSetupModal,
    setShouldShowDiscoverySetupModal,
  ] = useState(false);

  const toggleDiscoverySourceSetupModal = useCallback((): void => {
    setShouldShowDiscoverySetupModal((lastState) => !lastState);
  }, []);

  const handleTryAgain = useCallback(() => {
    if (!discoverySourcesContext.isLoadingSources) {
      discoverySourcesContext.listSources();
    }
  }, [discoverySourcesContext]);

  let emptyStateNode: React.ReactNode = (
    <PFEmptyState variant="sm">
      <EmptyStateHeader
        titleText="No discovery source found"
        headingLevel="h4"
        icon={<EmptyStateIcon icon={SearchIcon} />}
      />
      <EmptyStateBody>
        Begin by creating a discovery source. Then download and import the OVA
        file into your VMware environment.
      </EmptyStateBody>
      <EmptyStateFooter>
        <EmptyStateActions>
          <Button
            variant="secondary"
            onClick={toggleDiscoverySourceSetupModal}
            isDisabled={discoverySourcesContext.isCreatingSource}
          >
            Create
          </Button>
        </EmptyStateActions>
      </EmptyStateFooter>
    </PFEmptyState>
  );

  if (discoverySourcesContext.errorLoadingSources) {
    emptyStateNode = (
      <PFEmptyState variant="sm">
        <EmptyStateHeader
          titleText="Something went wrong..."
          headingLevel="h4"
          icon={
            <EmptyStateIcon
              icon={ExclamationCircleIcon}
              color={globalDangerColor200.value}
            />
          }
        />
        <EmptyStateBody>
          An error occurred while attempting to detect existing discovery
          sources
        </EmptyStateBody>
        <EmptyStateFooter>
          <EmptyStateActions>
            <Button variant="link" onClick={handleTryAgain}>
              Try again
            </Button>
          </EmptyStateActions>
        </EmptyStateFooter>
      </PFEmptyState>
    );
  }

  return (
    <>
      {emptyStateNode}
      {shouldShowDiscoverySourceSetupModal && (
        <DiscoverySourceSetupModal
          isOpen={shouldShowDiscoverySourceSetupModal}
          onClose={toggleDiscoverySourceSetupModal}
          isDisabled={discoverySourcesContext.isDownloadingSource}
          onSubmit={async (event) => {
            const form = event.currentTarget;
            const name = form["discoverySourceName"].value as string;
            const sshKey = form["discoverySourceSshKey"].value as string;
            await discoverySourcesContext.downloadSource(name, sshKey);
            toggleDiscoverySourceSetupModal();
            await discoverySourcesContext.listSources();
          }}
        />
      )}
    </>
  );
};

EmptyState.displayName = "SourcesTableEmptyState";
