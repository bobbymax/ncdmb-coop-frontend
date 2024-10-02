import { ChangeEvent, useState } from "react";
import Container from "../../../components/pages/Container";
import PageHeader from "../../../components/pages/PageHeader";
import StormDataTable from "../../../components/tables/StormDataTable";
import SelectInput, { Option } from "../../../components/forms/SelectInput";
import TextInput from "../../../components/forms/TextInput";
import Upload, { Header } from "../../../app/contracts/files/Upload";
import { formatMembersUploadFile } from "../../../app/helpers/Helpers";
import Button from "../../../components/forms/Button";
import http from "../../../app/services/AxiosHttpResquestService";
import { toast } from "react-toastify";

interface ImportData {
  file: string;
  resource:
    | "members"
    | "contributions"
    | "groups"
    | "expenditures"
    | "plans"
    | "alter-members"
    | "upload-modules";
}

const Imports = () => {
  const initialState: ImportData = {
    file: "",
    resource: "members",
  };

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<ImportData>(initialState);
  const [columns, setColumns] = useState<Header[]>([]);
  const [collection, setCollection] = useState<Record<string, any>[]>([]);

  const getUrl = (resource: string): string => {
    let uri;
    switch (resource) {
      case "members":
        uri = "imports";
        break;

      default:
        uri = resource;
        break;
    }

    return uri;
  };

  const importData = async () => {
    setLoading(true);
    const body = {
      resource: state.resource,
      rows: collection,
    };

    try {
      const response = await http.store(getUrl(state.resource), body);

      if (response) {
        toast.success(response.message);
        setCollection([]);
        setColumns([]);
        setState(initialState);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getResource = (): Option[] => {
    return [
      { value: "members", label: "Members" },
      { value: "update-members-record", label: "Update Member Records" },
      { value: "contributions", label: "Contributions" },
      { value: "groups", label: "Groups" },
      { value: "expenditures", label: "Expenditures" },
      { value: "plans", label: "Plans" },
      { value: "upload-modules", label: "Modules" },
    ];
  };

  const handleResourceChange = (value: string | number) => {
    setState({
      ...state,
      resource: value as
        | "members"
        | "contributions"
        | "groups"
        | "expenditures"
        | "plans"
        | "alter-members"
        | "upload-modules",
    });
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;

    if (files === null) {
      return;
    }

    try {
      const result = await Upload.excel(files[0]);

      if (result) {
        let heads;
        let rows;
        const { headers, data } = result;

        if (state.resource === "members") {
          const json = formatMembersUploadFile(data);
          heads = json.data;
          rows = json.data;
        } else {
          heads = headers;
          rows = data;
        }

        setColumns(heads as Header[]);
        setCollection(rows);
      } else {
        console.error("No result returned from the upload");
      }
    } catch (error) {
      console.error("Error during file upload: ", error);
    }
  };

  return (
    <>
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader title="Imports" />
          </div>
        </Container>
      </div>
      <div className="pageContent">
        <Container fluid>
          <div className="col-md-4 mb-4">
            <TextInput
              label="Upload File"
              type="file"
              value={state.file}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-4">
            <SelectInput
              label="Resource"
              options={getResource()}
              value={state.resource}
              onChange={handleResourceChange}
              name="resource"
              placeholder="Select Resource"
            />
          </div>
          <div className="col-md-12 mb-4">
            <Button
              label="Import Data"
              icon="cloud-upload-outline"
              handleClick={() => importData()}
              isDisabled={
                loading || collection.length < 1 || columns.length < 1
              }
            />
          </div>
          <div className="col-md-12">
            <StormDataTable data={collection} columns={columns} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Imports;
