const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {
    /* Насколько глубоко нужно копировать? Мы должны копировать только то что планируем изменить (ниже). */
    switch (action.type) {

        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }

        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                /* создаём новый массив,
                 * забираем все элементы из старого массива с помощью spread operator,
                 * а затем добавляем в конец массива новый дополниьельный элемент. */
                messages: [...state.messages, {id: 4, message: body}]
            }

        default:
            return state;
    }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body) => ({type: UPDATE_NEW_MESSAGE_BODY, body: body})

export default dialogsReducer;