import React, {useState} from 'react';
import RegistrationForm, {RegistrationFormData} from "../Components/RegistrationForm/RegistrationForm";
import {useNavigate} from "react-router-dom";

const RegistrationView = () => {
    const naviagte = useNavigate();
    const[result,setResult] = useState("")
    const[error,setError] = useState("")
    const onSubmit = (data:RegistrationFormData) => {
        //fetch
        const registrationRequest = async () =>{
            setError("");
            setResult("");
            try{
                const response = await fetch('http://localhost:3001/user',{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                if(response.status !== 200){
                    throw Error(response.statusText)
                }
                setResult("Пользователь успешно создан!");
                setTimeout (() => {
                    naviagte("/login")
                }, 2000);
            } catch (e){
                if (e instanceof Error){
                    setError(e.message);
                }
            }

        };
        registrationRequest();
    }
    return (
        <div>
            <RegistrationForm onSubmit={onSubmit}/>
            {result && <>{result}</>}
            {error && <>{error}</>}
        </div>
    );
};

export default RegistrationView;