import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { actions } from '../../redux/actions/action';

import Carousel from 'react-multi-carousel';
import ItemsCarousel from 'react-items-carousel';

import allText from '../../allText.json'
import './UsersManager.scss'
// import { addSubUser, deleteSubUser, addMailChannels } from '../../redux/actions/subUsers.actions'
import { changeEnableGoogleToken } from '../../redux/actions/googleAuth.actions'
import { changeTextColor, uploadPhoto, deleteBGPhoto, setBackGroundEmail } from '../../redux/actions/settings.actions'
import subUsersReducer from '../../redux/reducers/subUsers.reducer'
import img4 from './assets/4.jpg'
import img5 from './assets/5.jpg'
import alertIcon from './assets/alert.svg'

import defaultBg from './assets/defaultBg.svg'

import trash from './assets/trash.svg'
import pic1 from './assets/pic1.jpg'
import pic2 from './assets/pic2.jpg'
import pic3 from './assets/pic3.jpg'
import pic4 from './assets/pic4.jpg'
import pic5 from './assets/pic5.jpg'


function MyUsers(props) {
    const [uploading, setUploading] = useState({ type: "", flag: false })
    const dispatch = useDispatch();
    const [showAddUser, setShowAddUser] = useState(false)
    const emailInput = React.createRef()
    // const userNameInput = React.createRef()
    const [backgroundsGmail, setBackgroundsGmail] = useState([pic1, pic2, pic3, pic4, pic5])
    const [showAlert, setShowAlert] = useState(false)
    const [activeItemIndex, setActiveItemIndex] = useState(0);


    const userName = useSelector(state => state.init.userName);

    // const ValidateEmail = () => {
    //     console.log(emailInput.current.value);
    //     return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //         .test(emailInput.current.value) === true
    // }

    const addUserManager = () => {
        if (props.subUsers.length < 4 || props.user.premium) {
            if (emailInput.current.value != "") {
                let user = {
                    email: emailInput.current.value + "." + userName + allText.usersManager.mailsCodes
                }
                let subUser = props.subUsers.filter(su => su.email == user.email)
                if (subUser.length == 0) {
                    emailInput.current.classList.remove("invalidEmail")
                    props.addSubUser(user)
                    props.addMailChannels(emailInput.current.value + "." + userName)
                    setShowAddUser(false)
                    emailInput.current.value = ""
                }
                else
                    emailInput.current.classList.add("invalidEmail")
            }
        }
        else {
            setShowAlert(true)
            // alert('You already have 3 subusers or you not premium')
        }

    }

    const changeBGEmail = (bgName) => {
        props.setBackGroundEmail(bgName)
    }

    const delBGPhoto = (bg) => {
        props.deleteBGPhoto(bg.name)
        if (bg.url == props.selectedBackground)
            props.setBackGroundEmail("")
    }

    const uploadPhoto = (chooseFile) => {
        setUploading({ type: "image", flag: true })

        const file = new FormData();
        file.append("file", chooseFile);
        props.uploadPhoto(file)
    }
    const delSubUser = (subUserEmail) => {

        let subUserName = subUserEmail.split('@')[0]
        props.deleteSubUserServer(subUserName)
    }

    const changeColorText = (colorToText) => {

        if (props.textColor != colorToText)
            props.changeTextColor(colorToText)

    }

    const changeShowAddUser = () => {
        if (props.subUsers.length < 4 || props.user.premium)
            setShowAddUser(!showAddUser)
        else
            setShowAlert(true)

    }

    return (
        <>
            <div className='usersManager' >
                {/* title */}
                {userName && !userName.includes('.') && <div>
                    <div className="d-flex example-parent ">
                        <div className='p-2 col-example col-2'>
                            <span className='title ml-2'>{allText.usersManager.accountsSettings}</span>
                        </div>
                        <div className="p-2 col-example ">
                            {showAlert ?
                                <>
                                    <img style={{ width: 20, height: 20 }} src={alertIcon} />
                                    <label className='alertClass'>you have to upgrade your plan</label>
                                </>
                                : ''
                            }
                        </div>
                    </div>
                 
                    {/* content */}
                    <div className='row d-flex align-items-center my-4'>
                        <div className='col-2'>
                            <span className='label'>{allText.usersManager.mainEmail}</span>
                        </div>
                        <div className='col-5 ' style={{ padding: 0 }}>
                            <div className="box">
                                <div className='font-weight-bold d-flex justify-content-center'>{allText.usersManager.yourLeaderBoxAccount}</div>
                                <div className='d-flex justify-content-center'>{userName}{allText.usersManager.mailsCodes}</div>
                            </div>
                        </div>
                        <div className='col-4'></div>
                    </div>
                    <hr />
                    <div className='row d-flex align-items-center my-4'>
                        <div className='col-2'>
                            <span className='label'>{allText.usersManager.subEmails}</span>
                        </div>
                        <div className='col-5' style={{ padding: 0 }}>
                            {props.subUsers && props.subUsers.map(subUser =>
                                subUser.email !== (`${props.userName}@mails.codes`) &&
                                <div className='d-flex justify-content-between box'>

                                    <div>{subUser.email}</div>

                                    <div className='text-danger pointer'
                                        onClick={() => delSubUser(subUser.email)} >{allText.usersManager.remove}</div>
                                </div>
                            )}

                            {
                                showAddUser ?
                                    <>
                                        <div className='d-flex justify-content-between box'>

                                            <div>
                                                <input className="mailInput" type="text" placeholder="subUserName" ref={emailInput} />

                                                <span className="mailCode">
                                                    {emailInput.current ? emailInput.current.value : ""}.{userName}{allText.settings.mailsCodes}
                                                </span>
                                            </div>
                                            <div className='add pointer'
                                                onClick={addUserManager} >{allText.usersManager.add}
                                            </div>
                                        </div>
                                    </>
                                    : ""
                            }

                            <div className='addEmail mt-2'>
                                <span onClick={() => changeShowAddUser()} >{allText.usersManager.addEmailAccount}</span>
                            </div>
                        </div>
                    </div>
                </div>}
                <hr />
                <div className='row d-flex align-items-center my-4'>
                    <div className='col-2'>
                        <span className='label'>{allText.usersManager.background}</span>
                    </div>
                    <div className='col-10 row p-0 d-flex justify-content-between'>


                        <ItemsCarousel
                            infiniteLoop={false}
                            gutter={12}
                            activePosition={'center'}
                            disableSwipe={false}
                            alwaysShowChevrons={false}
                            numberOfCards={6}
                            slidesToScroll={6}

                            activeItemIndex={activeItemIndex}
                            requestToChangeActive={setActiveItemIndex}
                            rightChevron={
                                <span className="option icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16" >
                                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </span>}
                            leftChevron={

                                <span className="option leftIcon" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16" >
                                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                    </svg>
                                </span>
                            }
                        >

                            <div className="card" style={{ height: '100px', backgroundColor: '#F1F1F3' }}>
                                <input type='file' className="card-body" style={{ zIndex: 2, opacity: '0.0', position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', width: '200px', height: '100%', backgroundSize: "cover", backgroundColor: '#f1f1f3', width: '100%' }} placeholder={"+Add"} onChange={(e) => uploadPhoto(e.target.files[0])} />
                                <span style={{ position: "absolute", padding: '25%' }} >+Add</span>

                            </div>

                            <div className="card" style={{ height: '100px', width: '100px' }} onClick={() => { changeBGEmail("") }} style={{ height: '100px' }}>
                                <img className="card-body imgBg" src={defaultBg} style={{ padding: '0%' }} />

                            </div>
                            {props.backgroundPhotos && props.backgroundPhotos.map((bg, index) => {
                                return (
                                    <>
                                        <div className="card attachedImg" onClick={() => { changeBGEmail(bg.name) }} style={{ height: '100px' }}>
                                            <img className="card-body imgBg" src={bg.url} style={{ padding: '0%' }} />
                                            {index > 4 ?

                                                <div className="deleteIcon" onClick={() => { delBGPhoto(bg) }}><img src={trash} /></div>
                                                : null
                                            }
                                        </div>
                                    </>
                                )
                            })
                            }

                        </ItemsCarousel>

                    </div>

                </div>

                <div className='row d-flex align-items-center my-4'>
                    <div className='col-2'></div>
                    <div className="col-6 " style={{ padding: 0 }}>
                        <div>
                            <label className="textColor"><b>{allText.usersManager.textColor}</b></label>
                        </div>
                        <button onClick={() => { changeColorText('light') }} className={`light ${props.textColor == "dark" ? 'bgDark' : 'bgLight'}`}>{allText.usersManager.light}</button>
                        <button onClick={() => { changeColorText('dark') }} className={`dark ${props.textColor == "light" ? 'bgDark' : 'bgLight'}`} >{allText.usersManager.dark}</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default connect(
    (state) => {
        return {
            subUsers: state.subUsers.subUsers,
            userName: state.init.userName,
            user: state.init.user,
            backgroundPhotos: state.settings.backgroundPhotos,
            selectedBackground: state.settings.selectedBackground,
            textColor: state.settings.textColor
        }
    },
    (dispatch) => ({
        addSubUser: (val) => { dispatch(actions.newSubUser(val)) },
        deleteSubUserServer: (val) => { dispatch(actions.deleteSubUserServer(val)) },
        addMailChannels: (val) => { dispatch(actions.addMailChannels(val)) },
        uploadPhoto: (val) => { dispatch(actions.uploadPhoto(val)) },
        setBackGroundEmail: (val) => { dispatch(actions.setBgEmail(val)) },
        deleteBGPhoto: (val) => { dispatch(actions.deleteBackgroundPhotoServer(val)) },
        changeTextColor: (val) => { dispatch(actions.changeTextColorServer(val)) }
    })
)(MyUsers)