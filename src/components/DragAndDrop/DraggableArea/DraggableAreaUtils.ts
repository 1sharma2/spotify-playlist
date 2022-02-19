import {DraggableColumns} from "../../../interfaces/DraggableColumns";
import {DraggableItem} from "../../../interfaces/DraggableItem";

export const applyDrag = (arr: any, dragResult: any) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
};

/**
 * @param columnId: draggable columnId
 * @param index: index of draggable column
 * @param draggableData: draggable data of columns
 *
 * fetch data of column on the basis of parameters
 */
export function getCardPayload(columnId: any, index: any, draggableData: any) {
    return draggableData?.children.filter((p: any) => p.id === columnId)[0].children[index];
}

/**
 * @param columnId: columnId where card is dropped
 * @param dropResult: provides details about card dropped
 * @param draggableData: draggable data of columns
 * setter for dropped card
 */
export const onCardDrop = (columnId: any, dropResult: any, draggableData: any) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = {...draggableData};
        const copyChildren = [...scene.children]
        const column = copyChildren.filter((p: any) => p.id === columnId)[0];
        const columnIndex = copyChildren.indexOf(column);
        const newColumn = {...column};
        newColumn.children = applyDrag(newColumn.children, dropResult);
        copyChildren.splice(columnIndex, 1, newColumn);
        scene.children = copyChildren;
        return scene;
    }
}

/**
 * setter for draggable columns
 */
export function setDraggableColumns(data: Array<Object>, columnNames: Array<string>) {
    let columnItems: DraggableColumns = {
        type: 'container',
        props: {
            "orientation": "horizontal"
        },
        children: setColumnData(data, columnNames)
    };
    return columnItems
}

/**
 * setter for each column data
 */
export function setColumnData(data: Array<Object>, columnNames: Array<string>): Array<DraggableItem> {
    let columnData: Array<DraggableItem> = [];

    columnNames.map((columnName: string, columnIndex: number, columnNames: Array<string>) => {
        const item: DraggableItem = {
            id: `column${columnIndex}`,
            type: "container",
            name: columnNames[columnIndex],
            props: {
                orientation: "vertical",
                className: "card-container"
            },
            children: setInitialColumnData(columnIndex, data, columnNames)
        };
        columnData.push(item);
    })
    console.log(columnData, 'cccccc')
    return columnData;
}

/**
 * @param columnIndex: takes columnIndex as input and set card data for that column
 */
export function setInitialColumnData(columnIndex: number, data: Array<Object>, columnNames: Array<string>): Array<Object> {
    let items: Array<Object> = [];
    if (columnIndex === 0) {
        data.map((playlist: any, playlistIndex: number) => {
            const item: Object = {
                name: playlist.name,
                data: playlist.description,
                type: "draggable",
                id: `${columnIndex}${playlistIndex}`,
                props: {
                    className: "card",
                    style: {backgroundColor: '#ffffff'}
                },
                imageUrl: playlist?.images[0]?.url
            }
            items.push(item)
        });
    }

    return items;
}