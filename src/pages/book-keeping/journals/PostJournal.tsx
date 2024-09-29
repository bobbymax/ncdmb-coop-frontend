/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ChartOfAccountData } from "../../../app/models/ChartOfAccountModel";
import JournalController from "../../../app/controllers/JournalController";
import Container from "../../../components/pages/Container";
import PageHeader from "../../../components/pages/PageHeader";
import TextInput from "../../../components/forms/TextInput";
import JournalModel, {
  JournalData,
  JournalEntryLineData,
} from "../../../app/models/JournalModel";
import Button from "../../../components/forms/Button";
import SelectInput from "../../../components/forms/SelectInput";
import { optionDataFormat } from "../../../app/helpers/Helpers";
import Textarea from "../../../components/forms/Textarea";
import useFetchSingleManager from "../../../app/hooks/useFetchSingleManager";
import _ from "lodash";
import { useResourceActions } from "../../../app/hooks/useResourceActions";
import { ViewJsonResponse } from "../../../app/services/ResourceService";
import { toast } from "react-toastify";
import { ExpenditureData } from "../../../app/models/ExpenditureModel";
import JournalEntryModel, {
  JournalEntryData,
} from "../../../app/models/JournalEntryModel";
import JournalEntryController from "../../../app/controllers/JournalEntryController";
import Alert from "../../../app/helpers/Alert";
import { useNavigate } from "react-router-dom";

interface Dependencies {
  chartOfAccounts?: ChartOfAccountData[];
}

const PostJournal = () => {
  const initialJournalEntryLine = {
    id: 0,
    debit_chart_of_account_id: 0,
    credit_chart_of_account_id: 0,
    top_debit: "",
    top_credit: "",
    bottom_debit: "",
    bottom_credit: "",
  };
  const { raw } = useFetchSingleManager(JournalController);
  const navigate = useNavigate();

  const [state, setState] = useState<JournalData>(JournalModel.getState());
  const [chartOfAccounts, setChartOfAccounts] = useState<ChartOfAccountData[]>(
    []
  );
  const [expenditure, setExpenditure] = useState<
    Partial<ExpenditureData> | undefined
  >();
  const [journalEntryLineState, setJournalEntryLineState] =
    useState<JournalEntryLineData>(initialJournalEntryLine);

  const [journalEntryState, setJournalEntryState] = useState<JournalEntryData>(
    JournalEntryModel.getState()
  );
  const [error, setError] = useState<string>("");

  function isRawValid(
    raw: any
  ): raw is { id: number; title: string; description: string } {
    return (
      raw &&
      typeof raw.id === "number" &&
      typeof raw.title === "string" &&
      typeof raw.description === "string"
    );
  }

  const close = () => {
    setState(JournalModel.getState());
    setExpenditure(undefined);
    setJournalEntryState(JournalEntryModel.getState());
    setJournalEntryLineState(initialJournalEntryLine);
    setError("");
  };

  const submit = (response: ViewJsonResponse) => {
    const { record, message } = response;
    if (record) {
      toast.success(message);
      close();
    }
  };

  const { fetchRecord, handleSubmit } = useResourceActions({
    controller: JournalEntryController.init(),
    submit,
    resetState: () => close(),
  });

  const onJournalPostData = () => {
    const body = {
      journal_id: state.id,
      expenditure_id: journalEntryState.expenditure_id,
      entry_date: journalEntryState.entry_date,
      description: journalEntryState.description,
      lines: [
        {
          chart_of_account_id: journalEntryLineState.debit_chart_of_account_id,
          debit: journalEntryLineState.top_debit,
          credit: journalEntryLineState.top_credit,
        },
        {
          chart_of_account_id: journalEntryLineState.credit_chart_of_account_id,
          debit: journalEntryLineState.bottom_debit,
          credit: journalEntryLineState.bottom_credit,
        },
      ],
    };

    Alert.flash(
      "Post Journal",
      "info",
      "This would add data to this journal"
    ).then((result) => {
      if (result.isConfirmed) {
        handleSubmit(body, false, journalEntryState.id);
      }
    });
  };

  const onFetchExpenditure = async (value: string) => {
    if (value === "") return;
    const response = await fetchRecord(`fetch/expenditures`, value);
    if (response.status === "listed") {
      setExpenditure(response);
      setError("");
    } else {
      setError(`This expenditure has already been posted`);
      setState({
        ...state,
        reference: "",
      });
    }
  };

  const fetchDependencies = async () => {
    const { chartOfAccounts = [] }: Dependencies =
      await JournalController.init().getDependencies();
    setChartOfAccounts(chartOfAccounts);
  };

  useEffect(() => {
    if (expenditure) {
      setJournalEntryState({
        ...journalEntryState,
        expenditure_id: expenditure.id || 0,
        description: expenditure.description || "",
      });

      setJournalEntryLineState({
        ...journalEntryLineState,
        top_debit:
          expenditure?.flag === "debit"
            ? expenditure?.amount ?? "0.00"
            : "0.00",
        top_credit:
          expenditure?.flag === "credit"
            ? expenditure?.amount ?? "0.00"
            : "0.00",
        bottom_debit:
          expenditure?.flag === "credit"
            ? expenditure?.amount ?? "0.00"
            : "0.00",
        bottom_credit:
          expenditure?.flag === "debit"
            ? expenditure?.amount ?? "0.00"
            : "0.00",
      });
    }
  }, [expenditure]);

  useEffect(() => {
    if (_.isObject(raw) && isRawValid(raw)) {
      setState({
        ...state,
        id: raw.id,
        title: raw.title,
        description: raw.description,
      });
    }
  }, [raw]);

  useEffect(() => {
    fetchDependencies();
  }, []);

  return (
    <>
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader
              title="Post Journal"
              icon="arrow-back"
              handleClick={() => navigate(-1)}
              variant="danger"
              btnTitle="Go Back"
            />
          </div>
        </Container>
      </div>
      <div className="pageContent">
        <Container fluid>
          <div className="col-md-8">
            <div className="journal-header">
              <div className="row">
                {error !== "" && (
                  <div className="col-md-12 mb-3">
                    <p className="line text-danger">{error}</p>
                  </div>
                )}
                <div className="col-md-6 mb-3">
                  <div className="flex center-align space-between gap-lg">
                    <div style={{ flexGrow: 1 }}>
                      <TextInput
                        label="Expenditure Code"
                        value={state.reference}
                        onChange={(e) =>
                          setState({ ...state, reference: e.target.value })
                        }
                        placeholder="Enter Expenditure Code"
                        name="expenditure"
                      />
                    </div>
                    <div className="mt-2">
                      <Button
                        rounded
                        icon="send"
                        handleClick={() =>
                          onFetchExpenditure(state.reference || "")
                        }
                        variant="info"
                        fontSize={21}
                        isDisabled={state.reference === ""}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <TextInput
                    label="Entry Date"
                    type="date"
                    value={journalEntryState.entry_date}
                    onChange={(e) =>
                      setJournalEntryState({
                        ...journalEntryState,
                        entry_date: e.target.value,
                      })
                    }
                    name="entry-date"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <Textarea
                    label="Payment Description"
                    value={journalEntryState.description}
                    onChange={(e) =>
                      setJournalEntryState({
                        ...journalEntryState,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter Payment Description Here"
                    name="payment-description"
                    isDisabled
                    rows={5}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <div className="entry-lines-section">
                    <h5 className="mb-3">Entry Lines</h5>

                    {/* Debit Leg Section */}
                    <div className="entry-line-item">
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <SelectInput
                            label="Chart of Accounts"
                            value={
                              journalEntryLineState.debit_chart_of_account_id ??
                              0
                            }
                            onChange={(e) =>
                              setJournalEntryLineState({
                                ...journalEntryLineState,
                                debit_chart_of_account_id: Number(e),
                              })
                            }
                            name="chart-of-account"
                            options={optionDataFormat(
                              chartOfAccounts,
                              "id",
                              "account_name"
                            )}
                            placeholder="Select Chart of Account"
                          />
                        </div>
                        <div className="col-md-4">
                          <TextInput
                            label="Credit"
                            value={journalEntryLineState.top_credit}
                            onChange={(e) =>
                              setJournalEntryLineState({
                                ...journalEntryLineState,
                                top_credit: e.target.value,
                              })
                            }
                            name="debit-leg-credit"
                            placeholder="+ 0.00"
                            isDisabled
                          />
                        </div>
                        <div className="col-md-4">
                          <TextInput
                            label="Debit"
                            value={journalEntryLineState.top_debit}
                            onChange={(e) =>
                              setJournalEntryLineState({
                                ...journalEntryLineState,
                                top_debit: e.target.value,
                              })
                            }
                            name="debit-leg-debit"
                            placeholder="- 0.00"
                            isDisabled
                          />
                        </div>
                      </div>
                    </div>

                    {/* Credit Leg Section */}
                    <div className="entry-line-item">
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <SelectInput
                            label="Chart of Accounts"
                            value={
                              journalEntryLineState.credit_chart_of_account_id ??
                              0
                            }
                            onChange={(e) =>
                              setJournalEntryLineState({
                                ...journalEntryLineState,
                                credit_chart_of_account_id: Number(e),
                              })
                            }
                            name="chart-of-account"
                            options={optionDataFormat(
                              chartOfAccounts,
                              "id",
                              "account_name"
                            )}
                            placeholder="Select Chart of Account"
                          />
                        </div>
                        <div className="col-md-4">
                          <TextInput
                            label="Credit"
                            value={journalEntryLineState.bottom_credit}
                            onChange={(e) =>
                              setJournalEntryLineState({
                                ...journalEntryLineState,
                                bottom_credit: e.target.value,
                              })
                            }
                            name="debit-leg-credit"
                            placeholder="+ 0.00"
                            isDisabled
                          />
                        </div>
                        <div className="col-md-4">
                          <TextInput
                            label="Debit"
                            value={journalEntryLineState.bottom_debit}
                            onChange={(e) =>
                              setJournalEntryLineState({
                                ...journalEntryLineState,
                                bottom_debit: e.target.value,
                              })
                            }
                            name="debit-leg-debit"
                            placeholder="- 0.00"
                            isDisabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <Button
                    label="Make Post"
                    icon="receipt"
                    handleClick={() => onJournalPostData()}
                    isDisabled={
                      journalEntryState.entry_date === "" ||
                      journalEntryLineState.credit_chart_of_account_id < 1 ||
                      journalEntryLineState.debit_chart_of_account_id < 1
                    }
                    variant="info"
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PostJournal;
