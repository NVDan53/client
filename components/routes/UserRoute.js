import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";

const UserRoute = ({ children }) => {
  //  state
  const [ok, setOk] = useState(false);

  //   router
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios("api/current-user");
      //   console.log(data);
      if (data.ok) setOk(true);
    } catch (error) {
      console.log("ERROR:", error);
      setOk(false);
      router.push("/login");
    }
  };

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default UserRoute;
