import { useEffect, useState } from "react";
import _ from "lodash";
import moment from "moment";
import LoanController from "src/app/controllers/LoanController";
import useFetchSingleManager from "src/app/hooks/useFetchSingleManager";
import { useStateContext } from "src/app/providers/ContentProvider";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";
import LoanOffer from "src/app/contracts/loan/LoanOffer";
import Button from "src/components/forms/Button";
import { currency } from "src/app/helpers/Helpers";
import { useLocation, useNavigate } from "react-router-dom";
import { useResourceActions } from "src/app/hooks/useResourceActions";
import LoanOfferModel from "src/app/models/LoanOfferModel";
import LoanOfferController from "src/app/controllers/LoanOfferController";
import Alert from "src/app/helpers/Alert";
import LoanRequestModel from "src/app/models/LoanRequestModel";

const ReadLoan = () => {
  const { raw } = useFetchSingleManager(LoanController);
  const { auth } = useStateContext();
  const [repayments, setRepayments] = useState([]);
  const [response, setResponse] = useState(null);
  const [guarantors, setGuarantors] = useState([]);
  const [url, setUrl] = useState("");
  const [state, setState] = useState(LoanOfferModel.getState());
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const submit = () => {
    navigate(LoanRequestModel.init().path);
  };

  const { handleSubmit } = useResourceActions({
    controller: LoanOfferController.init(),
    submit,
    resetState: () => setState(LoanOfferModel.getState()),
  });

  const onLoanSchedule = () => {
    const body = {
      loan_id: raw?.id,
      repayments,
    };

    Alert.flash(
      "Create Schedule",
      "info",
      "You will not be able to reverse this!!"
    ).then((result) => {
      if (result.isConfirmed) {
        handleSubmit(body, false, state.id);
      }
    });
  };

  const columns = [
    { label: "Repayment Date", accessor: "repayment_date" },
    { label: "Installment", accessor: "amount" },
    { label: "Balance", accessor: "balance" },
  ];

  useEffect(() => {
    const offer = new LoanOffer(state);

    setResponse(offer.init());
    setRepayments(offer.init()?.schedule);
  }, [state]);

  useEffect(() => {
    if (
      _.isObject(raw) &&
      _.isObject(auth) &&
      _.has(raw, "interest_rate") &&
      _.has(raw, "amount") &&
      _.has(raw, "tenor") &&
      _.has(raw, "commitment") &&
      _.has(raw, "frequency") &&
      _.has(raw, "category") &&
      _.has(auth, "wallet") &&
      _.has(auth, "name") &&
      _.has(raw, "max_requestable_amount") &&
      _.has(raw, "guarantors") &&
      _.has(raw, "start_repayment_date")
    ) {
      const {
        interest_rate,
        amount,
        tenor,
        commitment,
        frequency,
        category,
        max_requestable_amount,
        guarantors,
        start_repayment_date,
      } = raw;

      const { wallet, name } = auth;

      const data = {
        interestRate: parseFloat(interest_rate?.rate),
        loanAmount: parseFloat(amount),
        tenor: parseInt(tenor),
        commitment: parseFloat(commitment),
        frequency,
        type: category,
        deduction: parseFloat(interest_rate?.deduction),
        base_iterable_amount: interest_rate?.base_iterable_amount,
        total_recieveable_amount: interest_rate?.total_recieveable_amount,
        available_balance: parseFloat(wallet?.available_balance),
        member_name: name,
        max_requestable_amount: parseFloat(max_requestable_amount),
        start_month: start_repayment_date,
      };

      setState(LoanOfferModel.fromJson(data));
      setGuarantors(guarantors);
      setUrl(pathname.split("/")[1]);
    }
  }, [raw, auth, pathname]);

  return (
    <>
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader title="Loan Details" />
          </div>
        </Container>
      </div>
      <div className="pageContent">
        <Container fluid>
          <div className="col-md-12 mb-3">
            <div className="flex space-between center-align">
              <div className="flex center-align gap-xl">
                <span className="line category">{`category: ${raw?.type}`}</span>
                <span className="line date">{`requested on: ${moment(
                  raw?.raised_at
                ).format("LL")}`}</span>
                <span className="line capsule">{raw?.status}</span>
              </div>
              {url === "secretariat" && (
                <Button
                  label={
                    url === "secretariat" ? "Create Schedule" : "Accept Offer"
                  }
                  handleClick={() => onLoanSchedule()}
                  isDisabled={raw?.status !== "approved"}
                  icon="calendar"
                  variant="success"
                />
              )}
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <span className="line">Requested Amount</span>
            <h1>{raw?.currency}</h1>
          </div>

          <div className="col-md-6 mb-3">
            <h4 className="line date mb-3">Proposed Repayment Start Date</h4>
            <h2>{moment(raw?.start_repayment_date).format("LL")}</h2>
          </div>

          <div className="col-md-6 mb-4">
            <h6 className="line capsule mb-3">Guarantors</h6>

            <div className="guarantor-space">
              {guarantors.length > 0 ? (
                guarantors.map((gua, i) => (
                  <div
                    key={i}
                    className="guarantor-item flex center-align space-between mb-2"
                  >
                    <p className="line">{gua?.guarantor?.name}</p>
                    <p className="line date">{gua?.status}</p>
                  </div>
                ))
              ) : (
                <div className="guarantor-item">
                  <p className="line category">No guarantors</p>
                </div>
              )}
            </div>
          </div>

          <div className="col-md-12 mb-4">
            <div className="row">
              <div className="col-md-3">
                <div className="branch">
                  <h5 className="line">Commitment</h5>
                  <h3>{currency(response?.commitment_amount)}</h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="branch">
                  <h5 className="line">Deduction</h5>
                  <h3>{currency(response?.deductable_amount)}</h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="branch">
                  <h5 className="line">Total Payable</h5>
                  <h3>{currency(response?.total_amount_payable)}</h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="branch">
                  <h5 className="line">Total Recieveable</h5>
                  <h3>{currency(response?.total_amount_recieveable)}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <StormDataTable data={repayments} columns={columns} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default ReadLoan;
