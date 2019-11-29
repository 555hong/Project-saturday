import React, { Component } from 'react'
import PropTypes from 'prop-types';
import firebase from 'firebase';

const db = firebase.database();
const written = 1;
export class Todoitem extends Component {
    // Get state of Complete then determine complete state
    getStyle = () => {
        return {
            background: '#f0fffd',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todox.completed ?
            'line-through' : 'none'
        }
    }
    writeTodo(){
        const { id , title } = this.props.todox;
        db.ref('Amusement/job/' + id).set({
            id: id,
            title: title,
          });
    }
    renderWritten(){
        if (written < 4){
            this.writeTodo()
            this.written = written+1
        }
    }

    render() {
        const { id , title } = this.props.todox;
        return (
            <div style={this.getStyle()} id='work'>
                <p>
                <input type="checkbox" 
                onChange={this.props.markComplete.bind(this, id)}/> 
                {' '}
                { title }
                <button onClick={this.props.delTodo.bind(this, id)} id='del'>x</button>
                </p>
                {this.writeTodo()}
            </div>            
        )
    }
}

// PropType
Todoitem.propTypes = {
    todox: PropTypes.object.isRequired
}

export default Todoitem
