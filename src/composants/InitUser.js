import React, { useState } from "react";
import "../App.css";
import Task from "./Task";
import "./InitUser.css";

const InitUser = props => {
  const [userName, setUserName] = useState(props.user ? props.user.userName : "");
  const [colorFront, setColorFront] = useState(props.user ? props.user.frontColor : "black");
  const [colorBack, setColorBack] = useState(props.user ? props.user.backColor : "grey");

  const userSave = event => {
    event.preventDefault();
    if (props.readonly) {
      props.callback(colorFront, colorBack);
    } else {
      props.callback(userName, colorFront, colorBack);
    }
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
    <div className="popup">
      <div className="popup_inner">
        <div className="app">
          <form onSubmit={userSave}>
            {!props.readonly && <h1>Bonjour, saisissez votre nom et choisissez des couleurs pour vos tâches</h1>}
            {props.readonly && <input className="input-task" name="userName" type="text" value={userName} readOnly />}
            {!props.readonly && (
              <input
                className="input-task"
                name="userName"
                type="text"
                placeholder="Prénom"
                onChange={userNameChange}
                value={userName}
              />
            )}
            <h2>Couleur du texte</h2>
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
            <h2>Couleur du fond</h2>
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
            <div className="inline-buttons">
              {userName === "" || colorFront === colorBack ? (
                <button className="button-add disabled" disabled>
                  Valider
                </button>
              ) : (
                <button className="button-add" type="submit">
                  Valider
                </button>
              )}
              {props.readonly && (
                <button className="button-cancel" onClick={props.closePopup}>
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InitUser;
