import SelectInput, { Option } from "../../../components/forms/SelectInput";
import InterestRateModel, {
  InterestRateData,
} from "../../../app/models/InterestRateModel";
import Modal, { ModalTypeProps } from "../../../components/modals";
import { FormEvent, useEffect, useState } from "react";
import { useResourceActions } from "../../../app/hooks/useResourceActions";
import InterestRateController from "../../../app/controllers/InterestRateController";
import TextInput from "../../../components/forms/TextInput";
import Button from "../../../components/forms/Button";

interface InterestRateModalProps extends ModalTypeProps {
  data?: InterestRateData;
  loanTypes?: Option[];
}

const ManageInterestRates = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
  loanTypes = [],
}: InterestRateModalProps) => {
  const [state, setState] = useState(InterestRateModel.getState());

  const { handleSubmit, handleDestroy } = useResourceActions<InterestRateData>({
    controller: InterestRateController.init(),
    submit,
    resetState: () => setState(InterestRateModel.getState()),
  });

  const handleClose = () => {
    setState(InterestRateModel.getState());
    close();
  };

  // Wrapper for form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      ...state,
    };

    // Call the handleSubmit method from the hook
    handleSubmit(body, isUpdating, state.id);
  };

  const handleBaseChange = (value: string | number) => {
    const base = value as "requested" | "total" | "reduced";

    setState({
      ...state,
      base_iterable_amount: base,
    });
  };

  const handleRecieveableChange = (value: string | number) => {
    const recieveable = value as "all" | "deducted";

    setState({
      ...state,
      total_recieveable_amount: recieveable,
    });
  };

  useEffect(() => {
    if (data) {
      setState(InterestRateModel.fromJson(data));
    }
  }, [data]);

  return (
    <Modal title={title} show={show} close={handleClose} lg={lg}>
      <form onSubmit={onFormSubmit}>
        <div className="row">
          <div className="col-md-12">
            <SelectInput
              label="Loan Type"
              value={state.loan_type_id}
              onChange={(e) => setState({ ...state, loan_type_id: Number(e) })}
              name="loan-types"
              options={loanTypes}
              placeholder="Select Loan Type"
            />
          </div>
          <div className="col-md-4">
            <TextInput
              label="Tenor"
              type="number"
              value={state.tenor}
              onChange={(e) =>
                setState({
                  ...state,
                  tenor: Number(e.target.value),
                })
              }
              name="tenor"
            />
          </div>
          <div className="col-md-4">
            <TextInput
              label="Interest Rate"
              value={state.rate}
              onChange={(e) => setState({ ...state, rate: e.target.value })}
              name="interest-rate"
              placeholder="0"
            />
          </div>
          <div className="col-md-4">
            <TextInput
              label="Deduction"
              value={state.deduction}
              onChange={(e) =>
                setState({ ...state, deduction: e.target.value })
              }
              name="deduction"
              placeholder="0"
            />
          </div>
          <div className="col-md-6">
            <SelectInput
              label="Iterable"
              value={state.base_iterable_amount}
              onChange={handleBaseChange}
              name="frequency"
              options={InterestRateModel.getPrincipal()}
              placeholder="Select Frequency"
            />
          </div>
          <div className="col-md-6">
            <SelectInput
              label="Recieveable"
              value={state.total_recieveable_amount}
              onChange={handleRecieveableChange}
              name="recieveable"
              options={InterestRateModel.getRecieveable()}
              placeholder="Select Recieveable"
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
                  state.loan_type_id < 1 ||
                  state.tenor < 1 ||
                  state.deduction === "" ||
                  state.rate === ""
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

export default ManageInterestRates;
