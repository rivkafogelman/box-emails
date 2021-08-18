import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import './NoResults.css'
import './NoConversations.scss'
import { actions } from '../../redux/actions/action'
// import { addNewMessageCard } from '../../redux/actions/draft.actions'
import imagNoMessages from './assets/no_messages.svg';

function NoConversations(props) {
    const [text, setText] = useState("");
    const [showNewMessBtn, setShowNewMessBtn] = useState(false)

    useEffect(() => {

        let flag = props.selectedListFlag
        if (flag === "All" | flag === "Sent" || flag === "Box") {
            setText("You Have No Messages")
            setShowNewMessBtn(true)
        }
        else {

            flag = flag.replace(/([A-Z])/g, ' $1').trim()
            setText(`You Have No ${flag}`)
            if (flag === "Follow Up" || flag === "Archived") {
                setText(x => x + " Messages")
            }
            setShowNewMessBtn(false)
        }

    }, [props.selectedListFlag])

    // is it in use?
    useEffect(() => {
        // console.log(showNewMessBtn)
    }, [showNewMessBtn])


    return (
        <>
            <div className="allDivsNoMessages">
                <div><img className="imgNoMessages" alt='' src={imagNoMessages} /></div>
                <p className="p1">{text}</p>
                {showNewMessBtn && props.selectedListFlag !== props.flagsList.systemWaves ?
                    <button className="btn1 btn" onClick={() => { props.addNewMessageCard(null) }}>New message</button> : ""}
            </div>
        </>
    )
}

export default connect(
    (state) => {
        return {
            isMessageOpen: state.conversations.isMessageOpen,
            selectedListFlag: state.conversations.selectedListFlag,
            flagsList: state.conversations.flagsList,
        }
    },
    (dispatch) => ({
        setIsMessageOpen: (val) => { dispatch(actions.setIsMessageOpen(val)) },
        addNewMessageCard: (val) => { dispatch(actions.addNewMessageCard(val)) },

    })
)(NoConversations)