import { useEffect, useState } from "react";
import ExpenditureController from "src/app/controllers/ExpenditureController";
import { optionDataFormat } from "src/app/helpers/Helpers";
import useEntityManager from "src/app/hooks/useEntityManager";
import ExpenditureModel from "src/app/models/ExpenditureModel";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";
import ManageExpenditure from "./ManageExpenditure";
import { useResourceActions } from "src/app/hooks/useResourceActions";

const Expenditures = () => {
  const customLogic = {
    onManage: (data) => {
      handleDestroy(data?.id);
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
  } = useEntityManager(ExpenditureController, ExpenditureModel, customLogic);

  const [funds, setFunds] = useState([]);
  const [members, setMembers] = useState([]);

  const submit = (response) => {
    handleSubmit(response);
  };

  const { handleDestroy } = useResourceActions({
    controller: ExpenditureController.init(),
    submit,
    resetState: () => {},
  });

  const fetchDependencies = async () => {
    const { funds, members } =
      await ExpenditureController.init().getDependencies();
    setFunds(funds);
    setMembers(optionDataFormat(members, "id", "name"));
  };

  useEffect(() => {
    fetchDependencies();
  }, []);

  return (
    <>
      <ManageExpenditure
        title={`${isUpdating ? "Manage" : "Raise"} Expenditure`}
        show={show}
        isUpdating={isUpdating}
        close={handleClose}
        submit={handleSubmit}
        data={data}
        lg
        members={members}
        funds={funds}
      />
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader
              title="Expenditures"
              icon="add-circle-outline"
              label="Expenditure"
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

export default Expenditures;
