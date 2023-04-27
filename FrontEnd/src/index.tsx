import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "../src/stores/store";
import { persistStore } from "redux-persist";
import App from "./pages/App";
import Test1 from "./pages/test/Test1";
import Test2 from "./pages/test/Test2";
import Test3 from "./pages/test/Test3";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CardSubmit from "./pages/CardSubmit";
import Oauth from "./pages/Oauth";
const container = document.getElementById("root") as HTMLElement;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/oauth2/token",
    element: <Oauth />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/cardsubmit",
    element: <CardSubmit />,
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
]);
createRoot(container).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
