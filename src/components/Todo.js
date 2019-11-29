import React, { Component } from 'react';
import Todoitem from './Todoitem';
import PropTypes from 'prop-types';



class Todo extends Component {
        // for each document 
      render() {
        console.log(this.props.todo)
        return this.props.todo.map((todox) =>(
            <Todoitem key={todox.id} 
            todox={todox} 
            markComplete={this.props.markComplete}
            delTodo={this.props.delTodo}/>
        ));
      }
}

// PropTypes
Todo.propTypes = {
    todox: PropTypes.array.isRequired
}

export default Todo;
