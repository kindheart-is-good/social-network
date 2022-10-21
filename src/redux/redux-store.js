import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
});

//let store = createStore(reducers);
let store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));

/*  Для дебага из консоли браузера. Сохраняем ссылку на наш объект store в глобальный объект.   */
/*  Создаём в объекте window свойство store. Записываем туда store созданный при помощи Redux фунции legacy_createStore(reducers)   */
/*  У Redux store есть метод getState(), его и нужно вбить в консоли браузера.  */
/*  Пример: store.getState().profilePage.profile    */
window.store = store;

export default store;



//
// import { configureStore } from '@reduxjs/toolkit'
// import dialogsReducer from "./dialogs-reducer"
// import profileReducer from "./profile-reducer";
//
// let store = configureStore({
//     reducer: {
//         dialogsPage: dialogsReducer,
//         profilePage: profileReducer,
//     }
// });
//
// export default store;