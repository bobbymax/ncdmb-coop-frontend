import { FormEvent, useEffect, useState } from "react";
import GroupModel, { GroupData } from "../../app/models/GroupModel";
import Modal, { ModalTypeProps } from "../../components/modals";
import GroupController from "../../app/controllers/GroupController";
import TextInput from "../../components/forms/TextInput";
import Button from "../../components/forms/Button";
import { useResourceActions } from "../../app/hooks/useResourceActions";

interface GroupModalProps extends ModalTypeProps {
  data?: GroupData;
}

const ManageGroup = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
}: GroupModalProps) => {
  const [state, setState] = useState(GroupModel.getState());

  const { handleSubmit, handleDestroy } = useResourceActions<GroupData>({
    controller: GroupController.init(),
    submit,
    resetState: () => setState(GroupModel.getState()),
  });

  const handleClose = () => {
    setState(GroupModel.getState());
    close();
  };

  // Wrapper for form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      name: state.name,
      max_slots: state.max_slots,
    };

    // Call the handleSubmit method from the hook
    handleSubmit(body, isUpdating, state.id);
  };

  useEffect(() => {
    if (data) {
      setState(GroupModel.fromJson(data));
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
          <div className="col-md-12 mb-3">
            <TextInput
              label="Max Slots"
              type="number"
              value={state.max_slots}
              onChange={(e) =>
                setState({ ...state, max_slots: Number(e.target.value) })
              }
              name="group-max-slots"
            />
          </div>
          <div className="col-md-12">
            <div className="flex center-align space-between">
              <Button
                label="Submit"
                variant="success"
                type="submit"
                icon="send"
                isDisabled={state.name === "" || state.max_slots < 1}
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

export default ManageGroup;
