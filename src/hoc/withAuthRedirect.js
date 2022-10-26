import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

/* This HOC makes Redirect to page Login for users who are not logged-in. */

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            //debugger;

            /* Проверим залогинен ли юзер: */
            //alert(this.props.isAuth);

            if (!this.props.isAuth) {
                return <Navigate to={"/login"} />
            }

            return <Component {...this.props} />
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}