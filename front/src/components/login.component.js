import React from "react"
import { useCookies } from "react-cookie"
import { useState } from 'react';
import axios from 'axios';
export default function Login() {
    const [cookies, setCookie] = useCookies(['education']);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if(cookies.education) {
        window.location.href = "/";
    }

    const login = async () => {
        const res = await axios.post("http://localhost:5000/auth", {
            email,
            password
        });
        if(res.data.message == "success") {
            setCookie("education", res.data.token, {path: "/"});
            window.location.href = "/";
        }
    }
    return(
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
            <button onClick={login}>Login</button>
        </div>
    )
}
