import { useEffect, useState } from "react";
import FundController from "src/app/controllers/FundController";
import { optionDataFormat } from "src/app/helpers/Helpers";
import useEntityManager from "src/app/hooks/useEntityManager";
import FundModel from "src/app/models/FundModel";
import ManageFund from "./ManageFund";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";

const Funds = () => {
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
  } = useEntityManager(FundController, FundModel);

  const [activities, setActivities] = useState([]);

  const fetchDependencies = async () => {
    const { activities } = await FundController.init().getDependencies();
    setActivities(optionDataFormat(activities, "id", "name"));
  };

  useEffect(() => {
    fetchDependencies();
  }, []);

  return (
    <>
      <ManageFund
        title={`${isUpdating ? "Manage" : "Create"} Fund`}
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
              title="Funds"
              icon="add-circle-outline"
              label="Fund"
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

export default Funds;
