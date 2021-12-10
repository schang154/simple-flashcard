// Step 1: Import React
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
import Home from "../components/Home/Home";
import Layout from "../components/Layout/Layout";



// Step 2: Define your component
const IndexPage = () => {
  const store = createStore(reducers, compose(applyMiddleware(thunk)));

  return (
    <Provider store={store}>
        <Layout pageTitle={"Flash Card"}>
          <Home />
        </Layout>
    </Provider>

  );
};

// Step 3: Export your component
export default IndexPage;
