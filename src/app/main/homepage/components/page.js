import React from "react";
import CardList from "./cardlist";

export default function App() {
  return (
    <main>
    <h1 style={{textAlign: "center", marginTop: "20px"}}>
        Image Card Gallery
    </h1>

      <CardList />;
    </main>
  );
}
