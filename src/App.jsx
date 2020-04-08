import React, { useRef } from "react";
import "./App.css";
import { Viewer } from "./Viewer";

function App() {
  const apiRef = useRef(null);

  const changeBackgroundColor = () => {
    apiRef.current.setBackground({
      color: [Math.random(), Math.random(), Math.random(), 1]
    });
  };

  const changeChairColor = () => {
    apiRef.current.getMaterialList((err, materials) => {
      const plasticMaterial = materials.find(
        material => material.name === "Blue plastic"
      );
      plasticMaterial.channels.AlbedoPBR.color = [
        Math.random(),
        Math.random(),
        Math.random()
      ];
      apiRef.current.setMaterial(plasticMaterial, () => {
        console.log("Updated chair color");
      });
    });
  };

  return (
    <div className="App">
      <button onClick={changeBackgroundColor}>Change background color</button>
      <button onClick={changeChairColor}>Change chair color</button>
      <Viewer apiRef={apiRef} />
    </div>
  );
}

export default App;
