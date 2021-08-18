import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { getConversations, getSystemWaves } from '../../redux/actions/conversation.actions'
import refreshIcon from '../../assets/refresh.svg'
import './GeneralActions.scss'

function GeneralActions(props) {
    const refresh = () => {
        props.getConversations()
        props.getSystemWaves()
    }
    return (
        <div className="actionsDiv">
            <div className="action" onClick={refresh}><span><img src={refreshIcon} alt=""></img></span><label>Refresh</label></div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
        }
    },
    {
        getConversations, getSystemWaves
    }
)(GeneralActions)