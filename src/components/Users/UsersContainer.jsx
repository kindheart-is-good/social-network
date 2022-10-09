import React from 'react';
import {connect} from "react-redux";
import {followAC, unfollowAC, setUsersAC, setCurrentPageAC, setUsersTotalCountAC} from "../../redux/users-reducer";
import * as axios from "axios";
import Users from "./Users";
import preloader from '../../assets/images/preloader.svg';

/* В этом файле у нас сразу 2 контейнерных компоненты, вложенных друг в друга.
* Задача UsersContainer выполнять GET-запросы.
* А внешняя контейнерная оборачивает её при помощи функцмм connect()() */

class UsersContainer extends React.Component {

    componentDidMount() {
        /*props.setUsers([
                {id: 1, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGHL9r9OucwArH8yO3rEDPryG4V3tSCBw-w&usqp=CAU',
                    followed: true, fullName: 'Anna', status: 'Hello',
                    location: {city: 'Minsk', country: 'Belarus'} },
                {id: 2, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGHL9r9OucwArH8yO3rEDPryG4V3tSCBw-w&usqp=CAU',
                    followed: false, fullName: 'Dmitriy', status: 'Hi',
                    location: {city: 'Moscow', country: 'Russia'} },
                {id: 3, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGHL9r9OucwArH8yO3rEDPryG4V3tSCBw-w&usqp=CAU',
                    followed: false, fullName: 'Leonid', status: 'Wassup',
                    location: {city: 'Kiev', country: 'Ukraine'} },]
            )*/

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                //debugger;
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
                //debugger;
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        /* верхней строчкой мы диспатчим в store новое значение.
        Затем store вернёт нам значение через props, но сначала доработает данная функция (всё тело, ниже). */

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                //debugger;
                this.props.setUsers(response.data.items);
                //debugger;
            });
    }

    render() {
        return <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      /*onPageChanged={this.onPageChanged}*/
                      onPageChanged={this.onPageChanged.bind(this)}
                      /*onPageChanged={() => {this.onPageChanged}}*/
                      users={this.props.users}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
        />
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setUsersTotalCountAC(totalCount));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);