import React from 'react'
import { Link } from 'react-router-dom';
import Login from './Login'; 

export default function Header() {
    return (
        <header style={mama}>
            <h1>Amusement Park</h1>
            <Login />   
        </header>
    )
}

const mama = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'

}
const linkstyle = {
    color: '#fff',
    textDecoration: 'none'
}