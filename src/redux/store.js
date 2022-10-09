import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi! How are you?', likesCount: 0},
                {id: 2, message: 'It\'s my first post', likesCount: 27},
                {id: 3, message: 'Wish you happy', likesCount: 13}
            ],
            newPostText: "this is new post"
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Anna'},
                {id: 2, name: 'Dmitriy'},
                {id: 3, name: 'Leonid'},
                {id: 4, name: 'Aleksey'},
                {id: 5, name: 'Kate'},
                {id: 6, name: 'Vika'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'Yo'},
                {id: 3, message: 'Wassup'}
            ],
            newMessageBody: ""
        },
        sidebar: {}
    },
    _callbackSubscriber() {
        console.log('state changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callbackSubscriber = observer;
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callbackSubscriber(this._state);
    }
}

export default store;
window.store = store;