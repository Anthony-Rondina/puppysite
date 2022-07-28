import { useState } from "react";
import * as userService from "../../utilities/users-service"

export default function LoginForm({ setUser }) {
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
        } catch (err) {
            setError(err.message)
        }
    }
}