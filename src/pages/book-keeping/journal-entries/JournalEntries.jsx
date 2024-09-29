import JournalEntryController from "src/app/controllers/JournalEntryController";
import useEntityManager from "src/app/hooks/useEntityManager";
import JournalEntryModel from "src/app/models/JournalEntryModel";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import StormDataTable from "src/components/tables/StormDataTable";

const JournalEntries = () => {
  const customLogic = {
    onManage: () => {},
  };
  const { manage, collection, columns, buttons } = useEntityManager(
    JournalEntryController,
    JournalEntryModel,
    customLogic
  );

  return (
    <>
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader title="Journal Entries" />
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

export default JournalEntries;
