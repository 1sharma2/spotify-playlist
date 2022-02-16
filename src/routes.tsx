import React from "react";
import {Routes, Route} from "react-router-dom";
import ErrorHandler from "./pages/ErrorHandler";
import LandingPage from "./pages/LandingPage";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='' element={<LandingPage/>}>
            </Route>
            <Route path='/error' element={<ErrorHandler/>}>
            </Route>
        </Routes>
    )
};