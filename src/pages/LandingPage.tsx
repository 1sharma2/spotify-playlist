import React from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {applyDrag} from "../helpers/AddQueryParams";
import SpotifyService from "../services/SpotifyService";
import {setPlaylist, setUserPlaylist} from "../redux/stores/playlist/PlaylistReducer";
import {Container, Draggable} from "react-smooth-dnd";
import {DraggableColumns} from "../interfaces/DraggableColumns";
import {DraggableItem} from "../interfaces/DraggableItem";
import {RootState} from "../redux/stores/playlist/PlaylistStore";
import DraggableCard from "../components/DraggableCard";
import TokenService from "../services/TokenService";

const Cookies = require('js-cookie');

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

    const {playlist} = useSelector((state: RootState) => state.playlistReducer)

    const dispatch: any = useDispatch();

    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        if (draggableData) {
            dispatch(setUserPlaylist(draggableData.children[1].children))
        }
    }, [draggableData])


    function getToken() {
        TokenService.getToken().then((response: any) => {
            if (response?.status === 200) {
                Cookies.set('access_token', response.data.access_token);
                getAllSpotifyPlaylist();
            }
        });
    }

    /**
     * fetches all spotify playlists and store them in PlaylistStore
     */
    function getAllSpotifyPlaylist(): void {
        const preSelectedPlaylist: Array<Object> = JSON.parse(localStorage.getItem('userPlaylist') as string);
        const prePlaylist: Array<Object> = JSON.parse(localStorage.getItem('playlist') as string);
        if (!preSelectedPlaylist || preSelectedPlaylist?.length == 0) {
            const params = {
                limit: 50,
                offset: 0,
                country: 'IN'
            }
            SpotifyService.getSpotifyPlaylist(params).then((response: any) => {
                setDraggableColumns(response?.data?.playlists?.items)
            });
        } else {
            const preselectedDraggableData = JSON.parse(localStorage.getItem('draggableData') as string)
            preselectedDraggableData.children[1].children = preSelectedPlaylist;
            preselectedDraggableData.children[0].children = prePlaylist;
            setDraggableData(preselectedDraggableData);
        }
    }

    /**
     * setter for draggable columns
     */
    function setDraggableColumns(data: Array<Object>) {
        let columnItem: DraggableColumns = {
            type: 'container',
            props: {
                "orientation": "horizontal"
            },
            children: setColumnData(data)
        };

        setDraggableData(columnItem);
        localStorage.setItem('draggableData', JSON.stringify(columnItem));
    }

    /**
     * setter for each column data
     */
    function setColumnData(data: Array<Object>): Array<DraggableItem> {
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
                children: setInitialColumnData(columnIndex, data)
            };
            columnData.push(item);
        })

        return columnData;
    }

    /**
     * @param columnIndex: takes columnIndex as input and set card data for that column
     */
    function setInitialColumnData(columnIndex: number, data: Array<Object>): Array<Object> {
        let items: Array<Object> = [];
        if (columnIndex < columnNames.length - 1) {
            data.map((playlist: any, playlistIndex: number) => {
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
                items.push(item)
            });
            dispatch(setPlaylist(items))
        }

        return items;
    }

    /**
     * @param columnId: draggable columnId
     * @param index: index of draggable column
     *
     * fetch data of column on the basis of parameters
     */
    function getCardPayload(columnId: any, index: any) {
        return draggableData?.children.filter(p => p.id === columnId)[0].children[index];
    }

    /**
     * @param dropResult: provides details of column rearrangement while drop
     * setter for dropped column
     */
    function onColumnDrop(dropResult: any) {
        const scene = Object.assign({}, draggableData);
        scene.children = applyDrag(scene.children, dropResult);
        setDraggableData(scene)
    }

    /**
     * @param columnId: columnId where card is dropped
     * @param dropResult: provides details about card dropped
     * setter for dropped card
     */
    function onCardDrop(columnId: any, dropResult: any) {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            const scene = Object.assign({}, draggableData);
            const column = scene.children.filter(p => p.id === columnId)[0];
            const columnIndex = scene.children.indexOf(column);

            const newColumn = Object.assign({}, column);
            newColumn.children = applyDrag(newColumn.children, dropResult);
            scene.children.splice(columnIndex, 1, newColumn);
            dispatch(setUserPlaylist(draggableData?.children[1].children))
            dispatch(setPlaylist(draggableData?.children[0].children))
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
                                                    <DraggableCard cardDetails={card}/>
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