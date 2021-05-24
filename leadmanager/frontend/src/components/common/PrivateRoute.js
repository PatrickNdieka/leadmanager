import React from 'react'
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

const PrivateRoute = ({ component:Component, auth, ...rest }) => {
    return <Route 
        {...rest}
        render={
            props => {
                if(auth.isLoading){
                    return <h2>Loading...</h2>
                }else if (!auth.isAuthenticated){
                    return <Redirect to="login"/>
                }else{
                    return <Component {...props}/>
                }
            }
        }
    />
};

const mapStatesToProps = state => ({
    auth: state.auth
});

export default connect(mapStatesToProps)(PrivateRoute);