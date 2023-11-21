import "./LoginPage.css"
import React from "react"
import axios from "axios"

interface LoginPageProps {
    handleLogin: (e: React.FormEvent) => void
}

const LoginPage = ({handleLogin} : LoginPageProps) => {

    // const login =  async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     console.log("Login")

    //     const loginRequest = await axios.post("https://frontend-take-home-service.fetch.com/auth/login", {
    //         email: "a@a.com",
    //         name: "a",
    //     }, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         },
    //         withCredentials: true
    //     })
        
    //     console.log(loginRequest.data);
    // }

    return (
        <div id="page">
            <div id="loginContainer">
                <p>Login</p>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="E-mail" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )

}

export default LoginPage;