import PlanController from "src/app/controllers/PlanController";
import useEntityManager from "src/app/hooks/useEntityManager";
import PlanModel from "src/app/models/PlanModel";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";
import ManagePlan from "./ManagePlan";

const Plans = () => {
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
  } = useEntityManager(PlanController, PlanModel);

  console.log(collection);

  return (
    <>
      <ManagePlan
        title={`${isUpdating ? "Manage" : "Create"} Plan`}
        show={show}
        isUpdating={isUpdating}
        close={handleClose}
        submit={handleSubmit}
        data={data}
        lg
      />
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader
              title="Accounting Plans"
              icon="add-circle-outline"
              label="Plan"
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

export default Plans;
