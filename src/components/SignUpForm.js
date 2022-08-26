import { Component } from 'react';
import { signUp } from '../utilities/users-api';
export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    };

    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value, error: '' })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // keeps the previous values of the state from line 4
            const formData = { ...this.state };
            // removes the error and confirm from the newly made formData ojbect
            delete formData.error;
            delete formData.confirm;
            const user = await signUp(formData)
            this.props.setUser(user)
            localStorage.setItem('token', user)
        } catch (err) {
            this.setState({ error: "Sign up failed" })
        }
        // event.preventDefault();
        // alert(JSON.stringify(this.state));
    }
    render() {
        //
        const disable = this.state.password !== this.state.confirm;
        return (
            <div className='formWrapper'>
                <div className="form-container">
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <label>Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                        <label>Email</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                        <label>Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                        <label>Confirm</label>
                        <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                        <button id="black" type="submit" disabled={disable}>SIGN UP</button>
                    </form>
                </div>
                <h1 className="error-message">&nbsp;{this.state.error}</h1>
            </div>
        );
    }
}
