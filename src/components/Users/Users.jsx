import React from 'react';
import styles from './Users.module.css';
import userPhoto from "../../assets/images/userPhoto.png"
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";

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
                                /* Если в массиве хоть одна id === u.id то тогдв дизейблим кнопку */
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => {
                                        //debugger;
                                        props.toggleFollowingProgress(true, u.id);

                                        usersAPI.follow(u.id)
                                            .then(response => {
                                                //debugger;
                                                if (response.data.resultCode === 0) {
                                                    props.unfollow(u.id)
                                                }
                                                props.toggleFollowingProgress(false, u.id);
                                            });

                                }}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => {
                                        //debugger;
                                        props.toggleFollowingProgress(true, u.id);

                                        usersAPI.unfollow(u.id)
                                            .then(response => {
                                                //debugger;
                                                if (response.data.resultCode === 0) {
                                                    props.follow(u.id)
                                                }
                                                props.toggleFollowingProgress(false, u.id);
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