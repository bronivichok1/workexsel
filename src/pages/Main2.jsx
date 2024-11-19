import "../App.css";
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Status } from "../DataEdit";

function Main2() {
  const navigate = useNavigate();
  const PATH = process.env.REACT_APP_PATH;

  useEffect(() => {
    document.body.style.display = 'flex';
    if(Status.status!='red'){
      if(Status.status!='watch'){
        navigate('/', { replace: false })
      }
    }
  }, []);

  const handleDownload = async () => {
    try {
      const response = await fetch(PATH+'/download/zhurnal', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Ошибка при скачивании файла, статус: ' + response.status);
      }

      const blob = await response.blob(); 
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url; 
      a.download = 'Zhurnal.xlsx'; 
      document.body.appendChild(a); 
      a.click(); 
      window.URL.revokeObjectURL(url); 
      a.remove(); 
    } catch (error) {
      console.error('Ошибка при скачивании файла:', error);
    }
  };

  return ( 
    <body>
      <div className="div_main">
        <button className="btn btn-1 btn-sep" onClick={() => navigate('Edit', { replace: false })}>Найти и редактировать</button>
      </div>
      <div className="div_main">
        <button className="btn btn-1 btn-sep" onClick={() => navigate('Total', { replace: false })}>Сводка</button>
      </div>
      <div className="div_main">
        <button className="btn btn-1 btn-sep" onClick={handleDownload}>Скачать</button> 
      </div>
    </body>
  );
}

export default Main2;
