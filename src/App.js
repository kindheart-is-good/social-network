import "./App.css";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersContainer from "./components/Users/UsersContainer";

function App(props) {
    return (
        <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path="/dialogs/*"
                           element={<DialogsContainer />} />
                    <Route path="/profile/*"
                           element={<ProfileContainer />} />
                    <Route path="/users"
                           element={<UsersContainer />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;