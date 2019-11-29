import React, { Component } from 'react';
import Header from './components/Header';
import Addtodo from './components/Addtodo';
import Todo from './components/Todo';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import firebase from './components/Firebase';
import uuid from 'uuid';
import About from './components/pages/About';

import './App.css';
import Table from './components/Table';



const db = firebase.database();



class App extends Component {
      state = {
        todo: [
          {
            id: uuid.v4(), 
            title: 'take out trash',
            completed: false
          },
          {
            id: uuid.v4() ,
            title: 'Prepare for grand opening',
            completed: false
          },
          {
            id: uuid.v4() ,
            title: 'Buy more supply',
            completed: false
          }
        ]
      }
      // toggle completed
      markComplete = (id) => {
        this.setState( { todo: this.state.todo.map(todo => {
          if(todo.id === id) {
            todo.completed = !todo.completed
          }
          return todo;
        })} )
      }
      delTodo = (id) => {
        this.setState({ todo: [...this.state.todo.filter(todox => todox.id !== id)] })
        db.ref('Amusement/job/' + id).remove()
      }

      addTodo = (title) => {
        const newTodo = {
          id: uuid.v4(),
          title: title,
          completed: false
        }
        this.setState({ todo: [...this.state.todo, newTodo] });
      }





      render() {
        return (
          <Router>
            <div className="App">
              <div className="container">
              <Header />
              <Route exact path="/" render={props => (
                <React.Fragment>
                  <Addtodo addTodo={this.addTodo} />
                  <Todo todo={this.state.todo}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}/>
              <Route path="/about" component={About} />
              <Route path="/Table" component={Table}/>
              </div>
            </div>
          </Router>
        );
      }
}

export default App;
