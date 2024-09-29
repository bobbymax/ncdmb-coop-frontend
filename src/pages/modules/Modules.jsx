/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ModuleController from "../../app/controllers/ModuleController";
import ManageModule from "./ManageModule";
import StormDataTable from "src/components/tables/StormDataTable";
import ModuleModel from "../../app/models/ModuleModel";
import { optionDataFormat } from "../../app/helpers/Helpers";
import useEntityManager from "src/app/hooks/useEntityManager";
import PageHeader from "src/components/pages/PageHeader";
import Container from "src/components/pages/Container";

const Modules = () => {
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
  } = useEntityManager(ModuleController, ModuleModel);

  const [groups, setGroups] = useState([]);

  const fetchDependencies = async () => {
    const { groups } = await ModuleController.init().getDependencies();
    setGroups(optionDataFormat(groups, "id", "name"));
  };

  useEffect(() => {
    fetchDependencies();
  }, []);

  return (
    <>
      <ManageModule
        title={`${isUpdating ? "Manage" : "Create"} Module`}
        show={show}
        isUpdating={isUpdating}
        close={handleClose}
        submit={handleSubmit}
        data={data}
        lg
        modules={ModuleModel.parentModules(collection)}
        groups={groups}
      />
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader
              title="Modules"
              icon="add-circle-outline"
              label="Module"
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

export default Modules;
