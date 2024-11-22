import "../App.css"
import {useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Status } from "../DataEdit";

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
  const navigate = useNavigate();
  const PATH = process.env.REACT_APP_PATH;
  const [ButtonClick,setButtonClick]=useState(false)

  

  const surname=useInput('',{isEmpty:true})
  const name=useInput('',{isEmpty:true})
  const othername=useInput('',{isEmpty:true})
  const kafedra=useInput('',{isEmpty:true})
  const workplace=useInput('',{isEmpty:true})
  const orgcategory=useInput('ИПКиПКЗ')
  const worktitlecategory=useInput('врач')
  const studyrang=useInput('',{isEmpty:true})
  const studystep=useInput('исслед')
  const kvalcategory=useInput('б/к')
  const oldstatus=useInput('',{isEmpty:true})
  const olddata=useInput('',{isEmpty:true})
  const datanotification=useInput('',{isEmpty:true})
  const numberdoc=useInput('',{isEmpty:true})
  const numberdocdop=useInput('')
  const VO=useInput('',{isEmpty:true})
  const DOV=useInput('',{isEmpty:true})
  const prim=useInput('')


  const prepareData = {
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
      const response = await fetch(PATH+'/excel/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prepareData), // Преобразование объекта в JSON
      });
      if (!response.ok) {
        throw new Error('Ошибка: ' + response.statusText);
      }
      const responseData = await response.json();
      navigate('/Main', { replace: true })
    } catch (error) {
    }
  };

  useEffect(()=>{
  
    if(ButtonClick===true&&Status.status=='red'){
      sendDataToServer()
      setButtonClick(false)
    }
    if(Status.status!='red'){
      if(Status.status!='watch'){
        navigate('/', { replace: false })
      }
    }
  },[ButtonClick])

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
  <label className="form-label">
  Кафедра<span>*</span>
  <select 
    className={kafedra.isDirty && kafedra.isEmpty ? "input_error input_w1350-error" : "input input_w1350"} 
    onChange={e => kafedra.onChange(e)} 
    onBlur={e => kafedra.onBlur(e)} 
    value={kafedra.value} 
    name="kafedra"
  >
    <option value=""></option>
    <option value="внутренних болезней, гастроэнтерологии и нутрициологии с курсом повышения квалификации и переподготовки">внутренних болезней, гастроэнтерологии и нутрициологии с курсом повышения квалификации и переподготовки</option>
    <option value="1-я детских болезней">1-я детских болезней</option>
    <option value="Внутренних болезней, кардиологии и ревматологии с курсом повышения квалификации и переподготовки">Внутренних болезней, кардиологии и ревматологии с курсом повышения квалификации и переподготовки</option>
    <option value="2-я детских болезней">2-я детских болезней</option>
    <option value="Акушерства и гинекологии с курсом повышения квалификации и переподготовки">Акушерства и гинекологии с курсом повышения квалификации и переподготовки</option>
    <option value="Анестезиологии и реаниматологии с курсом повышения квалификации и переподготовки">Анестезиологии и реаниматологии с курсом повышения квалификации и переподготовки</option>
    <option value="Белорусского и русского языков">Белорусского и русского языков</option>
    <option value="Биологии">Биологии</option>
    <option value="Биологической химии">Биологической химии</option>
    <option value="Военной эпидемиологии и военной гигиены">Военной эпидемиологии и военной гигиены</option>
    <option value="Военно-полевой терапии">Военно-полевой терапии</option>
    <option value="Военно-полевой хирургии">Военно-полевой хирургии</option>
    <option value="Гигиены и охраны здоровья детей с курсом повышения квалификации и переподготовки">Гигиены и охраны здоровья детей с курсом повышения квалификации и переподготовки</option>
    <option value="Гигиены труда">Гигиены труда</option>
    <option value="Гистологии, цитологии, эмбриологии">Гистологии, цитологии, эмбриологии</option>
    <option value="Глазных болезней">Глазных болезней</option>
    <option value="Детских инфекционных болезней с курсом повышения квалификации и переподготовки">Детских инфекционных болезней с курсом повышения квалификации и переподготовки</option>
    <option value="Детской хирургии с курсом повышения квалификации и переподготовки">Детской хирургии с курсом повышения квалификации и переподготовки</option>
    <option value="Детской эндокринологии, клинической генетики и иммунологии с курсом повышения квалификации и переподготовки">Детской эндокринологии, клинической генетики и иммунологии с курсом повышения квалификации и переподготовки</option>
    <option value="Дерматовенерологии и косметологии с курсом повышения квалификации и переподготовки">Дерматовенерологии и косметологии с курсом повышения квалификации и переподготовки</option>
    <option value="Иностранных языков">Иностранных языков</option>
    <option value="Инфекционных болезней с курсом повышения квалификации и переподготовки">Инфекционных болезней с курсом повышения квалификации и переподготовки</option>
    <option value="Кардиологии и внутрениих болезней">Кардиологии и внутрениих болезней</option>
    <option value="Клинической фармакологии">Клинической фармакологии</option>
    <option value="Консервативной стоматологии">Консервативной стоматологии</option>
    <option value="Латинского языка">Латинского языка</option>
    <option value="Лучевой диагностики и лучевой терапии">Лучевой диагностики и лучевой терапии</option>
    <option value="Медицинской и биологической физики">Медицинской и биологической физики</option>
    <option value="Медицинской реабилитации и спортивной медицины с курсом повышения квалификации и переподготовки">Медицинской реабилитации и спортивной медицины с курсом повышения квалификации и переподготовки</option>
    <option value="Микробиологии, вирусологии, иммунологии">Микробиологии, вирусологии, иммунологии</option>
    <option value="Морфологии человека">Морфологии человека</option>
    <option value="Нервных и нейрохирургических болезней">Нервных и нейрохирургических болезней</option>
    <option value="Нормальной анатомии">Нормальной анатомии</option>
    <option value="Нормальной физиологии">Нормальной физиологии</option>
    <option value="Общей гигиены">Общей гигиены</option>
    <option value="Общей химии">Общей химии</option>
    <option value="Общей хирургии">Общей хирургии</option>
    <option value="Общественного здоровья и здравоохранения">Общественного здоровья и здравоохранения</option>
    <option value="Онкологии с курсом повышения квалификации и переподготовки">Онкологии с курсом повышения квалификации и переподготовки</option>
    <option value="Оперативной хирургии и топографической анатомии">Оперативной хирургии и топографической анатомии</option>
    <option value="Организации медицинского обеспечения войск и экстремальной  медицины ">Организации медицинского обеспечения войск и экстремальной  медицины </option>
    <option value="Организации фармации с курсом повышения квалификации и переподготовки">Организации фармации с курсом повышения квалификации и переподготовки</option>
    <option value="Ортопедической стоматологии и ортодонтии ">Ортопедической стоматологии и ортодонтии </option>
    <option value="Оториноларингологии с курсом повышения квалификации и переподготовки">Оториноларингологии с курсом повышения квалификации и переподготовки</option>
    <option value="Патологической анатомии и судебной медицины с курсом повышения квалификации и переподготовки">Патологической анатомии и судебной медицины с курсом повышения квалификации и переподготовки</option>
    <option value="Патологической физиологии">Патологической физиологии</option>
    <option value="Педагогики, психологии и клинического моделирования с курсом повышения квалификации и переподготовки">Педагогики, психологии и клинического моделирования с курсом повышения квалификации и переподготовки</option>
    <option value="Периодонтологии">Периодонтологии</option>
    <option value="Поликлинической терапии">Поликлинической терапии</option>
    <option value="Пропедевтики внутренних болезней">Пропедевтики внутренних болезней</option>
    <option value="Пропедевтики детских болезней">Пропедевтики детских болезней</option>
    <option value="Психиатрии, наркологии, психотерапии и медицинской психологии с курсом повышения квалификации и переподготовки">Психиатрии, наркологии, психотерапии и медицинской психологии с курсом повышения квалификации и переподготовки</option>
    <option value="Пульмологии, фтизиатрии, аллергологии и профпатологии с курсом повышения квалификации и переподготовки">Пульмологии, фтизиатрии, аллергологии и профпатологии с курсом повышения квалификации и переподготовки</option>
    <option value="Радиационной медицины и экологии">Радиационной медицины и экологии</option>
    <option value="Симуляционно-аттестационный центр высшего образования">Симуляционно-аттестационный центр высшего образования</option>
    <option value="Стоматологической пропедевтики и материаловедения">Стоматологической пропедевтики и материаловедения</option>
    <option value="Стоматология детского возраста">Стоматология детского возраста</option>
    <option value="Травматологии и ортопедии с курсом повышения квалификации и переподготовки">Травматологии и ортопедии с курсом повышения квалификации и переподготовки</option>
    <option value="Урологии и нефрологии с курсом повышения квалификации и переподготовки">Урологии и нефрологии с курсом повышения квалификации и переподготовки</option>
    <option value="Фармакологии">Фармакологии</option>
    <option value="Фармацевтической технологии с курсом повышения квалификации и переподготовки">Фармацевтической технологии с курсом повышения квалификации и переподготовки</option>
    <option value="Фармацевтической химии с курсом повышения квалификации и переподготовки">Фармацевтической химии с курсом повышения квалификации и переподготовки</option>
    <option value="Физического воспитания и спорта">Физического воспитания и спорта</option>
    <option value="Философии и политологии">Философии и политологии</option>
    <option value="Хирургии и трансплантологии с курсом повышения квалификации и переподготовки">Хирургии и трансплантологии с курсом повышения квалификации и переподготовки</option>
    <option value="Хирургических болезней с курсом повышения квалификации и переподготовки">Хирургических болезней с курсом повышения квалификации и переподготовки</option>
    <option value="Хирургической стоматологии">Хирургической стоматологии</option>
    <option value="Челюстно-лицевой хирургии и пластической хирургии лица с курсом повышения квалификации и переподготовки">Челюстно-лицевой хирургии и пластической хирургии лица с курсом повышения квалификации и переподготовки</option>
    <option value="Эндодонтии">Эндодонтии</option>
    <option value="Эндокринологии ">Эндокринологии </option>
    <option value="Эпидемиологии">Эпидемиологии</option>
    <option value="кардиохирургии ИПКиПКЗ">кардиохирургии ИПКиПКЗ</option>
    <option value="ортопедической стоматологии и ортодотии с курсом детской стоматологии ИПКиПКЗ">ортопедической стоматологии и ортодотии с курсом детской стоматологии ИПКиПКЗ</option>
    <option value="офтальмологии ИПКиПКЗ">офтальмологии ИПКиПКЗ</option>
    <option value="пластической хирургии и комбустиологии ИПКиПКЗ">пластической хирургии и комбустиологии ИПКиПКЗ</option>
    <option value="терапевтической стоматологии ИПКиПКЗ">терапевтической стоматологии ИПКиПКЗ</option>
    <option value="клинической фармакологии и фармакотерапии ИПКиПКЗ">клинической фармакологии и фармакотерапии ИПКиПКЗ</option>
    <option value="неврологии и нейрохирургии ИПКиПКЗ">неврологии и нейрохирургии ИПКиПКЗ</option>
    <option value="рефлексотерапии ИПКиПКЗ">рефлексотерапии ИПКиПКЗ</option>
    <option value="терапии ИПКиПКЗ">терапии ИПКиПКЗ</option>
    <option value="клинической эндокринологии ИПКиПКЗ">клинической эндокринологии ИПКиПКЗ</option>
    <option value="акушерства и гинекологии ИПКиПКЗ">акушерства и гинекологии ИПКиПКЗ</option>
    <option value="детской анестезиологии и рениматологии ИПКиПКЗ">детской анестезиологии и рениматологии ИПКиПКЗ</option>
    <option value="детской неврологии ИПКиПКЗ">детской неврологии ИПКиПКЗ</option>
    <option value="детской онкологии, гематологии и иммунологии ИПКиПКЗ">детской онкологии, гематологии и иммунологии ИПКиПКЗ</option>
    <option value="клинической гематологии и трансфузиологии ИПКиПКЗ">клинической гематологии и трансфузиологии ИПКиПКЗ</option>
    <option value="педиатрии ИПКиПКЗ">педиатрии ИПКиПКЗ</option>
    <option value="репродуктивного здоровья, перинатологии и медицинской генетики ИПКиПКЗ">репродуктивного здоровья, перинатологии и медицинской генетики ИПКиПКЗ</option>
    <option value="лучевой диагностики ИПКиПКЗ">лучевой диагностики ИПКиПКЗ</option>
    <option value="медицинской экспертизы и оценки качества оказания медицинской помощи ИПКиПКЗ">медицинской экспертизы и оценки качества оказания медицинской помощи ИПКиПКЗ</option>
    <option value="организации здравоохранения ИПКиПКЗ">организации здравоохранения ИПКиПКЗ</option>
    <option value="скорой медицинской помощи и медицины катастроф ИПКиПКЗ">скорой медицинской помощи и медицины катастроф ИПКиПКЗ</option>
    <option value="ультразвуковой диагностики ИПКиПКЗ">ультразвуковой диагностики ИПКиПКЗ</option>
    <option value="финансового менеджмента и информатизации здравоохранения ИПКиПКЗ">финансового менеджмента и информатизации здравоохранения ИПКиПКЗ</option>
    <option value="клинической микробиологии, лабораторной диагностики и эпидемиологии ИПКиПКЗ">клинической микробиологии, лабораторной диагностики и эпидемиологии ИПКиПКЗ</option>
    <option value="хирургии и эндоскопии ИПКиПКЗ">хирургии и эндоскопии ИПКиПКЗ</option>
    <option value="общей врачебной практики с курсом гериатрии и паллиативной медицины ИПКиПКЗ">общей врачебной практики с курсом гериатрии и паллиативной медицины ИПКиПКЗ</option>
  </select>
  {(kafedra.isDirty && kafedra.isEmpty) && <div style={{color: 'red'}}>Это поле обязательно для заполнения.</div>}
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