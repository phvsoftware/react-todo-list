import React, { Component } from "react";
import "./App.css";
import Task from "./composants/Task";
import SearchBar from "./composants/SearchBar";

class App extends Component {
  // mon state contient un tableau représentant mes taches
  state = {
    tasks: [
      {
        name: "Toto",
        done: false
      },
      {
        name: "Tata",
        done: false
      }
    ],
    newTask: "",
    search: ""
  };

  // retourne l'index de la tache name dans le tableau de l'état
  getIndex(name) {
    return this.state.tasks.indexOf(name);
  }

  // supprime une tache
  delete(name) {
    const index = this.getIndex(name);
    const temp = this.state.tasks.slice();
    temp.splice(index, 1);
    this.setState({ tasks: temp });
  }

  // permute l'état (fait / non fait) d'une tache
  toggle(name) {
    const index = this.getIndex(name);
    const temp = this.state.tasks.slice();
    temp[index].done = !temp[index].done;
    this.setState({ tasks: temp });
  }

  // ajoute une tache dans la liste
  add(name) {
    // on n'accèpte pas les textes vides ou plein d'espaces
    if (!name || name.trim() === "") {
      // on efface si on a mit des espaces
      this.setState({ newTask: "" });
      return;
    }
    const task = { name: name, done: false };
    const temp = this.state.tasks.slice();
    temp.push(task);
    // on met a jour le state avec le nouveau tableau contenant la tache supplémentaire et on vide la newTask pour que l'input soit vidé
    this.setState({ tasks: temp, newTask: "" });
  }

  // callback pour composant SearcgBar lorsqu'on tape du texte
  searchChange = text => {
    this.setState({ search: text });
  };

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

    // filtre le tableau sur le texte tapé dans la SearchBar
    tabTasks = tabTasks.filter(task => task.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1);

    return (
      <div className="app">
        <SearchBar search={this.state.search} searchChange={this.searchChange}></SearchBar>
        <h1>To-Do List</h1>
        {tabTasks.map((value, index) => {
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
              console.log("add click");
              this.add(this.state.newTask);
            }}
          >
            Ajouter une tâche
          </button>
        </form>
      </div>
    );
  }
}

export default App;
