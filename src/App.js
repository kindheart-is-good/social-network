import "./App.css";
import {Route, Routes} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPage from "./components/Login/Login";   // можно любое имя т.к. экспорт по дефолту

function App(props) {
    return (
        <div className='app-wrapper'>
            <HeaderContainer />
            <Navbar />
            <div className='app-wrapper-content'>
                <Routes>

                    <Route path="/dialogs/*"
                           element={<DialogsContainer />} />

                    {/*<Route path="/profile/:userId"
                           element={<ProfileContainer />} />
                    <Route path="/profile/"
                           element={<ProfileContainer />} />*/}
                    <Route path="/profile" element={<ProfileContainer />}>
                        <Route path=":userId" element={<ProfileContainer />} />
                    </Route>

                    <Route path="/users"
                           element={<UsersContainer />} />

                    <Route path="/login"
                           element={<LoginPage />} />

                </Routes>
            </div>
        </div>
    );
}

export default App;