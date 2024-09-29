import { FormEvent, useEffect, useState } from "react";
import Modal, { ModalTypeProps } from "../../components/modals";
import ModuleModel, { ModuleData } from "../../app/models/ModuleModel";
import ModuleController from "../../app/controllers/ModuleController";
import Button from "../../components/forms/Button";
import TextInput from "../../components/forms/TextInput";
import SelectInput, { Option } from "../../components/forms/SelectInput";
import MultiSelect from "../../components/forms/MultiSelect";
import { optionDataFormat } from "../../app/helpers/Helpers";
import { useResourceActions } from "../../app/hooks/useResourceActions";

interface ModuleModalProps extends ModalTypeProps {
  data?: ModuleData;
  modules: Option[];
  groups?: Option[];
}

const ManageModule = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
  modules,
  groups,
}: ModuleModalProps) => {
  const [state, setState] = useState(ModuleModel.getState());
  const [group, setGroup] = useState<{ value: any; label: any }[]>([]);

  const { handleSubmit, handleDestroy } = useResourceActions<ModuleData>({
    controller: ModuleController.init(),
    submit,
    resetState: () => setState(ModuleModel.getState()),
  });

  const handleClose = () => {
    setState(ModuleModel.getState());
    close();
  };

  // Wrapper for form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      name: state.name,
      icon: state.icon,
      path: state.path,
      type: state.type,
      parent_id: state.parent_id,
      groups: group,
    };

    // Call the handleSubmit method from the hook
    handleSubmit(body, isUpdating, state.id);
  };

  const handleChange = (value: string | number) => {
    const moduleType = value as "application" | "module" | "page";
    setState({
      ...state,
      type: moduleType,
    });
  };

  useEffect(() => {
    if (data) {
      setState(ModuleModel.fromJson(data));
      const selectedGroups = optionDataFormat(data.groups, "id", "name");
      setGroup(selectedGroups);
    }
  }, [data]);

  return (
    <Modal title={title} show={show} close={handleClose} lg={lg}>
      <form onSubmit={onFormSubmit}>
        <div className="row">
          <div className="col-md-12">
            <TextInput
              label="Name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              placeholder="Enter Module Name"
              name="module-name"
            />
          </div>
          <div className="col-md-3">
            <TextInput
              label="Icon"
              value={state.icon}
              onChange={(e) => setState({ ...state, icon: e.target.value })}
              name="icon"
              placeholder="Enter Icon"
            />
          </div>
          <div className="col-md-9">
            <TextInput
              label="Path"
              value={state.path}
              onChange={(e) => setState({ ...state, path: e.target.value })}
              name="path"
              placeholder="Enter Path"
            />
          </div>
          <div className="col-md-12">
            <SelectInput
              label="Parent"
              value={state.parent_id}
              onChange={(e) => setState({ ...state, parent_id: Number(e) })}
              name="parent"
              options={modules}
              placeholder="Select Parent"
            />
          </div>
          <div className="col-md-12 mb-4">
            <MultiSelect
              label="Groups"
              value={group}
              onChange={setGroup}
              options={groups}
              placeholder="Groups"
              isSearchable
              isMulti
            />
          </div>
          <div className="col-md-12 mb-4">
            <SelectInput
              label="Module Type"
              value={state.type}
              onChange={handleChange}
              name="type"
              options={ModuleModel.getModuleTypes()}
              placeholder="Select Module Type"
            />
          </div>
          <div className="col-md-12">
            <div className="flex center-align space-between">
              <Button
                label="Submit"
                variant="success"
                type="submit"
                icon="send"
                isDisabled={
                  state.name === "" || state.icon === "" || state.path === ""
                }
              />
              {isUpdating && (
                <Button
                  label="Delete"
                  variant="danger"
                  handleClick={() => handleDestroy(state.id)}
                  icon="trash-outline"
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ManageModule;
