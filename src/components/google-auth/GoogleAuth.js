
import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import { saveGoogleToken, getLabelsGmailServer, getMesagesGmailServer } from '../../redux/actions/googleAuth.actions'
import google_auth_icon from '../../assets/filter-line.svg'
import GmailInbox from '../gmail-message/GmailInbox'
import { setSelectedListFlag } from '../../redux/actions/conversation.actions'
// import React, { useState, useEffect, useRef } from 'react'

function GoogleAuth(props) {
    useEffect(() => {
                props.setSelectedListFlag('google')

    })
    let iconsV = 'iconsX'
    if (props.ifGooleToken) iconsV = 'iconsV'

    const signIn = () => {
        props.saveGoogleToken(props.user.username)
    }

    return (

        <>

            <div className='txt_social_media' onClick={signIn}>
                <img src={google_auth_icon} className='icons align-self-center'></img>
                <img src={google_auth_icon} className={iconsV} align-self-center></img>
                <p style={{ text_align: 'center' }}> google auth </p>
            </div>
            <button onClick={() => { props.getLabelsGmailServer() }}>Get Labels</button>
            <button onClick={() => { props.getMesagesGmailServer() }}>Get Massage</button>

        </>
    )
}
export default connect(
    (state) => {
        return {
            user: state.init.user
        }
    },
    {
        saveGoogleToken: saveGoogleToken,
        getLabelsGmailServer: getLabelsGmailServer,
        getMesagesGmailServer: getMesagesGmailServer,
       setSelectedListFlag 

    }
)(GoogleAuth)
