import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../paths";
import { message } from "antd";
import { UserServices } from "../../services/userServices";

const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState();
  const [coverimage, setCoverImage] = useState();
  const [user, setUser] = useState(() => {
    let User = localStorage.getItem("user");
    if (User) return JSON.parse(User);
    return null;
  });
  useEffect(() => {
    user && getDataUser();
    user && getCoverImageByUserId();
  }, [user]);
  const getDataUser = async () => {
    const data = await UserServices.getUserById(user.split(".")[1]);
    await setData(data.data);
  };
  const getCoverImageByUserId = async () => {
    const coverimage = await UserServices.getCoverImageByUserId(
      user.split(".")[1]
    );
    await setCoverImage(coverimage.data);
  };
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    if (Object.entries(data).length !== 2) {
      messageApi.error("Vui lòng nhập đầy đủ thông tin");
    } else {
      try {
        const res = await UserServices.login(data);
        const id = await res.data.data[0].id;
        await setData(res.data.data[0]);
        const hash =
          new Date().getFullYear() +
          "." +
          `${id}.77490928375442194.142344214211421`;
        localStorage.setItem("user", JSON.stringify(hash));
        localStorage.setItem("success", null);
        navigate(PATH.home);
        if (res.data.data[0].type === 1) {
          navigate(PATH.admin);
        } else {
          navigate(PATH.home);
        }
      } catch (error) {
        messageApi.error(error.response.data.message);
      }
    }
  };
  const handleLogout = () => {
    setData(null);
    localStorage.removeItem("user");
    navigate(PATH.home);
  };

  return (
    <AuthContext.Provider
      value={{
        data,
        handleLogout,
        handleLogin,
        contextHolder,
        getDataUser,
        coverimage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
