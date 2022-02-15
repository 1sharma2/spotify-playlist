import React from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect} from "react";
import TokenService from "./services/TokenService";
import LandingPage from "./pages/LandingPage";
const Cookies = require('js-cookie');

function App() {

    useEffect(() => {
        getToken();
    }, []);

    function getToken() {
        TokenService.getToken().then((response: any) => {
          if (response?.status === 200) {
              Cookies.set('access_token', response.data.access_token);
          }
        });
    }

    return (
        <div className="container-fluid">
            <LandingPage/>
        </div>
    );
}

export default App;