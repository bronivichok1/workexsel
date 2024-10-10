import "../App.css";
import React, { useEffect, useState } from 'react';

function Edit() {
    const [data, setData] = useState([]); 
    const [filter, setFilter] = useState(''); 
    const PATH = process.env.REACT_APP_PATH;
    const [i, setI] = useState(0); 

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

    useEffect(() => {
        if (i < 1) {
            fetchData();
            setI(1);
        }
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value); 
    };

    const filteredData = data.filter(item => 
        item[1] && item[1].toLowerCase().startsWith(filter.toLowerCase())
    );
    return (
        <body>
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
                            <div className="card-row">
                            <div className="button-container">
                                <button>Редактировать</button>
                            </div>
                                <div className="card-item">
                                    <p>№</p>
                                    <p>{item[0]}</p>
                                </div>
                                <div className="card-item">
                                    <p>Фамилия</p>
                                    <p>{item[1]}</p>
                                </div>
                                <div className="card-item">
                                    <p>Имя</p>
                                    <p>{item[2]}</p>
                                </div>
                                <div className="card-item">
                                    <p>Отчество</p>
                                    <p>{item[3]}</p>
                                </div>
                                <div className="card-item">
                                    <p>Кафедра</p>
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
