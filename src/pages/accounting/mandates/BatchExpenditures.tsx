/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ExpenditureData } from "../../../app/models/ExpenditureModel";
import MandateController from "../../../app/controllers/MandateController";
import Container from "../../../components/pages/Container";
import PageHeader from "../../../components/pages/PageHeader";
import BatchItem from "../../../components/pages/BatchItem";
import ExpenditureBatchCard from "../../../components/pages/ExpenditureBatchCard";
import useBatchActions from "../../../app/hooks/useBatchActions";
import { currency } from "../../../app/helpers/Helpers";
import Button from "../../../components/forms/Button";
import { useResourceActions } from "../../../app/hooks/useResourceActions";
import { MandateData } from "../../../app/models/MandateModel";
import MandateModel from "../../../app/models/MandateModel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Dependencies {
  expenditures?: ExpenditureData[];
}

const BatchExpenditures = () => {
  const [expenditures, setExpenditures] = useState<ExpenditureData[]>([]);
  const [state, setState] = useState<MandateData>(MandateModel.getState());
  const navigate = useNavigate();

  const {
    board,
    total,
    fundId,
    setFundId,
    maxNumberReached,
    deletedItem,
    setDeletedItem,
    addExpenditure,
    removeExpenditure,
  } = useBatchActions({ max_batch_value: 6, expenditures });

  const submit = (response: any) => {
    toast.success(response.message);
    navigate(MandateModel.init().getPath());
    console.log(response);
  };

  const { handleSubmit } = useResourceActions<MandateData>({
    controller: MandateController.init(),
    submit,
    resetState: () => setState(MandateModel.getState()),
  });

  const fetchDependencies = async () => {
    const { expenditures = [] }: Dependencies =
      await MandateController.init().getDependencies();

    setExpenditures(expenditures);
  };

  const onAddToBatch = (value: number) => {
    const exp: ExpenditureData = expenditures.find(
      (item) => item.id === value
    )!;
    addExpenditure(exp.id);
  };

  const onGenerateMandate = () => {
    const data = {
      fund_id: fundId,
      total_amount: total.toFixed(2),
      no_of_payments: board.length,
      period: parseInt(process.env.REACT_APP_PERIOD || "0"),
      expenditures: board,
    };

    handleSubmit(data, false, state.id);
  };

  const onRemoveFromBatch = (value: number) => {
    const exp: ExpenditureData = board.find((item) => item.id === value)!;
    removeExpenditure(exp.id);
  };

  useEffect(() => {
    if (board.length > 0) {
      setExpenditures(
        expenditures.filter(
          (expItem) => !board.some((item) => item.id === expItem.id)
        )
      );
    } else {
      setFundId(0);
    }
  }, [board]);

  useEffect(() => {
    if (deletedItem) {
      setExpenditures([deletedItem, ...expenditures]);
      setDeletedItem(null);
    }
  }, [deletedItem, expenditures, setDeletedItem]);

  useEffect(() => {
    fetchDependencies();
  }, []);

  return (
    <>
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader
              title="Batch Expenditures"
              icon="arrow-back"
              handleClick={() => {}}
              variant="danger"
              btnTitle="Go Back"
            />
          </div>
        </Container>
      </div>
      <div className="pageContent">
        <Container fluid>
          <div className="col-md-9">
            <div className="expenditure-area">
              <div className="row">
                {expenditures.length > 0 ? (
                  expenditures.map((exp, i) => (
                    <div key={i} className="col-md-4">
                      <ExpenditureBatchCard
                        id={exp.id}
                        flag={exp.flag}
                        created_at={exp.created_at}
                        beneficiary={exp.beneficiary}
                        amount={exp.amount}
                        activity={exp.fund?.activity}
                        description={exp.description}
                        addToBatch={onAddToBatch}
                        isDisabled={fundId > 0 && exp.fund_id !== fundId}
                      />
                    </div>
                  ))
                ) : (
                  <p>No Expenditures to be batched</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            {maxNumberReached && (
              <p className="text-danger line mb-2">Batch is Full</p>
            )}
            <div className="title-area mb-3" style={{ lineHeight: 0.2 }}>
              <h5 className="mb-2">Batch</h5>
              <p className="line">No of Payments in Batch: {board.length}</p>
            </div>
            <div className="exp-board mb-4">
              {board.length > 0 ? (
                board.map((item, i) => (
                  <BatchItem
                    key={i}
                    beneficiary={item.beneficiary}
                    amount={item.amount}
                    expId={item.id}
                    removeItem={onRemoveFromBatch}
                  />
                ))
              ) : (
                <p className="line">No Expenditures in Batch</p>
              )}
            </div>
            <div className="total-area">
              <small className="line">
                <b>Grand Total:</b>
              </small>
              <h3 className="line" style={{ fontSize: 21 }}>
                {currency(total)}
              </h3>
            </div>

            <div className="submit-area mt-4">
              <Button
                label="Generate Mandate"
                icon="save"
                handleClick={() => onGenerateMandate()}
                isDisabled={board.length < 1}
                variant="success"
                fullWidth
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default BatchExpenditures;
