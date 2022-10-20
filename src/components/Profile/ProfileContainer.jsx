import React from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import profileReducer, {setUserProfile} from "../../redux/profile-reducer";
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {compose} from "redux";
import {usersAPI} from "../../api/api";

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

        usersAPI.getProfile(userId)
            .then(response => {
                //debugger;
                this.props.setUserProfile(response.data);
                //debugger;
            });
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


export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer));

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