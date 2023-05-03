import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import Test1 from "./pages/test/Test1";
import Test2 from "./pages/test/Test2";
import Test3 from "./pages/test/Test3";
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
const container = document.getElementById("root") as HTMLElement;
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    // 로그인시만 이용가능
    element: <AuthLayout />,
    children: [
      {
        path: "/cardsubmit/:type",
        element: <CardSubmit />,
      },
      { path: "/admin", element: <Admin /> },
      { path: "/mypage", element: <Mypage /> },
    ],
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
  },
  { path: "*", element: <Notfound /> },
  // 테스트 페이지
  {
    path: "/test1",
    element: <Test1 />,
  },
  {
    path: "/test2",
    element: <Test2 />,
  },
  {
    path: "/test3",
    element: <Test3 />,
  },
]);
createRoot(container).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistStore(store)}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
