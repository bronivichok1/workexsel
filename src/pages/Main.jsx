import "../App.css"
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  return ( 
<body> 
  <div> 
    <button className="btn btn-1 btn-sep" onClick={() => navigate('Create', { replace: false })}>Создать</button>
  </div>
  <div>
    <button className="btn btn-1 btn-sep" onClick={() => navigate('Edit', { replace: false })}>Найти и редактировать</button>
  </div>
  <div>
    <button className="btn btn-1 btn-sep" onClick={() => navigate('Total', { replace: false })}>Сводка</button>
  </div>
</body>
    )
  }
  export default Home