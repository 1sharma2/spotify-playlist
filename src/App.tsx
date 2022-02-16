import React from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {AppRoutes} from "./routes";


function App() {

    return (
        <div className="container-fluid">
            <AppRoutes/>
        </div>
    );
}

export default App;