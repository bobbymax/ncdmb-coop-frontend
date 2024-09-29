import { useNavigate } from "react-router-dom";
import JournalController from "src/app/controllers/JournalController";
import useEntityManager from "src/app/hooks/useEntityManager";
import JournalModel from "src/app/models/JournalModel";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";
import ManageJournal from "./ManageJournal";

const Journals = () => {
  const navigate = useNavigate();

  const customLogic = {
    onManage: (data, action) => {
      navigate(`${JournalModel.init().path}/${data?.id}/post`);
    },
  };

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
  } = useEntityManager(JournalController, JournalModel, customLogic);

  return (
    <>
      <ManageJournal
        title={`${isUpdating ? "Manage" : "Create"} Journal`}
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
              title="Journals"
              icon="add-circle-outline"
              label="Journal"
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

export default Journals;
