import React, { useEffect, useState, useRef } from 'react'
import './ContactProfile.scss'
import { connect } from 'react-redux';
// import { addConversationIdToEdit, removeConversationIdToEdit } from '../../redux/actions/conversation.actions'
import profileImg from '../../assets/Component 157 – 6.svg'
import {actions} from '../../redux/actions/action'

function ContactProfile(props) {

    const getSourceImg = (source) => {
        let img = props.sourcesArray.find(s => s.name.toLowerCase() === source.toLowerCase())
        if (img)
            return <img src={img.lightIcon} alt="?"></img>
    }

    const displayFromInCircle = () => {

        let contact = props.contact
        //for leader messages
        if (props.source) {
            return (<div className="sourceCircle">{getSourceImg(props.source)}</div>)
        }
        //for contact thumbnail
        else {
            //for contact as recipient
            if (contact) {
                return (<div className="profile">
                    {contact && contact.thumbnail && <img src={contact.thumbnail} className="contactThumbnail"></img> ||
                        <img src={profileImg} className="contactImg"></img>
                    }
                </div>)
            }
            else {
                //for sent
                if (props.selectedListFlag === props.flagsList.sent) {
                    let to = props.conversation.waves[props.conversation.waves.length - 1].to[0]
                    contact = props.contacts.find(c => c.email === to)
                }
                else {
                    // for username - search in contacts contact with email like [username]@mails.codes
                    if (props.selectedListFlag !== props.flagsList.systemWaves) {
                        let from = props.conversation.waves[0].from
                        if (from && from.indexOf("@") === -1) {
                            contact = props.contacts && props.contacts.find(c => c && c.email === from + "@mails.codes")
                        }
                        else {
                            contact = props.contacts.find(c => c.email === from)
                        }
                    }
                }
                return (<>{
                    <div className="profile">
                        {contact && contact.thumbnail && <img src={contact.thumbnail} className="contactThumbnail"></img> ||
                            <img src={profileImg} className="contactImg"></img>
                        }
                    </div>
                }</>)
            }

        }

    }
    return (
        <>{props && displayFromInCircle()}</>
    )
}


export default connect(
    (state) => {
        return {
            contacts: state.init.contacts,
            selectedListFlag: state.conversations.selectedListFlag,
            flagsList: state.conversations.flagsList,
            sourcesArray: state.init.sources,
            conversationsIdsToEdit: state.conversations.conversationsIdsToEdit,
        }
    },
    (dispatch) => ({
        removeConversationIdToEdit: (val) => { dispatch(actions.removeConversationIdToEdit(val))},
        addConversationIdToEdit: (val) => { dispatch(actions.addConversationIdToEdit(val))},
    })

)(ContactProfile)