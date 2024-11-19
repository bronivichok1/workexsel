import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Status } from "../DataEdit";
import { useNavigate } from "react-router-dom";

function Total() {
    const [i, setI] = useState(0); 
    const PATH = process.env.REACT_APP_PATH;
    const [values, setValues] = useState([]);
    const navigate = useNavigate();

    const fetchValues = async () => {
        try {
            const response = await axios.get(PATH + "/totaldata");
            setValues(response.data.results);
            console.log(response.data); 
            console.log(values)
        } catch (err) {
            console.error("Ошибка при получении данных:", err);
        }
    };

    useEffect(() => {
        if (i < 1) {
            fetchValues();
            setI(1);
        }
        if(Status.status!='red'){
            if(Status.status!='watch'){
              navigate('/', { replace: false })
            }
          }
    }, [i,values]);


    function onTableData(a){
        return values[a] 
    }
    return (
        <div>
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
                        <td>Работники министерств, ведомств, общественных организаций (ГС):</td>
                        <td>{onTableData(0)}</td> 
                    </tr>
                    <tr>
                        <td>2.</td>
                        <td>Работники объединений, предприятий, организаций, учреждений (ОЗ):</td>
                        <td>{onTableData(1)}</td>
                    </tr>
                    <tr>
                        <td>3.</td>
                        <td>
                            Работники научных организаций, научно-практических центров (НО): <br />
                            Преподаватели учреждений образования (УО):
                        </td>
                        <td>
                            {onTableData(2)}
                            <br/>
                            {onTableData(3)}
                        </td>
                    </tr>
                    <tr>
                        <td>4.</td>
                        <td>Преподаватели БГМУ (БГМУ):</td>
                        <td>{onTableData(4)}</td>
                    </tr>
                    <tr>
                        <td>5.</td>
                        <td>Преподаватели ИПКиПКЗ (ИПКиПКЗ)</td>
                        <td>{onTableData(5)}</td>
                    </tr>
                    <tr>
                        <td>6.</td>
                        <td>
                            Ученая степень: <br />
                            Кандидат наук: <br />
                            Доктор наук:
                        </td>
                        <td>
                                {onTableData(6)}
                            <br/>
                                {onTableData(7)}
                            <br/>
                                {onTableData(8)}
                        </td>
                    </tr>
                    <tr>
                        <td>7.</td>
                        <td>
                            Ученое звание: <br />
                            Доцент: <br />
                            Профессор:
                        </td>
                        <td>
                            {onTableData(9)}
                        <br/>
                            {onTableData(10)}
                        <br/>
                            {onTableData(11)}
                        </td>
                    </tr>
                    <tr>
                        <td>8.</td>
                        <td>Магистр</td>
                        <td>{onTableData(12)}</td>
                    </tr>
                    <tr>
                        <td>9.</td>
                        <td>Исследователь</td>
                        <td>{onTableData(13)}</td>
                    </tr>
                    <tr>
                        <td>10.</td>
                        <td>
                            Квалификационная категория: <br />
                            Высшая: <br />
                            1 кат.: <br />
                            2 кат.: <br />
                            б/к:
                        </td>
                        <td>
                            {onTableData(14)}
                        <br/>
                            {onTableData(15)}
                        <br/>
                            {onTableData(16)}
                        <br/>
                            {onTableData(17)}
                        <br/>
                            {onTableData(18)}
                        </td>
                    </tr>
                    <tr>
                        <td>11.</td>
                        <td>Пенсионеры:</td>
                        <td>{onTableData(19)}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Высшее образование:</td>
                        <td>{onTableData(20)}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Дополнительно образованных взрослых:</td>
                        <td>{onTableData(21)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Total;

