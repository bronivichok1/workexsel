import "../App.css"
import {useEffect, useState } from 'react'

const useValidation=(value,validations)=>{
  const[isEmpty,setEmpty]=useState(true)
  const[ismobileNum,setmobileNum]=useState(true)
  const[isemailCheck,setemailCheck]=useState(true)
  const[inputData,setInputData]=useState(true)
  const[Num,setInputNum]=useState(true)

  useEffect(()=>{
      for(const validation in validations){
          switch(validation){
              case'isEmpty':
                  value?setEmpty(false):setEmpty(true)  
              break;
              case'ismobileNum':
                  var num= /^\d*\+?\d*$/
                  num.test(String(value).toLowerCase())?setmobileNum(false):setmobileNum(true) 
              break;
              case'isemailCheck':
                  var mail=/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
                  mail.test(String(value).toLowerCase())?setemailCheck(false):setemailCheck(true) 
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
  },[value,validations,isEmpty,inputData,isemailCheck,ismobileNum])
  return{
      isEmpty,
      ismobileNum,
      isemailCheck,
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

function Create() {

  const surname=useInput('',{isEmpty:true})
  const name=useInput('',{isEmpty:true})
  const othername=useInput('',{isEmpty:true})

  return ( 
<body> 
  <div>
    <label className="form-label">Фамилия<span>*</span>
                <input  className={surname.isDirty&&surname.isEmpty?"input_error input_w600-error":"input input_w600"} onChange={e=>surname.onChange(e)} onBlur={e=>surname.onBlur(e)} value={surname.value}   name="surname" maxLength="40" />
                    {(surname.isDirty&&surname.isEmpty)&&<div  style={{color:'red'}}></div>}
    </label> 
    <label className="form-label">Имя<span>*</span>
                <input className={name.isDirty&&name.isEmpty?"input_error input_w600-error":"input input_w600"}  onChange={e=>name.onChange(e)} onBlur={e=>name.onBlur(e)} value={name.value} name="name" maxLength="40"/>
                    {(name.isDirty&&name.isEmpty)&&<div style={{color:'red'}}></div>}
    </label>
    <label className="form-label">Отчество<span>*</span>
                <input className={othername.isDirty&&othername.isEmpty?"input_error input_w600-error":"input input_w600"}  onChange={e=>othername.onChange(e)} onBlur={e=>othername.onBlur(e)} value={othername.value} name="othername" maxLength="40"/>
                    {(othername.isDirty&&othername.isEmpty)&&<div style={{color:'red'}}> </div>}
    </label>
  </div>
  <div>
    <button className="btn btn-1 btn-sep">Отправить</button>
  </div>
</body>
    )
  }
  export default Create