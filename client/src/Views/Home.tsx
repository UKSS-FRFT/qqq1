import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const[result,setResult] = useState("")
    const[error,setError] = useState("")
    useEffect(() => {
        const userRequest = async () =>{
            setError("");
            setResult("");
            try{
                const response = await fetch('http://localhost:3001/user',{
                    credentials: "include",
                    method: "GET"
                });
                if(response.status !== 200){
                    const responseData = await response.json();
                    throw Error(response.statusText)
                }
                const user = await response.json();
                setResult('Добро пожаловать, ${user.login}');
            } catch (e){
                if (e instanceof Error){
                    setError(e.message);
                }
            }

        };
        userRequest();
    }, []);
    return <>
        <h3>Домашняя страница</h3>
        {result && <>{result}</>}
        {error && <>{error}</>}
    </>

}

export default Home;