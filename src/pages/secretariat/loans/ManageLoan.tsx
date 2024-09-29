/* eslint-disable react-hooks/exhaustive-deps */
import LoanModel, { LoanData } from "../../../app/models/LoanModel";
import Modal, { ModalTypeProps } from "../../../components/modals";
import SelectInput, { Option } from "../../../components/forms/SelectInput";
import { FormEvent, useEffect, useState } from "react";
import { useResourceActions } from "../../../app/hooks/useResourceActions";
import LoanController from "../../../app/controllers/LoanController";
import { LoanTypeData } from "../../../app/models/LoanTypeModel";
import { optionDataFormat } from "../../../app/helpers/Helpers";
import TextInput from "../../../components/forms/TextInput";
import Textarea from "../../../components/forms/Textarea";
import Button from "../../../components/forms/Button";
import { InterestRateData } from "../../../app/models/InterestRateModel";
import MultiSelect from "../../../components/forms/MultiSelect";

interface LoanModalProps extends ModalTypeProps {
  data?: LoanData;
  loanTypes?: LoanTypeData[];
  members?: Option[];
  authId: number;
}

const ManageLoan = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
  loanTypes = [],
  members = [],
  authId,
}: LoanModalProps) => {
  const [state, setState] = useState<LoanData>(LoanModel.getState());
  const [tenors, setTenors] = useState<Option[]>([]);
  const [guarantors, setGuarantors] = useState<Option[]>([]);
  const [interestRates, setInterestRates] = useState<
    InterestRateData[] | undefined
  >([]);

  const { handleSubmit, handleDestroy } = useResourceActions<LoanData>({
    controller: LoanController.init(),
    submit,
    resetState: () => setState(LoanModel.getState()),
  });

  const handleClose = () => {
    setState(LoanModel.getState());
    close();
  };

  // Wrapper for form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      ...state,
      guarantors,
      user_id: authId,
    };

    // Call the handleSubmit method from the hook
    handleSubmit(body, isUpdating, state.id);
  };

  const handleFrequencyChange = (value: string | number) => {
    const frequency = value as "monthly" | "annually" | "custom";

    setState({
      ...state,
      frequency,
    });
  };

  const formatTenors = (
    interestRates: InterestRateData[] | undefined,
    frequency: "Months" | "Years"
  ): Option[] => {
    const tenors: Option[] = [];

    setInterestRates(interestRates);

    interestRates?.map((interestRate) =>
      tenors.push({
        value: interestRate.id,
        label: `${interestRate.tenor} ${frequency}`,
      })
    );

    return tenors;
  };

  useEffect(() => {
    if (state.loan_type_id > 0) {
      const loanType = loanTypes.find(
        (loanType) => loanType.id === state.loan_type_id
      );

      setTenors(
        formatTenors(
          loanType?.interest_rates,
          loanType?.frequency === "annually" ? "Years" : "Months"
        )
      );
    }
  }, [state.loan_type_id]);

  useEffect(() => {
    if (
      state.interest_rate_id > 0 &&
      interestRates &&
      interestRates?.length > 0
    ) {
      const interestRate = interestRates.find(
        (rate) => rate.id === state.interest_rate_id
      );

      setState({
        ...state,
        tenor: Number(interestRate?.tenor) ?? 0,
      });
    }
  }, [state.interest_rate_id, interestRates]);

  useEffect(() => {
    if (data) {
      setState(LoanModel.fromJson(data));
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
              options={optionDataFormat(loanTypes, "id", "name")}
              placeholder="Select Loan Type"
            />
          </div>
          <div className="col-md-12">
            <TextInput
              label="Amount"
              value={state.amount}
              onChange={(e) =>
                setState({
                  ...state,
                  amount: e.target.value,
                })
              }
              name="amount"
              placeholder="Enter Amount"
            />
          </div>
          <div className="col-md-12">
            <Textarea
              label="Reason"
              value={state.reason}
              onChange={(e) =>
                setState({
                  ...state,
                  reason: e.target.value,
                })
              }
              name="reason"
              placeholder="Enter Reason"
              rows={5}
            />
          </div>
          <div className="col-md-6">
            <SelectInput
              label="Tenor"
              value={state.interest_rate_id}
              onChange={(e) =>
                setState({
                  ...state,
                  interest_rate_id: Number(e),
                })
              }
              name="interest-rate"
              options={tenors}
              placeholder="Select Tenor"
            />
          </div>
          <div className="col-md-6">
            <SelectInput
              label="Frequency"
              value={state.frequency}
              onChange={handleFrequencyChange}
              name="frequency"
              options={LoanModel.getFrequencies()}
              placeholder="Select Frequency"
            />
          </div>
          {!isUpdating && (
            <div className="col-md-12 mb-4">
              <MultiSelect
                label="Guarantors"
                value={guarantors}
                onChange={setGuarantors}
                options={members}
                placeholder="Groups"
                isSearchable
                isMulti
              />
            </div>
          )}
          <div className="col-md-12">
            <div className="flex center-align space-between">
              <Button
                label="Submit"
                variant="success"
                type="submit"
                icon="send"
                isDisabled={state.loan_type_id < 1 || state.tenor < 1}
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

export default ManageLoan;
