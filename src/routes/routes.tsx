import React from "react";
import {Routes, Route} from "react-router-dom";
import ErrorHandler from "../pages/ErrorHandler/ErrorHandler";
import Playlist from "../pages/Playlist/Playlist";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='' element={<Playlist/>}>
            </Route>
            <Route path='/error' element={<ErrorHandler/>}>
            </Route>
        </Routes>
    )
};