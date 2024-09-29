import AccountTypeController from "src/app/controllers/AccountTypeController";
import useEntityManager from "src/app/hooks/useEntityManager";
import AccountTypeModel from "src/app/models/AccountTypeModel";
import ManageAccountType from "./ManageAccountType";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";

const AccountTypes = () => {
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
  } = useEntityManager(AccountTypeController, AccountTypeModel);

  return (
    <>
      <ManageAccountType
        title={`${isUpdating ? "Manage" : "Create"} Account Type`}
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
              title="Account Types"
              icon="add-circle-outline"
              label="Account Type"
              handleClick={() => setShow(true)}
              variant="success"
            />
          </div>
        </Container>
      </div>
      <div className="pageContent">
        <Container>
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

export default AccountTypes;
