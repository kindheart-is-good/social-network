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

export default authReducer;