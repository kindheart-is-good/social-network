import React from 'react';
import styles from './Users.module.css';
import * as axios from "axios";
import userPhoto from "../../assets/images/userPhoto.png"

const UsersF = (props) => {

    let getUsers = () => {
        if (props.users.length === 0)
        {
            /*props.setUsers([
                {id: 1, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGHL9r9OucwArH8yO3rEDPryG4V3tSCBw-w&usqp=CAU',
                    followed: true, fullName: 'Anna', status: 'Hello',
                    location: {city: 'Minsk', country: 'Belarus'} },
                {id: 2, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGHL9r9OucwArH8yO3rEDPryG4V3tSCBw-w&usqp=CAU',
                    followed: false, fullName: 'Dmitriy', status: 'Hi',
                    location: {city: 'Moscow', country: 'Russia'} },
                {id: 3, photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGHL9r9OucwArH8yO3rEDPryG4V3tSCBw-w&usqp=CAU',
                    followed: false, fullName: 'Leonid', status: 'Wassup',
                    location: {city: 'Kiev', country: 'Ukraine'} },]
            )*/

            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                //debugger;
                props.setUsers(response.data.items);
                //debugger;
            });
        }
    }

    return (
        <div>
            <button onClick={getUsers}>Get Users</button>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <img src={ u.photos.small != null ? u.photos.small : userPhoto } className={styles.userPhoto} />
                        </div>
                        <div>
                            { u.followed
                                ? <button onClick={() => {props.unfollow(u.id) } } >Unfollow</button>
                                : <button onClick={() => {props.follow(u.id) } } >Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                            <div></div>
                        </span>
                        <span>
                            {/*<div>{u.location.country}</div>
                            <div>{u.location.city}</div>*/}
                            <div></div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    );
};

export default UsersF;