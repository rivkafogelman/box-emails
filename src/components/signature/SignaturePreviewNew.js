import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
// import { SocialIcon } from 'react-social-icons'
// import styled from 'styled-components'
import { addSignatureServer, editSignatureServer, editSignature } from '../../redux/actions/signature.actions'
// import uploadImg from '../../assets/yourLogo.png'
// import bannerImg from './assets/bannerImg.jpg'
import './SignaturePreviewNew.scss';
import { FaTrashAlt, FaPaperclip, FaMinus, FaExpandAlt, FaTimes, FaCalendar, FaHeart } from 'react-icons/fa'
import allText from '../../allText.json'
// import { FaGlobe } from 'react-icons/fa'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
// import { VscGlobe } from 'react-icons/vsc'
import SignaturePreview from '../signature/SignaturePreview'

function Preview(props) {
    return (
        <>
        {window.innerWidth>=500?
            <div className="d-flex justify-content-center">
                <div className="newPerview d-flex flex-column">
                    <div className="desc d-flex flex-column">
                        <span id="title1">{allText.signature.description}</span>
                        <span id="title2">{allText.signature.subDescription}</span>
                        <br />
                    </div>
                    <div className=" d-flex justify-content-center flex-wrap align-items-end">
                        <div className="newMessageDiv">
                            <div className="newWaveTitle">
                                <label>{allText.newMessage.newMessage}</label>
                                <span className="MessageTitleIcons">
                                    <FaMinus style={{ marginLeft: "7px" }} />
                                    <FaExpandAlt style={{ marginLeft: "7px" }} />
                                    <FaTimes style={{ marginLeft: "7px" }} />
                                </span>
                            </div>
                            <div className="headLine" >{allText.newMessage.subject}</div>
                            <hr />
                            <div className="headLine" >To:</div>
                            <hr />
                            <div className=" d-flex justify-content-center" >
                                <div className="preview">
                                    <SignaturePreview></SignaturePreview>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>:  <SignaturePreview></SignaturePreview>}
        </>
    )
}
{
    //     const TextColorlabel = styled.label`color: ${props => props.color}; font-size:${props => (props.size).toString() + "px"};`;
    //     const [newSignatureFlag, setNewSignatureFlag] = useState(props.signature.signatureName === "add new")
    //     const [inputValue, setInputValue] = useState('')

    //     useEffect(() => {

    //     }, [props.signature])

    //     useEffect(() => {
    //         if (props.signature.signatureName !== "add new") {
    //             if (inputValue === '' || props.signature.signatureList.includes(props.signature.signatureName))
    //                 setNewSignatureFlag(false)
    //         } else setNewSignatureFlag(true)
    //     }, [props.signature.signatureName, props.signature.signatureList])

    //     const saveFunction = () => {
    //         if (newSignatureFlag) {
    //             props.addSignatureServer(props.signature)
    //             setInputValue('')
    //         } else props.editSignatureByNameServer(props.signature)
    //     }

    //     const socialIconClicked = (e, url) => {
    //         window.open(
    //             url,
    //             '_blank'
    //         );
    //     }
    //     const callToAction = () => {
    //         if (props.signature.banner.CTA) {
    //             window.open(
    //                 `https://${props.signature.banner.CTA}`,
    //                 '_blank'
    //             );
    //         }
    //         else {
    //             alert("add CTA :)")
    //         }

    //     }
    // const urls=()=>{
    //     let text = `<a target=\"_blank\" href=\"https://www.youtube.com/channel/UCowcLo6QhP3zHA1xX7JawaA\``
    //     let urls = extractUrls(text);
    // }
    //     return (
    //         <div className={`${!props.fromNewMessage ? `mainDiv` : ``}`}> {!props.fromNewMessage ? < >
    //             <h4 className="">Your Signature Will be here</h4>
    //             <p className="">At the bottom of your emails</p>
    //             <hr></hr>
    //         </ > : ``}
    //             <div className={`${props.fromNewMessage ? ` signatureFromMessage` : `signature`}`}>
    //                 {props.signature.banner.display && <div className="banner" onClick={callToAction}><img className="bannerImg" src={props.signature.banner.imgUrl}></img>
    //                     {/* <a href={`https://${props.signature.website}`} target="_blank" className="text">click here to visit our website</a> */}
    //                 </div>}
    //                 <div className="signatureInner">
    //                     {props.signature.upload_photo.display &&
    //                         <div className="leftDiv" >
    //                             <img className="img" src={props.signature.upload_photo.url}></img>
    //                         </div>
    //                     }
    //                     <div className="centeralDiv" >
    //                         <div className="content" >
    //                             <span style={{ color: props.signature.main_color, fontWeight: "bold", fontSize: `${props.fromNewMessage ? `12px` : props.signature.text_size}` }} > {props.signature.full_name || "Beni Israeli"} </span>
    //                             <span style={{ color: props.signature.main_color, fontSize: `${props.fromNewMessage ? `12px` : props.signature.text_size}` }} >{props.signature.role || "Software developer"}</span>
    //                             <span style={{ color: props.signature.text_color, fontSize: `${props.fromNewMessage ? `12px` : props.signature.text_size}` }}>{props.signature.email.value || "beni@gmail.com"}</span>
    //                             <span style={{ color: props.signature.text_color, fontSize: `${props.fromNewMessage ? `12px` : props.signature.text_size}` }} >{props.signature.phone.value || "0536363636"}</span>
    //                             <span style={{ color: props.signature.text_color, fontSize: `${props.fromNewMessage ? `12px` : props.signature.text_size}` }} >{props.signature.address.value || "Olive street, jerusalem"}</span>
    //                         </div>
    //                     </div>
    //                     <div className="rightDiv">
    //                         <div className="warpSocials">
    //                             <label><FaGlobe /> {props.signature.website || "www.leader.com"}</label>
    //                             <div className="socialDiv">
    //                                 <SocialIcon url={props.signature.facebook_icon.url} target='_blank' className="social_icon_card" network="facebook" bgColor={props.signature.facebook_icon.color || props.signature.facebook_icon.defaultColor}/>
    //                                 <SocialIcon url={props.signature.twitter_icon.url} target='_blank' className="social_icon_card" network="twitter" bgColor={props.signature.twitter_icon.color || props.signature.twitter_icon.defaultColor} />
    //                                 <SocialIcon url={props.signature.linkedin_icon.url} target='_blank' className="social_icon_card" network="linkedin" bgColor={props.signature.linkedin_icon.color || props.signature.linkedin_icon.defaultColor} />
    //                                 <SocialIcon url={props.signature.youtube_icon.url} target='_blank' className="social_icon_card" network="youtube" bgColor={props.signature.youtube_icon.color || props.signature.youtube_icon.defaultColor}/>
    //                                 <SocialIcon url={props.signature.whatsapp_icon.url} target='_blank' className="social_icon_card" network="whatsapp" bgColor={props.signature.whatsapp_icon.color || props.signature.whatsapp_icon.defaultColor} />
    //                                 <SocialIcon url={props.signature.instagram_icon.url} target='_blank' className="social_icon_card" network="instagram" bgColor={props.signature.instagram_icon.color || props.signature.instagram_icon.defaultColor} />
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //             <input type='button' value='urls' onClick={urls}/>
    //         </div>
    //     )
    // }
}

export default connect((state) => {
    return {
        signature: state.signature
    }
}, {
    // editSignatureByNameServer: editSignatureByNameServer,
    addSignatureServer: addSignatureServer,
    // setSignatureName: setSignatureName
})(Preview)