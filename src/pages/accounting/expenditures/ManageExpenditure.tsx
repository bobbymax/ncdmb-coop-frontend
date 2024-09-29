/* eslint-disable react-hooks/exhaustive-deps */
import SelectInput, { Option } from "../../../components/forms/SelectInput";
import ExpenditureModel, {
  ExpenditureData,
} from "../../../app/models/ExpenditureModel";
import Modal, { ModalTypeProps } from "../../../components/modals";
import { FormEvent, useEffect, useState } from "react";
import { useResourceActions } from "../../../app/hooks/useResourceActions";
import ExpenditureController from "../../../app/controllers/ExpenditureController";
import TextInput from "../../../components/forms/TextInput";
import MultiSelect from "../../../components/forms/MultiSelect";
import Button from "../../../components/forms/Button";
import Textarea from "../../../components/forms/Textarea";
import { LoanData } from "../../../app/models/LoanModel";
import { optionDataFormat } from "../../../app/helpers/Helpers";
import { FundData } from "../../../app/models/FundModel";

interface ExpenditureModalProps extends ModalTypeProps {
  data?: ExpenditureData;
  funds: FundData[];
  members?: Option[];
}

const ManageExpenditure = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
  funds = [],
  members = [],
}: ExpenditureModalProps) => {
  const [state, setState] = useState(ExpenditureModel.getState());
  const [fund, setFund] = useState<{ value: any; label: any }>();
  const [beneficiary, setBeneficiary] = useState<{ value: any; label: any }>();
  const [loan, setLoan] = useState<LoanData>();

  const { handleSubmit, fetchRecord } = useResourceActions<ExpenditureData>({
    controller: ExpenditureController.init(),
    submit,
    resetState: () => handleClose(),
  });

  const handleClose = () => {
    setState(ExpenditureModel.getState());
    setBeneficiary(undefined);
    setFund(undefined);
    setLoan(undefined);
    close();
  };

  const onRecordFetch = async (reference: string | undefined) => {
    if (reference) {
      const rawData = await fetchRecord("reference/loans", reference);
      setLoan(rawData);
    }
  };

  // Wrapper for form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      fund_id: state.fund_id,
      amount: state.amount,
      description: state.description,
      beneficiary_id: state.beneficiary_id,
      flag: state.flag,
      type: state.type,
      beneficiary: state.beneficiary,
      loan_id: state.loan_id,
      payment_type: state.payment_type,
      period: Number(process.env.REACT_APP_PERIOD),
    };

    // Call the handleSubmit method from the hook
    handleSubmit(body, isUpdating, state.id);
  };

  useEffect(() => {
    if (data) {
      setState(ExpenditureModel.fromJson(data));
      // const selectedGroups = optionDataFormat(data.groups, "id", "name");
      // setGroup(selectedGroups);
    }
  }, [data]);

  useEffect(() => {
    if (state.amount !== "" && state.available_balance) {
      const amount = parseFloat(state.amount);

      if (amount > 0) {
        const new_balance = state.available_balance - amount;

        setState({
          ...state,
          new_balance,
        });
      } else {
        setState({
          ...state,
          new_balance: 0,
        });
      }
    }
  }, [state.amount, state.available_balance]);

  useEffect(() => {
    if (fund) {
      const single = funds.find((activity) => activity.id === fund.value);

      //   console.log(single);

      const value = parseFloat(
        single && single.booked_balance ? single.booked_balance.toString() : "0"
      );

      setState({
        ...state,
        available_balance: value,
        fund_id: fund.value,
      });
    }
  }, [fund]);

  useEffect(() => {
    if (loan) {
      const member = members.find(
        (member) => member.value === Number(loan.user_id)
      );
      setState({
        ...state,
        amount: loan.amount,
        description: `Payment for ${loan.reason}`,
        beneficiary_id: loan.user_id,
        beneficiary:
          member && member.label !== "" ? (member.label as string) : "",
        loan_id: loan.id,
      });

      setBeneficiary(member);
    }
  }, [loan]);

  useEffect(() => {
    if (beneficiary) {
      setState({
        ...state,
        beneficiary: beneficiary.label,
      });
    }
  }, [beneficiary]);

  return (
    <Modal title={title} show={show} close={handleClose} lg={lg}>
      <form onSubmit={onFormSubmit}>
        <div className="row">
          <div className="col-md-8">
            <SelectInput
              label="Payment Type"
              value={state.payment_type}
              onChange={(e) => {
                const value = e as
                  | "loan"
                  | "project"
                  | "contribution"
                  | "other";
                setState({ ...state, payment_type: value });
              }}
              name="payment-type"
              options={ExpenditureModel.getPaymentTypes()}
              placeholder="Select Payment Type"
            />
          </div>
          <div className="col-md-4">
            <SelectInput
              label="Flag"
              value={state.flag}
              onChange={(e) => {
                const value = e as "credit" | "debit";
                setState({ ...state, flag: value });
              }}
              name="payment-type"
              options={ExpenditureModel.getFlags()}
              placeholder="Select Flag"
            />
          </div>
          {state.payment_type === "loan" && (
            <div className="col-md-12">
              <div className="flex center-align space-between gap-md">
                <div
                  style={{
                    flexGrow: 1,
                  }}
                >
                  <TextInput
                    label="Reference"
                    value={state.reference}
                    onChange={(e) =>
                      setState({ ...state, reference: e.target.value })
                    }
                    placeholder="Enter Loan Reference"
                    name="it-reference"
                  />
                </div>
                <div
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Button
                    label="Fetch"
                    handleClick={() => onRecordFetch(state.reference)}
                    icon="balloon"
                    variant="info"
                    size="md"
                    isDisabled={state.reference === ""}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="col-md-4">
            <SelectInput
              label="Type"
              value={state.type}
              onChange={(e) => {
                const value = e as "staff" | "member" | "third-party";

                setState({
                  ...state,
                  type: value,
                });
              }}
              name="type"
              options={ExpenditureModel.getTypes()}
              placeholder="Select Type"
            />
          </div>
          <div className="col-md-8">
            <TextInput
              label="Amount"
              value={state.amount}
              onChange={(e) => setState({ ...state, amount: e.target.value })}
              placeholder="Enter Amount"
              name="amount"
              isDisabled={loan !== undefined}
            />
          </div>
          <div className="col-md-6 mb-4">
            <MultiSelect
              label="Funds"
              value={fund}
              onChange={setFund}
              options={optionDataFormat(funds, "id", "activity")}
              placeholder="Fund"
              isSearchable
            />
          </div>
          <div className="col-md-6 mb-4">
            <MultiSelect
              label="Beneficiary"
              value={beneficiary}
              onChange={setBeneficiary}
              options={members}
              placeholder="Beneficiary"
              isSearchable
              isDisabled={loan !== undefined}
            />
          </div>
          <div className="col-md-6">
            <TextInput
              label="Available Balance"
              value={state.available_balance}
              onChange={(e) =>
                setState({
                  ...state,
                  available_balance: parseFloat(e.target.value),
                })
              }
              placeholder="0"
              name="available-balance"
              isDisabled
            />
          </div>
          <div className="col-md-6">
            <TextInput
              label="New Balance"
              value={state.new_balance}
              onChange={(e) =>
                setState({ ...state, new_balance: Number(e.target.value) })
              }
              name="new-balance"
              isDisabled
            />
          </div>
          <div className="col-md-12">
            <TextInput
              label="Other Beneficiary"
              value={state.beneficiary}
              onChange={(e) =>
                setState({ ...state, beneficiary: e.target.value })
              }
              placeholder="Enter Beneficiary"
              name="beneficiary"
              isDisabled={loan !== undefined || beneficiary !== undefined}
            />
          </div>
          <div className="col-md-12 mb-4">
            <Textarea
              label="Description"
              value={state.description}
              onChange={(e) =>
                setState({ ...state, description: e.target.value })
              }
              name="description"
              placeholder="Enter Description Here"
              rows={4}
              isDisabled={loan !== undefined}
            />
          </div>
          <div className="col-md-12">
            <div className="flex center-align space-between">
              <Button
                label="Submit"
                variant="success"
                type="submit"
                icon="send"
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ManageExpenditure;
