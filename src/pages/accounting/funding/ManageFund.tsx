import SelectInput, { Option } from "../../../components/forms/SelectInput";
import FundModel, { FundData } from "../../../app/models/FundModel";
import Modal, { ModalTypeProps } from "../../../components/modals";
import { FormEvent, useEffect, useState } from "react";
import { useResourceActions } from "../../../app/hooks/useResourceActions";
import FundController from "../../../app/controllers/FundController";
import TextInput from "../../../components/forms/TextInput";
import Button from "../../../components/forms/Button";

interface FundModalProps extends ModalTypeProps {
  data?: FundData;
  activities?: Option[];
}

const ManageFund = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
  activities = [],
}: FundModalProps) => {
  const [state, setState] = useState(FundModel.getState());

  const { handleSubmit, handleDestroy } = useResourceActions<FundData>({
    controller: FundController.init(),
    submit,
    resetState: () => setState(FundModel.getState()),
  });

  const handleClose = () => {
    setState(FundModel.getState());
    close();
  };

  // Wrapper for form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      activity_id: state.activity_id,
      approved_amount: state.approved_amount,
      period: state.period,
    };

    // Call the handleSubmit method from the hook
    handleSubmit(body, isUpdating, state.id);
  };

  useEffect(() => {
    if (data) {
      setState(FundModel.fromJson(data));
    }
  }, [data]);

  return (
    <Modal title={title} show={show} close={handleClose} lg={lg}>
      <form onSubmit={onFormSubmit}>
        <div className="row">
          <div className="col-md-12">
            <SelectInput
              label="Activity"
              value={state.activity_id}
              onChange={(e) => setState({ ...state, activity_id: Number(e) })}
              name="activity"
              options={activities}
              placeholder="Select Activity"
            />
          </div>
          <div className="col-md-8">
            <TextInput
              label="Approved Amount"
              value={state.approved_amount}
              onChange={(e) =>
                setState({
                  ...state,
                  approved_amount: parseFloat(e.target.value),
                })
              }
              placeholder="Enter Module Name"
              name="module-name"
            />
          </div>
          <div className="col-md-4">
            <TextInput
              label="Period"
              type="number"
              value={state.period}
              onChange={(e) =>
                setState({ ...state, period: parseInt(e.target.value) })
              }
              name="period"
              placeholder="Enter Period"
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
                  state.activity_id < 1 ||
                  state.approved_amount < 1 ||
                  state.period < 1
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

export default ManageFund;
