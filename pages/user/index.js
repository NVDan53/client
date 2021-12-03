import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";

const User = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">
        <pre>{JSON.stringify(user, null, 4)}</pre>
      </h1>
    </UserRoute>
  );
};

export default User;
