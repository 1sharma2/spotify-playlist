import {DraggableItem} from "./DraggableItem";
export interface DraggableColumns {
    type: string,
    props: object,
    children: Array<DraggableItem>
}