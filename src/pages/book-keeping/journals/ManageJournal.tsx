import Modal, { ModalTypeProps } from "../../../components/modals";
import JournalModel, { JournalData } from "../../../app/models/JournalModel";
import { FormEvent, useEffect, useState } from "react";
import { useResourceActions } from "../../../app/hooks/useResourceActions";
import JournalController from "../../../app/controllers/JournalController";
import TextInput from "../../../components/forms/TextInput";
import Button from "../../../components/forms/Button";
import Textarea from "../../../components/forms/Textarea";

interface JournalProps extends ModalTypeProps {
  data?: JournalData;
}

const ManageJournal = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
}: JournalProps) => {
  const [state, setState] = useState(JournalModel.getState());

  const { handleSubmit, handleDestroy } = useResourceActions<JournalData>({
    controller: JournalController.init(),
    submit,
    resetState: () => setState(JournalModel.getState()),
  });

  const handleClose = () => {
    setState(JournalModel.getState());
    close();
  };

  // Wrapper for form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      title: state.title,
      description: state.description,
    };

    // Call the handleSubmit method from the hook
    handleSubmit(body, isUpdating, state.id);
  };

  useEffect(() => {
    if (data) {
      setState(JournalModel.fromJson(data));
    }
  }, [data]);
  return (
    <Modal title={title} show={show} close={handleClose} lg={lg}>
      <form onSubmit={onFormSubmit}>
        <div className="row">
          <div className="col-md-12 mb-3">
            <TextInput
              label="Title"
              value={state.title}
              onChange={(e) => setState({ ...state, title: e.target.value })}
              placeholder="Enter Title"
              name="title"
            />
          </div>
          <div className="col-md-12 mb-3">
            <Textarea
              label="Description"
              value={state.description}
              onChange={(e) =>
                setState({
                  ...state,
                  description: e.target.value,
                })
              }
              placeholder="Enter Description Here"
              name="description"
              rows={3}
            />
          </div>

          <div className="col-md-12">
            <div className="flex center-align space-between">
              <Button
                label="Submit"
                variant="success"
                type="submit"
                icon="send"
                isDisabled={state.title === ""}
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

export default ManageJournal;
