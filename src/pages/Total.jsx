import "../App.css"
import {useEffect, useState } from 'react'
import axios from 'axios';


function Total() {
    const [i,setI]=useState([0])
    const PATH = process.env.REACT_APP_PATH;
    const [values, setValues] = useState([]);
    const fetchValues = async () => {
        try {
            // Отправляем GET-запрос на сервер
            const response = await axios.get(PATH+'/total');
            // Устанавливаем полученные данные в состояние
            setValues(response.data.values);
            console.log(values)
        } catch (err) {
            console.error('Ошибка при получении данных:', err);
        }
    };

    useEffect(()=>{
        if(i<1){
            fetchValues()
            setI(1)
        }
    },[values])

    

    return(
    <body >
        <table border="1" cellPadding="10">
            <thead>
                <tr>
                    <th>№</th>
                    <th>Описание</th>
                    <th>Значение</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1.</td>
                    <td>Работники министерств, ведомств, общественных организаций (ГС)</td>
                    <td>{}</td>
                </tr>
                <tr>
                    <td>2.</td>
                    <td>Работники объединений, предприятий, организаций, учреждений (ОЗ)</td>
                    <td></td>
                </tr>
                <tr>
                    <td>3.</td>
                    <td>
                        Работники научных организаций, научно-практических центров (НО) <br />
                        Преподаватели учреждений образования (УО)
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>4.</td>
                    <td>Преподаватели БГМУ (БГМУ)</td>
                    <td></td>
                </tr>
                <tr>
                    <td>5.</td>
                    <td>Преподаватели ИПКиПКЗ (ИПКиПКЗ)</td>
                    <td></td>
                </tr>
                <tr>
                    <td>6.</td>
                    <td>
                        Ученая степень: <br />
                        Кандидат наук <br />
                        Доктор наук
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>7.</td>
                    <td>
                        Ученое звание: <br />
                        Доцент <br />
                        Профессор
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>8.</td>
                    <td>Магистр</td>
                    <td></td>
                </tr>
                <tr>
                    <td>9.</td>
                    <td>Исследователь</td>
                    <td></td>
                </tr>
                <tr>
                    <td>10.</td>
                    <td>
                        Квалификационная категория: <br />
                        Высшая <br />
                        1 кат. <br />
                        2 кат. <br />
                        б/к
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>11.</td>
                    <td>Пенсионеры</td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Высшее образование</td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>Дополнительно образованных взрослых</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </body>
    )
    }
    export default Total