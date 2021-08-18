import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { FaFilter, FaLightbulb, FaCalendarAlt, FaDatabase, FaFileAlt, FaHandshake, FaNetworkWired } from 'react-icons/fa'
import { RiWhatsappFill } from 'react-icons/ri'
import { setSourceFilter } from '../../redux/actions/conversation.actions'
import './Sources.scss'

function Sources(props) {

    return (
        <div className="sorcesList" >
            <button>Lobby</button>
            {props.sourcesArray.map(s => (<div className={`source ${props.sourceFilter.toLowerCase() === s.name.toLowerCase() && `selected`}`} onClick={() => {
                props.setSourceFilter(s.name)
        
            }}>
                {s.icon}
                <span className="name">{s.name}</span></div>
            ))}
        </div>
    )
}

export default connect(
    (state) => {
        return {
            sourceFilter: state.conversations.sourceFilter,
            sourcesArray: state.conversations.sourcesArray
        }
    }, {
    setSourceFilter
}
)(Sources)
