import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteConversations, deleteSystemWaves, editConversations, getConversations, getSystemWaves, setDisplayRightCard, setExpandMessage, setSourceFilter, setSelectedAllConversation, markAsTrashConversations, markAsReadOrUnreadConversations, setSelectedListFlag } from '../../redux/actions/conversation.actions';
import { setDisplayTags } from '../../redux/actions/tag.actions';
import { addSpam, removeSpam } from '../../redux/actions/spam.action'
import { connect } from "react-redux"

import { ExclamationOctagon } from 'react-bootstrap-icons';
// import Filter from './filter';
import { Checkbox } from '@material-ui/core';

import TagsList from './LabelsToSelect'
import Tooltip from '@material-ui/core/Tooltip';
import Dropdown from 'react-bootstrap/Dropdown'
// import checkbox from './assets/checkbox.png'
import './headerActions.scss'
import { CheckSquare, App, CheckCircle, Circle } from 'react-bootstrap-icons';

// assets
import { ReactComponent as DealLight } from './assets/dealLight.svg'
import dealLight from './assets/dealLight.svg'
import dealDark from './assets/dealDark.svg'

import { ReactComponent as LeadIcon } from './assets/lead.svg';
import leadIcon from './assets/lead.svg';
import { ReactComponent as TaskIcon } from './assets/task.svg';
import taskIcon from './assets/task.svg';
import { ReactComponent as TrashIcon } from './assets/trash.svg'
// import trashIcon from './assets/trash.svg';
import labelIcon from './assets/label.svg';
import { ReactComponent as LabelIcon } from './assets/label.svg';
import { ReactComponent as FilterIcon } from './assets/filter.svg';
import filterIcon from './assets/filter.svg';
import refreshLight from './assets/refreshLight.svg';
import refreshDark from './assets/refreshDark.svg';
import { ReactComponent as ReadIcon } from './assets/read.svg';
import readIcon from './assets/read.svg';
import { ReactComponent as StarIcon } from './assets/star.svg'
import starIcon from './assets/star.svg'
import { ReactComponent as ArchiveIcon } from './assets/archive.svg'
import archiveIcon from './assets/archive.svg'
import { ReactComponent as MeetingIcon } from './assets/meeting.svg'

import meetingIcon from './assets/meeting.svg'
import { ReactComponent as NotesIcon } from './assets/notes.svg'
import notesIcon from './assets/notes.svg'
import webhookIcon from './assets/webhookIcon.svg'
import { setNotification } from '../../redux/actions/notification.actions';
// import pdf from '../open-converstion/assets/pdf.png'
import Labels from '../labels/Labels';

// Alltext 
import allText from '../../allText.json'
import { ADD_BACKGROUND_PHOTO } from '../../redux/middleware/settings.crud';

function HeaderActions(props) {

    const dispatch = useDispatch();
    const conversationsIdsToEdit = useSelector(state => state.conversations.conversationsIdsToEdit);
    const displayRightCard = useSelector(state => state.conversations.displayRightCard);
    const selectedConversation = useSelector(state => state.conversations.selectedConversation)
    const selectedListFlag = useSelector(state => state.conversations.selectedListFlag)
    const flagsList = useSelector(state => state.conversations.flagsList)
    const [checkboxState, setCheckboxState] = useState(false);
    const [isActionDisabled, setIsActionDisabled] = useState(true)
    const [isSystemWaves, setIsSystemWaves] = useState(false)
    useEffect(() => {
        // to inital checkbox select all with false after merge(?)

        if (conversationsIdsToEdit.length || selectedConversation !== "" && selectedConversation !== "empty") {
            setIsActionDisabled(false)
        }
        else {
            setIsActionDisabled(true)
        }
    }, [conversationsIdsToEdit, selectedConversation, selectedListFlag])

    useEffect(() => {
        if (selectedListFlag) {
            setCheckboxState(false);
        }
        setIsSystemWaves(selectedListFlag === flagsList.systemWaves)
    }, [selectedListFlag])


    const showRightCard = (nameCard) => {
        if (displayRightCard === nameCard) {
            dispatch(setDisplayRightCard(''))
        }
        else { dispatch(setDisplayRightCard(nameCard)) }
    }

    
    return (
       <div className="actionsDivHeader">
            <div className={`createActions 
            // ${props.selectedListFlag == props.flagsList.groups
                //         || props.selectedListFlag == props.flagsList.signature
                //         || props.selectedListFlag == props.flagsList.usersManager
                //         ? 'disable' : ''
                }`} >
                {/* <span className={`divider ${props.textColor == "dark" ? 'darkText' : 'lightText'} `} >|</span> */}
                {/* <span className={`createSpan ${props.textColor == "dark" ? 'darkText' : 'lightText'} `}> {allText.header.create}: </span> */}
                <div className={`createAction ${props.textColor == "dark" ? 'darkText' : 'lightText'} ${displayRightCard === allText.header.task && 'active'}`} onClick={e => { showRightCard(allText.header.task); dispatch(setExpandMessage(false)) }}><span >
                    <TaskIcon className={`${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} />
                    {/* <img src={taskIcon} alt=""></img> */}
                </span><span className='ml-1'>{allText.header.task}</span></div>
                <div className={`createAction ${props.textColor == "dark" ? 'darkText' : 'lightText'} ${displayRightCard === allText.header.meet && 'active'}`} onClick={e => { showRightCard(allText.header.meet); dispatch(setExpandMessage(false)); }}>
                    <span >
                    <MeetingIcon className={`${props.textColor == "dark" ? 'strokeDark' : 'strokeLight'} `} />
                    {/* <img src={meetingIcon} alt=""></img> */}
                </span>
                <span className='ml-1'>{allText.header.meet}</span>
                </div>
                <div className={`createAction ${props.textColor == "dark" ? 'darkText' : 'lightText'} ${displayRightCard === allText.header.deal && 'active'}`} onClick={e => { showRightCard(allText.header.deal); dispatch(setExpandMessage(false)); }}><span >
                    {/* <DealLight /> */}
                    {
                        props.textColor == 'dark' ?
                            <img src={dealDark} alt=""></img>
                            :
                            <img src={dealLight} alt=""></img>
                    }
                    {/* <img src={dealLight} alt=""></img> */}
                </span><span className='ml-1'>{allText.header.deal}</span></div>
                <div className={`createAction ${props.textColor == "dark" ? 'darkText' : 'lightText'} ${displayRightCard === allText.header.lead && 'active'}`} onClick={e => { showRightCard(allText.header.lead); dispatch(setExpandMessage(false)) }}><span >
                    <LeadIcon className={`${props.textColor == "dark" ? 'strokeDark' : 'strokeLight'} `} />
                    {/* <img src={leadIcon} alt=""></img> */}
                </span><span className='ml-1'>{allText.header.lead}</span></div>
                {/* <div className={`createAction ${props.textColor == "dark" ? 'darkText' : 'lightText'} ${selectedListFlag === flagsList.notes && 'active'}`} onClick={e => { dispatch(setSelectedListFlag(flagsList.notes)); dispatch(setExpandMessage(false)) }}><span >
                    <NotesIcon className={`${props.textColor == "dark" ? 'strokeDark' : 'strokeLight'} `} />
                </span><span className='ml-1'>{allText.header.notes}</span></div> */}
                {selectedListFlag === "Leader" && selectedConversation && selectedConversation.sourceIp ?
                    props.showOpenConversation || !props.close ?
                        <div className={`createAction ${props.textColor == "dark" ? 'darkText' : 'lightText'} ${displayRightCard === allText.header.jsonParser && 'active'}`} onClick={e => { showRightCard(allText.header.jsonParser) }}><span ><img src={webhookIcon} alt=""></img></span><span className='ml-1'>{allText.header.webhook}</span></div>
                        : null
                    : null}
            </div>

        </div >
    )
}


export default connect(
    (state) => {
        return {
            tags: state.tags.tags,
            allUserContacts: state.init.contacts,
            selectedConversation: state.conversations.selectedConversation,
            conversationsIdsToEdit: state.conversations.conversationsIdsToEdit,
            user: state.init.user,
            selectedListFlag: state.conversations.selectedListFlag,
            flagsList: state.conversations.flagsList,
            displaySystemWaves: state.conversations.displaySystemWaves,
            contacts: state.init.contacts,
            sourcesArray: state.init.sources,
            changeDisplayConver: state.conversations.changeDisplayConver,
            allConversations: state.conversations.allConversations,
            init: state.init,
            waveSelect: state.conversations.waveSelect,
            showOpenConversation: state.displaySettings.showOpenConversation,
            close: state.conversations.close,
            textColor: state.settings.textColor
        }
    },
    {

        getConversations: getConversations,
        getSystemWaves: getSystemWaves,
        setNotification: setNotification,
        addSpam: addSpam,
        removeSpam: removeSpam

    }
)(HeaderActions)

