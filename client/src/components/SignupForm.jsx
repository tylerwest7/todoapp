import { Component } from "react";
import axios from 'axios';

class SignupForm extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    
    handleChange(e){
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const self = this;

        axios.post('/auth/signup', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
          })
          .then(function (response) {
            console.log(response);
            //self.props.homeTransition();
            //Login them in
            axios.post('/auth/login', {
                email: self.state.email,
                password: self.state.password
            })
            .then(function (response) {
                self.props.homeTransition();
            })

          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() { 
        return ( 
            <form onSubmit={this.handleSubmit}>
                <h1>Sign up</h1>
                <input name="firstName" placeholder="First name" value={this.state.firstName} onChange={this.handleChange}></input>
                <input name="lastName" placeholder="Last name" value={this.state.lastName} onChange={this.handleChange}></input>
                <input name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange}></input>
                <input name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}></input>
                <input name="confirmPassword" placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.handleChange}></input>
                <button>Sign up</button>
            </form>
         );
    }
}
 
export default SignupForm;