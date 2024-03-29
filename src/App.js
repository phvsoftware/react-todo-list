import React, { Component } from "react";
import "./App.css";
import Task from "./composants/Task";
import SearchBar from "./composants/SearchBar";
import Firebase from "firebase/app";
import "firebase/database";
import InitUser from "./composants/InitUser";
import Users from "./composants/Users";
import SettingsIcon from "./composants/SettingsIcon";
import PeoplesIcon from "./composants/PeoplesIcon";

var firebaseConfig = {
  apiKey: "AIzaSyDsM7lJUeVeKZwBd0jQzmjcUQMlVXEk0lY",
  authDomain: "react-todolist-6f795.firebaseapp.com",
  databaseURL: "https://react-todolist-6f795.firebaseio.com",
  projectId: "react-todolist-6f795",
  storageBucket: "react-todolist-6f795.appspot.com",
  messagingSenderId: "293259073085",
  appId: "1:293259073085:web:ef5aef3f66f691ca983c54"
};
// Initialize Firebase
Firebase.initializeApp(firebaseConfig);
const usersRef = Firebase.database().ref("users");
const tasksRef = Firebase.database().ref("tasks");

// constantes globales
const TDL_KEY_USERID = "::ToDoList::UserId";

class App extends Component {
  // mon state contient un tableau représentant mes taches
  state = {
    tasks: [
      // {
      //   id: 1,
      //   userid: 0,
      //   name: "Commander un iPhone 11 Pro",
      //   done: false
      // },
      // {
      //   id: 2,
      //   userid: 0,
      //   name: "Aller à la piscine",
      //   done: true
      // },
      // {
      //   id: 3,
      //   userid: 0,
      //   name: "Jouer à GTA Online",
      //   done: false
      // }
    ],
    newTask: "",
    search: "",
    users: [
      // {
      //   id: 0,
      //   userName: "",
      //   frontColor: "",
      //   backColor: ""
      // }
    ],
    currentUserId: 0,
    showPopup: false,
    showOthers: true
  };

  componentDidMount() {
    const id = this.loadLocalUserId();
    if (id) {
      this.setState({ currentUserId: +id });
      this.loadDatabase();
    }
  }

  // -------------------------- Gestion des tâches --------------------------

  // est-ce que cette tache est à moi ?
  isTaskMine(task) {
    return task.userId === this.state.currentUserId;
  }

  // retourne l'index de la tache name dans le tableau de l'état
  getIndex(task) {
    return this.state.tasks.indexOf(task);
  }

  // supprime une tache
  delete(task) {
    if (!this.isTaskMine(task)) {
      alert("Vous ne pouvez pas supprimer une tâche d'un autre utilisateur");
      return;
    }
    this.removeTaskDatabase(task);
  }

  // permute l'état (fait / non fait) d'une tache
  toggle(task) {
    if (!this.isTaskMine(task)) {
      alert("Vous ne pouvez pas modifier une tâche d'un autre utilisateur");
      return;
    }
    const temp = this.state.tasks.slice();
    const index = temp.indexOf(task);
    temp[index].done = !temp[index].done;
    this.setState({ tasks: temp }, () => {
      // et sauvegarde quand c'est fait
      this.saveDatabase();
    });
  }

  // ajoute une tache dans la liste
  add(name) {
    // on n'accèpte pas les textes vides ou plein d'espaces
    if (!name || name.trim() === "") {
      // on efface si on a mis des espaces
      this.setState({ newTask: "" });
      return;
    }
    const id = Math.round(Date.now() * Math.random());
    const task = { name: name, done: false, id: id, userId: this.state.currentUserId };
    const temp = this.state.tasks.slice();
    temp.push(task);
    // on met a jour le state avec le nouveau tableau contenant la tache supplémentaire et on vide la newTask pour que l'input soit vidé
    this.setState({ tasks: temp, newTask: "" }, () => {
      // et sauvegarde quand c'est fait
      this.saveDatabase();
    });
  }

  // callback pour composant SearchBar lorsqu'on tape du texte
  searchChange = text => {
    this.setState({ search: text });
  };

  toggleShowOthers = () => {
    this.setState({ showOthers: !this.state.showOthers });
  };

  // -------------------------- Gestion du User --------------------------

  saveLocalUserId(userId) {
    localStorage.setItem(TDL_KEY_USERID, userId);
  }

  loadLocalUserId() {
    return localStorage.getItem(TDL_KEY_USERID);
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  initUserCallback = (userName, colorFront, colorBack) => {
    this.loadDatabase().then(() => {
      // jette les user vide
      if (userName.trim() === "" || userName.length < 3) {
        alert("Vous devez renseigner un nom d'utilisateur valide");
        return;
      }
      // teste si le user n'existe pas deja ?
      if (this.state.users.find(user => user.userName === userName)) {
        alert("Ce nom d'utilisateur existe déjà, veuillez en choisir un autre");
        return;
      }

      const id = Math.round(Date.now() * Math.random());
      const user = {
        id: id,
        userName: userName,
        frontColor: colorFront,
        backColor: colorBack
      };
      const users = [...this.state.users];
      users.push(user);
      this.setState({ users: users, currentUserId: id }, () => {
        // et sauvegarde quand c'est fait
        this.saveDatabase();
      });
      this.saveLocalUserId(id);
    });
  };

  changeUserCallback = (colorFront, colorBack) => {
    this.loadDatabase().then(() => {
      // ferme la popup
      this.togglePopup();
      // cherche le current user dans le tableau des users
      const users = [...this.state.users];
      const index = users.indexOf(this.getCurrentUser(this.state.currentUserId));
      users[index].frontColor = colorFront;
      users[index].backColor = colorBack;
      this.setState({ users: users }, () => {
        // et sauvegarde quand c'est fait
        this.saveDatabase();
      });
    });
  };

  // retrouve le user à partir de son id
  getCurrentUser(id) {
    if (!this.state.users || this.state.users.length === 0) return null;
    let user = this.state.users.find(user => user.id === id);
    if (!user) {
      user = { id: 0, userName: "", colorFront: "", colorBack: "" };
    }
    return user;
  }

  getFrontColorFromUser(userId) {
    const user = this.state.users.find(user => user.id === userId);
    if (user) {
      return user.frontColor;
    }
  }

  getBackColorFromUser(userId) {
    const user = this.state.users.find(user => user.id === userId);
    if (user) {
      return user.backColor;
    }
  }

  // -------------------------- Gestion de la base --------------------------

  // charge depuis Firebase
  loadDatabase() {
    return new Promise(resolve => {
      usersRef.on("value", snap => {
        console.log("loading users...");
        let tempUsers = snap.val();
        // suppression des "empty slot"
        tempUsers = tempUsers.filter(value => Object.keys(value).length !== 0);
        this.setState({ users: tempUsers }, () => {
          tasksRef.on("value", snap => {
            console.log("loading tasks...");
            let tempTasks = snap.val();
            if (!tempTasks) {
              tempTasks = [];
            } else {
              tempTasks = tempTasks.filter(value => Object.keys(value).length !== 0);
            }
            this.setState({ tasks: tempTasks }, () => {
              resolve("ok");
            });
          });
        });
      });
    });
  }

  // sauvegarde dans Firebase
  saveDatabase() {
    usersRef.update(this.state.users);
    tasksRef.update(this.state.tasks);
  }

  removeTaskDatabase(taskToRemove) {
    tasksRef.once("value", snap => {
      let itemKey = 0;
      snap.forEach(child => {
        if (child && child.val().id === taskToRemove.id) {
          itemKey = child.key;
        }
      });
      tasksRef.child(itemKey).remove(() => {
        // relit pour réindexer sans les trous
        tasksRef.once("value", snap => {
          let tempTasks = snap.val();
          if (tempTasks) {
            tempTasks = tempTasks.filter(value => Object.keys(value).length !== 0);
            tasksRef.set(tempTasks);
          }
        });
      });
    });
  }

  // ---------------------- Render ------------------
  render() {
    let tabTasks = this.state.tasks.slice();

    // tri du tableau pour afficher les taches "done" en dernier
    tabTasks.sort((a, b) => {
      if (a.done) {
        return 1;
      } else {
        return -1;
      }
    });

    // filtre sur les autres utilisateurs
    if (!this.state.showOthers) {
      tabTasks = tabTasks.filter(task => task.userId === this.state.currentUserId);
    }

    // filtre le tableau sur le texte tapé dans la SearchBar
    tabTasks = tabTasks.filter(task => task.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1);
    let doneCount = 0;
    let notdoneCount = 0;
    tabTasks.forEach(task => {
      if (task.done) {
        doneCount++;
      } else {
        notdoneCount++;
      }
    });

    return (
      <div>
        {!this.state.currentUserId || this.state.currentUserId === 0 ? (
          <InitUser callback={this.initUserCallback} />
        ) : (
          <div className="app-global">
            <div className="app">
              <div className="header">
                <SearchBar search={this.state.search} searchChange={this.searchChange}></SearchBar>
                <div
                  className="otherpeoples"
                  onClick={this.toggleShowOthers}
                  title="Voir les tâches des autres utilisateurs"
                >
                  <PeoplesIcon invert={this.state.showOthers} color={this.state.showOthers ? "green" : "black"} />
                </div>
                <div className="settings" onClick={this.togglePopup} title="Modifier vos paramètres utilisateur">
                  <SettingsIcon />
                </div>
              </div>
              <div className="title-inline">
                <h1>To-Do List</h1>
                <h3>
                  ({notdoneCount} {notdoneCount > 1 ? "tâches à faire" : "tâche à faire"} / {doneCount}{" "}
                  {doneCount > 1 ? "faites" : "faite"})
                </h3>
              </div>
              {tabTasks.length === 0 && <h2>(Aucune tâche)</h2>}
              {tabTasks.length > 0 &&
                tabTasks.map((value, index) => {
                  return (
                    <Task
                      key={index}
                      name={value.name}
                      done={value.done}
                      onDelete={() => {
                        this.delete(value);
                      }}
                      onToggle={() => {
                        this.toggle(value);
                      }}
                      colorFront={this.getFrontColorFromUser(value.userId)}
                      colorBack={this.getBackColorFromUser(value.userId)}
                    />
                  );
                })}
              <form>
                <input
                  className="input-task"
                  placeholder="Titre"
                  type="text"
                  name="add"
                  value={this.state.newTask}
                  onChange={event => {
                    this.setState({ newTask: event.target.value });
                  }}
                />
                <button
                  className={this.state.newTask === "" ? "button-add disabled" : "button-add"}
                  onClick={event => {
                    event.preventDefault();
                    this.add(this.state.newTask);
                  }}
                >
                  Ajouter une tâche
                </button>
              </form>
            </div>
            <Users users={this.state.users} currentUserId={this.state.currentUserId} />
          </div>
        )}
        {this.state.showPopup ? (
          <InitUser
            callback={this.changeUserCallback}
            readonly={true}
            closePopup={this.togglePopup.bind(this)}
            user={this.getCurrentUser(this.state.currentUserId)}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
