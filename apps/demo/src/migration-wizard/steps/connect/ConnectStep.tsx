import React from "react";
import {
  Stack,
  StackItem,
  TextContent,
  Text,
  Panel,
  PanelMain,
  PanelHeader,
  List,
  OrderType,
  ListItem,
  Icon,
  Alert,
  AlertActionLink,
} from "@patternfly/react-core";
import { ClusterIcon } from "@patternfly/react-icons";
import { SourcesTable } from "#/migration-wizard/steps/connect/sources-table/SourcesTable";
import { useDiscoverySources } from "#/migration-wizard/contexts/discovery-sources/Context";

export const ConnectStep: React.FC = () => {
  const discoverySourcesContext = useDiscoverySources();
  const [firstSource, ..._otherSources] = discoverySourcesContext.sources;

  return (
    <Stack hasGutter>
      <StackItem>
        <TextContent>
          <Text component="h2">Connect your VMware environment</Text>
        </TextContent>
      </StackItem>
      <StackItem>
        <TextContent style={{ paddingBlock: "1rem" }}>
          <Text component="h4">
            Follow these steps to connect your environment and start the
            discovery process
          </Text>
          <List
            component="ol"
            type={OrderType.number}
            style={{ marginInlineStart: 0 }}
          >
            <ListItem>
              A link will appear below once the VM is running. Use this link to
              enter credentials and connect your environment.
            </ListItem>
            <ListItem>
              When the connection is established, you will be able to proceed
              and see the discovery report.
            </ListItem>
          </List>
        </TextContent>
        {firstSource?.status === "waiting-for-credentials" && (
          <Alert
            isInline
            variant="custom"
            title="Discovery VM"
            actionLinks={
              <AlertActionLink
                component="a"
                href={firstSource.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {firstSource.credentialUrl}
              </AlertActionLink>
            }
          >
            <TextContent>
              <Text>
                Click the link below to connect the Discovery Source to your
                VMware environment.
              </Text>
            </TextContent>
          </Alert>
        )}
      </StackItem>
      <StackItem>
        <Panel variant="bordered">
          <PanelMain>
            <PanelHeader style={{ paddingBlockEnd: 0 }}>
              <TextContent>
                <Text component="h3">
                  <Icon isInline style={{ marginRight: "1rem" }}>
                    <ClusterIcon />
                  </Icon>
                  Environment
                </Text>
              </TextContent>
            </PanelHeader>
            <SourcesTable />
          </PanelMain>
        </Panel>
      </StackItem>
    </Stack>
  );
};

ConnectStep.displayName = "ConnectStep";
