import "../App.css"
import {useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {DataEdit,Red,Status} from '../DataEdit.jsx'
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

function Create() {
    const PATH = process.env.REACT_APP_PATH;
    const [ButtonClick,setButtonClick]=useState(false)
    const [i, setI] = useState(0); 
    const navigate = useNavigate();


    const surname=useInput(Red.surname,{isEmpty:true})
    const name=useInput(Red.name,{isEmpty:true})
    const othername=useInput(Red.othername,{isEmpty:true})
    const kafedra=useInput(Red.kafedra,{isEmpty:true})
    const workplace=useInput(Red.workplace,{isEmpty:true})
    const orgcategory=useInput(Red.orgcategory)
    const worktitlecategory=useInput(Red.worktitlecategory)
    const studyrang=useInput(Red.studyrang,{isEmpty:true})
    const studystep=useInput(Red.studystep)
    const kvalcategory=useInput(Red.kvalcategory)
    const oldstatus=useInput(Red.oldstatus,{isEmpty:true})
    const olddata=useInput(Red.olddata,{isEmpty:true})
    const datanotification=useInput(Red.datanotification,{isEmpty:true})
    const numberdoc=useInput(Red.numberdoc,{isEmpty:true})
    const numberdocdop=useInput(Red.numberdocdop)
    const VO=useInput(Red.VO,{isEmpty:true})
    const DOV=useInput(Red.DOV,{isEmpty:true})
    const prim=useInput(Red.prim)

    const prepareData = {
      number: DataEdit.number,
      surname: surname.value,
      name: name.value,
      othername: othername.value,
      kafedra: kafedra.value,
      workplace: workplace.value,
      orgcategory: orgcategory.value,
      worktitlecategory: worktitlecategory.value,
      studyrang: studyrang.value,
      studystep: studystep.value,
      kvalcategory: kvalcategory.value,
      oldstatus: oldstatus.value,
      olddata: olddata.value,
      datanotification: datanotification.value,
      numberdoc: numberdoc.value,
      numberdocdop: numberdocdop.value,
      VO: VO.value,
      DOV: DOV.value,
      prim:prim.value
  };

  const sendDataToServer = async () => {
    try {
      const response = await fetch(PATH+'/excel/red', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prepareData), 
      });
      if (!response.ok) {
        throw new Error('Ошибка: ' + response.statusText);
      }
      const responseData = await response.json();
      navigate('/Main', { replace: false })
    } catch (error) {
    }
  };
    

    useEffect(() => {
        document.body.style.display = 'revert';

        if ((ButtonClick===true)&&Status.status=='red') {
            sendDataToServer()
            setButtonClick(false)
        }
        if(Status.status!='red'){
          if(Status.status!='watch'){
            navigate('/', { replace: false })
          }
        }
    }, [Red,ButtonClick]);

    function handleClick(e) {
        setButtonClick(true)
        e.preventDefault()
      }
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
       {(othername.isDirty&&othername.isEmpty)&&<div style={{color:'red'}}></div>}
    </label>
  </div>
  <div>
    <label className="form-label">Кафедра<span>*</span>
      <input  className={kafedra.isDirty&&kafedra.isEmpty?"input_error input_w1350-error":"input input_w1350"} onChange={e=>kafedra.onChange(e)} onBlur={e=>kafedra.onBlur(e)} value={kafedra.value}   name="kafedra" maxLength="80" />
        {(kafedra.isDirty&&kafedra.isEmpty)&&<div  style={{color:'red'}}></div>}
      </label> 
  </div>
  <div>
  <label className="form-label">Основное место работы<span>*</span>
      <input  className={workplace.isDirty&&workplace.isEmpty?"input_error input_w600-error":"input input_w600"} onChange={e=>workplace.onChange(e)} onBlur={e=>workplace.onBlur(e)} value={workplace.value}   name="workplace" maxLength="40" />
      {(workplace.isDirty&&workplace.isEmpty)&&<div  style={{color:'red'}}></div>}
    </label> 
    <label className="form-label">Категория организации<span>*</span>
      <select className="select select_w450" onChange={e=>orgcategory.onChange(e)} onBlur={e=>orgcategory.onBlur(e)} value={orgcategory.value}  name="orgcategory">
        <option value='ИПКиПКЗ'>Институт повышения квалификации и переподготовки кадров здравоохранения</option>
        <option value='ОЗ'>Организации здравоохранения, предприятия, объединения</option>
        <option value='ГО'>Министерства, ведомства, общественные организации</option>
        <option value='НО'>Научные организации, научно-практические центры</option>
        <option value='УО'>Учреждения образования</option>
        <option value='БГМУ'>БГМУ</option>
        <option value='иные'>Иные работники</option>
      </select>
    </label>
    <label className="form-label">Категория должности<span>*</span>
      <select className="select select_w450" onChange={e=>worktitlecategory.onChange(e)} onBlur={e=>worktitlecategory.onBlur(e)} value={worktitlecategory.value}  name="orgcategory">
        <option value='врач'>врачи-специалисты</option>
        <option value='аспирант'>аспиранты очной (дневной) формы получения образования</option>
        <option value='гос.служ.'>государственный служащий</option>
        <option value='науч.раб.'>научный работник</option>
        <option value='БГМУ_ППС'>профессорско-преподавательский состав БГМУ</option>
        <option value='ИПКиПКЗ_ППС'>профессорско-преподавательский состав ИПКиПКЗ</option>
        <option value='иные'>иные категории работников</option>
      </select>
    </label>
  </div>
  <div>
    <label className="form-label">Учёное звание<span>*</span>
      <input  className={studyrang.isDirty&&studyrang.isEmpty?"input_error input_w600-error":"input input_w600"} onChange={e=>studyrang.onChange(e)} onBlur={e=>studyrang.onBlur(e)} value={studyrang.value}   name="studyrang" maxLength="40" />
      {(studyrang.isDirty&&studyrang.isEmpty)&&<div  style={{color:'red'}}></div>}
    </label> 
    <label className="form-label">Учёная степень<span>*</span>
      <select className="select select_w450" onChange={e=>studystep.onChange(e)} onBlur={e=>studystep.onBlur(e)} value={studystep.value}  name="studystep">
        <option value='исслед.'>исследователь</option>
        <option value='магистр'>магистр</option>
        <option value='д.н.'>доктор наук</option>
        <option value='НО'>кандидат наук</option>
      </select>
    </label>
    <label className="form-label">Квалификационная категория<span>*</span>
      <select className="select select_w450" onChange={e=>kvalcategory.onChange(e)} onBlur={e=>kvalcategory.onBlur(e)} value={kvalcategory.value}  name="kvalcategory">
        <option value='б/к'>специалисты, не имеющие квалификационной категории</option>
        <option value='1'>специалисты, имеющие 1 квалификационную категорию</option>
        <option value='2'>специалисты, имеющие 2 квалификационную категорию</option>
        <option value='в'>специалисты, имеющие высшую квалификационную категорию</option>
      </select>
    </label>
  </div>
  <div>
    <label className="form-label">Пенсионер<span>*</span>
      <input  className={oldstatus.isDirty&&oldstatus.isEmpty?"input_error input_w600-error":"input input_w600"} onChange={e=>oldstatus.onChange(e)} onBlur={e=>oldstatus.onBlur(e)} value={oldstatus.value}   name="oldstatus" maxLength="40" />
      {(oldstatus.isDirty&&oldstatus.isEmpty)&&<div  style={{color:'red'}}></div>}
    </label> 
    <label className="form-label">Дата приобретения статуса пенсионера<span>*</span>
      <input className={olddata.isDirty&&olddata.isEmpty?"input_error input_w600-error":"input input_w600"}  onChange={e=>olddata.onChange(e)} onBlur={e=>olddata.onBlur(e)} value={olddata.value} name="olddata" maxLength="40"/>
      {(olddata.isDirty&&olddata.isEmpty)&&<div style={{color:'red'}}></div>}
    </label>
    <label className="form-label">Дата получения уведомления<span>*</span>
      <input className={datanotification.isDirty&&datanotification.isEmpty?"input_error input_w600-error":"input input_w600"}  onChange={e=>datanotification.onChange(e)} onBlur={e=>datanotification.onBlur(e)} value={datanotification.value} name="datanotification" maxLength="40"/>
       {(datanotification.isDirty&&datanotification.isEmpty)&&<div style={{color:'red'}}></div>}
    </label>
  </div>
  <div>
    <label className="form-label">Номер и дата договора<span>*</span>
      <input className={numberdoc.isDirty&&numberdoc.isEmpty?"input_error input_w680-error":"input input_w680"}  onChange={e=>numberdoc.onChange(e)} onBlur={e=>numberdoc.onBlur(e)} value={numberdoc.value} name="numberdoc" maxLength="40"/>
      {(numberdoc.isDirty&&numberdoc.isEmpty)&&<div style={{color:'red'}}></div>}
    </label>
    <label className="form-label">Номер и дата дополнительного соглашения(при наличии)
      <input className="input input_w680"  onChange={e=>numberdocdop.onChange(e)} onBlur={e=>numberdocdop.onBlur(e)} value={numberdocdop.value} name="numberdocdop" maxLength="40"/>
    </label>  
  </div>
  <p align="center"> 
    <b>
      <label className="form-label"  >Планируемое количество часов по договору<span>*</span>
      </label>
    </b>  
  </p>
  <p></p>
  <div>
    <label className="form-label">ВО<span>*</span>
      <input className={VO.isDirty&&VO.isEmpty?"input_error input_w680-error":"input input_w680"}  onChange={e=>VO.onChange(e)} onBlur={e=>VO.onBlur(e)} value={VO.value} name="VO" maxLength="40"/>
      {(VO.isDirty&&VO.isEmpty)&&<div style={{color:'red'}}></div>}
    </label>
    <label className="form-label">ДОВ<span>*</span>
      <input className={DOV.isDirty&&DOV.isEmpty?"input_error input_w680-error":"input input_w680"}  onChange={e=>DOV.onChange(e)} onBlur={e=>DOV.onBlur(e)} value={DOV.value} name="DOV" maxLength="40"/>
      {(DOV.isDirty&&DOV.isEmpty)&&<div style={{color:'red'}}></div>}
    </label>
  </div>
  <div>
    <label className="form-label">Примечание
      <input className="input input_w1350"  onChange={e=>prim.onChange(e)} onBlur={e=>prim.onBlur(e)} value={prim.value} name="prim" maxLength="80"/>
    </label>
  </div>
  <div className="center-div" >
    <button className="btn btn-1 btn-sep" onClick={handleClick}>Отправить</button>
  </div>
</body>
    )
  }
  export default Create