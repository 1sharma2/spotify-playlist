import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import playlistStore from "./redux/stores/playlist/PlaylistStore";
import {Provider} from 'react-redux'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={playlistStore}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

