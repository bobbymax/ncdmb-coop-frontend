import { FormEvent, useEffect, useState } from "react";
import GuarantorModel, {
  GuarantorData,
} from "../../../app/models/GuarantorModel";
import Modal, { ModalTypeProps } from "../../../components/modals";
import { useResourceActions } from "../../../app/hooks/useResourceActions";
import GuarantorController from "../../../app/controllers/GuarantorController";
import Textarea from "../../../components/forms/Textarea";
import Button from "../../../components/forms/Button";
import SelectInput from "../../../components/forms/SelectInput";

interface GuarantorModalProps extends ModalTypeProps {
  data?: GuarantorData;
}

const ManageGuarantor = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
}: GuarantorModalProps) => {
  const [state, setState] = useState(GuarantorModel.getState());

  const { handleSubmit, handleDestroy } = useResourceActions<GuarantorData>({
    controller: GuarantorController.init(),
    submit,
    resetState: () => setState(GuarantorModel.getState()),
  });

  const handleClose = () => {
    setState(GuarantorModel.getState());
    close();
  };

  // Wrapper for form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      reason: state.reason,
      status: state.status,
    };

    // Call the handleSubmit method from the hook
    handleSubmit(body, isUpdating, state.id);
  };

  const handleChange = (value: string | number) => {
    const status = value as "pending" | "approved" | "rejected";

    setState({
      ...state,
      status,
    });
  };

  useEffect(() => {
    if (data) {
      setState(GuarantorModel.fromJson(data));
    }
  }, [data]);

  return (
    <Modal title={title} show={show} close={handleClose} lg={lg}>
      <form onSubmit={onFormSubmit}>
        <div className="row">
          <div className="col-md-12">
            <SelectInput
              label="Decision"
              value={state.status}
              onChange={handleChange}
              name="decision"
              options={GuarantorModel.getActions()}
              placeholder="Make Decision"
            />
          </div>

          <div className="col-md-12 mb-3">
            <Textarea
              label="Reason"
              value={state.reason}
              onChange={(e) => setState({ ...state, reason: e.target.value })}
              placeholder="Enter Reason for Declining"
              name="reason"
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

export default ManageGuarantor;
