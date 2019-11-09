import React, { useState } from "react";
import "../App.css";
import Task from "./Task";
import "./InitUser.css";

const InitUser = props => {
  const [userName, setUserName] = useState("");
  const [colorFront, setColorFront] = useState("black");
  const [colorBack, setColorBack] = useState("grey");

  const userSave = event => {
    event.preventDefault();
    props.callback(userName, colorFront, colorBack);
  };

  const userNameChange = event => {
    setUserName(event.target.value);
  };

  const changeColorFront = event => {
    setColorFront(event.target.value);
  };

  const changeColorBack = event => {
    setColorBack(event.target.value);
  };

  return (
    <div className="app">
      <form onSubmit={userSave}>
        <h1>Bonjour, saisissez votre nom et choisissez des couleurs pour vos tâches</h1>
        <input
          className="input-task"
          name="userName"
          type="text"
          placeholder="Prénom"
          onChange={userNameChange}
          value={userName}
        />
        <h2>Choisissez la couleur du texte</h2>
        <select
          style={{ color: colorFront !== "white" ? colorFront : "black" }}
          onChange={changeColorFront}
          value={colorFront}
        >
          <option value="black" style={{ color: "black" }}>
            Noir
          </option>
          <option value="white" style={{ color: "black" }}>
            Blanc
          </option>
          <option value="grey" style={{ color: "grey" }}>
            Gris
          </option>
          <option value="aqua" style={{ color: "aqua" }}>
            Cyan
          </option>
          <option value="red" style={{ color: "red" }}>
            Rouge
          </option>
          <option value="orange" style={{ color: "orange" }}>
            Orange
          </option>
          <option value="green" style={{ color: "green" }}>
            Vert
          </option>
          <option value="blue" style={{ color: "blue" }}>
            Bleu
          </option>
          <option value="fuchsia" style={{ color: "fuchsia" }}>
            Fuchsia
          </option>
          <option value="gold" style={{ color: "gold" }}>
            Or
          </option>
          <option value="indigo" style={{ color: "indigo" }}>
            Indigo
          </option>
          <option value="maroon" style={{ color: "maroon" }}>
            Maroon
          </option>
        </select>
        <h2>Choisissez la couleur du fond</h2>
        <select
          style={{ color: colorBack !== "white" ? colorBack : "black" }}
          onChange={changeColorBack}
          value={colorBack}
        >
          <option value="black" style={{ color: "black" }}>
            Noir
          </option>
          <option value="white" style={{ color: "black" }}>
            Blanc
          </option>
          <option value="grey" style={{ color: "grey" }}>
            Gris
          </option>
          <option value="aqua" style={{ color: "aqua" }}>
            Cyan
          </option>
          <option value="red" style={{ color: "red" }}>
            Rouge
          </option>
          <option value="orange" style={{ color: "orange" }}>
            Orange
          </option>
          <option value="green" style={{ color: "green" }}>
            Vert
          </option>
          <option value="blue" style={{ color: "blue" }}>
            Bleu
          </option>
          <option value="fuchsia" style={{ color: "fuchsia" }}>
            Fuchsia
          </option>
          <option value="gold" style={{ color: "gold" }}>
            Or
          </option>
          <option value="indigo" style={{ color: "indigo" }}>
            Indigo
          </option>
          <option value="maroon" style={{ color: "maroon" }}>
            Maroon
          </option>
        </select>
        <div className="example">
          <Task
            key="0"
            name="Exemple"
            done={null}
            onDelete={null}
            onToggle={null}
            colorFront={colorFront}
            colorBack={colorBack}
          />
        </div>
        <button className={userName === "" ? "button-add disabled" : "button-add"} type="submit">
          Valider
        </button>
      </form>
    </div>
  );
};

export default InitUser;
