import React from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import profileReducer, {getUserProfile} from "../../redux/profile-reducer";
import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom';
import {compose} from "redux";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}



class ProfileContainer extends React.Component {

    componentDidMount() {
        //let userId = this.props.match.params.userId;

        let userId = this.props.router.params.userId;
        if (!userId)
        {
            userId = 26116;
        }

        this.props.getUserProfile(userId);
    }

    render() {
        //debugger;

        /* Проверим залогинен ли юзер: */
        //alert(this.props.isAuth);

        if (!this.props.isAuth) {
            return <Navigate to={"/login"} />
        }

        return (
            <Profile {...this.props}
                     profile={this.props.profile} />
        )
        /*  {...this.props} - это props которые пришли из вне, прокидываем их дальше.   */
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
})


export default connect(mapStateToProps, {getUserProfile})(withRouter(ProfileContainer));

// let WithUrlDataContainerComponent = withRouter(ProfileContainer);   // Чтобы получить данные из URL
// export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);

/*
const TakeParams = (props) => {
    return <ProfileContainer {...props} param={useParams()} />
}
export default connect(mapStateToProps, {setUserProfile})(TakeParams);
// export default compose(
//     connect(mapStateToProps, {setUserProfile})
// ) (TakeParams);
*/