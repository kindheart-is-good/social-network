import React from "react";
import s from "./ProfileInfo.module.css";

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVGHL9r9OucwArH8yO3rEDPryG4V3tSCBw-w&usqp=CAU'/>
            </div>
            <div className={s.descriptionBlock}>
                ava + description
                <div className={s.ava}>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrvajGCniEQoOTZw0T-P99E-TPmx2CxsaaAA&usqp=CAU'/>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;