import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";

import { Provider } from "react-redux";

import store from "../stores/store";

export function renderWithProviders(ui: React.ReactElement) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper }) };
}
