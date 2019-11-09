import React from "react";
import "./Task.css";

// Composant représentant une ligne "tache" contenant le bouton pour la supprimer et son texte
const Task = props => {
  return (
    <div className="task">
      <div className="button-delete" onClick={props.onDelete}>
        X
      </div>
      <h2
        className={props.done ? "done" : ""}
        onClick={props.onToggle}
        style={{ color: props.colorFront, backgroundColor: props.colorBack }}
      >
        {props.name}
      </h2>
    </div>
  );
};

export default Task;
