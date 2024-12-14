import { createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import About from '../pages/About';
import SalonServices from '../pages/SalonServices';
import Course from '../pages/Course';
import Registration from '../pages/Registration';

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path : "",
        element : <Home/>
      },
      {
        path : "/about",
        element : <About/>
      },
      {
        path : "/service",
        element : <SalonServices/>
      },
      {
        path : "login",
        element : <Login />
      },
      {
        path : "signup",
        element : <Signup />
      },
      {
        path : "register",
        element : <Registration/>
      },
      {
        path : "forgotpassword",
        element : <ForgotPassword />
      },
      {
        path : "/course",
        element : <Course />
      }
    ]
  }
])
export default router;