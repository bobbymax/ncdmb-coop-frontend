import SelectInput, { Option } from "../../../components/forms/SelectInput";
import LoanTypeModel, { LoanTypeData } from "../../../app/models/LoanTypeModel";
import Modal, { ModalTypeProps } from "../../../components/modals";
import { FormEvent, useEffect, useState } from "react";
import { useResourceActions } from "../../../app/hooks/useResourceActions";
import LoanTypeController from "../../../app/controllers/LoanTypeController";
import TextInput from "../../../components/forms/TextInput";
import Button from "../../../components/forms/Button";

interface LoanTypeModalProps extends ModalTypeProps {
  data?: LoanTypeData;
  activities?: Option[];
}

const ManageLoanType = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
  activities = [],
}: LoanTypeModalProps) => {
  const [state, setState] = useState(LoanTypeModel.getState());

  const { handleSubmit, handleDestroy } = useResourceActions<LoanTypeData>({
    controller: LoanTypeController.init(),
    submit,
    resetState: () => setState(LoanTypeModel.getState()),
  });

  const handleClose = () => {
    setState(LoanTypeModel.getState());
    close();
  };

  // Wrapper for form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      activity_id: state.activity_id,
      name: state.name,
      commitment: state.commitment,
      max_requestable_amount: state.max_requestable_amount,
      max_tenor: state.max_tenor,
      frequency: state.frequency,
      type: state.type,
    };

    // Call the handleSubmit method from the hook
    handleSubmit(body, isUpdating, state.id);
  };

  useEffect(() => {
    if (data) {
      setState(LoanTypeModel.fromJson(data));
    }
  }, [data]);

  const handleChange = (value: string | number) => {
    const loaded = value as "monthly" | "annually" | "custom";

    setState({
      ...state,
      frequency: loaded,
    });
  };

  const handleTypeChange = (value: string | number) => {
    const loaded = value as "single" | "compound";

    setState({
      ...state,
      type: loaded,
    });
  };

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
          <div className="col-md-12">
            <TextInput
              label="Name"
              value={state.name}
              onChange={(e) =>
                setState({
                  ...state,
                  name: e.target.value,
                })
              }
              placeholder="Enter Loan Type Name"
              name="loan-type-name"
            />
          </div>
          <div className="col-md-6">
            <TextInput
              label="Commitment %"
              value={state.commitment}
              onChange={(e) =>
                setState({ ...state, commitment: e.target.value })
              }
              name="commitment"
              placeholder="0"
            />
          </div>
          <div className="col-md-6">
            <TextInput
              label="Tenor"
              type="number"
              value={state.max_tenor}
              onChange={(e) =>
                setState({ ...state, max_tenor: Number(e.target.value) })
              }
              name="max-tenor"
              placeholder="Enter Tenor"
            />
          </div>
          <div className="col-md-12">
            <TextInput
              label="Max Requestable"
              value={state.max_requestable_amount}
              onChange={(e) =>
                setState({ ...state, max_requestable_amount: e.target.value })
              }
              name="max-requestable"
              placeholder="Enter Max Amount"
            />
          </div>
          <div className="col-md-6">
            <SelectInput
              label="Frquency"
              value={state.frequency}
              onChange={handleChange}
              name="frequency"
              options={LoanTypeModel.getFrequencies()}
              placeholder="Select Frequency"
            />
          </div>
          <div className="col-md-6">
            <SelectInput
              label="Type"
              value={state.type}
              onChange={handleTypeChange}
              name="type"
              options={LoanTypeModel.getTypes()}
              placeholder="Select Type"
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
                  state.name === "" ||
                  state.commitment === "" ||
                  state.max_tenor < 1
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

export default ManageLoanType;
