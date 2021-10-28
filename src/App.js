import React, { Component } from "react";  
import "./App.css";  
import PropTypes from 'prop-types';  
import { getUser, addUser, editUser, deleteUser } from './redux/action.js';  
import { connect } from 'react-redux';  
  
class App extends Component {  
  constructor(props) {  
    super(props);  
    this.state = {  
      id: 0,  
      firstName: "",  
      lastName: "" ,
      phoneNumber: "" 
    };  
  }  
  
  static propTypes = {  
    users: PropTypes.array.isRequired,  
    getUser: PropTypes.func.isRequired,  
    addUser: PropTypes.func.isRequired,  
    editUser: PropTypes.func.isRequired,  
    deleteUser: PropTypes.func.isRequired  
  };  
  
  componentDidMount() {  
    this.props.getUser();  
  }  
  
  submitData = () => {  
    if (this.state.firstName && this.state.lastName && this.state.phoneNumber && !this.state.id) {  
      const newUser = {  
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),  
        firstName: this.state.firstName,  
        lastName: this.state.lastName,  
        phoneNumber: this.state.phoneNumber,
      };  
  
      this.props.addUser(newUser);  
    } else if (this.state.firstName && this.state.lastName && this.state.phoneNumber && this.state.id) {  
      const updatedDetails = {  
        id: this.state.id,  
        firstName: this.state.firstName,  
        lastName: this.state.lastName,  
        phoneNumber: this.state.phoneNumber,
      };  
  
      this.props.editUser(updatedDetails);  
    } else {  
      alert('Enter User Details.');  
    }  
  
    this.clearData();  
  }  
  
  editDetails = (data) => {  
    this.setState({  
      id: data.id,  
      firstName: data.firstName,  
      lastName: data.lastName,
      phoneNumber: data.phoneNumber
    })  
  }  
  
  deleteUser = (id) => {  
    this.clearData();  
    if (window.confirm("Are you sure?")) {  
      this.props.deleteUser(id);  
    }  
  }  
  
  handleFirstNameChange = (e) => {  
    this.setState({  
      firstName: e.target.value  
    });  
  }  
  
  handleLastNameChange = (e) => {  
    this.setState({  
      lastName: e.target.value  
    });  
  }  

  handlephoneNumberChange = (e) => {  
    this.setState({  
      phoneNumber: e.target.value  
    });  
  } 
  
  clearData = () => {  
    this.setState({  
      id: 0,  
      firstName: "",  
      lastName: "",
      phoneNumber: "" 
    });  
  }  
  
  render() {  
    return (  
      <div className="App">  
        <header className="App-header">  
          <h1 className="h2">Customer details</h1>  
        </header>  
        <p className="App-intro"> 
          <div className="table-section">  
            <table>  
              <thead>  
                <tr>  
                  <th>ID</th>  
                  <th>First Name</th>  
                  <th>Last Name</th>
                  <th>Phone Number</th>  
                  <th>Action(s)</th>  
                </tr>  
              </thead>  
              <tbody>  
                {this.props.users && this.props.users.map((data, index) => {  
                  return <tr key={(index + 1)}>  
                    <td>{(index + 1)}</td>  
                    <td>{data.firstName}</td>  
                    <td>{data.lastName}</td> 
                    <td>{data.phoneNumber}</td>
                    <td><button onClick={() => this.editDetails(data)}>EDIT</button> <button onClick={() => this.deleteUser(data.id)}>DELETE</button> </td>  
                  </tr>  
                })}  
              </tbody>  
            </table>  
          </div>  
          <br></br>
         
            <h2 className="h2">Add a customer</h2> 
            <div className="input-section">
            <input onChange={this.handleFirstNameChange}
             value={this.state.firstName} 
             type="text"
            placeholder="Enter your First Name.." />
            &nbsp; &nbsp;
            <input onChange={this.handleLastNameChange} 
            value={this.state.lastName} 
            type="text" 
            placeholder="Enter your Last Name.." />
            &nbsp; &nbsp;
            <input onChange={this.handlephoneNumberChange}
             value={this.state.phoneNumber} 
             type="text"
            placeholder="Enter your Phone Number.." />
            &nbsp; &nbsp;
            {this.state.id ? 
            <button onClick={this.submitData}>UPDATE</button> 
            : <button onClick={this.submitData}>ADD</button>}  &nbsp; &nbsp; 
            <button onClick={this.clearData}>CLEAR</button>   
          </div>  
        </p>  
      </div>  
    );  
  }  
}  
  
const mapStateToProps = state => ({  
  users: state.users  
});  
  
export default connect(mapStateToProps, { getUser, addUser, editUser, deleteUser })(App); 