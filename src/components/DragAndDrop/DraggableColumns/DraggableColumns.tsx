import React from "react-router-dom";
import {Container, Draggable} from "react-smooth-dnd";
import DraggableCard from "../DraggableCard/DraggableCard";
import {DraggableColumns} from "../../../interfaces/DraggableColumns";
import {getCardPayload, onCardDrop} from "../DraggableArea/DraggableAreaUtils";
import {useDispatch} from "react-redux";
import {setDraggablePlaylistData} from "../../../redux/stores/playlist/PlaylistReducer";

interface DraggableColumnProps {
    spotifyAndUserPlaylistData: DraggableColumns
}

function DraggableColumn({spotifyAndUserPlaylistData}: DraggableColumnProps) {

    const dispatch: any = useDispatch();

    function setDraggableDataOnDrop(columnId: number, e: any, spotifyAndUserPlaylistData: DraggableColumns) {
        let newSpotifyAndUserPlaylistData = onCardDrop(columnId, e, spotifyAndUserPlaylistData);
        dispatch(setDraggablePlaylistData(newSpotifyAndUserPlaylistData))
    }

    return (
        <>
            {
                spotifyAndUserPlaylistData?.children.map((column: any) => {
                    return (
                        <Draggable key={column.id}>
                            <div className={column.props.className + ' p-3 pt-5'}>
                                <div className="card-column-header ">
                                    <span>{column.name}</span>
                                </div>
                                <Container
                                    {...column.props}
                                    groupName="col"
                                    onDrop={e => setDraggableDataOnDrop(column.id, e, spotifyAndUserPlaylistData)}
                                    getChildPayload={index =>
                                        getCardPayload(column.id, index, spotifyAndUserPlaylistData)
                                    }
                                    dragClass="card-ghost"
                                    dropClass="card-ghost-drop"
                                    dropPlaceholder={{
                                        animationDuration: 150,
                                        showOnTop: true,
                                        className: 'drop-preview'
                                    }}
                                    dropPlaceholderAnimationDuration={200}
                                >
                                    <DraggableCard columnCards={column.children}/>
                                </Container>
                            </div>
                        </Draggable>
                    );
                })
            }
        </>

    );
}

export default DraggableColumn;