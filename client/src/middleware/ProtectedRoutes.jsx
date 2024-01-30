import { Navigate } from "react-router-dom";
import getValueFromLocal from './../utils/localStorage/getValueFromLocal';


const ProtectedRoutes = ({children}) => {
    const token = getValueFromLocal();
    return token ? children : <Navigate to = "/" />
}

export default ProtectedRoutes