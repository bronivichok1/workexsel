import "../App.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Status } from "../DataEdit";

const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true);
    const [inputData, setInputData] = useState(true);
    const [Num, setInputNum] = useState(true);

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true);
                    break;
                case 'inputData':
                    const data = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
                    data.test(String(value).toLowerCase()) ? setInputData(false) : setInputData(true);
                    break;
                case 'Num':
                    const number = /^[a-zA-Z0-9-]*$/;
                    number.test(String(value).toLowerCase()) ? setInputNum(false) : setInputNum(true);
                    break;
                default:
            }
        }
    }, [value, validations]);

    return { isEmpty, inputData, Num };
}

const useInput = (InitialValue, validations) => {
    const [value, setValue] = useState(InitialValue);
    const [isDirty, setDirty] = useState(false);
    
    const valid = useValidation(value, validations);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onBlur = () => {
        setDirty(true);
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}

function Auth() {
    const navigate = useNavigate();

    const PATH = process.env.REACT_APP_PATH; 
    const [responseMessage, setResponseMessage] = useState(''); 

    const login = useInput('', { isEmpty: true });
    const password = useInput('', { isEmpty: true });

    const handleClick = async (e) => {
        e.preventDefault();
        if (!login.isEmpty && !password.isEmpty) {
            const prepareData = {
                login: login.value,
                password: password.value
            };
    
            try {
                const response = await fetch(PATH + '/auth/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(prepareData),
                });
    
                const data = await response.json(); 
                if (response.ok) {

                    const serverStatus = data.status; 
                    
                    if(serverStatus=='red'){
                        Status.status='red'
                        navigate('Main', { replace: false })
                    }else if(serverStatus=='watch'){
                        Status.status='watch'
                        navigate('Main2', { replace: false })
                    }else{
                        Status.status='none'
                    }
                } 
            } catch (error) {
                
            }
        } 
    };    

    return (
        <div className="container"> 
            <form className="form"> 
                <label className="form-label">Логин<span>*</span></label>
                <div>
                    <input
                        className={login.isDirty && login.isEmpty ? "input_error input_w680-error" : "input input_w680"}
                        onChange={login.onChange}
                        onBlur={login.onBlur}
                        value={login.value}
                        name="login"
                        maxLength="40"
                        type="text"
                    />
                </div>
                <label className="form-label">Пароль<span>*</span></label>
                <div>
                    <input
                        className={password.isDirty && password.isEmpty ? "input_error input_w680-error" : "input input_w680"}
                        onChange={password.onChange}
                        onBlur={password.onBlur}
                        value={password.value}
                        name="password"
                        maxLength="40"
                        type="password" 
                    />
                </div>
                
                <div className="center-div">
                    <button className="btn btn-1 btn-sep" onClick={handleClick}>Вход</button>
                </div>
            </form>
        </div>
    );
}

export default Auth;
