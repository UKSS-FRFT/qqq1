import { FormEvent, useState } from "react";
import styles from "./RegistrationForm.module.css";


export type RegistrationFormData = {
    login: string;
    password: string;
}

type FormProps = {
    onSubmit: (data: RegistrationFormData) => void;
}
export default function RegistrationForm({onSubmit} : FormProps) {
    const [login, setLogin] = useState("");
    const [loginError, setLoginError] = useState("");
    const [password, setPassword] = useState("");
    const [secPassword, setSecPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const isValid = (): boolean => {
        let result = true;

        // очищаем ошибки
        setLoginError("");

        if (!/^([a-z0-9]{6,20})$/.test(login)) {
            setLoginError("Логин должен содержать от 6 до 20 символов латинского алфавита и цифры.");
            result = false;
        }

        if (login.length === 0) {
            setLoginError("Логин не может быть пустым.");
            result = false;
        }

        setPasswordError("");
        if(secPassword != password){
            setPasswordError("Пароли не совпадают!");
            result = false;
        }
        if (password.length === 0 || secPassword.length === 0) {
            setPasswordError("Пароль не может быть пустым.");
            result = false;
        }


        return result;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isValid()) {
            onSubmit({
                login,
            password});
        }
    };

    return <>
        <h3>регистрация</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Логин:
                    <input value={login} onChange={e => setLogin(e.target.value)}/>
                </label>
                {loginError && <div className={styles.error}>
                    {loginError}
                </div>}
            </div>
            <div>
                <label>Пароль:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
            </div>
            <div>
                <label>Повторите пароль:
                    <input type="password" value={secPassword} onChange={e => setSecPassword(e.target.value)}/>
                </label>
            </div>
                {passwordError && <div className={styles.error}>
                    {passwordError}
                </div>}

            <button type="submit">Войти</button>
        </form>
    </>;
}