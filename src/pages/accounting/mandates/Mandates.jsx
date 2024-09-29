import { useNavigate } from "react-router-dom";
import MandateController from "src/app/controllers/MandateController";
import useEntityManager from "src/app/hooks/useEntityManager";
import { useResourceActions } from "src/app/hooks/useResourceActions";
import MandateModel from "src/app/models/MandateModel";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";

const Mandates = () => {
  const navigate = useNavigate();

  const customLogic = {
    onManage: (data, action) => {
      switch (action) {
        case "destroy":
          handleDestroy(data.id);
          break;

        default:
          console.log("printing...");
          break;
      }
    },
  };

  const { manage, collection, columns, buttons, handleSubmit } =
    useEntityManager(MandateController, MandateModel, customLogic);

  const submit = (response) => {
    handleSubmit(response);
  };

  const { handleDestroy } = useResourceActions({
    controller: MandateController.init(),
    submit,
    resetState: () => {},
  });

  const batch = () => {
    navigate(`${MandateModel.init().path}/batch`);
  };

  return (
    <>
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader
              title="Mandates"
              icon="add-circle-outline"
              handleClick={() => batch()}
              variant="success"
              btnTitle="Batch Expenditures"
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

export default Mandates;
