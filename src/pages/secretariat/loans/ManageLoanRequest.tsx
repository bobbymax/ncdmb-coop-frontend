import Modal, { ModalTypeProps } from "../../../components/modals";
import { FormEvent, useEffect, useState } from "react";
import { LoanRequestData } from "../../../app/models/LoanRequestModel";
import LoanRequestModel from "../../../app/models/LoanRequestModel";
import Button from "../../../components/forms/Button";
import Textarea from "../../../components/forms/Textarea";
import { useResourceActions } from "../../../app/hooks/useResourceActions";
import LoanRequestController from "../../../app/controllers/LoanRequestController";
import SelectInput from "../../../components/forms/SelectInput";
import TextInput from "../../../components/forms/TextInput";

interface LoanRequestProps extends ModalTypeProps {
  data?: LoanRequestData;
}

const ManageLoanRequest = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
}: LoanRequestProps) => {
  const [state, setState] = useState<LoanRequestData>(
    LoanRequestModel.getState()
  );

  const { handleSubmit, handleDestroy } = useResourceActions<LoanRequestData>({
    controller: LoanRequestController.init(),
    submit,
    resetState: () => setState(LoanRequestModel.getState()),
  });

  const handleClose = () => {
    setState(LoanRequestModel.getState());
    close();
  };

  // Wrapper for form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      remarks: state.remarks,
      status: state.status,
      start_repayment_date: state.start_repayment_date,
    };

    // Call the handleSubmit method from the hook
    handleSubmit(body, isUpdating, state.id);
  };

  const handleChange = (value: string | number) => {
    const status = value as "registered" | "approved" | "rejected";

    setState({
      ...state,
      status,
    });
  };
  useEffect(() => {
    if (data) {
      setState(LoanRequestModel.fromJson(data));
    }
  }, [data]);

  return (
    <Modal title={title} show={show} close={handleClose} lg={lg}>
      <form onSubmit={onFormSubmit}>
        <div className="row">
          <div className="col-md-12">
            <TextInput
              label="Repayment Start Date"
              value={state.start_repayment_date}
              type="date"
              onChange={(e) =>
                setState({
                  ...state,
                  start_repayment_date: e.target.value,
                })
              }
              name="start_repayment_date"
            />
          </div>
          <div className="col-md-12">
            <SelectInput
              label="Decision"
              value={state.status}
              onChange={handleChange}
              name="decision"
              options={LoanRequestModel.getActions()}
              placeholder="Make Decision"
            />
          </div>

          <div className="col-md-12 mb-3">
            <Textarea
              label="Reason"
              value={state.remarks}
              onChange={(e) => setState({ ...state, remarks: e.target.value })}
              placeholder="Enter Reason for Declining"
              name="remarks"
              isDisabled={state.status !== "rejected"}
            />
          </div>
          <div className="col-md-12">
            <div className="flex center-align space-between">
              <Button
                label="Submit"
                variant="success"
                type="submit"
                icon="send"
                isDisabled={state.status === "rejected" && state.reason === ""}
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

export default ManageLoanRequest;
