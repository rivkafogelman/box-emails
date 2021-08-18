import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { setSelectedListFlag, setClose } from '../../redux/actions/conversation.actions'

import './UsersManager.scss'
import allText from '../../allText.json'


function Users(props) {

    const [createNewUser, setCreateNewUser] = useState(null)


    const changeListFlag = (lst) => {
        props.setSelectedListFlag(lst)
        props.setClose(true)
    }

    return (
        <>
            <div className={`d-flex align-items-center oneTagDiv searchTag labelPadding ${createNewUser === 'new' && `labelSelected`}`}
                onClick={
                    (e) => {
                        setCreateNewUser('new')
                        changeListFlag(props.flagsList.usersManager);
                        e.stopPropagation()
                    }}>{allText.users.createNewUser}
            </div>
        </>
    )
}

export default connect(
    (state) => {
        return {
            subUsers: state.subUsers.subUsers,
            flagsList: state.conversations.flagsList

        }
    },
    {
        setSelectedListFlag, setClose
    }
)(Users)