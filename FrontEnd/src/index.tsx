import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./stores/store";
import { persistStore } from "redux-persist";

import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import CardSubmit from "./pages/Card/CardSubmit";
import Oauth from "./pages/User/Oauth";
import Find from "./pages/User/Find";
import Admin from "./pages/Admin";
import Mypage from "./pages/User/Mypage";
import { QueryClientProvider, QueryClient } from "react-query";
import AuthLayout from "./components/Layout/AuthLayout";
import NoneAuthLayout from "./components/Layout/NoneAuthLayout";
import Notfound from "./pages/Error/Notfound";
import AdminLayout from "./components/Layout/AdminLayout";
import Universe from "./pages/Universe/Universe";
import Metaverse from "./pages/Metaverse/Metaverse";
import MainPage from "./pages/MainPage";
import Certify from "./pages/User/Mypage/Certify";
import Statistics from "./pages/Statistics/Statistics";
import Mycard from "./pages/User/Mypage/Mycard";
const container = document.getElementById("root") as HTMLElement;
const queryClient = new QueryClient();
declare global {
  interface Window {
    Kakao: any;
  }
  const Kakao: any;
}
const router = createBrowserRouter([
  {
    // 로그인시만 이용가능
    element: <AuthLayout />,
    children: [
      {
        path: "/cardsubmit/:type",
        element: <CardSubmit />,
      },
      { path: "/mypage", element: <Mypage /> },
      { path: "/certify", element: <Certify /> },
      { path: "/mycard", element: <Mycard /> },
    ],
  },
  {
    //관리자페이지
    element: <AdminLayout />,
    children: [{ path: "/ssafystaradmin", element: <Admin /> }],
  },
  {
    // 비로그인시만 이용가능
    element: <NoneAuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/oauth2/token",
        element: <Oauth />,
      },
      {
        path: "/idpwfind",
        element: <Find />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "universe",
        element: <Universe />,
      },
      {
        path: "metaverse",
        element: <Metaverse />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
    ],
  },
  { path: "*", element: <Notfound /> },
]);
createRoot(container).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </QueryClientProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
