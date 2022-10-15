import React from "react";
import Header from "./Header";
import * as axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    /* Даже если мы авторизованы на домене https://social-network.samuraijs.com то кука не цепляется автоматически
    потому для Кросс-доменных запросов браузер не цепляет куку автоматически, а ждет подтверждения действия.
    Чтобы добавить подтверждение что мы точно хотим с собой еще отправить авторизационную куку
    нам нужно в GET-запрсе вторым параметром передать специальный объект в котором сидят настройки запроса,
    это withCredentials: true
    и теперь если сервак поддерживает, а сервак поддерживает, то теперь у вас уйдет на сервак авторизованный запрос.
    */
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                //debugger;
                if (response.data.resultCode === 0) {
                    //this.props.setAuthUserData(response.data.data.login, );
                    let {id, email, login} = response.data.data;
                    this.props.setAuthUserData(id, email, login);
                }
                // response.data. - это стандартная структура axios-а для ответа с сервера
                // так получилось что backend-разработчик на соц сети тоже упаковал данные в объект data
                // поэтому и получилось: response.data.data.login
            })
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);