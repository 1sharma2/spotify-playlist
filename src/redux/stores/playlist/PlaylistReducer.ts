import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {DraggableColumns} from "../../../interfaces/DraggableColumns";
import {DraggableItem} from "../../../interfaces/DraggableItem";


/**
 *Define a type for the slice state
 */

interface PlaylistState {
    spotifyAndUserPlaylistData: DraggableColumns,
    error: string
}

/**
 *Define the initial state using that type
 */

const initialState: PlaylistState = {
    spotifyAndUserPlaylistData: {
        type: '',
        props: {},
        children: []
    },
    error: ''
}

export const playlistReducer = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setDraggablePlaylistData: (state, action) => {
            if (action.payload) {
                state.spotifyAndUserPlaylistData = action.payload
                localStorage.setItem('spotifyAndUserPlaylistData', JSON.stringify(action.payload))
            }
        },
        errorHandler: (state, action) => {
            state.error = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {setDraggablePlaylistData, errorHandler} = playlistReducer.actions

export default playlistReducer.reducer