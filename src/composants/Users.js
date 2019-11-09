import React from "react";
import "./Users.css";

const Users = props => {
  return (
    <div className="users">
      <h1>Liste des utilisateurs</h1>
      <div className="users-list">
        {props.users.map((value, index) => {
          return (
            <div key={index}>
              <h2 style={{ color: value.frontColor, backgroundColor: value.backColor }}>{value.userName}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
