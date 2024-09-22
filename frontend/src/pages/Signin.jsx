import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from 'axios';
import { Header } from "../components/Header"
import { useNavigate } from "react-router-dom"



export const Signin = () =>{
    const [username, setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const navigate = useNavigate(); // To handle navigation
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
               
                <Heading label={"Sign in"}/>
                <SubHeading label={"Enter your credentials to access your account"}/>
                <InputBox onChange={e=>{
                    setUserName(e.target.value);
                }} placeholder="john@example.com" label={"Email"}/>
                <InputBox onChange={e=>{
                    setPassword(e.target.value);
                }} placeholder="J@hn$12" label={"Password"}/>
                <div className="pt-4">
                    <Button onClick={async ()=>{
                                 try {
                                    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                        username,
                                        password
                                    });
                                    
                                    // Handle successful sign-in, e.g., store token and navigate
                                    const { token } = response.data;
                                    localStorage.setItem("token", token); // Save token to localStorage
                        
                                    // Redirect to dashboard or any protected route
                                    navigate("/dashboard"); 
                                } catch (error) {
                                    // If there's an error during login, show an error message
                                    setError("Invalid credentials, please try again.");
                                    console.error("Sign-in failed", error);
                                }
                    }} label={"Sign in"}/>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>

            </div>
        </div>
    </div>
}