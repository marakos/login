import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header  from './components/shared/Header/Header';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import {useSelector} from "react-redux";
import routes from './routes';
import useRoutes from 'react-router-dom';

const App = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    const routing = useRoutes(routes(isLoggedIn));

  return (
            <>
                {routing}
            </>
  );
};


export default App;