import React from 'react';
import styles from './Users.module.css';
import userPhoto from "../../assets/images/userPhoto.png"

let Users = (props) => {

    //debugger;
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i=1; i <= pagesCount; i++) {
        //if (pages.length < 10) {
            pages.push(i);
        //}
    }

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
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                 className={styles.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
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