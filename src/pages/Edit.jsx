import "../App.css";
import React, { useEffect, useState } from 'react';
import {DataEdit,Red} from '../DataEdit.jsx'
import { useNavigate } from 'react-router-dom';

function Edit() {
    
    const navigate = useNavigate();
    const [data, setData] = useState([]); 
    const [filter, setFilter] = useState(''); 
    const PATH = process.env.REACT_APP_PATH;
    const [i, setI] = useState(0); 
    
    let mode = false;

    const fetchData = async () => {
        try {
            const response = await fetch(PATH+'/alldata'); 
            if (!response.ok) {
                throw new Error('Сеть не отвечает');
            }
            const result = await response.json();
            setData(result); 
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    const fetchData2 = async (number) => {
        try {
            const response = await fetch(PATH + '/total', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ number }) 
            });
    
            if (!response.ok) {
                throw new Error('Ошибка сети: ' + response.status);
            }
    
            const result = await response.json(); 
            
                const firstItem = result; 

                Red.surname = firstItem[0];
                Red.name = firstItem[1];
                Red.othername = firstItem[2];
                Red.kafedra = firstItem[3];
                Red.workplace = firstItem[8];
                Red.orgcategory = firstItem[9];
                Red.worktitlecategory = firstItem[10];
                Red.studyrang = firstItem[12];
                Red.studystep = firstItem[11];
                Red.kvalcategory = firstItem[13];
                Red.oldstatus = firstItem[14];
                Red.olddata = firstItem[15];
                Red.datanotification = firstItem[16];
                Red.numberdoc = firstItem[17];
                Red.numberdocdop = firstItem[19]; 
                Red.VO = firstItem[4];
                Red.DOV = firstItem[5];
                Red.prim = firstItem[18];
                Red.VoFact = firstItem[20];
                Red.DOVFact = firstItem[21];

                if(mode===true){
                    navigate('TotalEdit', { replace: false })
                }
                    else{
                    navigate('Clock', { replace: false })
                }            
    
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    useEffect(() => {
        document.body.style.display = 'revert';

        if (i < 1) {
            fetchData();
            setI(1);
        }
    }, [mode]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value); 
    };

    const handleEdit = (value) => {
        DataEdit.number=value
        mode=true
        fetchData2(value)
    };

    const handleEditClock = (value) => {
        DataEdit.number=value
        mode=false
        fetchData2(value)
    };

    const filteredData = data.filter(item => 
        item[1] && item[1].toLowerCase().startsWith(filter.toLowerCase())
    );
    return (
        <body >
            <div>
                <div>
                    <h1>Поиск</h1>
                </div>
                <div>
                <input
                    className="input input_w600"
                    type="text"
                    value={filter}
                    onChange={handleFilterChange}
                />
                </div>
            </div>
            <p/>
            <div className="card-container">
    {filteredData.map((item, index) => (
        <div key={index} className="card">
            <div className="card-content">
                <div className="button-container">
                    <button onClick={() => handleEdit(item[0])}>Ред.</button>
                </div>
                <p>-</p>
                <div className="button-container ">
                    <button onClick={() => handleEditClock(item[0])}>Часы</button>
                </div>
                <div className="card-row">
                    <div className="card-item">
                        <p>№</p>
                        <p>{item[0]}</p>
                    </div>
                    <div className="card-item">
                        <p>{item[1]}</p>
                    </div>
                    <div className="card-item">
                        <p>{item[2]}</p>
                    </div>
                    <div className="card-item">
                        <p>{item[3]}</p>
                    </div>
                </div>
                <div className="card-row">
                    <div className="card-item full-width">
                        <p>{item[4]}</p>
                    </div>
                </div>
            </div>
        </div>
    ))}
    </div>

  </body>
    );    
}

export default Edit;
