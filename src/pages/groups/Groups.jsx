import GroupController from "src/app/controllers/GroupController";
import GroupModel from "src/app/models/GroupModel";
import StormDataTable from "src/components/tables/StormDataTable";
import ManageGroup from "./ManageGroup";
import PageHeader from "../../components/pages/PageHeader";
import useEntityManager from "src/app/hooks/useEntityManager";
import Container from "src/components/pages/Container";

const Groups = () => {
  // const customLogic = {
  //   onManage: (data) => {
  //     console.log("Custom manage logic for GroupsComponent", data);
  //     // Add any custom logic here for handling the manage action.
  //   },
  //   onSubmit: (response) => {
  //     console.log("Custom submit logic for GroupsComponent", response);
  //     // Handle custom logic after submission, like logging or sending extra analytics
  //   },
  //   onClose: () => {
  //     console.log("Custom close logic for GroupsComponent");
  //     // Handle custom logic on closing the modal, if necessary
  //   },
  // };

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
  } = useEntityManager(GroupController, GroupModel);

  return (
    <>
      <ManageGroup
        title={`${isUpdating ? "Manage" : "Create"} Group`}
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
              title="Groups"
              icon="add-circle-outline"
              label="Group"
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

export default Groups;
