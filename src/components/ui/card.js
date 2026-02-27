import React from "react";
import "./card.css";

export default function ImageCard ({ image, title, description, onClick}){
    return(
        <div className="image-card" onClick={onClick}>
            <div className="image-wrapper">
                <img src ={image} alt={title} />
            </div>

            <div className="card-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <button className="card-btn">View More</button>
            </div>
        </div>
    )
}