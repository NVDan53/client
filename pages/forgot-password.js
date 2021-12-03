import React, { useContext, useState, useEffect } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { SyncOutlined } from "@ant-design/icons";

function forgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Context
  const {
    state: { user },
  } = useContext(Context);

  // Router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast("Check your email from the secret code");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      toast("Reset password successful");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast(error.response.data);
    }
  };

  return (
    <>
      <h1 className="jumbotron text-center square bg-primary">
        Forgot password
      </h1>

      <div className="container col-md-4 offset-md-4 pd-5">
        <form
          className="text-center"
          onSubmit={success ? handleResetPassword : handleSubmit}
        >
          <input
            className="form-control mb-4 p-4"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Enter your email"}
            defaultValue={success && email}
            required
          />
          {success && (
            <>
              <input
                className="form-control mb-4 p-4"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={"Enter your code"}
                required
              />

              <input
                className="form-control mb-4 p-4"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={"Enter your password"}
                required
              />
            </>
          )}

          <br />
          <button
            type="submit"
            disabled={loading || !email}
            className="btn btn-primary btn-block p-2"
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}

export default forgotPassword;
