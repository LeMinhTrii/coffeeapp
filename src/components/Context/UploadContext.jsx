import { createContext, useContext, useEffect, useRef, useState } from "react";
import { UserServices } from "../../services/userServices";
import { PATH } from "../../paths";
import { message } from "antd";
import { useAuth } from "./AuthContext";

const UploadContext = createContext();
export const UploadContextProvider = ({ children }) => {
  const [image, setImage] = useState({});
  const [file, setFile] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const { getDataUser } = useAuth();
  const handleUpdateAvatar = async (data) => {
    try {
      await UserServices.updateAvatarById(data && data.id, file);
      message.success("Cập Nhật Ảnh Đại Diện Thành Công");
      getDataUser();
      handleClose();
    } catch (error) {
      messageApi.error("Cập Nhật Ảnh Không Thành Công");
    }
  };
  const handleUpdateCoverImage = async (data) => {
    await UserServices.updateCoverImage(data && data.id, file);
    message.success("Cập Nhật Ảnh Bìa Thành Công");
    getDataUser();
    closebgrCover();
  };
  const handleFile = (ev) => {
    const file = ev.target.files[0];
    setFile({ file: file });
    const reader = new FileReader();
    reader.readAsDataURL(file);
    if (file) {
      reader.onload = () => {
        setImage({ ...image, avatar: reader.result });
      };
    } else {
      setImage({ ...image, avatar: "" });
    }
  };
  const handleClose = () => {
    document.querySelector(".popupchangeavatar").classList.remove("active");
  };
  const closebgrCover = () => {
    document.querySelector(".popupcoverbackground").classList.remove("active");
  };
  const openbgrCover = () => {
    document.querySelector(".popupcoverbackground").classList.add("active");
  };
  const openPopup = () => {
    document.querySelector(".popupchangeavatar").classList.add("active");
  };
  return (
    <UploadContext.Provider
      value={{
        image,
        handleUpdateAvatar,
        handleFile,
        handleClose,
        openPopup,
        contextHolder,
        closebgrCover,
        openbgrCover,
        handleUpdateCoverImage,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);
