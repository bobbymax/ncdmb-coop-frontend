import { useEffect, useState } from "react";
import InterestRateController from "src/app/controllers/InterestRateController";
import { optionDataFormat } from "src/app/helpers/Helpers";
import useEntityManager from "src/app/hooks/useEntityManager";
import InterestRateModel from "src/app/models/InterestRateModel";
import ManageInterestRates from "./ManageInterestRates";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";

const InterestRates = () => {
  const {
    show,
    isUpdating,
    data,
    manage,
    handleClose,
    handleSubmit,
    collection,
    setShow,
    columns,
    buttons,
  } = useEntityManager(InterestRateController, InterestRateModel);

  const [loanTypes, setLoanTypes] = useState([]);

  const fetchDependencies = async () => {
    const { loanTypes } = await InterestRateController.init().getDependencies();
    setLoanTypes(optionDataFormat(loanTypes, "id", "name"));
  };

  useEffect(() => {
    fetchDependencies();
  }, []);

  return (
    <>
      <ManageInterestRates
        title={`${isUpdating ? "Manage" : "Create"} Interest Rate`}
        show={show}
        isUpdating={isUpdating}
        close={handleClose}
        submit={handleSubmit}
        data={data}
        loanTypes={loanTypes}
        lg
      />
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader
              title="Interest Rates"
              icon="add-circle-outline"
              label="Interest Rate"
              handleClick={() => setShow(true)}
              variant="success"
            />
          </div>
        </Container>
      </div>
      <div className="pageContent">
        <Container fluid>
          <div className="col-md-12">
            <StormDataTable
              data={collection}
              columns={columns}
              actions={manage}
              buttons={buttons}
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default InterestRates;
