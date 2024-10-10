import React, { useCallback } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormHelperText,
  HelperText,
  HelperTextItem,
  TextArea,
  TextInput,
} from "@patternfly/react-core";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@patternfly/react-core/next";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DiscoverySourceSetupModal {
  export type Props = {
    isOpen?: boolean;
    isDisabled?: boolean;
    onClose?: ((event: KeyboardEvent | React.MouseEvent) => void) | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  };
}

export const DiscoverySourceSetupModal: React.FC<
  DiscoverySourceSetupModal.Props
> = (props) => {
  const { isOpen = false, isDisabled = false, onClose, onSubmit } = props;

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      if (onSubmit) {
        onSubmit(event);
      }
    },
    [onSubmit]
  );

  return (
    <Modal
      variant="small"
      isOpen={isOpen}
      onClose={onClose}
      ouiaId="DiscoverySourceSetupModal"
      aria-labelledby="discovery-source-setup-modal-title"
      aria-describedby="modal-box-body-discovery-source-setup"
    >
      <ModalHeader
        title="Discovery source setup"
        labelId="discovery-source-setup-modal-title"
      />
      <ModalBody id="modal-box-body-discovery-source-setup">
        <Form
          noValidate={false}
          id="discovery-source-setup-form"
          onSubmit={handleSubmit}
        >
          <FormGroup
            label="Name"
            isRequired
            fieldId="discovery-source-name-form-control"
          >
            <TextInput
              id="discovery-source-name-form-control"
              name="discoverySourceName"
              type="text"
              placeholder="Example: ams-vcenter-prod-1"
              pattern="^[a-zA-Z][a-zA-Z0-9_\-]*$"
              maxLength={50}
              minLength={1}
              isRequired
              aria-describedby="name-helper-text"
            />
            <FormHelperText>
              <HelperText>
                <HelperTextItem variant="default" id="name-helper-text">
                  Name the discovery source to help track its deployment
                  environment.
                </HelperTextItem>
              </HelperText>
            </FormHelperText>
          </FormGroup>
          <FormGroup
            label="SSH Key"
            isRequired
            fieldId="discovery-source-sshkey-form-control"
          >
            <TextArea
              id="discovery-source-name-form-control"
              name="discoverySourceSshKey"
              type="text"
              placeholder="Example: ssh-rsa AA...a"
              isRequired
              aria-describedby="sshkey-helper-text"
            />
            <FormHelperText>
              <HelperText>
                <HelperTextItem variant="default" id="sshkey-helper-text">
                  Enter your SSH public key to enable SSH acces to the OVA image.
                </HelperTextItem>
              </HelperText>
            </FormHelperText>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          form="discovery-source-setup-form"
          type="submit"
          key="confirm"
          variant="primary"
          isDisabled={isDisabled}
        >
          Download
        </Button>
      </ModalFooter>
    </Modal>
  );
};

DiscoverySourceSetupModal.displayName = "DiscoverySourceSetupModal";
