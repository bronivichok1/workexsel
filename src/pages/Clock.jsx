import "../App.css"
import {useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {DataEdit,Red,Status,Array_Result} from '../DataEdit.jsx'
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

    const handleFieldChange = (index, e) => {
        const { name, value } = e.target;
        const newFields = [...fields];
        newFields[index][name] = value;
        setFields(newFields);
    };

    

    useEffect(() => {


        if ((ButtonClick===true)&&Status.status=='red') {
            sendDataToServer();
            setButtonClick(false);
        }
        if(Status.status!='red'){
            if(Status.status!='watch'){
              navigate('/', { replace: false })
            }
          }
          const transformed = Array_Result.map(item => ({
            date: item[0] || '',        // Используем первый элемент массива
            month: item[1] || '',       // Используем второй элемент массива
            hoursVO: item[2] || 0,      // Используем третий элемент массива
            hoursDOV: item[3] || 0,     // Используем четвертый элемент массива
        }));
            setFields(transformed);
            
    }, [ButtonClick]);

    const handleClick = (e) => {
        e.preventDefault();
        setButtonClick(true);
    };

    const sendDataToServer = async () => {
        const formData = {
            number: DataEdit.number, 
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
                <label className="form-label">ВО:{VO.value}
                </label>
            </div>
            <div>
                <label className="form-label">ДОВ:{DOV.value}
                </label>
            </div>
            <hr/>
            <label>Фактически(по актам)</label>
            <div>
                <label className="form-label">ВО:{VOconst.value}
                </label>
            </div>
            <div>
                <label className="form-label">ДОВ:{DOVconst.value}
                </label>
            </div>
            <hr/>
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
