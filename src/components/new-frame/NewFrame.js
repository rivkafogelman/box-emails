
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Categories from "../categories/Categories";
import leaderBoxLogo from './assets/leaderBoxLogo.svg'
import premiumIcon from './assets/premium.svg'
// import newMessageIcon from '../../assets/newMessage.svg'
import newMessageIcon from './assets/icon_new_message.svg'
import pencilLineIcon from './assets/pencil-line.svg'
import hubIcon from '../../assets/hubInHeader.svg'
import profileImg from '../../assets/Component 157 – 6.svg'
import ConversationsList from '../conversations-list/ConversationsList'
import OpenConversation from '../open-converstion/OpenConversation'
import NoConversations from '../no-results/NoConversations'
import NoForSearch from '../no-results/NoForSearch'
import ResizePanel from "react-resize-panel"
import NewMessage from '../new-message/NewMessage'
import SearchConversations from '../search-conversations/SearchConversations'
import HeaderActions from '../actions-on-conversations/headerActions'
import GeneralActions from '../general-actions/GeneralActions'
import Signature from '../signature/Signature'
import Preview from '../signature/SignaturePreviewNew'
import Settings from '../settings/settings';
import Drafts from '../drafts/Drafts'
import './NewFrame.scss'
import CreateDeal from '../create-deal/CreateDeal'
import { setDisplayDeal } from '../../redux/actions/addDeal.actions'
import GoogleAuth from '../google-auth/GoogleAuth'
import Tooltip from '@material-ui/core/Tooltip';
import HeaderLeader from '@leadercodes/header'
// import { Modal } from 'react-bootstrap'
import { Modal } from 'antd';
import Draggable from 'react-draggable';
import DeleteUpdate from '../signature/Delete&update';
import CreateTask from '../create-task/CreateTask'
// import {
//     setIsMessageOpen, setSelectedListFlag, setSelectedConversation,
//     setExpandMessage, setChangeDisplayConver, getConversations
// } from '../../redux/actions/conversation.actions'
import { setBodyClicked } from '../../redux/actions/init.actions'
import { setSelectedSignatureId } from '../../redux/actions/signature.actions'
import openOptionIcon from '../../assets/Polygon 1.svg'

import MeetCreate from '../create-meeting/MeetCreate';
import CreateLead from '../create-lead/CreateLead';
// import { setDisplayRightCard } from '../../redux/actions/conversation.actions'
// import { addNewMessageCard, deleteDraft } from '../../redux/actions/draft.actions'
import { values } from 'lodash';
import { ReactComponent as SettingsIcon } from './assets/settings.svg'
// import settings from '../../assets/settings.svg'
import allText from '../../allText.json'
import MyGroups from '../groups/MyGroups';
import Webhook from '../webhook/Webhook'
import JsonParser from '../json-parser/JsonParser'
import MyUsers from '../UsersManager/UsersManager'
import Signatures from '../categories/Signatures';
import AdvancedSearch from '../advanced-search/AdvancedSearch';
import SubUser from '../from-Email/subUsers/subUser';
import Dropdown from 'react-bootstrap/Dropdown'
import pic3 from '../UsersManager/assets/pic3.jpg'
import keys from '../../Config/keys'
import { actions } from '../../redux/actions/action'

// import { setSelectedSubUser } from '../../redux/actions/subUsers.actions'
function NewFrame(props) {
    const [defualtBackGround, setDefualtBackGround] = useState(false)
    const { history } = props
    const { location } = props
    const [changedFromUrl, setChangedFromUrl] = useState(true);
    const [displayAll, setDisplayAll] = useState(false)
    const [categoriesWithConversation, setCategoriesWithConversation] = useState()
    const templates = useSelector(state => state.templates);
    const dispatch = useDispatch();

    // show new msg card when err in send email
    useEffect(() => {
        if (props.currentNotification && props.currentNotification.info === allText.newFrame['errorSendingEmail']) {
            if (props.drafts.drafts.length) {
                let draftToShow = props.drafts.drafts.find(draft => draft._id === props.currentNotification.draftId);
                props.addNewMessageCard(draftToShow);
            }
        }
    }, [props.currentNotification]);

    useEffect(() => {
        if (location.hash) {
            if (changedFromUrl) {
                if (location.hash === "#signature") {
                    props.setSelectedListFlag(props.flagsList.signature)
                }
                else {
                    if (location.hash.split('/')[0]) {
                        const list = location.hash.split('/')[0].slice(1)
                        //to check if it's correct list
                        // let lists = ["all", "box", "sent", "favorites", "archived"]

                        // if (props.flagsList.find((l) => l === list.toLowerCase())) {
                        props.setSelectedListFlag(list)
                        // }
                        // if (location.hash.split('/')[1]) {
                        //     let source = location.hash.split('/')[1].slice(1)
                        //     //if there is this prameter: '?newMessage= true' after it, remove it from the source
                        //     if (source.indexOf('?') !== -1) {
                        //         source = source.slice(0, source.indexOf('?'))
                        //     }

                        // }
                        //
                        if (location.hash.split('/')[1]) {
                            let id = location.hash.split('/')[1]
                            if (id.indexOf('?') !== -1) {
                                id = id.slice(0, id.indexOf('?'))
                            }
                            let selectedConv = props.allConversations.find(c => c._id === id)
                            if (selectedConv) {
                                props.setSelectedConversation(selectedConv)
                            }
                        }
                    }
                }
            }
        }
        if (location.search) {
            if (location.search.indexOf('?newMessage=true') === -1) {
                props.setIsMessageOpen(false)
            }
            else {
                props.setIsMessageOpen(true)
            }
        }

        setChangedFromUrl(true)
    }, [location])
    useEffect(() => {

    }, [props.showOpenConversation, props.selectedConversation, props.close])
    useEffect(() => {

        setChangedFromUrl(false)
        if (props.selectedListFlag !== 'Signatures' &&
            props.selectedListFlag !== 'Google authorities' &&

            props.selectedListFlag !== 'Contacts') {
            setCategoriesWithConversation(false)
        }
        else {
            setCategoriesWithConversation(true)
            props.setDisplayRightCard("")

        }
        if (props.selectedListFlag === props.flagsList.signature) {
            history.push(`/${props.userName}/#signature`)
        }
        else {
            history.push(`/${props.userName}/#${props.selectedListFlag}${props.selectedConversation && props.selectedConversation !== 'empty' ? `/${props.selectedConversation._id}` : ``}${props.isMessageOpen ? `?newMessage=true` : ``}`)

            // // push conversation id to url only if showOpenConversation and selectedConversation;
            // if((props.showOpenConversation&&props.selectedConversation&& props.selectedConversation !== 'empty')||!props.showOpenConversation){
            //     history.push(`/${props.userName}/#${props.selectedListFlag}${props.selectedConversation && props.selectedConversation !== 'empty' ? `/${props.selectedConversation._id}` : ``}${props.isMessageOpen ? `?newMessage=true` : ``}`)
            // }
            // else{
            //     history.push(`/${props.userName}/#${props.selectedListFlag}${props.isMessageOpen ? `?newMessage=true` : ``}`)
            // }


        }

    }, [props.selectedConversation, props.selectedListFlag, props.isMessageOpen, props.showOpenConversation])

useEffect(()=>{
    console.log("useEffect props.newMessagesCards",props.newMessagesCards)
},[props.newMessagesCards])
    const newConvBtnClicked = (e) => {
        props.addNewMessageCard(null);
        e.stopPropagation()
    }

    const hubIconClicked = (e) => {
        if (props.displayRightCard == "task") {
            props.setDisplayRightCard("")
            return
        }
        props.setDisplayRightCard("task")
        e.stopPropagation()
        props.setExpandMessage(false)
    }
    const handleClick = () => {
        // props.setBodyClicked(!props.bodyClicked)
    }

    const showRightCard = () => {
        console.log(props.selectedBackground + 'dddd')
        let componentToDisplay = null
        switch (props.displayRightCard) {
            case allText.newFrame.task: componentToDisplay = <CreateTask />
                break;
            case allText.newFrame.meet: componentToDisplay = <MeetCreate />
                break;
            case allText.newFrame.deal: componentToDisplay = <CreateDeal />
                break;
            case allText.newFrame.lead: componentToDisplay = <CreateLead />
                break;
            case allText.newFrame.jsonParser: componentToDisplay = <JsonParser />
                break;
            case allText.newFrame.search: componentToDisplay = <AdvancedSearch />
                break;
            default:
                break;

        }
        return (<>
            {componentToDisplay &&
                <ResizePanel direction="w" handleSize={[2, 2]} style={{ "width": "18%", "minWidth": "15%", "maxWidth": "25%" }}>
                    <div className={`rightCard ${!props.selectedBackground || props.selectedBackground == "" ? 'rightCardDefualtBG' : ''} `} >{componentToDisplay}</div>
                </ResizePanel>
            }

        </>)
    }
    // ************************************************
    const [visible, setVisible] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [expand, setExpand] = useState(false)
    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
    const draggleRef = React.createRef();

    const showModal = () => {
        if (visible)
            setVisible(false);
        else
            setVisible(true)
    };

    const handleOk = e => {
        console.log(e);
        setVisible(false)
    };

    const handleCancel = e => {
        console.log(e);
        setVisible(false)
    };

    const onStart = (event, uiData) => {
        const { clientWidth, clientHeight } = window?.document?.documentElement;
        const targetRect = draggleRef?.current?.getBoundingClientRect();
        setBounds({
            left: -targetRect?.left + uiData?.x,
            right: clientWidth - (targetRect?.right - uiData?.x),
            top: -targetRect?.top + uiData?.y,
            bottom: clientHeight - (targetRect?.bottom - uiData?.y)
        })

    };
    //    ***************************************************************
    const getExpandFromNewMessage = (bool) => {
        setExpand(bool)
    }
    const allClicked = () => {
        setDisplayAll(!displayAll)
    }
    const settingClick = () => {

        props.setSelectedListFlag(props.flagsList.usersManager)
    }
    return (
        <>
            <div className={`newMessagesContainer ${expand && "opacityScreen"}`}>
                {props.newMessagesCards.slice(0).reverse().map((mc, index) => index < 2 &&
                    <NewMessage key={index} myMessage={mc} expand={getExpandFromNewMessage} />
                )}</div>
            <div className="frame" style={{
                backgroundImage: `url(${props.selectedBackground})`,
                backgroundSize: '100%'

            }}
                onClick={handleClick}>

                <div className={`header row  ${props.selectedBackground == "" ? 'headerdefualtBG' : ''} `}>
                    <div className='leftDiv col-2 d-flex justify-content-start mt-2 mr-3'>
                        <div className="logo">
                            <a href={`${keys.BOX_URL}${props.userName}/#Box`}><img src={leaderBoxLogo} className="leaderLogo"
                            // onClick={goToBox} 
                            /></a>
                            <div>
                                <div className={`logoLabel ${props.textColor == 'dark' ? 'darkLogo' : 'lightLogo'}`}>{allText.newFrame.leaderBox}</div>

                                <span style={{color : `${props.textColor == 'dark' ? 'black' : 'white'}` }}>{`${props.selectedSubUser}@mails.codes`}</span>
                            </div>
                        </div>
                        <HeaderActions />
                    </div>
                    <div className="rightDivv">

                        <div style={{ display: 'inline', float: 'left' }}><SearchConversations /></div>
                        {props.user.premium &&
                            <img style={{ marginTop: '14px', marginRight: '4px' }} onClick={() => {
                                window.open(
                                    `https://pay.leader.codes/${props.userName}?jwt=${props.jwt}&des=${`${keys.BOX_URL}${props.userName}`}`,
                                    '_blank'
                                );
                            }} src={premiumIcon} alt=""></img>}
                        <SettingsIcon style={{ marginTop: '18px' }} className={`${props.textColor == "dark" ? 'strokeDark' : 'strokeLight'} `} onClick={() => (settingClick())} />
                        {/* <img style={{ marginTop: '14px' }} onClick={() => (settingClick())} src={settings} alt=""></img> */}

                        <div className="headerLeader"><HeaderLeader appName={"box"} userName={props.userName} /></div>
                    </div>

                </div>


                <div className={`frameContainer ${!props.selectedBackground || props.selectedBackground == "" ? 'frameContainerdefualtBG' : ''} `}>

                    <div className={`configurator ${!props.selectedBackground || props.selectedBackground == "" ? 'configuratorDefualtBG' : ''} `} >
                        <div className="newConvBtn" onClick={newConvBtnClicked}><img className="img11" src={pencilLineIcon} /><span className="text">{allText.newFrame.newMessage}</span></div>
                        <Categories />
                    </div>
                    {props.flagsList.calenderList === props.selectedListFlag ?
                        <div className={`wideCrad ${!props.selectedBackground || props.selectedBackground == "" ? 'wideCradDefualtBG' : ''} `} >
                            <iframe className='iframeInNewFrame' src={`https://calendar.dev.leader.codes/${props.userName}?iframe=true`} />
                        </div> :
                        props.flagsList.templates === props.selectedListFlag ?
                            <div className={`wideCrad ${!props.selectedBackground || props.selectedBackground == "" ? 'wideCradDefualtBG' : ''} `}>
                                <iframe className='iframeInNewFrame' src={`https://mailart.leader.codes/`} />
                            </div> :
                            props.flagsList.notes === props.selectedListFlag ?
                                <div className={`wideCrad ${!props.selectedBackground || props.selectedBackground == "" ? 'wideCradDefualtBG' : ''} `}>
                                    <iframe className='iframeInNewFrame' src={`${keys.BOX_URL}${props.userName}/Notes`} />
                                </div> :
                                props.flagsList.webhook === props.selectedListFlag ?
                                    <div className={`wideCrad ${!props.selectedBackground || props.selectedBackground == "" ? 'wideCradDefualtBG' : ''} `}>
                                        <Webhook />
                                    </div> :
                                    props.flagsList.usersManager === props.selectedListFlag ?
                                        <div className={`wideCrad ${!props.selectedBackground || props.selectedBackground == "" ? 'wideCradDefualtBG' : ''} `}>
                                            <MyUsers />
                                        </div> :
                                        props.flagsList.groups === props.selectedListFlag ?
                                            <div className={`wideCrad ${!props.selectedBackground || props.selectedBackground == "" ? 'wideCradDefualtBG' : ''} `}>
                                                {/* <iframe className='iframeInNewFrame' src={`https://contacts.dev.leader.codes/${props.userName}?iframe=true`} /> */}
                                                {/* <iframe style={{ width: "100%", height: "100%" }} src={`https://contacts.dev.leader.codes/${props.userName}?iframe=true`} /> */}
                                                <MyGroups />
                                            </div> :
                                            props.flagsList.contactList === props.selectedListFlag ?
                                                <div className={`wideCrad ${!props.selectedBackground || props.selectedBackground == "" ? 'wideCradDefualtBG' : ''} `}>
                                                    <iframe className='iframeInNewFrame' src={`https://contacts.dev.leader.codes/${props.userName}?iframe=true`} />
                                                </div> :
                                                props.selectedListFlag === props.flagsList.signature && !props.selectedSignatureId ?
                                                    <div className={`wideCrad ${!props.selectedBackground || props.selectedBackground == "" ? 'wideCradDefualtBG' : ''} `}>
                                                        <DeleteUpdate />
                                                    </div> :
                                                    props.allConversations.length === 0 && props.systemWaves.length === 0 ?
                                                        // || props.conversationsFilterEmpty === true ?
                                                        <div className={`wideCrad ${!props.selectedBackground || props.selectedBackground == "" ? 'wideCradDefualtBG' : ''} `}>
                                                            <NoConversations />
                                                        </div> :
                                                        props.selectedListFlag !== props.flagsList.drafts &&
                                                        <>
                                                            {!props.showOpenConversation && props.convSelectedShowOpen != "empty" && props.selectedListFlag !== props.flagsList.signature ?
                                                                <>
                                                                    {props.close === true && props.selectedListFlag !== props.flagsList.signature ?
                                                                        <div className={`displayingCard ${!props.selectedBackground || props.selectedBackground == "" ? 'defualtBG' : ''} `} >
                                                                            <ConversationsList />
                                                                        </div> :

                                                                        <div className={`wideCrad ${!props.selectedBackground || props.selectedBackground == "" ? 'wideCradDefualtBG' : ''} `}>

                                                                            <OpenConversation />
                                                                        </div>
                                                                    }
                                                                </>
                                                                :
                                                                <> {!props.showOpenConversation && props.selectedListFlag !== props.flagsList.signature ?
                                                                    <div className={`displayingCard ${!props.selectedBackground || props.selectedBackground == "" ? 'defualtBG' : ''} `}>
                                                                        <ConversationsList />
                                                                    </div>
                                                                    :

                                                                    <>
                                                                        <ResizePanel direction="e" style={{ "width": "40%", "minWidth": "15%", "maxWidth": "40%" }}>
                                                                            <div className={`displayingCard ${!props.selectedBackground || props.selectedBackground == "" ? 'defualtBG' : ''} `}>
                                                                                {props.selectedListFlag === props.flagsList.signature && props.selectedSignatureId ?
                                                                                    <Signature /> : <ConversationsList />
                                                                                }
                                                                            </div>
                                                                        </ResizePanel>

                                                                        <div className={`displayingCard ${!props.selectedBackground || props.selectedBackground == "" ? 'defualtBG' : ''} `}>
                                                                            {props.selectedListFlag === props.flagsList.signature && <Preview sentToGoogle={false} /> ||
                                                                                // props.allConversations === "" && <NoConversations /> ||
                                                                                props.selectedConversation && <OpenConversation />
                                                                                // <NoForSearch />
                                                                            }
                                                                        </div>
                                                                    </>
                                                                }

                                                                    {/* {props.selectedListFlag===props.flagsList.signature&&<SignaturePreview/>} */}
                                                                </>

                                                            }


                                                        </>

                                                        ||
                                                        <div className={`wideCrad ${!props.selectedBackground || props.selectedBackground == "" ? 'wideCradDefualtBG' : ''} `}><Drafts /></div>}
                    {showRightCard()}
                </div>
            </div >
        </>)
}

export default connect(
    (state) => {
        return {
            isMessageOpen: state.conversations.isMessageOpen,
            conversationsIdsToEdit: state.conversations.conversationsIdsToEdit,
            user: state.init.user,
            userName: state.init.userName,
            jwt: state.init.jwt,
            selectedConversation: state.conversations.selectedConversation,
            allConversations: state.conversations.allConversations,
            systemWaves: state.conversations.systemWaves,
            filteredConversations: state.conversations.filteredConversations,
            selectedListFlag: state.conversations.selectedListFlag,
            flagsList: state.conversations.flagsList,
            userName: state.init.userName,
            bodyClicked: state.init.bodyClicked,
            newMessagesCards: state.drafts.newMessagesCards,
            drafts: state.drafts,
            displayRightCard: state.conversations.displayRightCard,
            expand: state.conversations.expandMessage,
            changeDisplayConver: state.conversations.changeDisplayConver,
            signatures: state.signature.signaturesList,
            showOpenConversation: state.displaySettings.showOpenConversation,
            selectedSignatureId: state.signature.selectedSignatureId,
            convSelectedShowOpen: state.conversations.convSelectedShowOpen,
            close: state.conversations.close,
            conversationsForSearch: state.conversations.conversationsForSearch,
            conversationsFilterEmpty: state.conversations.conversationsFilterEmpty,
            currentNotification: state.notification.currentNotification,
            subUsers: state.subUsers.subUsers,
            selectedSubUser: state.subUsers.selectedSubUser,
            textColor: state.settings.textColor,
            selectedBackground: state.settings.selectedBackground
        }
    },

    (dispatch) => ({
        setIsMessageOpen: (val) => { dispatch(actions.setIsMessageOpen(val)) },
        setSelectedListFlag: (val) => { dispatch(actions.setSelectedListFlag(val)) },
        setSelectedConversation: (val) => { dispatch(actions.setSelectedConversation(val)) },
        setBodyClicked: (val) => { dispatch(actions.setBodyClicked(val)) },
        addNewMessageCard: (val) => { dispatch(actions.addNewMessageCard(val)) },
        setDisplayRightCard: (val) => { dispatch(actions.setDisplayRightCard(val)) },
        setExpandMessage: (val) => { dispatch(actions.setExpandMessage(val)) },
        setChangeDisplayConver: (val) => { dispatch(actions.setChangeDisplayConver(val)) },
        setSelectedSignatureId: (val) => { dispatch(actions.setSelectedSignatureId(val)) },
        getConversationsServer: (val) => { dispatch(actions.getConversationsServer(val)) },
        setSelectedSubUser: (val) => { dispatch(actions.setSelectedSubUser(val)) },

    })

)(NewFrame)

