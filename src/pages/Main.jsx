import "../App.css"
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function Home() {

  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.display = 'flex';
}, []);

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
</body>
    )
  }
  export default Home