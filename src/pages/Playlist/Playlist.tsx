import React from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import SpotifyService from "../../services/SpotifyService";
import {errorHandler, setDraggablePlaylistData} from "../../redux/stores/playlist/PlaylistReducer";
import {RootState} from "../../redux/stores/playlist/PlaylistStore";
import TokenService from "../../services/TokenService";
import {useNavigate} from 'react-router-dom'
import DraggableArea from "../../components/DragAndDrop/DraggableArea/DraggableArea";
import {setDraggableColumns} from "../../components/DragAndDrop/DraggableArea/DraggableAreaUtils";

const Cookies = require('js-cookie');

function Playlist() {

    /**
     * columnNames: refers to number of columns we need for  drag and drop functionality
     */
    const columnNames = ["Spotify Playlists", "My Playlists"];

    const {spotifyAndUserPlaylistData} = useSelector((state: RootState) => state.playlistReducer)

    const dispatch: any = useDispatch();

    const navigate = useNavigate();

    /**
     * draggableAreaAttributes: refers to options available for dragging area
     *
     * These options are available in react-smooth-dnd npm package
     */
    const draggableAreaAttributes = {
        orientation: "horizontal",
        dragHandleSelector: ".column-drag-handle",
    }

    useEffect(() => {
        getToken();
    }, []);

    /**
     * fetches token
     */
    function getToken() {
        TokenService.getToken().then((response: any) => {
            if (response?.status === 200) {
                Cookies.set('access_token', response.data.access_token);
                getAllSpotifyPlaylist();
            }
        }).catch((err: any) => {
            dispatch(errorHandler(`Unable to fetch token with status ${err?.response?.status}`))
            navigate('/error')
        });
    }

    /**
     * fetches all spotify playlists and store them in PlaylistStore
     */
    function getAllSpotifyPlaylist(): void {
        const preSelectedPlaylist = JSON.parse(localStorage.getItem('spotifyAndUserPlaylistData') as string);
        if (!preSelectedPlaylist) {
            const params = {
                limit: 50,
                offset: 0,
                country: 'IN'
            }
            SpotifyService.getSpotifyPlaylist(params).then((response: any) => {
                const draggableFormattedData = setDraggableColumns(response?.data?.playlists?.items, columnNames)
                dispatch(setDraggablePlaylistData(draggableFormattedData))
            }).catch((err: any) => {
                dispatch(errorHandler(`Unable to fetch playlist with status ${err.response.status}`))
                navigate('/error')
            });
        } else {
            dispatch(setDraggablePlaylistData(preSelectedPlaylist));
        }
    }

    return (
        <div className="card-scene">
            <DraggableArea draggableAreaAttributes={draggableAreaAttributes}
                           showDraggableColumns={true}
                           spotifyAndUserPlaylistData={spotifyAndUserPlaylistData}/>
        </div>
    );
}

export default Playlist;