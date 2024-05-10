import { Route, Routes } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Alert } from "react-bootstrap";

const PrivateRoute = (props) => {
    const {user} = useContext(UserContext);

    if(user && !user.auth)
        return<>
        <Alert variant="danger" dismissible>
            <Alert.Heading>Oh sanp! You got an error!</Alert.Heading>
            <p>
            You don't have permission to acess this route
            </p>

        </Alert>
        </>

    return (
        <>
        {props.children}
        </>
    )

}
export default PrivateRoute;