import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import Test1 from "./pages/test/Test1";
import Test2 from "./pages/test/Test2";
import Test3 from "./pages/test/Test3";

import Login from "./pages/Login";
const container = document.getElementById("root") as HTMLElement;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
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
  {
    path: "/login",
    element: <Login />,
  },
]);
createRoot(container).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
