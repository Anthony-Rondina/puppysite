import { useState } from "react";
import * as userService from "../../utilities/users-service"

export default function LoginForm({ setUser, setShow }) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const handleChange = (evt) => {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
        setError('')
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const user = await userService.login(credentials)
            setUser(user)
            setShow(false)
        } catch (err) {
            setError(err.message)
        }
    }
    return (
        <div className='formWrapper'>
            <div className="form-container">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
                    <label>Password</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
                    <button id="black" type="submit">LOG IN</button>
                </form>
            </div>
            <h1 className="error-message">&nbsp;{error}</h1>
        </div>
    )
}