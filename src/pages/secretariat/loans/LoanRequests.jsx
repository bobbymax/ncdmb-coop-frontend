import { useNavigate } from "react-router-dom";
import LoanRequestController from "src/app/controllers/LoanRequestController";
import useEntityManager from "src/app/hooks/useEntityManager";
import LoanRequestModel from "src/app/models/LoanRequestModel";
import { useStateContext } from "src/app/providers/ContentProvider";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";
import ManageLoanRequest from "./ManageLoanRequest";

const LoanRequests = () => {
  const navigate = useNavigate();

  const customLogic = {
    onManage: (data, action) => {
      // Add any custom logic here for handling the manage action.

      switch (action) {
        case "schedule":
          navigate(`${LoanRequestModel.init().path}/${data?.id}/schedule`);
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
    columns,
    buttons,
  } = useEntityManager(LoanRequestController, LoanRequestModel, customLogic);

  const { auth } = useStateContext();

  return (
    <>
      <ManageLoanRequest
        title={`${isUpdating ? "Manage" : "Request"} Loan Request`}
        show={show}
        isUpdating={isUpdating}
        close={handleClose}
        submit={handleSubmit}
        data={data}
        authId={Number(auth?.id)}
        lg
      />
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader title="Loan Requests" icon="receipt" />
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

export default LoanRequests;
