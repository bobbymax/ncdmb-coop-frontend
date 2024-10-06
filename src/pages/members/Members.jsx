import { useEffect, useState } from "react";
import UserController from "src/app/controllers/UserController";
import { optionDataFormat } from "src/app/helpers/Helpers";
import useEntityManager from "../../app/hooks/useEntityManager";
import UserModel from "src/app/models/UserModel";
import ManageMember from "./ManageMember";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "../../components/tables/StormDataTable";

const Members = () => {
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
  } = useEntityManager(UserController, UserModel);

  const [groups, setGroups] = useState([]);

  const fetchDependencies = async () => {
    const { groups } = await UserController.init().getDependencies();
    setGroups(optionDataFormat(groups, "id", "name"));
  };

  useEffect(() => {
    fetchDependencies();
  }, []);

  console.log(groups);

  return (
    <>
      <ManageMember
        title={`${isUpdating ? "Manage" : "Create"} Member`}
        show={show}
        isUpdating={isUpdating}
        close={handleClose}
        submit={handleSubmit}
        data={data}
        lg
        groups={groups}
      />
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader
              title="Members"
              icon="person-add"
              label="Member"
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

export default Members;
