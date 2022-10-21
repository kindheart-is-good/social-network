import {usersAPI} from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [ ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],    // это массив, в который будем помещать id того пользователя которого мы фолловим/анфолловим
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case FOLLOW:
            return  {
                ...state,
                users: state.users.map (u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return  {
                ...state,
                users: state.users.map (u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }

        case SET_USERS: {
            return { ...state, users: action.users }
        }

        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }

        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }

        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            /* В этом действии мы будем получать id и значение в isFetching (true либо false),
             * а также id пользователя, которого сейчас пытаемся зафоловить.
             * и благодаря этой id мы должны будем сделать копию массива и удалить из массива юзера которого мы анфоловим?
             * а если фоловим то тогда добавить в конец массива нужного юзера (который приходит к нам через action).
             * В случае анфолов не делаем деструктуризацию т.к. метод filter() всегда возвращает новый объекта массива. */
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }

        default:
            return state;
    }
}

// ActionCreator - это функция, которая возвращает объект Action.
// Action - это объект, в котором инкапсулированы все данные для того чтобы Reducer получил этот Action и применил изменения на свой state.

/* после запятой запись означает создание свойства
* по факту это   userId: userId   , но в JS такое создание свойства в объекте можно записать просто как userId */
export const followSuccess = (userId) => ({type: FOLLOW, userId })
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId })
export const setUsers = (users) => ({type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

/* Ниже идут ThunkCreators. */

export const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
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

        dispatch(toggleIsFetching(true));

        usersAPI.getUsers(currentPage, pageSize).then(data => {
            //debugger;
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
            //debugger;
        });
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        //debugger;
        dispatch(toggleFollowingProgress(true, userId));    // временно задизеблить кнопку

        usersAPI.follow(userId)     // вызываем follow и когда сервер подтвердит что follow произошел тогда выполняем then()
            .then(response => {
                //debugger;
                if (response.data.resultCode == 0) {
                    dispatch(followSuccess(userId));
                }
                dispatch(toggleFollowingProgress(false, userId));
            });
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        //debugger;
        dispatch(toggleFollowingProgress(true, userId));

        usersAPI.unfollow(userId)
            .then(response => {
                //debugger;
                if (response.data.resultCode == 0) {
                    dispatch(unfollowSuccess(userId));
                }
                dispatch(toggleFollowingProgress(false, userId));
            });
    }
}

export default usersReducer;