import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserData} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    /* Даже если мы авторизованы на домене https://social-network.samuraijs.com то кука не цепляется автоматически
    потому для Кросс-доменных запросов браузер не цепляет куку автоматически, а ждет подтверждения действия.
    Чтобы добавить подтверждение что мы точно хотим с собой еще отправить авторизационную куку
    нам нужно в GET-запрсе вторым параметром передать специальный объект в котором сидят настройки запроса,
    это withCredentials: true
    и теперь если сервак поддерживает, а сервак поддерживает, то теперь у вас уйдет на сервак авторизованный запрос.
    */
    componentDidMount() {
        this.props.getAuthUserData();
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);