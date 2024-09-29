import SelectInput, { Option } from "../../components/forms/SelectInput";
import UserModel, { UserData } from "../../app/models/UserModel";
import Modal, { ModalTypeProps } from "../../components/modals";
import { FormEvent, useEffect, useState } from "react";
import { useResourceActions } from "../../app/hooks/useResourceActions";
import UserController from "../../app/controllers/UserController";
import { optionDataFormat } from "../../app/helpers/Helpers";
import TextInput from "../../components/forms/TextInput";
import MultiSelect from "../../components/forms/MultiSelect";
import Button from "../../components/forms/Button";

interface MemberModalProps extends ModalTypeProps {
  data?: UserData;
  groups?: Option[];
}

const ManageMember = ({
  title,
  show,
  lg,
  isUpdating,
  close,
  submit,
  data,
  groups,
}: MemberModalProps) => {
  const [state, setState] = useState(UserModel.getState());
  const [group, setGroup] = useState<{ value: any; label: any }[]>([]);

  const { handleSubmit, handleDestroy } = useResourceActions<UserData>({
    controller: UserController.init(),
    submit,
    resetState: () => setState(UserModel.getState()),
  });

  const handleClose = () => {
    setState(UserModel.getState());
    setGroup([]);
    close();
  };

  // Wrapper for form submit
  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      firstname: state.firstname,
      middlename: state.middlename,
      surname: state.surname,
      email: state.email,
      type: state.type,
      fee: state.fee,
      groups: group,
      account_number: state.account_number,
      bank_name: state.bank_name,
      membership_no: state.membership_no,
    };

    // Call the handleSubmit method from the hook
    handleSubmit(body, isUpdating, state.id);
  };

  const handleChange = (value: string | number) => {
    const staffType = value as "member" | "staff" | "support" | "admin";
    setState({
      ...state,
      type: staffType,
    });
  };

  useEffect(() => {
    if (data) {
      console.log(data);

      setState(UserModel.fromJson(data));
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
              label="Membership No."
              value={state.membership_no}
              onChange={(e) =>
                setState({ ...state, membership_no: e.target.value })
              }
              placeholder="Enter Membership Number"
              name="code"
            />
          </div>
          <div className="col-md-6">
            <TextInput
              label="Firstname"
              value={state.firstname}
              onChange={(e) =>
                setState({ ...state, firstname: e.target.value })
              }
              placeholder="Enter Firstname"
              name="first-name"
            />
          </div>
          <div className="col-md-6">
            <TextInput
              label="Surname"
              value={state.surname}
              onChange={(e) => setState({ ...state, surname: e.target.value })}
              name="surname"
              placeholder="Enter Surname"
            />
          </div>
          <div className="col-md-5">
            <TextInput
              label="Middlename"
              value={state.middlename}
              onChange={(e) =>
                setState({ ...state, middlename: e.target.value })
              }
              name="middlename"
              placeholder="Enter Middlename"
            />
          </div>

          <div className="col-md-7">
            <TextInput
              label="Email Address"
              value={state.email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              name="email"
              placeholder="Enter Email Address"
            />
          </div>
          <div className="col-md-4">
            <SelectInput
              label="Member Type"
              value={state.type}
              onChange={handleChange}
              name="parent"
              options={UserModel.init().memberTypes}
              placeholder="Select Member Type"
            />
          </div>
          <div className="col-md-8">
            <TextInput
              label="Monthly Contribution"
              value={state.fee}
              onChange={(e) =>
                setState({ ...state, fee: parseFloat(e.target.value) })
              }
              name="fee"
              placeholder="Enter Monthly Contribution"
            />
          </div>
          <div className="col-md-6">
            <TextInput
              label="Bank Name"
              value={state.bank_name}
              onChange={(e) =>
                setState({ ...state, bank_name: e.target.value })
              }
              name="bank-name"
              placeholder="Enter Bank Name"
            />
          </div>
          <div className="col-md-6">
            <TextInput
              label="Account Number"
              value={state.account_number}
              onChange={(e) =>
                setState({ ...state, account_number: e.target.value })
              }
              name="account-number"
              placeholder="Enter Account Number"
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
          <div className="col-md-12">
            <div className="flex center-align space-between">
              <Button
                label="Submit"
                variant="success"
                type="submit"
                icon="send"
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

export default ManageMember;
