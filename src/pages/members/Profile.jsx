import { useState } from "react";
import AccountController from "src/app/controllers/AccountController";
import useEntityManager from "src/app/hooks/useEntityManager";
import AccountModel from "src/app/models/AccountModel";
import Button from "../../components/forms/Button";
import Icon from "src/components/forms/Icon";
import TextInput from "src/components/forms/TextInput";
import Container from "src/components/pages/Container";
import PageHeader from "src/components/pages/PageHeader";
import { useResourceActions } from "src/app/hooks/useResourceActions";
import UserController from "src/app/controllers/UserController";
import { useStateContext } from "src/app/providers/ContentProvider";
import http from "../../app/services/AxiosHttpResquestService";
import { toast } from "react-toastify";
import Alert from "src/app/helpers/Alert";

const Profile = () => {
  const { auth } = useStateContext();
  const initialPasswordReset = {
    password: "",
    confirmPassword: "",
  };

  const [state, setState] = useState(AccountModel.getState());
  const [isUpdating, setIsUpdating] = useState(false);
  const [passwordResetState, setPasswordResetState] =
    useState(initialPasswordReset);

  const { collection, handleSubmit: updateAccounts } = useEntityManager(
    AccountController,
    AccountModel
  );

  const submit = (response) => {
    setState(AccountModel.getState());
    setPasswordResetState(initialPasswordReset);
    setIsUpdating(false);
    updateAccounts(response);
  };

  const { handleSubmit } = useResourceActions({
    controller: AccountController.init(),
    submit,
    resetState: () => setState(AccountModel.getState()),
  });

  const onRecordUpdate = (raw) => {
    setState(AccountModel.fromJson(raw));
    setIsUpdating(true);
  };

  const makeAccountDefault = async (raw) => {
    Alert.flash(
      "Default!!",
      "info",
      "You are about to make this account your default account!!"
    ).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await http.patch(`default/accounts/${raw?.id}`, {
            status: true,
          });

          if (response) {
            const { status, data } = response;

            if (status === 200) {
              submit({ record: data?.data, action: "replace" });
              toast.success(data?.message);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const onCreateAccount = () => {
    const body = {
      ...state,
    };
    handleSubmit(body, isUpdating, state.id);
  };

  const onPasswordReset = async () => {
    const body = {
      ...passwordResetState,
    };

    try {
      const response = await UserController.init().createOrUpdate(
        "reset/members",
        body,
        "update",
        auth?.id
      );

      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setState(AccountModel.getState());
      setPasswordResetState(initialPasswordReset);
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className="pageHeader mb-3" style={{ padding: "8px 17px" }}>
        <Container fluid>
          <div className="col-md-12">
            <PageHeader title="User Profile" />
          </div>
        </Container>
      </div>
      <div className="pageContent">
        <Container fluid>
          <div className="col-md-4">
            <h5 className="mb-4 line capsule" style={{ fontSize: 16 }}>
              Password Reset
            </h5>

            <div className="mb-3">
              <TextInput
                label="New Password"
                type="password"
                value={passwordResetState.password}
                onChange={(e) =>
                  setPasswordResetState({
                    ...passwordResetState,
                    password: e.target.value,
                  })
                }
                name="password-reset"
                placeholder="Enter New Password"
              />
            </div>

            <div className="mb-3">
              <TextInput
                label="Confirm Password"
                type="password"
                value={passwordResetState.confirmPassword}
                onChange={(e) =>
                  setPasswordResetState({
                    ...passwordResetState,
                    confirmPassword: e.target.value,
                  })
                }
                name="confirm-password"
                placeholder="Confirm Password"
              />
            </div>

            {passwordResetState.password !== "" &&
              passwordResetState.confirmPassword !== "" &&
              passwordResetState.password ===
                passwordResetState.confirmPassword && (
                <div className="mb-3">
                  <Button
                    label="Reset Password"
                    handleClick={() => onPasswordReset()}
                    icon="refresh-circle"
                    place="right"
                    size="nm"
                    isDisable={
                      passwordResetState.password === "" ||
                      passwordResetState.confirmPassword === ""
                    }
                  />
                </div>
              )}
          </div>

          <div className="col-md-4">
            <h5 className="mb-4 line capsule" style={{ fontSize: 16 }}>
              Accounts
            </h5>

            <div className="mb-3">
              <TextInput
                label="Bank Name"
                value={state.bank_name}
                onChange={(e) =>
                  setState({
                    ...state,
                    bank_name: e.target.value,
                  })
                }
                name="bank-name"
                placeholder="Enter Bank Name"
              />
            </div>

            <div className="mb-3">
              <TextInput
                label="Account Number"
                value={state.account_number}
                onChange={(e) =>
                  setState({
                    ...state,
                    account_number: e.target.value,
                  })
                }
                name="account-number"
                placeholder="Enter Account Number"
              />
            </div>

            {state.account_number !== "" && state.bank_name !== "" && (
              <div className="mb-3">
                <Button
                  label={`${isUpdating ? "Update" : "Add"} Account`}
                  handleClick={() => onCreateAccount()}
                  icon="send"
                  place="right"
                  size="nm"
                  isDisable={
                    state.account_number === "" || state.bank_name === ""
                  }
                />
              </div>
            )}
          </div>

          <div className="col-md-4">
            {collection?.length > 0 ? (
              collection?.map((item, i) => (
                <div className="account-item mb-3" key={i}>
                  <div className="flex center-align gap-md">
                    <div>
                      <Icon icon="clipboard" fontSize={21} />
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <small className="line">
                        <b>{item?.bank_name}</b>
                      </small>
                      <h3 className="line" style={{ fontSize: 18 }}>
                        {item?.account_number}
                      </h3>
                    </div>

                    <div className="flex start column gap-sm">
                      {item?.default_account === 0 && (
                        <Button
                          size="sm"
                          label="Make Default"
                          handleClick={() => makeAccountDefault(item)}
                          icon="star"
                          place="right"
                          isDisable={item && item?.default_account === 1}
                          fullWidth
                        />
                      )}
                      <Button
                        size="sm"
                        label="Manage"
                        handleClick={() => onRecordUpdate(item)}
                        icon="cog"
                        variant="success"
                        isDisable={item && item?.default_account === 1}
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Account Numbers Present</p>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Profile;
