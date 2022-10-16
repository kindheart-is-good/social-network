import React from 'react';
import styles from './Users.module.css';
import userPhoto from "../../assets/images/userPhoto.png"
import {NavLink} from "react-router-dom";
import * as axios from "axios";

let Users = (props) => {

    //debugger;
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        //if (pages.length < 10) {
            pages.push(i);
        //}
    }

    /*
    * * * ВАЖНАЯ ЗАМЕТКА ПО ПОВОДУ ФУНКЦИОНАЛА: follow-unfollow (при работе с Backend server API).
    * Для начала проверьте, чтобы вы зарегестрированы на сайте с Backend server API.
    * Далее проверьте, каким по счёту параметром вы передаёте объект с withCredentials и headers:
    * у GET и DELETE - это должно передаваться 2-ым параметром, у POST - 3-тьим.
    * Еще момент: иногда бывает так, что сервер с API тупит, отдаёт ответ по 40 секунд, тут остаётся только ждать.
    */

    //debugger;
    return <div>
            <div>
                {pages.map(p => {
                    //return <span key={p.id} className={props.currentPage === p && styles.selectedPage}
                    /*т.е. если текущая старница p равна currentPage то тогда в className присобачится styles.selectedPage*/
                    return <span key={p.id} className={props.currentPage === p ? styles.selectedPage : ""}
                                 onClick={(e) => {
                                     props.onPageChanged(p);
                                 }}>{p}</span>
                })}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                     className={styles.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {

                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY" : "11a6c194-cab8-4726-81c1-f9115370431e"
                                        }
                                    })
                                        .then(response => {
                                            //debugger;
                                            if (response.data.resultCode === 0) {
                                                props.unfollow(u.id)
                                            }
                                        });

                                }}>Unfollow</button>
                                : <button onClick={() => {

                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY" : "11a6c194-cab8-4726-81c1-f9115370431e"
                                        }
                                    })
                                        .then(response => {
                                            //debugger;
                                            if (response.data.resultCode === 0) {
                                                props.follow(u.id)
                                            }
                                        });

                                }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            {/*<div>{u.location.country}</div>
                            <div>{u.location.city}</div>*/}
                        </span>
                    </span>
                </div>)
            }
        </div>
}

export default Users;