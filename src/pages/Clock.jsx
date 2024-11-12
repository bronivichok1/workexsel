import "../App.css"
import {useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {DataEdit,Red} from '../DataEdit.jsx'
import { useNavigate } from "react-router-dom";

const useValidation=(value,validations)=>{
    const[isEmpty,setEmpty]=useState(true)
    const[inputData,setInputData]=useState(true)
    const[Num,setInputNum]=useState(true)
  
    useEffect(()=>{
        for(const validation in validations){
            switch(validation){
                case'isEmpty':
                    value?setEmpty(false):setEmpty(true)  
                break;
                case'inputData':
                    var data=/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/
                    data.test(String(value).toLowerCase())?setInputData(false):setInputData(true) 
                break;
                case'Num':
                    var number= /^[a-zA-Z0-9-]*$/
                    number.test(String(value).toLowerCase())?setInputNum(false):setInputNum(true) 
                break;
                default:
            }
        }
    },[value,validations,isEmpty,inputData])
    return{
        isEmpty,
        inputData,
        Num
    }
  }
  const useInput=(InitialValue,validations)=>{
    const [value,setValue]=useState(InitialValue)
    const [checked, setChecked] = useState(false);
    const [isDirty,setDirty]=useState(false)
    
    const valid=useValidation(value,validations)
  
    const onChange=(e)=>{
        setValue(e.target.value)
        setChecked(e.target.checked)
    }
  
    const onBlur=(e)=>{
        setDirty(true)
    }
    
    return{
        value,
        checked,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
  }

  function Clock() {
    const PATH = process.env.REACT_APP_PATH;
    const [ButtonClick, setButtonClick] = useState(false);
    const navigate = useNavigate();

    const VO = useInput(Red.VO, { isEmpty: true });
    const DOV = useInput(Red.DOV, { isEmpty: true });
    const VOconst = useInput(Red.VoFact, { isEmpty: true });
    const DOVconst = useInput(Red.DOVFact, { isEmpty: true });

    const [fields, setFields] = useState(Array.from({ length: 25 }, () => ({ date: '', month: '', hoursVO: '', hoursDOV: '' })));

    // Обработчик изменений для полей дополнительных сведений
    const handleFieldChange = (index, e) => {
        const { name, value } = e.target;
        const newFields = [...fields];
        newFields[index][name] = value;
        setFields(newFields);
    };

    useEffect(() => {
        if (ButtonClick) {
            sendDataToServer();
            setButtonClick(false);
        }
    }, [ButtonClick]);

    const handleClick = (e) => {
        e.preventDefault();
        setButtonClick(true);
    };

    const sendDataToServer = async () => {
        const formData = {
            number: DataEdit.number, // Убедитесь, что DataEdit.number доступен и не равен undefined
            VO: VO.value,
            DOV: DOV.value,
            VOconst: VOconst.value,
            DOVconst: DOVconst.value,
            additionalFields: fields,
        };

        try {
            const response = await fetch(`${PATH}/excel/clock`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log('Успешно отправлено:', data);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    return (
        <body>
            <label>Планируемое</label>
            <div>
                <label className="form-label">ВО
                    <input className="input input_w680" onChange={e => VO.onChange(e)} onBlur={e => VO.onBlur(e)} value={VO.value} name="VO" maxLength="40" />
                    
                </label>
                <label className="form-label">ДОВ
                    <input className="input input_w680" onChange={e => DOV.onChange(e)} onBlur={e => DOV.onBlur(e)} value={DOV.value} name="DOV" maxLength="40" />
                </label>
            </div>
            <label>Фактически(по актам)</label>
            <div>
                <label className="form-label">ВО
                    <input className="input input_w680" onChange={e => VOconst.onChange(e)} onBlur={e => VOconst.onBlur(e)} value={VOconst.value} name="VOconst" maxLength="40" />
                </label>
                <label className="form-label">ДОВ
                    <input className="input input_w680" onChange={e => DOVconst.onChange(e)} onBlur={e => DOVconst.onBlur(e)} value={DOVconst.value} name="DOVconst" maxLength="40" />
                </label>
            </div>
            <label>Дополнительные сведения</label>
            {fields.map((field, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>{index + 1}.</label>
                    <label className="form-label">Дата
                        <input 
                            type="text"
                            name="date"
                            value={field.date}
                            onChange={e => handleFieldChange(index, e)} 
                        />
                    </label>
                    <label className="form-label">Месяц
                        <input 
                            type="text"
                            name="month"
                            value={field.month}
                            onChange={e => handleFieldChange(index, e)} 
                            maxLength="20" 
                        />
                    </label>
                    <label className="form-label">Количество часов ВО
                        <input 
                            type="text"
                            name="hoursVO"
                            value={field.hoursVO}
                            onChange={e => handleFieldChange(index, e)} 
                        />
                    </label>
                    <label className="form-label">Количество часов ДОВ
                        <input 
                            type="text"
                            name="hoursDOV"
                            value={field.hoursDOV}
                            onChange={e => handleFieldChange(index, e)} 
                        />
                    </label>
                </div>
            ))}
            
            <div className="center-div">
                <button className="btn btn-1 btn-sep" onClick={handleClick}>Отправить</button>
            </div>
        </body>
    );
}

export default Clock;
