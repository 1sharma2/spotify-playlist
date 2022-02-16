import React from "react-router-dom";

function DraggableCard(cardDetails: any) {

    return (
        <div className="row">
            <div className="col-lg-3">
                <img src={cardDetails.cardDetails.imageUrl} className="w-100 fixed-size " alt="playlist-logo"/>
            </div>
            <div className="col-lg-8">
                <p className="p-2">{cardDetails.cardDetails.data}</p>
            </div>
        </div>
    );
}

export default DraggableCard;