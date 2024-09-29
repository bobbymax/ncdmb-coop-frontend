import { useEffect, useState } from "react";
import ActivityController from "src/app/controllers/ActivityController";
import { optionDataFormat } from "src/app/helpers/Helpers";
import useEntityManager from "src/app/hooks/useEntityManager";
import ActivityModel from "src/app/models/ActivityModel";
import ManageActivity from "./ManageActivity";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";

const Activities = () => {
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
  } = useEntityManager(ActivityController, ActivityModel);

  const [plans, setPlans] = useState([]);

  const fetchDependencies = async () => {
    const { plans } = await ActivityController.init().getDependencies();
    setPlans(optionDataFormat(plans, "id", "name"));
  };

  useEffect(() => {
    fetchDependencies();
  }, []);

  return (
    <>
      <ManageActivity
        title={`${isUpdating ? "Manage" : "Create"} Activity`}
        show={show}
        isUpdating={isUpdating}
        close={handleClose}
        submit={handleSubmit}
        data={data}
        plans={plans}
        lg
      />
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader
              title="Accounting Activities"
              icon="add-circle-outline"
              label="Activity"
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

export default Activities;
