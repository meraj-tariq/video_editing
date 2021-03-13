/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./Store";
import ThemeProvider from "./Theme";
import { GlobalStyles } from "./Styles";
import { Routes } from "./Routes";
import AuthHandler from "./Components/AuthHandler";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <GlobalStyles />
            <AuthHandler>
              <Routes />
            </AuthHandler>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
