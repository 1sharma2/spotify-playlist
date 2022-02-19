import React from "react-router-dom";
import {Draggable} from "react-smooth-dnd";

interface DraggableCardProps {
    columnCards: Array<Object>
}

function DraggableCard({columnCards}: DraggableCardProps) {

    return (

        <>
            {columnCards.length > 0 ? columnCards.map((card: any) => {
                return (
                    <Draggable className="mt-2" key={card.id}>
                        <div  {...card.props}>
                            <div className="row">
                                <div className="col-lg-3">
                                    <img src={card.imageUrl} className="w-100 fixed-size "
                                         alt="playlist-logo"/>
                                </div>
                                <div className="col-lg-8">
                                    <p className="p-2">{card.data}</p>
                                </div>
                            </div>
                        </div>
                    </Draggable>
                );
            }) : <div className="p-5">
                <span className="p-5">No records</span>
            </div>}
        </>
    );
}

export default DraggableCard;