import React from "react";
import { useRoutes } from "react-router-dom";
import { PATH } from "../paths";
import Home from "../pages";
import Detail from "../pages/detail";
import MainLayout from "../layouts/mainLayout";
import AboutLayout from "../layouts/aboutLayout";
import About from "../pages/about";
import Service from "../pages/about/service";
import Job from "../pages/about/job";
import Contact from "../pages/contact";
import Coffee from "../pages/category/index";
import Login from "../pages/account/index";
import AccountLayout from "../layouts/accountLayout";
import Register from "../pages/account/register";
import Admin from "../pages/admin/index";
import Page404 from "../pages/404";
import AdminLayout from "../layouts/adminLayout";
import Account from "../pages/admin/account";
import Order from "../pages/admin/order";
import Category from "../pages/admin/category";
import AddProduct from "../pages/admin/addProduct";
import EditProduct from "../pages/admin/editProduct";
import User from "../pages/user/user";
import UserLayout from "../layouts/userLayout";
import Whistlist from "../pages/user/whistlist";
import BuyHistory from "../pages/user/buyhistory";
import CategoryLayout from "../layouts/categoryLayout";
import Preeze from "../pages/category/preeze";
import Different from "../pages/category/different";
import Tea from "../pages/category/tea";
import ChangePass from "../pages/user/changepass";
import OrderList from "../pages/order";
import ListOrderByUser from "../pages/listorder";
import AddCategory from "../pages/admin/addCategory";
import EditCategory from "../pages/admin/editCategory";

export default function Element() {
  const router = useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          element: <Home />,
          index: true,
        },
        {
          element: <Detail />,
          path: PATH.detail,
        },
        {
          element: <AboutLayout />,
          path: PATH.about,
          children: [
            {
              element: <About />,
              index: true,
            },
            {
              element: <Service />,
              path: PATH.service,
            },
            {
              element: <Job />,
              path: PATH.job,
            },
          ],
        },
        {
          element: <Contact />,
          path: PATH.contact,
        },
        {
          element: <CategoryLayout />,
          path: PATH.coffee,
          children: [
            {
              element: <Coffee />,
              index: true,
            },
            {
              element: <Preeze />,
              path: PATH.preeze,
            },
            {
              element: <Tea />,
              path: PATH.tea,
            },
            {
              element: <Different />,
              path: PATH.different,
            },
          ],
        },
        {
          element: <AccountLayout />,
          path: PATH.login,
          children: [
            {
              element: <Login />,
              index: true,
            },
            {
              element: <Register />,
              path: PATH.register,
            },
          ],
        },
        {
          element: <UserLayout />,
          path: PATH.user,
          children: [
            {
              element: <User />,
              index: true,
            },
            {
              element: <Whistlist />,
              path: PATH.whistlist,
            },
            {
              element: <BuyHistory />,
              path: PATH.buyhistory,
            },
            {
              element: <ChangePass />,
              path: PATH.changepass,
            },
          ],
        },
        {
          element: <OrderList />,
          path: PATH.payment,
        },
        {
          element: <ListOrderByUser />,
          path: PATH.listorder,
        },
        {
          element: <Page404 />,
          path: "*",
        },
      ],
    },
    {
      element: <AdminLayout />,
      path: PATH.admin,
      children: [
        {
          element: <Admin />,
          index: true,
        },
        {
          element: <Account />,
          path: PATH.account,
        },
        {
          element: <Order />,
          path: PATH.order,
        },
        {
          element: <Category />,
          path: PATH.category,
        },
        {
          element: <AddProduct />,
          path: PATH.addproduct,
        },
        {
          element: <EditProduct />,
          path: PATH.editproduct,
        },
        {
          element: <AddCategory />,
          path: PATH.addcategory,
        },
        {
          element: <EditCategory />,
          path: PATH.editcategory,
        },
      ],
    },
  ]);
  return router;
}
