import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SocialIcon } from 'react-social-icons'
import styled from 'styled-components'
import { addSignatureServer, editSignatureServer, editSignature } from '../../redux/actions/signature.actions'
import uploadImg from '../../assets/yourLogo.png'
import bannerImg from './assets/bannerImg.jpg'
import './SignaturePreview.scss';
import { FaGlobe } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { VscGlobe } from 'react-icons/vsc'
import { Form } from 'react-bootstrap'
import keys from '../../Config/keys'


function SignaturePreview(props) {

    const userName = useSelector(state => state.init.userName);
    const sender = useSelector(state => state.init.userName);
    const TextColorlabel = styled.label`color: ${props => props.color}; font-size:${props => (props.size).toString() + "px"};`;
    const [newSignatureFlag, setNewSignatureFlag] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const rootElement = document.getElementById('app')
    const [bigBanner, setbigBanner] = useState(true)

    const [signature, setSignature] = useState(props.signatures && props.signatures.find(s => s._id === props.signatureIdForNewMessage))
    useEffect(() => {

        if (signature && signature.linkedin_icon.display == false &&
            signature.twitter_icon.display == false &&
            signature.facebook_icon.display == false &&
            signature.instagram_icon.display == false &&
            signature.youtube_icon.display == false)
        // && signature.whatsapp_icon.display == false)
        {

            setbigBanner(false)
        }

        else {

            setbigBanner(true)
        }

        console.log('bigBanner' + bigBanner)
    }, [signature, props.conversation])
    useEffect(() => {

        let selectedSignatureId
        if (props.signatureIdForNewMessage) {
            selectedSignatureId = props.signatureIdForNewMessage
        }
        else {
            selectedSignatureId = props.selectedSignatureId
        }
        if (props.signatures && props.defaultSignature) {

            //for new signature
            if (selectedSignatureId === -1) {
                setNewSignatureFlag(true)
                setSignature(props.defaultSignature)
            }
            //for edit signature
            else {
                let mySignature = props.signatures.find(s => s._id === selectedSignatureId)
                setSignature(mySignature)
            }

            // //find signature
            // if (props.signatures.length > 0) {
            //     let mySignature = props.signatures.find(s => s._id === selectedSignatureId)
            //     if (mySignature) {
            //         setSignature(mySignature)
            //     }
            //     else {
            //         setSignature(props.defaultSignature)
            //         setNewSignatureFlag(true)
            //     }
            // }
            // else {
            //     setSignature(props.defaultSignature)
            //     setNewSignatureFlag(true)
            // }
        }
    }, [props.signatures, props.selectedSignatureId, props.defaultSignature, props.signatureIdForNewMessage])

    const saveFunction = () => {
        if (newSignatureFlag) {
            props.addSignatureServer(props.signature)
            setInputValue('')
        } else props.editSignatureServer(props.signature)
    }

    const callToAction = () => {
        if (signature.banner.CTA) {
            window.open(
                `https://${signature.banner.CTA}`,
                '_blank'
            );
        }

    }
    const backspace = ' ';
    return (
        <div className="signaturePreview d-flex justify-content-center">
            {signature &&
                <div>
                    <div
                        style={{
                            alignItems: !props.signatureIdForNewMessage ? 'center' : '',
                            justifyContent: !props.signatureIdForNewMessage ? 'flex-end' : '',
                            margin: !props.signatureIdForNewMessage ? '20px' : '',
                            width: !props.signatureIdForNewMessage ? 'auto' : '',
                            minWidth: !props.signatureIdForNewMessage ? '20vw' : '',
                            overflowx: !props.signatureIdForNewMessage ? 'auto' : '',
                            margin: !props.signatureIdForNewMessage ? '30% 5% !important' : ''
                        }}
                    >
                        {/* <div className={`${!props.signatureIdForNewMessage ? `mainDiv` : ``}`}> */}
                        {/* {!props.signatureIdForNewMessage ? < >
                            <h4 className="">Your Signature Will be here</h4>
                            <p className="">At the bottom of your emails</p>
                            <hr></hr>
                        </ > : ``} */}
                        <div className={`${props.signatureIdForNewMessage ? ` signatureFromMessage` : `signature`}`}>

                            <div className="signatureInner" style={{
                                display: 'flex',
                            }}>
                                {/* {signature.upload_photo.display && */}
                                <div style={{
                                    backgroundImage: `url(${signature.upload_photo.url || uploadImg})`,
                                    width: ` ${bigBanner == true ? `89%` : `31%`}`,
                                    // maxWidth: "120px",
                                    maxHeight: "120px",
                                    height: "auto", display: "block", backgroundRepeat: "no-repeat", width: "90px", backgroundPosition: "center", backgroundSize: "cover",
                                }}>
                                </div>
                                {/* } */}
                                <div className="centeralDiv" >
                                    <div className="content"
                                        style={{
                                            textAlign: !props.sentToGoogle && signature.align_text,
                                            whiteSpace: 'nowrap',
                                            display: 'inline-block',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            height: '100%',
                                            paddingLeft: '15px'
                                        }}
                                    >
                                        <span style={{ color: signature.main_color, fontWeight: "bold", display: 'block' }}> {signature.full_name}{backspace} </span>
                                        <span style={{ color: signature.main_color, display: 'block' }}>{signature.role}{backspace}</span>
                                        <span style={{ color: signature.text_color, display: 'block' }}>{signature.email}{backspace}</span>
                                        <span style={{ color: signature.text_color, display: 'block' }}>{signature.phone}{backspace}</span>
                                        <span style={{ color: signature.text_color, display: 'block' }}>{signature.address}{backspace}</span>
                                         <span style={{ color: signature.text_color, display: 'block' }}>
                                        {signature.followTheLeader && signature.followTheLeader.display && <a target="_blank" href={`${keys.BOX_URL}notification/${userName}`}>@Follow the leader</a>}</span>
                                        {/* <br/> */}
                                        {/* <span style={{ color: signature.text_color, display: 'block' }}>
                                            {signature.followTheLeader && signature.followTheLeader.display && <a target="_blank" href={`/${userName}/notification`}>@Follow the leader</a>}</span> */}
                                        {/* <br/> */}
                                        {/* <span style={{ color: signature.text_color, display: 'block' }}>
                                            {signature.meetWithMe && signature.meetWithMe.display && <a target="_blank" href={`https://calendar.dev.leader.codes/${userName}/addMeeting`}>@Meet Me</a>}</span> */}
                                    </div>
                                </div>
                                <div className="rightDiv">
                                    <div className="warpSocials">
                                        {signature.website && <a href={`https://${signature.website}`} target="_blank"><VscGlobe /> {signature.website}</a>}
                                        <div className="socialDiv">
                                            {signature.facebook_icon.display && <SocialIcon url={signature.facebook_icon.url} target='_blank' className="social_icon_card" network="facebook" bgColor={signature.facebook_icon.color || signature.facebook_icon.defaultColor} />}
                                            {signature.twitter_icon.display && <SocialIcon url={signature.twitter_icon.url} target='_blank' className="social_icon_card" network="twitter" bgColor={signature.twitter_icon.color || signature.twitter_icon.defaultColor} />}
                                            {signature.linkedin_icon.display && <SocialIcon url={signature.linkedin_icon.url} target='_blank' className="social_icon_card" network="linkedin" bgColor={signature.linkedin_icon.color || signature.linkedin_icon.defaultColor} />}
                                            {signature.youtube_icon.display && <SocialIcon url={signature.youtube_icon.url} target='_blank' className="social_icon_card" network="youtube" bgColor={signature.youtube_icon.color || signature.youtube_icon.defaultColor} />}
                                            {/* {signature.whatsapp_icon.display && <SocialIcon url={signature.whatsapp_icon.url} target='_blank' className="social_icon_card" network="whatsapp" bgColor={signature.whatsapp_icon.color || signature.whatsapp_icon.defaultColor} />} */}
                                            {signature.instagram_icon.display && <SocialIcon url={signature.instagram_icon.url} target='_blank' className="social_icon_card" network="instagram" bgColor={signature.instagram_icon.color || signature.instagram_icon.defaultColor} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {signature.banner && signature.banner.display &&
                            <a className="banner" href={`https://${signature.banner.CTA}`}
                                target='_blank'>
                                <div className="photo" style={{ backgroundImage: `url(${signature.banner.imgUrl || bannerImg}) `, backgroundRepeat: "no-repeat", backgroundPosition: "center", width: ` ${bigBanner == true ? `89%` : `31%`}`, height: "25px", backgroundSize: "cover", }}>
                                </div>
                            </a>}
                    </div>



                </div>
            }
        </div>)
}

export default connect((state) => {
    return {
        signatures: state.signature.signaturesList,
        selectedSignatureId: state.signature.selectedSignatureId,
        defaultSignature: state.signature.defaultSignature,
        conversation: state.conversations.selectedConversation,

    }
}, {
    editSignatureServer,
    addSignatureServer,
    editSignature
})(SignaturePreview)