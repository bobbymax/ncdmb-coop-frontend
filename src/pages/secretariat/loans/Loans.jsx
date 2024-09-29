/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import LoanController from "src/app/controllers/LoanController";
import { optionDataFormat } from "src/app/helpers/Helpers";
import useEntityManager from "src/app/hooks/useEntityManager";
import LoanModel from "src/app/models/LoanModel";
import ManageLoan from "./ManageLoan";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";
import { useStateContext } from "src/app/providers/ContentProvider";
import { useNavigate } from "react-router-dom";

const Loans = () => {
  const navigate = useNavigate();

  const customLogic = {
    onManage: (data, action) => {
      // Add any custom logic here for handling the manage action.

      switch (action) {
        case "view":
          navigate(`${LoanModel.init().path}/${data?.id}/view`);
          break;

        default:
          console.log("Custom manage logic for GroupsComponent", data, action);
          break;
      }
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
  } = useEntityManager(LoanController, LoanModel, customLogic);

  const { auth } = useStateContext();
  const [loanTypes, setLoanTypes] = useState([]);
  const [members, setMembers] = useState([]);

  const fetchDependencies = async () => {
    const { loanTypes, members } =
      await LoanController.init().getDependencies();

    const filtered = members?.filter(
      (member) => Number(member?.id) !== Number(auth?.id)
    );

    setLoanTypes(loanTypes);
    setMembers(optionDataFormat(filtered, "id", "name"));
  };

  useEffect(() => {
    fetchDependencies();
  }, []);

  return (
    <>
      <ManageLoan
        title={`${isUpdating ? "Manage" : "Request"} Loan`}
        show={show}
        isUpdating={isUpdating}
        close={handleClose}
        submit={handleSubmit}
        data={data}
        loanTypes={loanTypes}
        members={members}
        authId={Number(auth?.id)}
        lg
      />
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader
              title="Loans"
              icon="receipt"
              label="Loan"
              handleClick={() => setShow(true)}
              variant="success"
              isDisabled={collection.filter((raw) => !raw?.closed)?.length > 0}
              btnTitle="Request Loan"
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

export default Loans;
