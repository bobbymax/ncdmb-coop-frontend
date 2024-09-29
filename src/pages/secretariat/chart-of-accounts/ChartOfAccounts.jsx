import { useEffect, useState } from "react";
import ChartOfAccountController from "src/app/controllers/ChartOfAccountController";
import { optionDataFormat } from "src/app/helpers/Helpers";
import useEntityManager from "src/app/hooks/useEntityManager";
import ChartOfAccountModel from "src/app/models/ChartOfAccountModel";
import ManageChartOfAccount from "./ManageChartOfAccount";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";

const ChartOfAccounts = () => {
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
  } = useEntityManager(ChartOfAccountController, ChartOfAccountModel);

  const [accountTypes, setAccountTypes] = useState([]);
  const [parents, setParents] = useState([]);

  const fetchDependencies = async () => {
    const { accountTypes } =
      await ChartOfAccountController.init().getDependencies();
    setAccountTypes(optionDataFormat(accountTypes, "id", "name"));
  };

  useEffect(() => {
    let parentList = [{ value: 0, label: "None" }];

    collection
      .filter((item) => item.parent_account_id < 1)
      .map((item) =>
        parentList.push({
          value: item?.id,
          label: item?.account_name,
        })
      );

    setParents(parentList);
  }, [collection]);

  useEffect(() => {
    fetchDependencies();
  }, []);

  return (
    <>
      <ManageChartOfAccount
        title={`${isUpdating ? "Manage" : "Create"} Chart of Account`}
        show={show}
        isUpdating={isUpdating}
        close={handleClose}
        submit={handleSubmit}
        data={data}
        accountTypes={accountTypes}
        chartOfAccounts={parents}
        lg
      />
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader
              title="Chart of Accounts"
              icon="add-circle-outline"
              label="Chart of Account"
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

export default ChartOfAccounts;
