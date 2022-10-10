import {combineReducers, legacy_createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
});

//let store = createStore(reducers);
let store = legacy_createStore(reducers);

/*  Для дебага из консоли браузера. Сохраняем ссылку на наш объект store в глобальный объект.   */
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