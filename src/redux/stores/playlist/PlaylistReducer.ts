import { createSlice, PayloadAction } from '@reduxjs/toolkit'


/**
 *Define a type for the slice state
 */

interface PlaylistState {
    playlist: Array<Object>,
    userPlaylist: Array<Object>,
    error: string
}

/**
 *Define the initial state using that type
 */

const initialState: PlaylistState = {
    playlist: [],
    userPlaylist: [],
    error: ''
}

export const playlistReducer = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        setPlaylist: (state, action) => {
            state.playlist = action.payload
            localStorage.setItem('playlist', JSON.stringify(action.payload))
        },
        setUserPlaylist: (state, action) => {
            state.userPlaylist = action.payload
            localStorage.setItem('userPlaylist', JSON.stringify(action.payload))

        },
        errorHandler: (state, action) => {
            state.error = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setPlaylist, setUserPlaylist, errorHandler} = playlistReducer.actions

export default playlistReducer.reducer