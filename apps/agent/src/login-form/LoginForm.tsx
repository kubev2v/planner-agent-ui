import React from "react";
import {
  Alert,
  AlertActionLink,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Form,
  FormGroup,
  FormHelperText,
  HelperText,
  HelperTextItem,
  List,
  ListItem,
  Text,
  TextContent,
  TextInput,
  Spinner,
  SplitItem,
  Split,
} from "@patternfly/react-core";
import { LoginFormViewModelInterface } from "./hooks/UseViewModel";
import { FormStates } from "./FormStates";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace LoginForm {
  export type Props = {
    vm: LoginFormViewModelInterface;
  };
}

export const LoginForm: React.FC<LoginForm.Props> = (props) => {
  const { vm } = props;

  return (
    <Card
      style={{ width: "36rem" }}
      isFlat
      isRounded
      aria-labelledby="card-header-title"
      aria-describedby="card-body-description"
    >
      <CardHeader id="card-header-title">
        <TextContent>
          <Text component="h2">Migration Planner </Text>
          <Text>
            The Migration Planner requires access to your VMware environment to
            execute a comprehensive discovery process that gathers essential
            data, including network topology, storage configuration, and virtual
            machine inventory. The process leverages this information to provide
            tailored recommendations for a seamless workload transition to
            OpenShift Virtualization.
          </Text>
        </TextContent>
      </CardHeader>

      <CardBody id="card-body-description">
        <Form ref={vm.formRef} onSubmit={vm.handleSubmit} id="login-form">
          <FormGroup label="URL" isRequired fieldId="url-form-control">
            <TextInput
              validated={vm.urlControlStateVariant}
              isDisabled={vm.shouldDisableFormControl}
              id="url-form-control"
              type="url"
              name="url"
              isRequired
              placeholder="https://host-example.com/sdk"
              pattern="^(https?:\/\/)(([a-zA-Z0-9\-\.]+)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:[0-9]+)?(\/sdk)$"
              aria-describedby="url-helper-text"
            />
            {vm.urlControlHelperText && (
              <FormHelperText>
                <HelperText>
                  <HelperTextItem
                    variant={vm.urlControlStateVariant}
                    id="url-helper-text"
                  >
                    {vm.urlControlHelperText}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            )}
          </FormGroup>

          <FormGroup
            label="Username"
            isRequired
            fieldId="username-form-control"
          >
            <TextInput
              validated={vm.usernameControlStateVariant}
              isDisabled={vm.shouldDisableFormControl}
              id="username-form-control"
              type="email"
              name="username"
              isRequired
              placeholder="su.do@redhat.com"
              aria-describedby="username-helper-text"
            />
            {vm.usernameControlHelperText && (
              <FormHelperText>
                <HelperText>
                  <HelperTextItem
                    variant={vm.usernameControlStateVariant}
                    id="username-helper-text"
                  >
                    {vm.usernameControlHelperText}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            )}
          </FormGroup>

          <FormGroup
            label="Password"
            isRequired
            fieldId="password-form-control"
          >
            <TextInput
              validated={vm.passwordControlStateVariant}
              isDisabled={vm.shouldDisableFormControl}
              id="password-form-control"
              type="password"
              name="password"
              isRequired
              aria-describedby="password-helper-text"
            />
            {vm.passwordControlHelperText && vm.passwordControlHelperText && (
              <FormHelperText>
                <HelperText>
                  <HelperTextItem
                    variant={vm.passwordControlStateVariant}
                    id="password-helper-text"
                  >
                    {vm.passwordControlHelperText}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            )}
          </FormGroup>

          <FormGroup fieldId="checkbox-form-control">
            <Checkbox
              isDisabled={vm.shouldDisableFormControl}
              id="checkbox-form-control"
              name="isDataSharingAllowed"
              label="I agree to share aggregated data about my environment with Red Hat."
              aria-label="Share aggregated data"
            />
          </FormGroup>
          
          {vm.shouldDisplayAlert && (
            <FormGroup>
              <Alert
                isInline
                variant={vm.alertVariant}
                title={vm.alertTitle}
                actionLinks={
                  <AlertActionLink component="a" href="#">
                    {vm.alertActionLinkText}
                  </AlertActionLink>
                }
              >
                {vm.alertDescriptionList &&
                  vm.alertDescriptionList.length > 0 && (
                    <List>
                      {vm.alertDescriptionList.map(({ id, text }) => (
                        <ListItem key={id}>{text}</ListItem>
                      ))}
                    </List>
                  )}
              </Alert>
            </FormGroup>
          )}
        </Form>
      </CardBody>

      <CardFooter>
        <Split style={{ alignItems: "flex-end" }}>
          <SplitItem>
            <Button
              type="submit"
              variant="primary"
              isDisabled={vm.shouldDisableFormControl}
              form="login-form"
            >
              Login
            </Button>
          </SplitItem>
          <SplitItem isFilled></SplitItem>
          <SplitItem style={{ paddingRight: "2rem" }}>
            {vm.formState === FormStates.CheckingStatus && (
              <TextContent>
                <Text component="p">
                  <Spinner isInline /> Checking status...
                </Text>
              </TextContent>
            )}
          </SplitItem>
        </Split>
      </CardFooter>
    </Card>
  );
};

LoginForm.displayName = "LoginForm";
