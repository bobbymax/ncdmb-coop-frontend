import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/forms/TextInput";
import Button from "../../components/forms/Button";
import AuthService from "src/app/services/AuthService";
import { toast } from "react-toastify";
import { useStateContext } from "src/app/providers/ContentProvider";

const Login = () => {
  const { setIsAuthenticated, setAuth, setToken } = useStateContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const authenticate = async (e) => {
    e.preventDefault();

    const body = {
      username,
      password,
    };

    const user = new AuthService();

    try {
      setError("");
      const response = await user.login(body);
      if (response.status === 200) {
        setIsAuthenticated(true);
        setAuth(response.data?.data?.user);
        setToken(response.data?.data?.token);
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.log(error.message);
      setError(`Server Response: ${error?.message}`);
    }
  };

  return (
    <>
      <div
        className="flex center-align justify-center"
        style={{
          height: "100%",
        }}
      >
        <div className="storm-card" style={{ borderRadius: 8, width: "35%" }}>
          <div className="storm-header">
            <p className="form-title">Login</p>
            {/* <span>
              Do not have an account?{" "}
              <Link to="/member/register" className="hotlink">
                Register
              </Link>
            </span> */}
            {error && (
              <p
                style={{
                  textAlign: "center",
                  margin: "12px 0",
                  backgroundColor: "#f0f0f0",
                  padding: "6px 0",
                  borderRadius: 4,
                }}
                className="text-danger"
              >
                {error}
              </p>
            )}
          </div>

          <form onSubmit={authenticate}>
            <div className="row">
              <div className="col-md-12">
                <TextInput
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="email"
                  placeholder="Enter Username here..."
                />
              </div>
              <div className="col-md-12 mb-3">
                <TextInput
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  placeholder="Enter Password here..."
                />
              </div>
              <div className="col-md-12 mb-3">
                <Button
                  label="Sign In"
                  variant="danger"
                  type="submit"
                  size="nm"
                  icon="log-in"
                  isDisabled={username === "" || password === ""}
                />
              </div>

              {/* <div className="col-md-12">
                <p>
                  Do not remember your password?{" "}
                  <Link to="/password/reset" className="hotlink">
                    Forgot Password
                  </Link>
                </p>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
