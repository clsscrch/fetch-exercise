import "./LoginPage.css"
import React from "react"
import axios from "axios"

const LoginPage = () => {

    const login =  async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Login")

        const loginRequest = await axios.post("https://frontend-take-home-service.fetch.com/auth/login", {
            email: "a@a.com",
            name: "a",
        }, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true
        })
        
        console.log(loginRequest.data);
    }

    const logout = async () => {
        try {
        const logoutRequest = await axios.post("https://frontend-take-home-service.fetch.com/auth/logout", {},
            {withCredentials: true}
        )
            console.log(logoutRequest.data);
        }   catch (err) {
            console.log(err);
        }

    }

    const getDogs = async () => {
        const dogs = await axios.get("https://frontend-take-home-service.fetch.com/dogs/search", {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true
        })

        console.log(dogs.data);
    }

    return (
        <div id="page">
            <div id="loginContainer">
                <p>Login</p>
                <form onSubmit={login}>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="E-mail" />
                    <button type="submit">Login</button>
                </form>
            </div>
            <button onClick={getDogs}></button>
            <button onClick={logout}></button>
        </div>
    )

}

export default LoginPage;