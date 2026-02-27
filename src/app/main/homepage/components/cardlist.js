import React from "react";
import ImageCard from "../../../../components/ui/card";

export default function CardList(){
    return(
        <div style={containerStyle}>
            <ImageCard
            image = "https://picsum.photos/400/300?1"
            title = "Mountain View"
            description = "A beautiful mountain landscape."
            />

            <ImageCard
            image = "https://picsum.photos/400/300?1"
            title = "Ocean Breeze"
            description = "Relaxing Ocean Scenery."
            />

            <ImageCard
            image = "https://picsum.photos/400/300?1"
            title = "City Lights"
            description = "Night view of the city skyline."
            />
        </div>
    );

}

const containerStyle = {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "40px",
};