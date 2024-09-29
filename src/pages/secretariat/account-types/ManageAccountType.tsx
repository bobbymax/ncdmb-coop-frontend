import { FormEvent, useEffect, useState } from "react";
import Modal, { ModalTypeProps } from "../../../components/modals";
import AccountTypeModel, {
  AccountTypeData,
} from "../../../app/models/AccountTypeModel";
import AccountTypeController from "../../../app/controllers/AccountTypeController";
import { useResourceActions } from "../../../app/hooks/useResourceActions";
import TextInput from "../../../components/forms/TextInput";
import Button from "../../../components/forms/Button";

interface AccountTypeProps extends ModalTypeProps {
  data?: AccountTypeData;
}

const ManageAccountType = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
}: AccountTypeProps) => {
  const [state, setState] = useState(AccountTypeModel.getState());

  const { handleSubmit, handleDestroy } = useResourceActions<AccountTypeData>({
    controller: AccountTypeController.init(),
    submit,
    resetState: () => setState(AccountTypeModel.getState()),
  });

  const handleClose = () => {
    setState(AccountTypeModel.getState());
    close();
  };

  // Wrapper for form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      name: state.name,
    };

    // Call the handleSubmit method from the hook
    handleSubmit(body, isUpdating, state.id);
  };

  useEffect(() => {
    if (data) {
      setState(AccountTypeModel.fromJson(data));
    }
  }, [data]);
  return (
    <Modal title={title} show={show} close={handleClose} lg={lg}>
      <form onSubmit={onFormSubmit}>
        <div className="row">
          <div className="col-md-12 mb-3">
            <TextInput
              label="Name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              placeholder="Enter Account Type Name"
              name="account-type-name"
            />
          </div>

          <div className="col-md-12">
            <div className="flex center-align space-between">
              <Button
                label="Submit"
                variant="success"
                type="submit"
                icon="send"
                isDisabled={state.name === ""}
              />
              {isUpdating && (
                <Button
                  label="Delete"
                  variant="danger"
                  handleClick={() => handleDestroy(state.id)}
                  icon="trash-outline"
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ManageAccountType;
