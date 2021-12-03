import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import { GoogleLogin } from "react-google-login";

function Login() {
  const [email, setEmail] = useState("henry@gmail.com");
  const [password, setPassword] = useState("1234567890");
  const [loading, setLoading] = useState(false);

  // state
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  // router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      toast.success("Login successfully");
      setLoading(false);

      // save user in localstorage
      window.localStorage.setItem("user", JSON.stringify(data));

      // redirect
      router.push("/");
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  const responseGoogle = async (response) => {
    console.log(response);
    try {
      setLoading(true);
      const res = await axios.post("/api/google_login", {
        tokenId: response.tokenId,
      });

      dispatch({
        type: "LOGIN",
        payload: res.data,
      });

      toast.success("Login successfully");
      setLoading(false);

      window.localStorage.setItem("user", JSON.stringify(res.data));

      router.push("/");
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Login</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <button
            type="submit"
            className="btn btn-block btn-primary w-100"
            disabled={!email || !password || loading}
            // autofocus
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>

          <div className="social">
            <GoogleLogin
              clientId="1074929433721-7hqftlfff4ap48da2l4oo3vk1v2l9rtq.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            ,
          </div>

          <p className="text-center p-3">
            Already login?{" "}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>

          <p className="text-center">
            <Link href="/forgot-password">
              <a className="text-danger">Forgot password</a>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
