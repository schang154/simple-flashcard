import React from "react";
import { Router } from "@reach/router";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";


const App = () => {

  return (
      <Layout pageTitle={"Flashcard App"}>
        <Router basepath="/app"> 
          <PrivateRoute component={Home} path="/"  />
          <Login path="/login" />
        </Router>  
      </Layout>
  );
};

export default App;
