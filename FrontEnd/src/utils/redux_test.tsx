import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";

import store from "../stores/store";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";

export function renderWithProviders(ui: React.ReactElement) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper }) };
}
