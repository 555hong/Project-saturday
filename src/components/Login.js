import React from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import firebase from './Firebase';

class SignupForm extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: null,
    }
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    firebase.auth().createUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        firebase.database().ref('users/'+ authUser.user.uid)
          .set({
            username,
            email,
          });
          this.setState({
            username: '',
            email: '',
            passwordOne: '',
            passwordTwo: '',
            error: null,
          });
          console.log(authUser);
          this.props.toggleSignupOff();
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {  
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div class="navbar">
         <Link style={linkstyle} to="/"> Home </Link> | 
         <Link style={linkstyle} to="/about"> About </Link> 
         </div>
        <div>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        </div>
        <div>
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        </div>
        <button disabled={isInvalid} type="submit" class="signup">
          Sign Up
        </button>
        <a href='' onClick={this.handleSignupoff}
        style={{ textDecoration: 'none', color: '#8fe3ff' }}
        >Already have an account?</a>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SigninForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
    };
    this.handleSignupLinkClicked = this.handleSignupLinkClicked.bind(this);
  }

  onSubmit = event => {
    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          email: '',
          password: '',
          error: null,
          signedin: true
        });
        this.props.toggleSignedIn();
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault(); // prevent following the url (undefined) after clicking submit
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSignupLinkClicked = event => {
    this.props.toggleSignupOn();
    event.preventDefault();
  }
  handleSignupoff = event => {
    this.props.toggleSignupOff();
    event.preventDefault();
  }


  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div class="navbar">
         <Link style={linkstyle} to="/"> Home </Link> | 
         <Link style={linkstyle} to="/about"> About </Link>  
         </div>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit" className="signin">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
        <p>
        <a href='' onClick={this.handleSignupLinkClicked}
        style={{ textDecoration: 'none', color: '#8fe3ff' }}
        >Don't have an account?</a>
        </p>
      </form>
    );
  }
}

class SignoutForm extends React.Component{
 
  onSubmit = event => {

    firebase.auth().signOut()
    .then(() => {
      this.props.toggleSignOut();
    })
    .catch(error => {
      this.setState({ error });
    });

    event.preventDefault(); 
  }
  render() {
    return (
    <form onSubmit={this.onSubmit}>
      <div class="navbar">   
      <Link style={linkstyle} to="/"> Home </Link> | 
      <Link style={linkstyle} to="/about"> About </Link> |  
      <Link style={linkstyle} to="/Table"> Staff table </Link> |
    <button type="submit" class="signout">
          Sign Out
          </button>
    </div>
    </form>
    );
  }
}

function PrivatePage(props) {
    return (
    <Router> 
        <div>
            this
        </div>
    </Router>   
  )
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedin: false,
      showsignup: false
    };
    this.toggleSignupOn = this.toggleSignupOn.bind(this);
    this.toggleSignupOff = this.toggleSignupOff.bind(this);
    this.toggleSignedIn = this.toggleSignedIn.bind(this);
    this.toggleSignOut = this.toggleSignOut.bind(this);
  }

  toggleSignupOn() {
    this.setState({showsignup:true})
  }

  toggleSignupOff() {
    this.setState({showsignup:false})
  }

  toggleSignedIn() {
    this.setState({signedin:true})
  }
  toggleSignOut(){
    this.setState({signedin:false})
  }

  componentDidUpdate(){
    this.listenForAuthChange();
  }

  listenForAuthChange() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("auth changed");
      if (user)
        console.log('User details', user);
      else
        console.log("no one is signed in ");
    });
  }

  render() {
    if (this.state.signedin === false){
      if (this.state.showsignup)
        return <SignupForm toggleSignupOff={this.toggleSignupOff}/>
      else {
        return <SigninForm toggleSignupOn={this.toggleSignupOn} toggleSignedIn={this.toggleSignedIn}/>
      }
    }
    else{
      return <SignoutForm toggleSignOut={this.toggleSignOut}  />
    }
  }
  
  
}
const linkstyle = {
  color: '#fff',
  textDecoration: 'none',
  
}
