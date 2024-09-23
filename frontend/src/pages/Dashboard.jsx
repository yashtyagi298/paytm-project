import { useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Header } from "../components/Header"
import { Users } from "../components/Users"
import axios from 'axios'

export const Dashboard=()=>{
    const [balance ,setBalance]=useState(0);
    axios.get("http://localhost:3000/api/v1/account/balance",{
        headers:{
            Authorization:"Bearer "+localStorage.getItem("token")
        }
    })
    .then(response=>{
        const  formatedBalance = response.data.balance.toFixed(2);
        setBalance(formatedBalance);
    })
    return <div>
           
        <Appbar/>
        <div className="m-8">
            <Balance value={balance}/>
            <Users/>
        </div>
    </div>
}