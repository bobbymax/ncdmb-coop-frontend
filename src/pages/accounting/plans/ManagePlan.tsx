import { FormEvent, useEffect, useState } from "react";
import PlanModel, { PlanData } from "../../../app/models/PlanModel";
import Modal, { ModalTypeProps } from "../../../components/modals";
import { useResourceActions } from "../../../app/hooks/useResourceActions";
import PlanController from "../../../app/controllers/PlanController";
import TextInput from "../../../components/forms/TextInput";
import Button from "../../../components/forms/Button";

interface GroupModalProps extends ModalTypeProps {
  data?: PlanData;
}

const ManagePlan = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
}: GroupModalProps) => {
  const [state, setState] = useState(PlanModel.getState());

  const { handleSubmit, handleDestroy } = useResourceActions<PlanData>({
    controller: PlanController.init(),
    submit,
    resetState: () => setState(PlanModel.getState()),
  });

  const handleClose = () => {
    setState(PlanModel.getState());
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
      setState(PlanModel.fromJson(data));
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
              placeholder="Enter Group Name"
              name="group-name"
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

export default ManagePlan;
