
import React, { useEffect, useState, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { Form, Checkbox, Loader } from 'semantic-ui-react'
// import { SocialIcon } from 'react-social-icons';
import { addSignatureServer, uploadPhotoSignatureServer, editSignatureServer, uploadBannerPhotoSignatureServer, setSelectedColorSignature, editSignature, setSelectedSignatureId } from '../../redux/actions/signature.actions';
import './Signature.scss'
// import Tooltip from '@material-ui/core/Tooltip';
// import { FaPalette } from 'react-icons/fa'
// import SystemColors from '../system-colors/SystemColors'
import { setBodyClicked } from '../../redux/actions/init.actions'
import { actions } from '../../redux/actions/action'
// import openOptionIcon from '../../assets/Polygon 1.svg'
import uploadImg from '../../assets/upload_photo.png'
// import { fromPairs, set } from 'lodash';
import dropper from './assets/dropper.svg'
import facebookIcon from './assets/facebook.svg'
import twitterIcon from './assets/twitter.svg'
import linkedinIcon from './assets/linkedin.svg'
import youtubeIcon from './assets/youtube.svg'
// import whatsappIcon from './assets/whatsapp.svg'
import instagramIcon from './assets/instagram.svg'
import alignLeft from './assets/align-left.svg'
import alignJustify from './assets/align-justify.svg'
import alignRight from './assets/align-right.svg'
import alignLeftBlue from './assets/align-left-blue.svg'
import alignJustifyBlue from './assets/align-justify-blue.svg'
import alignRightBlue from './assets/align-right-blue.svg'
// allText
import allText from '../../allText.json'
// import { MdSettingsOverscan } from 'react-icons/md';
// import { ref } from 'yup';


function Signature(props) {
    const dispatch = useDispatch()
    const [signature, setSignature] = useState(null)
    const [activeItem, setActiveItem] = useState('Your Info')
    const [info, setInfo] = useState(false)
    const [media, setMedia] = useState(false)
    const [design, setDesign] = useState(true)
    const [defaultSignatureName, setDefaultSignatureName] = useState('');
    const [existName, setExistName] = useState(false)
    // const [displaySystemColors, setDisplaySystemColors] = useState(true)
    //to change to use with it-
    const [displaySystemColorsArray, setDisplaySystemColorsArray] = useState(
        { "facebook": false, "twitter": false, "linkedin": false, "youtube": false, "instagram": false }
    )
    // const [displaySystemColorsFaceBook, setDisplaySystemColorsFaceBook] = useState(false)
    // const [displaySystemColorsTwitter, setDisplaySystemColorsTwitter] = useState(false)
    // const [displaySystemColorsLinkedin, setDisplaySystemColorsLinkedin] = useState(false)
    // const [displaySystemColorsYoutube, setDisplaySystemColorsYoutube] = useState(false)
    // const [displaySystemColorsWhatsapp, setDisplaySystemColorsWhatsapp] = useState(false)
    // const [displaySystemColorsInstagram, setDisplaySystemColorsInstagram] = useState(false)

    // const [tempInputLabel, setTempInputLabel] = useState('')
    const [selectedSocialToChangeColor, setSelectedSocialToChangeColor] = useState("")
    const handleItemClick = (e, { name }) => { setActiveItem(name); e.stopPropagation(); }
    const [newSignatureFlag, setNewSignatureFlag] = useState(false)
    const [isOver, setIsOver] = useState(false)
    const [uploading, setUploading] = useState({ type: "", flag: false })
    const sigName = useRef(null)
    const saveBtn = useRef(null)

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
        }
    }, [props.selectedSignatureId, props.signatures, props.defaultSignature])

    useEffect(() => {
        if (selectedSocialToChangeColor) {
            let temp = displaySystemColorsArray
            temp[selectedSocialToChangeColor] = !temp[selectedSocialToChangeColor]
            setDisplaySystemColorsArray(temp)
        }
    }, [selectedSocialToChangeColor])

    useEffect(() => {

        if (props.bodyClicked === true) {
            let temp = displaySystemColorsArray;
            temp.facebook = false
            temp.instagram = false
            temp.linkedin = false
            temp.twitter = false
            temp.youtube = false
            // temp.whatsapp = false
            setDisplaySystemColorsArray(temp)
            // setDisplaySystemColors(false)
            // setDisplaySystemColorsFaceBook(false)
            // setDisplaySystemColorsInstagram(false)
            // setDisplaySystemColorsLinkedin(false)
            // setDisplaySystemColorsWhatsapp(false)
            // setDisplaySystemColorsTwitter(false)
            // setDisplaySystemColorsYoutube(false)
            props.setBodyClicked(false)
        }
    }, [props.bodyClicked])
    useEffect(() => {
        let num = 1
        props.signatures.forEach((s) => {
            let check = s.signatureName.indexOf(`${props.userName}_`)
            if (check === 0) {
                let extractNum = s.signatureName.match(/\d+/);
                if (parseInt(extractNum) >= num && !s.signatureName[props.userName.length + extractNum.length + 2]) {
                    num = parseInt(extractNum) + 1
                }
            }

        })
        setDefaultSignatureName(`${props.userName}_${num}`)
    }, [])
    useEffect(() => {
        if (newSignatureFlag) {
            props.editSignature(defaultSignatureName, "signatureName")
        }

    }, [defaultSignatureName])
    useEffect(() => {
        setUploading({ type: "banner", flag: false })
    }, [signature && signature.banner.imgUrl])
    useEffect(() => {
        setUploading({ type: "image", flag: false })
    }, [signature && signature.upload_photo.url])
    const changeSignatureName = (e) => {
        let isExist = props.signatures.find(s => s.signatureName === e.target.value);
        if (isExist) {
            setExistName(true)
        }
        else {
            if (existName) {
                setExistName(false)
            }
            props.editSignature(e.target.value, "signatureName")
        }
    }
    const uploadPhoto = (chooseFile) => {
        setUploading({ type: "image", flag: true })

        const file = new FormData();
        file.append("file", chooseFile);
        dispatch(actions.uploadPhotoInFiles(file))
        // dispatch({ type: 'UPLOAD_PHOTO_IN_FILES', payload: file })
    }

    const uploadPhotoForBanner = (chooseFile) => {
        setUploading({ type: "banner", flag: true })
        const file = new FormData();
        file.append("file", chooseFile);
        dispatch(actions.uploadBannerInFiles(file))
        // dispatch({ type: 'UPLOAD_BANNER_IN_FILES', payload: file })

    }

    useEffect(() => {
        if (props.selectedColor) {
            props.editSignature(props.selectedColor, selectedSocialToChangeColor + "_icon", "color")
            let temp = displaySystemColorsArray;
            temp[selectedSocialToChangeColor] = false;
            setDisplaySystemColorsArray(temp)
            // switch (selectedSocialToChangeColor) {
            //     case "facebook":
            //         setDisplaySystemColorsFaceBook(false)
            //         props.editSignature(props.selectedColor, "facebook_icon", "color")
            //         break;
            //     case "twitter":
            //         setDisplaySystemColorsTwitter(false)
            //         props.editSignature(props.selectedColor, "twitter_icon", "color")
            //         break;
            //     case "linkedin":
            //         setDisplaySystemColorsLinkedin(false)
            //         props.editSignature(props.selectedColor, "linkedin_icon", "color")
            //         break;
            //     case "youtube":
            //         setDisplaySystemColorsYoutube(false)
            //         props.editSignature(props.selectedColor, "youtube_icon", "color")
            //         break;
            //     case "whatsapp":
            //         setDisplaySystemColorsWhatsapp(false)
            //         props.editSignature(props.selectedColor, "whatsapp_icon", "color")
            //         break;
            //     case "instagram":
            //         setDisplaySystemColorsInstagram(false)
            //         props.editSignature(props.selectedColor, "instagram_icon", "color")
            //         break;
            //     default:
            //         break;
            // }
            // if (selectedSocialToChangeColor) {
            //     props.editSignature(props.selectedColor, selectedSocialToChangeColor + "_icon", "color")
            //     // props.changeColor(selectedSocialToChangeColor, props.selectedColor)
            // }
            setSelectedSocialToChangeColor("")
            props.setSelectedColorSignature("")
        }
    }, [props.selectedColor])

    const editEmptySocialIcons = () => {
        return new Promise((resolve, reject) => {
            if (!signature.twitter_icon.url) {
                props.editSignature(false, "twitter_icon", "display")
            }
            if (!signature.youtube_icon.url) {
                props.editSignature(false, "youtube_icon", "display")
            }
            if (!signature.facebook_icon.url) {
                props.editSignature(false, "facebook_icon", "display")
            }
            if (!signature.linkedin_icon.url) {
                props.editSignature(false, "linkedin_icon", "display")
            }
            // if (!signature.whatsapp_icon.url) {
            //     props.editSignature(false, "whatsapp_icon", "display")
            // }
            if (!signature.instagram_icon.url) {
                props.editSignature(false, "instagram_icon", "display")
            }
            resolve(true)
        })
    }

    const saveFunction = (e) => {

        //to check it!!!
        if (signature.signatureName) {
            // await editEmptySocialIcons()
            if (newSignatureFlag) {
                props.addSignatureServer(signature)
            }
            else {
                props.editSignatureServer(signature)
            }
            props.setSelectedSignatureId(null)
        }
        else {
            alert("Siagnature name may not be empty")
        }
    }


    const followTheLeader = () => {

        return (
            <Form>
                <Form.Check
                    checked={
                        //   signature.followTheLeader?
                        //         signature.followTheLeader.display? 
                        //             signature.followTheLeader.display
                        //             :'true'
                        //         :'true'
                        true
                    }
                    //   onChange={(e)=>
                    //     // setDisabledCheck(!disabledCheck)
                    //     props.editSignature(
                    //         signature.followTheLeader?
                    //             signature.followTheLeader.display?
                    //                 (!signature.followTheLeader.display)
                    //                 :'true'
                    //             :'true'
                    //         ,
                    //         'followTheLeader',
                    //         "display")
                    // }
                    type="switch"
                    id="custom-switch"
                    label='@Follow the leader'
                    style={{ color: '#3598F4' }}
                />
            </Form>
        )
    }
    return (
        <>
            {signature &&
                <>
                    <div style={{ height: "650px" }}>
                        <div class="accordion" id="accordionExample">
                            <div class="accordion-item" >
                                <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" style={{ backgroundColor: "#e0f0ff" }} aria-controls="collapseOne">
                                        Your Info
                                    </button>
                                </h2>
                                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">


                                        <div>

                                            <form >
                                                <div className="d-flex flex-row align-items-center info-field"  >
                                                    <label className="col-lg-3 col-form-label" > Full Name </label>
                                                    <input type="text" fluid className="col-lg-8 form-control" value={signature.full_name} onChange={(e) => props.editSignature(e.target.value, "full_name")} />
                                                </div>
                                                <div className="d-flex flex-row align-items-center info-field">
                                                    <label className="col-lg-3  col-form-label">Role </label>
                                                    <input fluid className="col-lg-8 form-control" value={signature.role} onChange={(e) => props.editSignature(e.target.value, "role")} />
                                                </div>

                                                <div className="d-flex flex-row align-items-center  info-field" >
                                                    <label className="col-lg-3  col-form-label" > Email </label>
                                                    <input fluid type="email" className="col-lg-8 form-control"
                                                        value={signature.email}
                                                        onChange={(e) => { props.editSignature(e.target.value, "email") }}
                                                    />
                                                </div>


                                                <div className="d-flex flex-row align-items-center  info-field" >
                                                    <label className="col-lg-3  col-form-label" > Phone </label>
                                                    <input fluid className="col-lg-8 form-control" value={signature.phone}
                                                        onChange={(e) => props.editSignature(e.target.value, "phone")}
                                                    />
                                                </div>


                                                <div className="d-flex flex-row align-items-center  info-field" >
                                                    <label className="col-lg-3  col-form-label" > Address </label>
                                                    <input fluid className="col-lg-8 form-control" value={signature.address} onChange={(e) => props.editSignature(e.target.value, "address")} />
                                                </div>

                                                <div className="d-flex flex-row align-items-center info-field" >
                                                    <label className="col-lg-3  col-form-label" > Website </label>
                                                    <input fluid className="col-lg-8 form-control" value={signature.website} onChange={(e) => props.editSignature(e.target.value, "website")} />
                                                </div>
                                                <div className="custom-control custom-switch showall" style={{ marginLeft: "14px" }}>
                                                    <input type="checkbox" checked={signature.followTheLeader && signature.followTheLeader.display} className="custom-control-input" id="customSwitch1" onClick={(e) => {
                                                        props.editSignature(e.target.checked,
                                                            'followTheLeader',
                                                            "display")
                                                    }}></input>
                                                    <label class="custom-control-label" for="customSwitch1" >
                                                        @follow The Leader
                                                         - You Have {(props.user.notification && props.user.notification.length) ? props.user.notification.length : '0'} Followers</label>
                                                </div>
                                                {/* <div className="custom-control custom-switch showall" style={{ marginLeft: "14px" }}>
                                                    <input type="checkbox" className="custom-control-input" id="customSwitch2"
                                                        onClick={(e) => {
                                                            // debugger
                                                            props.editSignature(e.target.checked, 'meetWithMe', "display")
                                                            // props.editSignature("https://calendar.dev.leader.codes/" + props.userName + "/addMeeting", 'meetWithMe', "url")
                                                        }}></input>
                                                    <label class="custom-control-label" for="customSwitch2" ><b>{allText.signature.meet} </b></label>
                                                </div> */}
                                            </form>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" style={{ backgroundColor: "#e0f0ff" }} aria-controls="collapseTwo">
                                        Social media
                                    </button>
                                </h2>
                                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">
                                        <form style={{ marginTop: "4vh" }}>
                                            <div className="d-flex flex-row align-items-center info-field">
                                                <img alt='' src={facebookIcon} className="socialIcon" style={{ height: 25, width: 25 }} />
                                                <label className="col-lg-2  col-form-label">Facebook</label>
                                                <input className="col-lg-8 form-control " value={signature.facebook_icon.url} type='text' onChange={(e) => props.editSignature(e.target.value, "facebook_icon", "url")} />
                                            </div>

                                            <div className="d-flex flex-row align-items-center info-field">
                                                <img alt='' src={twitterIcon} className="socialIcon" style={{ height: 25, width: 25 }} />
                                                <label className="col-lg-2  col-form-label">Twitter</label>
                                                <input className="col-lg-8 form-control" value={signature.twitter_icon.url} type='text' onChange={(e) => props.editSignature(e.target.value, "twitter_icon", "url")} />

                                            </div>

                                            <div className="d-flex flex-row align-items-center info-field">
                                                <img alt='' src={linkedinIcon} className="socialIcon" style={{ height: 25, width: 25 }} />
                                                <label className="col-lg-2 col-form-label">LinkedIn</label>
                                                <input label="Linkedin" className="col-lg-8 form-control" value={signature.linkedin_icon.url} type='text' onChange={(e) => props.editSignature(e.target.value, "linkedin_icon", "url")} />

                                            </div>

                                            <div className="d-flex flex-row align-items-center info-field">
                                                <img alt='' src={youtubeIcon} className="socialIcon" style={{ height: 25, width: 25 }} />
                                                <label className="col-lg-2 col-form-label">YouTube</label>
                                                <input label="Youtube" className="col-lg-8 form-control" value={signature.youtube_icon.url} type='text' onChange={(e) => props.editSignature(e.target.value, "youtube_icon", "url")} />

                                            </div>

                                            <div className="d-flex flex-row align-items-center info-field">
                                                <img alt='' src={instagramIcon} className="socialIcon" style={{ height: 25, width: 25 }} />
                                                <label className="col-lg-2 col-form-label">Instagram</label>
                                                <input label="Instagram" className="col-lg-8 form-control" value={signature.instagram_icon.url} type='text' onChange={(e) => props.editSignature(e.target.value, "instagram_icon", "url")} />

                                            </div>

                                            {/* <button className="btn btn-primary nextBtn" onClick={() => setActiveItem('Design')}>Next</button> */}
                                        </form>
                                    </div>

                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" style={{ backgroundColor: "#e0f0ff" }} aria-controls="collapseThree">
                                        Design
                                    </button>
                                </h2>
                                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample" style={{ marginLeft: " 25px" }}>
                                    <div class="accordion-body">
                                        <Form size="small" >
                                            <div className="d-flex justify-content-between">
                                                <div >
                                                    <div>
                                                        <div className="col-lg-12">
                                                            <div className="d-flex">
                                                                <Checkbox className="checkbox" checked={signature.upload_photo.display} onClick={() => props.editSignature(!signature.upload_photo.display, "upload_photo", "display")} />
                                                                <label className="labelImg" style={{ paddingLeft: "4px" }}>{allText.imageOrLogo}</label>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-start" >
                                                        <div className="col-lg-12 " style={{ width: "200px" }} >

                                                            <input
                                                                className="uploadPhotoInput"
                                                                type='file'
                                                                style={{ zIndex: 2, opacity: '0.0', position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', width: '200px', height: '100%', backgroundSize: "cover" }}
                                                                onChange={(e) => uploadPhoto(e.target.files[0])}
                                                            // onMouseOver={() => setIsOver(true)}
                                                            />
                                                            <div className="uploadPhotoButton" >
                                                                {uploading.type === "image" && uploading.flag ? <Loader indeterminate active={true} /> :
                                                                    signature.upload_photo.url ?
                                                                        <>
                                                                            <div style={{ backgroundImage: `url(${signature.upload_photo.url}) `, backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "200px", height: "100%", backgroundSize: "cover", }}></div>
                                                                            {/* <img alt='' className="card" style={{ width: '200px', height: "100%" }} src={signature.upload_photo.url} onChange={(e) => uploadPhoto(e.target.files[0])} onMouseOver={() => setIsOver(true)} /> */}
                                                                            <img alt='' className="upload_image" style={{ position: "absolute" }} src={uploadImg} />
                                                                        </>
                                                                        :
                                                                        <img alt='' className="upload_image" src={uploadImg} />}
                                                            </div>
                                                        </div>
                                                        <div className="divDesign"></div>
                                                    </div>
                                                </div>
                                                <div className="p2" style={{ width: "300px" }}>
                                                    <div>

                                                        <div className="col-lg-7">
                                                            <div className="d-flex">
                                                                <Checkbox className="checkbox" checked={signature.banner.display} onClick={() => props.editSignature(!signature.banner.display, "banner", "display")} />
                                                                <label className="labelImg" style={{ paddingLeft: "4px" }}>banner</label>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="d-flex justify-content-start">
                                                        <div className="col-lg-10" style={{ width: "40%" }}>


                                                            <input className="uploadPhotoInput"
                                                                style={{ zIndex: 2, opacity: '0.0', position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', width: '300px', height: '100%' }}
                                                                type='file'
                                                                onChange={(e) => uploadPhotoForBanner(e.target.files[0])} />

                                                            <div className="uploadBannerPhotoButton" >
                                                                {uploading.type === "banner" && uploading.flag ? <Loader indeterminate active={true} /> :
                                                                    signature.banner.imgUrl ?
                                                                        <>
                                                                            {/* <img alt='' style={{ width: '250px', height: "100%" }} src={signature.banner.imgUrl} /> */}
                                                                            <div style={{ backgroundImage: `url(${signature.banner.imgUrl}) `, backgroundRepeat: "no-repeat", backgroundPosition: "center", width: "250px", height: "100%", backgroundSize: "cover", }}>
                                                                            </div>

                                                                            <img alt='' className="upload_image" style={{ position: "absolute" }} src={uploadImg} />                                                                </>

                                                                        :
                                                                        <img alt='' className="upload_image" src={uploadImg} />}

                                                            </div>
                                                            <div className="col-lg-2"></div>
                                                        </div>
                                                    </div>
                                                    <Form.Group className="d-flex flex-row align-items-center">
                                                        <Form.Field width="15" >
                                                            <Form.Input label="CTA" className="col-11" disabled={!signature.banner.imgUrl} type='text' value={signature.banner.CTA} onChange={(e) => props.editSignature(e.target.value, "banner", "CTA")} />
                                                        </Form.Field>
                                                    </Form.Group>
                                                </div>
                                            </div>

                                            <Form.Group>

                                                <div className="textGroup">
                                                    <Form.Field className="d-flex justify-content-between ">
                                                        <label>{allText.mainColor}</label>
                                                        <div >
                                                            <img alt='' src={dropper} style={{ width: "25px", height: "20px", marginBottom: "18px" }} />
                                                            <input className="colorInput" style={{ backgroundColor: "white", width: "60px", height: "30px", border: "none" }} type='color' value={signature.main_color} onChange={(e) => props.editSignature(e.target.value, "main_color")} ></input>
                                                        </div>
                                                    </Form.Field>
                                                    <Form.Field className="d-flex justify-content-between ">
                                                        <label>{allText.textColor}</label>
                                                        <div style={{ marginLeft: "240px" }}>
                                                            <img alt='' src={dropper} style={{ width: "25px", height: "20px", marginBottom: "18px" }} />
                                                            <input className="colorInput" type='color' value={signature.text_color} onChange={(e) => props.editSignature(e.target.value, "text_color")} style={{ backgroundColor: "white", width: "60px", height: "30px", border: "none" }} ></input>
                                                        </div>
                                                    </Form.Field>
                                                    <Form.Field className=" d-flex justify-content-between">
                                                        <label>{allText.textAlignment}</label>
                                                        <div >
                                                            <img alt='' src={signature.align_text === "left" ? alignLeftBlue : alignLeft} className="text-align-icon" onClick={() => {
                                                                props.editSignature("left", "align_text")
                                                            }} />
                                                            <img alt='' src={signature.align_text === "center" ? alignJustifyBlue : alignJustify} className="text-align-icon" onClick={() => {
                                                                props.editSignature("center", "align_text")
                                                            }} />
                                                            <img alt='' src={signature.align_text === "right" ? alignRightBlue : alignRight} className="text-align-icon" onClick={() => {
                                                                props.editSignature("right", "align_text")
                                                            }} />
                                                        </div>
                                                    </Form.Field>
                                                </div>
                                            </Form.Group>

                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                        </div>

                        <div id="mybutton">
                            <Form >
                                <Form.Field >
                                    {/* <div className="d-flex justify-content-around"> */}
                                    {existName && <span style={{ color: "brown", position: "fixed", bottom: "44px", marginLeft: "150px" }}>name is alredy exist</span>}
                                    <label style={{ position: "fixed", bottom: "15px" }}>
                                        {newSignatureFlag ? "" : "Change name"}
                                    </label>
                                    <input className="" style={{ height: "35px", width: "250px", marginLeft: "100px", marginBottom: "14px", position: "fixed", bottom: "-4px" }} maxLength="25" ref={sigName} placeholder="signature name" defaultValue={newSignatureFlag ? defaultSignatureName : signature.signatureName} onChange={(e) => changeSignatureName(e)}>
                                    </input>

                                    <button className="btn btn-primary saveButton" style={{ marginBottom: "14px", position: "fixed", bottom: "-4px", marginLeft: "370px" }} disabled={existName} onClick={saveFunction} ref={saveBtn}>{newSignatureFlag ? "Create" : "Save"}</button>
                                    {/* </div> */}
                                </Form.Field>
                            </Form>
                        </div>
                    </div>
                </>

            }

        </>
    )
}

export default connect(
    (state) => {
        return {
            userName: state.init.userName,
            user: state.init.user,
            signatures: state.signature.signaturesList,
            selectedSignatureId: state.signature.selectedSignatureId,
            bodyClicked: state.init.bodyClicked,
            selectedColor: state.signature.selectedColor,
            defaultSignature: state.signature.defaultSignature
        }
    }, (dispatch) => ({
        addSignatureServer: (signature) => { dispatch(actions.addSignatureServer(signature)) },
        editSignatureServer: (signature) => { dispatch(actions.editSignatureServer(signature)) },
        uploadPhotoSignatureServer: (file) => { dispatch(actions.uploadPhotoSignatureServer(file)) },
        setBodyClicked: (bool) => { dispatch(actions.setBodyClicked(bool)) },
        setSelectedColorSignature: (color) => { dispatch(actions.setSelectedColorSignature(color)) },
        uploadBannerPhotoSignatureServer: (file) => dispatch(actions.uploadBannerPhotoSignatureServer(file)),
        editSignature: (fieldValue, fieldName, fieldNameInObj) => dispatch(actions.editSignature({ fieldValue, fieldName, fieldNameInObj })),
        setSelectedSignatureId: (id) => { dispatch(actions.setSelectedSignatureId(id)) }
    })
)(Signature)
        // function MySignature(props) {
        //     return (
        //         <div className="d-flex flex-column">
        //             <div className="d-flex flex-row">
        //                 <div className="d-flex align-items-center">
        //                     <div style={{ padding: "5px" }}></div>
        //                     {signature.upload_photo.display ? <img alt='' src={signature.upload_photo.url} style={{ width: "60px", height: "60px", borderRadius: "50px" }}></img> : <span />}
        //                 </div>
        //                 <div style={{ padding: "5px" }}></div>
        //                 <div className="d-flex flex-column">
        //                     <div className="fullName" style={{
        //                         fontWeight: "bold",
        //                         fontSize: (signature.text_size).toString() + "px",
        //                         borderRadius: "25px",
        //                         color: signature.main_color
        //                     }}>{signature.full_name}</div>
        //                     <div style={{ color: signature.text_color, fontSize: (signature.text_size).toString() + "px" }}>{signature.role}</div>
        //                     <div style={{ color: signature.text_color, fontSize: (signature.text_size).toString() + "px" }}>{signature.department}</div>
        //                     {signature.email !== '' ? <a href={"mailto:" + signature.email} style={{ color: signature.text_color, fontSize: (signature.text_size).toString() + "px" }}>Email: {signature.email}</a> : <span />}
        //                     {signature.phone !== '' ? <a href={"tel:" + signature.phone} style={{ color: signature.text_color, fontSize: (signature.text_size).toString() + "px" }}>Phone: {signature.phone}</a> : <span />}
        //                     {signature.address !== '' ? <div style={{ color: signature.text_color, fontSize: (signature.text_size).toString() + "px" }}>Address: {signature.address}</div> : <span />}
        //                     <div className="d-flex flex-column ">
        //                         <hr style={{ border: 0, borderRadius: "25px", clear: "both", width: "100%", backgroundColor: signature.main_color, height: "5px" }} />
        //                         <div style={{ fontWeight: "bold", fontSize: (signature.text_size).toString() + "px", color: signature.main_color }}>{signature.website}</div>
        //                         <div className="d-flex">
        //                             {signature.facebook_icon.display ?
        //                                 <SocialIcon className="social_icon_card" network="facebook" bgColor={signature.main_color} url={signature.facebook_icon.url} />
        //                                 : <span />}
        //                             {signature.twitter_icon.display ?

        //                                 <SocialIcon className="social_icon_card" network="twitter" bgColor={signature.main_color} url={signature.twitter_icon.url} />
        //                                 : <span />}
        //                             {signature.linkedin_icon.display ?

        //                                 <SocialIcon className="social_icon_card" network="linkedin" bgColor={signature.main_color} url={signature.linkedin_icon.url} />
        //                                 : <span />}
        //                             {signature.youtube_icon.display ?
        //                                 <SocialIcon className="social_icon_card" network="youtube" bgColor={signature.main_color} url={signature.youtube_icon.url} />
        //                                 : <span />}
        //                             {signature.whatsapp_icon.display ?
        //                                 <SocialIcon className="social_icon_card" network="whatsapp" bgColor={signature.main_color} url={signature.whatsapp_icon.url} />
        //                                 : <span />}
        //                             {signature.instagram_icon.display ?
        //                                 <SocialIcon className="social_icon_card" network="instagram" bgColor={signature.main_color} url={signature.instagram_icon.url} />
        //                                 : <span />}
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // }