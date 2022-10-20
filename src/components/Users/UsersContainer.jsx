import React from 'react';
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching, toggleFollowingProgress
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

/* В этом файле у нас сразу 2 контейнерных компоненты, вложенных друг в друга.
* Задача UsersContainer выполнять GET-запросы.
* А внешняя контейнерная оборачивает её при помощи функции connect()() */

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

        this.props.toggleIsFetching(true);

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                //debugger;
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
                //debugger;
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        /* верхней строчкой мы диспатчим в store новое значение.
        Затем store вернёт нам значение через props, но сначала доработает данная функция (всё тело, ниже). */

        this.props.toggleIsFetching(true);

        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                //debugger;
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                //debugger;
            });
    }

    render() {
        return <>
            { this.props.isFetching ? <Preloader /> : null }
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   /*onPageChanged={this.onPageChanged}*/
                   onPageChanged={this.onPageChanged.bind(this)}
                   /*onPageChanged={() => {this.onPageChanged}}*/
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
                   followingInProgress={this.props.followingInProgress}
            />
            </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

/*let mapDispatchToProps = (dispatch) => {
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
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching));
        },
    }
}*/
// Я с первого раза не понял куда пропал dispatch и как вложенные компоненты будут понимать что мы передаем не просто AC,
// а именно dispatch(AC). Вот понятное разьяснение с habr:
// " ...если вы передаете в connect вторым аргументом не mapDispatchToProps, а объект с AC,
// то connect оборачивает ваши AC в функцию-обертку () => store.dispatch(AC) и передаёт в props компонента."

export default connect(mapStateToProps,
    {follow, unfollow, setUsers, setCurrentPage,
                        setTotalUsersCount, toggleIsFetching, toggleFollowingProgress}
    )(UsersContainer);