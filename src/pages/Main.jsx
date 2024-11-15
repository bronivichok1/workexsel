import "../App.css";
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function Home() {
  const navigate = useNavigate();
  const PATH = process.env.REACT_APP_PATH;

  useEffect(() => {
    document.body.style.display = 'flex';
  }, []);

  // Функция для скачивания файла
  const handleDownload = async () => {
    try {
      const response = await fetch(PATH+'/download/zhurnal', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Ошибка при скачивании файла, статус: ' + response.status);
      }

      const blob = await response.blob(); // Получаем blob из ответа
      const url = window.URL.createObjectURL(blob); // Создаем URL для blob
      const a = document.createElement('a'); // Создаем элемент <a>
      a.style.display = 'none'; // Скрываем элемент
      a.href = url; // Присваиваем URL blob
      a.download = 'Zhurnal.xlsx'; // Указываем имя файла
      document.body.appendChild(a); // Добавляем элемент на страницу
      a.click(); // Программно кликаем на элемент для скачивания
      window.URL.revokeObjectURL(url); // Удаляем URL из памяти
      a.remove(); // Удаляем элемент из документа
    } catch (error) {
      console.error('Ошибка при скачивании файла:', error);
    }
  };

  return ( 
    <body>
      <div className="div_main"> 
        <button className="btn btn-1 btn-sep" onClick={() => navigate('Create', { replace: false })}>Создать</button>
      </div>
      <div className="div_main">
        <button className="btn btn-1 btn-sep" onClick={() => navigate('Edit', { replace: false })}>Найти и редактировать</button>
      </div>
      <div className="div_main">
        <button className="btn btn-1 btn-sep" onClick={() => navigate('Total', { replace: false })}>Сводка</button>
      </div>
      <div className="div_main">
        <button className="btn btn-1 btn-sep" onClick={handleDownload}>Скачать</button> {/* Добавлен вызов функции */}
      </div>
    </body>
  );
}

export default Home;
