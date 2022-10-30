import React from "react";
import s from "./ProfileInfo.module.css";

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    activateEditMode() {
        //console.log(this.state.editMode);

        /* setState() позволяет изменить local state не окстыльно чтобы React отреагировал и перерисовался,
        * этот метод берётся из React.Component
        * внуть setState() нужно передать объект свойства которого перезапишут те свойства которые были в local state
        * Кстати, важный момент, setState() - это асинхронный метод */
        this.setState({
            editMode: true
        })

        //console.log(this.state.editMode);
    }
    deactivateEditMode() {
        this.setState({
            editMode: false
        })
    }

    render () {
        //debugger;
        /* Если state.editMode != true то отобразим span, а если true тогда отобразим input */
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={ this.activateEditMode.bind(this) }>
                            {this.props.status}
                        </span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus={true} onBlur={ this.deactivateEditMode.bind(this) } value={this.props.status}></input>

            </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;