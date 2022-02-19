import React from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/stores/playlist/PlaylistStore";
import {useNavigate} from 'react-router-dom';

function ErrorHandler() {
    const {error} = useSelector((state: RootState) => state.playlistReducer)
    const navigate = useNavigate();
    return (
        <div className="min-vh-100 d-flex align-items-center flex-column">
            <div className="row">
                <div className="col-lg-12 d-flex justify-content-center">
                    <span>{error}</span>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-lg-12 d-flex justify-content-center">
                    <button onClick={() => {
                        navigate(-1)
                    }} className="btn btn-info">Try Again
                    </button>
                </div>
            </div>

        </div>
    );
}

export default ErrorHandler;