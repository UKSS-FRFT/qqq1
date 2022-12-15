import React, {useState} from 'react';
import LoginForm from "../Components/LoginForm/LoginForm";
import {LoginFormData} from "../Components/LoginForm/LoginForm";
import {useNavigate} from "react-router-dom";

const LoginView = () => {
    const navigate = useNavigate();
    const[result,setResult] = useState("")
    const[error,setError] = useState("")
    const onSubmit = (data:LoginFormData) => {
        //fetch
        const authRequest = async () =>{
            setError("");
            setResult("");
            try{
                const response = await fetch('http://localhost:3001/auth',{
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                if(response.status !== 200){
                    const responseData = await response.json();
                    throw Error(response.statusText)
                }
                setResult("Вы вошли!");
                setTimeout (() => {
                    navigate("/")
                }, 2000);
            } catch (e){
                if (e instanceof Error){
                    setError(e.message);
                }
            }

        };
        authRequest();
    };
    return (
        <div>
            <LoginForm onSubmit={onSubmit}/>
            {result && <>{result}</>}
            {error && <>{error}</>}
        </div>
    );
};

export default LoginView;