import React from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import profileReducer, {getUserProfile} from "../../redux/profile-reducer";
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

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
        return (
            <Profile {...this.props}
                     profile={this.props.profile} />
        )
        /*  {...this.props} - это props которые пришли из вне, прокидываем их дальше.   */
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)