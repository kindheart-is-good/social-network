import {authAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA:
            //debugger;
            return  {
                ...state,
                ...action.data,
                isAuth: true
                // т.е. если пришли какие-то пользовательские данные то мы для isAuth устанавливаем значение true
            }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login) => ({type: SET_USER_DATA, data: {userId, email, login}})

/* Ниже идут ThunkCreators. */

export const getAuthUserData = () => (dispatch) => {
    authAPI.me()
        .then(response => {
            //debugger;
            if (response.data.resultCode === 0) {
                //this.props.setAuthUserData(response.data.data.login, );
                let {id, email, login} = response.data.data;
                dispatch(setAuthUserData(id, email, login));
            }
            // response.data. - это стандартная структура axios-а для ответа с сервера
            // так получилось что backend-разработчик на соц сети тоже упаковал данные в объект data
            // поэтому и получилось: response.data.data.login
        })
}

export default authReducer;