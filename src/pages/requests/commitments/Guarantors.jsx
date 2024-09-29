import GuarantorController from "src/app/controllers/GuarantorController";
import useEntityManager from "src/app/hooks/useEntityManager";
import GuarantorModel from "src/app/models/GuarantorModel";
import ManageGuarantor from "./ManageGuarantor";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";

const Guarantors = () => {
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
  } = useEntityManager(GuarantorController, GuarantorModel);

  return (
    <>
      <ManageGuarantor
        title={`${isUpdating ? "Manage" : "Create"} Commitment`}
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
              title="Commitments"
              icon="add-circle-outline"
              label="Group"
              handleClick={() => setShow(true)}
              variant="success"
              btnTitle="Decisions"
              isDisabled
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

export default Guarantors;
