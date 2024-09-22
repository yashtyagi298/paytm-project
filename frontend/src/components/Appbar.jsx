import { useState } from "react"
import axios from 'axios'

export const Appbar=()=>{
    const [name,setName]=useState([]);
   
        axios.get("http://localhost:3000/api/v1/user/userinfo", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            console.log("User Info:", response.data);
            setName(response.data.firstname.toUpperCase()[0])
            
            // You can now display or use the user's info as needed
        })
        .catch(error => {
            console.error("Error fetching user info:", error);
        });
    
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
           PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className ="flex flex-col justify-center h-full text-xl">
                {name}
                </div>
            </div>
        </div>
    </div>
}