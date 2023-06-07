import { Button } from "antd";
import React, { useEffect, useState } from "react";
import AccountItem, {
  SkeletonAccountItem,
} from "../../components/Account/accountItem";
import { UserServices } from "../../services/userServices";
export default function Account() {
  const [user, setUser] = useState();
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const user = await UserServices.getUser();
    await setUser(user.data);
  };
  console.log(user);
  return (
    <>
      <div className="manager_content-box" style={{ paddingBottom: "50px" }}>
        <div className="textbox">
          <div className="heading">Account</div>

          <Button type="primary" className="btnadd">
            Thêm Tài Khoản
          </Button>
        </div>
        <div className="productlist_account">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th style={{ width: "10%" }}>Họ Tên</th>
                <th>Số Điện Thoại</th>
                <th>Email</th>
                <th>Mật Khẩu</th>
                <th>Loại Tài Khoản</th>
                <th>Hình Đại Diện</th>
                <th>Chức Năng</th>
              </tr>
            </thead>
            <tbody>
              {user
                ? user.map((e) => <AccountItem key={e.id} {...e} />)
                : Array.from(Array(6)).map((_, i) => (
                    <SkeletonAccountItem key={i} />
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
