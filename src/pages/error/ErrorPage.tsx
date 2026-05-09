import { Responses404 } from '@consta/uikit/Responses404';
import { Button } from '@consta/uikit/Button';
import { useNavigate } from 'react-router';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Responses404 
          actions={<Button label="Вернуться на главную страницу" onClick={() => navigate("/")}/>}
        />
    </div>
  )
}

export default ErrorPage