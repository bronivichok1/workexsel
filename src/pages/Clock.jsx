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
    const [ButtonClick,setButtonClick]=useState(false)
    const [i, setI] = useState(0); 
    const navigate = useNavigate();

    const VO=useInput('',{isEmpty:true})
    const DOV=useInput('',{isEmpty:true})
    const VOconst=useInput('',{isEmpty:true})
    const DOVconst=useInput('',{isEmpty:true})

    useEffect(() => {
        document.body.style.display = 'revert';

        if (ButtonClick===true) {
            //sendDataToServer()
            setButtonClick(false)
        }
    }, [Red,ButtonClick]);

    function handleClick(e) {
        setButtonClick(true)
        e.preventDefault()
      }
      
    return ( 
        <body>
            
            <label>Планируемое</label>
                <div>
                    <label className="form-label">ВО
                    <input className={VO.isDirty&&VO.isEmpty?"input_error input_w680-error":"input input_w680"}  onChange={e=>VO.onChange(e)} onBlur={e=>VO.onBlur(e)} value={VO.value} name="VO" maxLength="40"/>
                    {(VO.isDirty&&VO.isEmpty)&&<div style={{color:'red'}}></div>}
                    </label>
                    <label className="form-label">ДОВ
                    <input className={DOV.isDirty&&DOV.isEmpty?"input_error input_w680-error":"input input_w680"}  onChange={e=>DOV.onChange(e)} onBlur={e=>DOV.onBlur(e)} value={DOV.value} name="DOV" maxLength="40"/>
                    {(DOV.isDirty&&DOV.isEmpty)&&<div style={{color:'red'}}></div>}
                    </label>
                </div>
                <label>Фактически(по актам)</label>
                <div>
                    <label className="form-label">ВО
                    <input className={VOconst.isDirty&&VO.isEmpty?"input_error input_w680-error":"input input_w680"}  onChange={e=>VOconst.onChange(e)} onBlur={e=>VOconst.onBlur(e)} value={VOconst.value} name="VOconst" maxLength="40"/>
                    {(VOconst.isDirty&&VOconst.isEmpty)&&<div style={{color:'red'}}></div>}
                    </label>
                    <label className="form-label">ДОВ
                    <input className={DOVconst.isDirty&&DOVconst.isEmpty?"input_error input_w680-error":"input input_w680"}  onChange={e=>DOVconst.onChange(e)} onBlur={e=>DOVconst.onBlur(e)} value={DOVconst.value} name="DOVconst" maxLength="40"/>
                    {(DOVconst.isDirty&&DOVconst.isEmpty)&&<div style={{color:'red'}}></div>}
                    </label>
                </div>
           
          <div className="center-div" >
            <button className="btn btn-1 btn-sep" onClick={handleClick}>Отправить</button>
          </div>
        </body>
            )
          }
          export default Clock