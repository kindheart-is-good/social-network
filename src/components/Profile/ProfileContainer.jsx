import React from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import * as axios from "axios";
import profileReducer, {setUserProfile} from "../../redux/profile-reducer";

class ProfileContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/3`)
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

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);