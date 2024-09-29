import { useEffect, useState } from "react";
import LoanTypeController from "src/app/controllers/LoanTypeController";
import { optionDataFormat } from "src/app/helpers/Helpers";
import useEntityManager from "src/app/hooks/useEntityManager";
import LoanTypeModel from "src/app/models/LoanTypeModel";
import ManageLoanType from "./ManageLoanType";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";

const LoanTypes = () => {
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
  } = useEntityManager(LoanTypeController, LoanTypeModel);

  const [activities, setActivities] = useState([]);

  const fetchDependencies = async () => {
    const { activities } = await LoanTypeController.init().getDependencies();
    setActivities(optionDataFormat(activities, "id", "name"));
  };

  useEffect(() => {
    fetchDependencies();
  }, []);

  return (
    <>
      <ManageLoanType
        title={`${isUpdating ? "Manage" : "Create"} Loan Type`}
        show={show}
        isUpdating={isUpdating}
        close={handleClose}
        submit={handleSubmit}
        data={data}
        activities={activities}
        lg
      />
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader
              title="Loan Types"
              icon="add-circle-outline"
              label="Loan Type"
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

export default LoanTypes;
