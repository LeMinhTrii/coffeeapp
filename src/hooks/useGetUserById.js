import { useEffect, useState } from "react";
import { UserServices } from "../services/userServices";

export const useGetUserById = (id) => {
  const [data, setData] = useState();
  useEffect(() => {
    (async () => {
      const user = await UserServices.getUserById(id);
      await setData(user.data);
    })();
  }, []);
  return { data };
};
