import React from "react-router-dom";
import {Container} from "react-smooth-dnd";
import {DraggableColumns} from "../../../interfaces/DraggableColumns";
import DraggableColumn from "../DraggableColumns/DraggableColumns";

interface Props {
    draggableAreaAttributes: any,
    showDraggableColumns: boolean
    spotifyAndUserPlaylistData: DraggableColumns
}

function DraggableArea({draggableAreaAttributes, showDraggableColumns, spotifyAndUserPlaylistData}: Props) {

    return (
        <Container
            {...draggableAreaAttributes}
        >
            {
                showDraggableColumns ?
                    <DraggableColumn spotifyAndUserPlaylistData={spotifyAndUserPlaylistData}/>
                    : ''
            }
        </Container>
    );
}

export default DraggableArea;