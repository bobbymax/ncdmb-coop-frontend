import ActivityModel, { ActivityData } from "../../../app/models/ActivityModel";
import Modal, { ModalTypeProps } from "../../../components/modals";
import SelectInput, { Option } from "../../../components/forms/SelectInput";
import { FormEvent, useEffect, useState } from "react";
import { useResourceActions } from "../../../app/hooks/useResourceActions";
import ActivityController from "../../../app/controllers/ActivityController";
import TextInput from "../../../components/forms/TextInput";
import Button from "../../../components/forms/Button";

interface ActivityModalProps extends ModalTypeProps {
  data?: ActivityData;
  plans?: Option[];
}
const ManageActivity = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
  plans = [],
}: ActivityModalProps) => {
  const [state, setState] = useState(ActivityModel.getState());

  const { handleSubmit, handleDestroy } = useResourceActions<ActivityData>({
    controller: ActivityController.init(),
    submit,
    resetState: () => setState(ActivityModel.getState()),
  });

  const handleClose = () => {
    setState(ActivityModel.getState());
    close();
  };

  // Wrapper for form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      name: state.name,
      plan_id: state.plan_id,
      type: state.type,
      code: state.code,
    };

    // Call the handleSubmit method from the hook
    handleSubmit(body, isUpdating, state.id);
  };

  const handleChange = (value: string | number) => {
    const activityType = value as "project" | "loan" | "other";
    setState({
      ...state,
      type: activityType,
    });
  };

  useEffect(() => {
    if (data) {
      setState(ActivityModel.fromJson(data));
    }
  }, [data]);

  return (
    <Modal title={title} show={show} close={handleClose} lg={lg}>
      <form onSubmit={onFormSubmit}>
        <div className="row">
          <div className="col-md-12">
            <SelectInput
              label="Plan"
              value={state.plan_id}
              onChange={(e) => setState({ ...state, plan_id: Number(e) })}
              name="plan"
              options={plans}
              placeholder="Select Plan"
            />
          </div>

          <div className="col-md-12">
            <TextInput
              label="Name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              placeholder="Enter Activity Name"
              name="activity-name"
            />
          </div>
          <div className="col-md-6">
            <TextInput
              label="Code"
              value={state.code}
              onChange={(e) => setState({ ...state, code: e.target.value })}
              name="code"
              placeholder="Enter Code"
            />
          </div>
          <div className="col-md-6 mb-3">
            <SelectInput
              label="Activity Type"
              value={state.type}
              onChange={handleChange}
              name="type"
              options={ActivityModel.getActivityTypes()}
              placeholder="Select Activity Type"
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
                  state.name === "" || state.code === "" || state.plan_id < 1
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

export default ManageActivity;
