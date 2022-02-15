import React from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {applyDrag} from "../helpers/AddQueryParams";
import SpotifyService from "../services/SpotifyService";
import {setPlaylist} from "../redux/stores/playlist/PlaylistReducer";
import {Container, Draggable} from "react-smooth-dnd";
import {DraggableColumns} from "../interfaces/DraggableColumns";
import {DraggableItem} from "../interfaces/DraggableItem";
import {RootState} from "../redux/stores/playlist/PlaylistStore";


function LandingPage() {

    const columnNames = ["Spotify Playlists", "My Playlists"];

    const cardColors = [
        "azure",
        "beige",
        "bisque",
        "blanchedalmond",
        "burlywood",
        "cornsilk",
        "gainsboro",
        "ghostwhite",
        "ivory",
        "khaki"
    ];

    const pickColor = () => {
        let rand = Math.floor(Math.random() * 10);
        return cardColors[rand];
    };

    const [draggableData, setDraggableData] = useState<DraggableColumns>()

    const { playlist, userPlaylist } = useSelector((state: RootState) => state.playlistReducer)

    const dispatch: any = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            getAllSpotifyPlaylist();
        }, 3000)
    }, []);

    useEffect(() => {
        if (playlist) {
            setDraggableColumns()
        }
    }, [playlist])

    function getAllSpotifyPlaylist(): void {
        const params = {
            limit: 50,
            offset: 0,
            country: 'IN'
        }
        SpotifyService.getSpotifyPlaylist(params).then((response: any) => {
            dispatch(setPlaylist(response?.data?.playlists?.items))
        });
    }

    function setDraggableColumns() {
        let columnItem: DraggableColumns = {
            type: 'container',
            props: {
                "orientation": "horizontal"
            },
            children: setColumnData()
        };

        setDraggableData(columnItem);
    }

    function setColumnData(): Array<DraggableItem> {
        let columnData: Array<DraggableItem> = [];

        columnNames.map((columnName: string, columnIndex: number) => {
            const item: DraggableItem = {
                id: `column${columnIndex}`,
                type: "container",
                name: columnNames[columnIndex],
                props: {
                    orientation: "vertical",
                    className: "card-container"
                },
                children: setInitialColumnData(columnIndex)
            };
            columnData.push(item);
        })

        return columnData;
    }

    function setInitialColumnData(columnIndex: number): Array<Object> {
        const items: Array<Object> = [];
        const mappingArray: Array<Object> = columnIndex < columnNames.length - 1 ? playlist : userPlaylist
            playlist.map((playlist: any, playlistIndex: number) => {
                const item: Object = {
                    name: playlist.name,
                    data: playlist.description,
                    type: "draggable",
                    id: `${columnIndex}${playlistIndex}`,
                    props: {
                        className: "card",
                        style: {backgroundColor: pickColor()}
                    },
                    imageUrl: playlist?.images[0]?.url
                }
                items.push(item);
            })
        return items;
    }

    function getCardPayload(columnId: any, index: any) {
        return draggableData?.children.filter(p => p.id === columnId)[0].children[index];
    }

    function onColumnDrop(dropResult: any) {
        const scene = Object.assign({}, draggableData);
        scene.children = applyDrag(scene.children, dropResult);
        setDraggableData(scene)
    }

    function onCardDrop(columnId: any, dropResult: any) {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            const scene = Object.assign({}, draggableData);
            const column = scene.children.filter(p => p.id === columnId)[0];
            const columnIndex = scene.children.indexOf(column);

            const newColumn = Object.assign({}, column);
            newColumn.children = applyDrag(newColumn.children, dropResult);
            scene.children.splice(columnIndex, 1, newColumn);
            setDraggableData(scene)
        }
    }

    return (
        <div className="card-scene">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'cards-drop-preview'
                }}
            >
                {draggableData?.children.map((column: any) => {
                    return (
                        <Draggable key={column.id}>
                            <div className={column.props.className + ' p-3 pt-5 w-100'}>
                                <div className="card-column-header ">
                                    <span className="column-drag-handle">&#x2630;</span>
                                    <span>{column.name}</span>
                                </div>
                                <Container
                                    {...column.props}
                                    groupName="col"
                                    onDrop={e => onCardDrop(column.id, e)}
                                    getChildPayload={index =>
                                        getCardPayload(column.id, index)
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
                                    {column.children.map((card: any) => {
                                        return (
                                            <Draggable className="mt-2" key={card.id}>
                                                <div  {...card.props}>
                                                    <div className="row">
                                                        <div className="col-lg-3">
                                                            <img src={card.imageUrl} className="w-100 fixed-size " alt="playlist-logo"/>
                                                        </div>
                                                        <div className="col-lg-8">
                                                            <p className="p-2">{card.data}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Draggable>
                                        );
                                    })}
                                </Container>
                            </div>
                        </Draggable>
                    );
                })}
            </Container>
        </div>
    );
}


export default LandingPage;