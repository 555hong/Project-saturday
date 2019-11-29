import React, { Component } from 'react'
import firebase from 'firebase';

const db = firebase.database();

export class Table extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            staffs: [
                { id: 1, name: 'Wasif', salary: 10000, stafftype: 'Manager' },
                { id: 2, name: 'Ali', salary: 15000, stafftype: 'Attraction staff' },
                { id: 3, name: 'Saad', salary: 30000, stafftype: 'Mechanic' },
                { id: 4, name: 'Asad', salary: 16000, stafftype: 'Attraction staff' }
            ]
        }
    }
    
    renderTable(){
        return this.state.staffs.map((staff, index) => {
            const{ id, name, salary, stafftype } = staff
            db.ref('Amusement/staff/' + id).set({
                id: id,
                name: name,
                salary: salary,
                stafftype: stafftype
              });
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{salary}</td>
                    <td>{stafftype}</td>
                </tr>
            )
        })
      }


      render() {
        return (
           <div>
              <table>
                 <tbody>
                    <tr><th>ID</th><th>Name</th><th>Salary</th><th>Staff-type</th></tr>
                    {this.renderTable()}
                 </tbody>
              </table>
           </div>
        )
     }
}

export default Table
