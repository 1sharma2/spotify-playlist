import { configureStore } from '@reduxjs/toolkit'
import {playlistReducer} from "./PlaylistReducer";
import {combineReducers} from 'redux'

const playlistStore = configureStore({
    reducer: {
        playlistReducer: playlistReducer.reducer
    },
})
export type RootState = ReturnType<typeof playlistStore.getState>

export default playlistStore