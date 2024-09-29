import SelectInput, { Option } from "../../../components/forms/SelectInput";
import ChartOfAccountModel, {
  ChartOfAccountData,
} from "../../../app/models/ChartOfAccountModel";
import Modal, { ModalTypeProps } from "../../../components/modals";
import { FormEvent, useEffect, useState } from "react";
import { useResourceActions } from "../../../app/hooks/useResourceActions";
import ChartOfAccountController from "../../../app/controllers/ChartOfAccountController";
import TextInput from "../../../components/forms/TextInput";
import Button from "../../../components/forms/Button";

interface ChartOfAccountProps extends ModalTypeProps {
  data?: ChartOfAccountData;
  chartOfAccounts: Option[];
  accountTypes: Option[];
}

const ManageChartOfAccount = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
  chartOfAccounts,
  accountTypes,
}: ChartOfAccountProps) => {
  const [state, setState] = useState(ChartOfAccountModel.getState());

  const { handleSubmit, handleDestroy } =
    useResourceActions<ChartOfAccountData>({
      controller: ChartOfAccountController.init(),
      submit,
      resetState: () => setState(ChartOfAccountModel.getState()),
    });

  const handleClose = () => {
    setState(ChartOfAccountModel.getState());
    close();
  };

  // Wrapper for form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      account_type_id: state.account_type_id,
      account_name: state.account_name,
      account_code: state.account_code,
      parent_account_id: state.parent_account_id,
    };

    // Call the handleSubmit method from the hook
    handleSubmit(body, isUpdating, state.id);
  };

  useEffect(() => {
    if (data) {
      setState(ChartOfAccountModel.fromJson(data));
    }
  }, [data]);

  return (
    <Modal title={title} show={show} close={handleClose} lg={lg}>
      <form onSubmit={onFormSubmit}>
        <div className="row">
          <div className="col-md-12">
            <SelectInput
              label="Account Type"
              value={state.account_type_id}
              onChange={(e) =>
                setState({ ...state, account_type_id: Number(e) })
              }
              name="account-type"
              options={accountTypes}
              placeholder="Select Account Type"
            />
          </div>
          <div className="col-md-12">
            <TextInput
              label="Account Code"
              value={state.account_code}
              onChange={(e) =>
                setState({ ...state, account_code: e.target.value })
              }
              placeholder="Enter Account Code"
              name="account-code"
            />
          </div>
          <div className="col-md-12">
            <TextInput
              label="Account Name"
              value={state.account_name}
              onChange={(e) =>
                setState({ ...state, account_name: e.target.value })
              }
              placeholder="Enter Account Name"
              name="account-name"
            />
          </div>
          <div className="col-md-12">
            <SelectInput
              label="Parent"
              value={state.parent_account_id}
              onChange={(e) =>
                setState({ ...state, parent_account_id: Number(e) })
              }
              name="parent"
              options={chartOfAccounts}
              placeholder="Select Parent"
            />
          </div>
          <div className="col-md-12">
            <div className="flex center-align space-between">
              <Button
                label="Submit"
                variant="success"
                type="submit"
                icon="send"
                isDisabled={
                  state.account_name === "" ||
                  state.account_code === "" ||
                  state.account_type_id < 1
                }
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

export default ManageChartOfAccount;
