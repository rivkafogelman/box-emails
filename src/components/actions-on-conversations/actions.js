import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { deleteConversations, deleteSystemWavesServer, editConversations, getConversations, getSystemWaves, setDisplayRightCard, setExpandMessage, setSourceFilter, setSelectedAllConversation, markAsTrashConversations, markAsReadOrUnreadConversations, setSelectedListFlag } from '../../redux/actions/conversation.actions';
// import { setDisplayTags } from '../../redux/actions/tag.actions';
// import { addSpam, removeSpam } from '../../redux/actions/spam.action'
import { connect } from "react-redux"

import { ExclamationOctagon } from 'react-bootstrap-icons';
// import Filter from './filter';
import { Checkbox } from '@material-ui/core';

import TagsList from './LabelsToSelect'
import Tooltip from '@material-ui/core/Tooltip';
import Dropdown from 'react-bootstrap/Dropdown'
// import checkbox from './assets/checkbox.png'
import './actions.scss'
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
// import { setNotification } from '../../redux/actions/notification.actions';
// import pdf from '../open-converstion/assets/pdf.png'
import Labels from '../labels/Labels';
import { actions } from '../../redux/actions/action'

// Alltext 
import allText from '../../allText.json'

function Actions(props) {

    const dispatch = useDispatch();
    const conversationsIdsToEdit = useSelector(state => state.conversations.conversationsIdsToEdit);
    const sources = useSelector(state => state.init.sources)
    const selectedConversation = useSelector(state => state.conversations.selectedConversation)
    const sourceFilter = useSelector(state => state.conversations.sourceFilter)
    const tags = useSelector(state => state.tags.tags)
    const allConversations = useSelector(state => state.conversations.allConversations);
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

    const refresh = async (e) => {
        try {
            await props.getConversationsServer()
            e.stopPropagation()
            await props.getSystemWavesServer()
            //show notification refresh
            const notificationToShow = { info: (allText.notification.loading), icon: null, color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
            props.setNotification(notificationToShow);
        } catch (error) {
            console.log("error in refresh conversations", error)
        }
    }

    // only in trash and systemWaves 
    const deleteConv = (e) => {
        setCheckboxState(false)
        //If no conversation selected - edit the selectedConversation if exists
        if (!conversationsIdsToEdit.length && selectedConversation && selectedConversation !== "empty") {
            //delete conversations
            if (!isSystemWaves) {
                dispatch(actions.deleteConversationsServer([selectedConversation._id]))
            }
            //delete system waves
            else {
                dispatch(actions.deleteSystemWavesServer([selectedConversation._id]))
            }
        }
        // If one or more is selected delete them
        else {
            if (!isSystemWaves) {
                dispatch(actions.deleteConversationsServer(conversationsIdsToEdit))
            }
            else {
                dispatch(actions.deleteSystemWavesServer(conversationsIdsToEdit))
            }
        }
        //show notification delete conversations
        const notificationToShow = { info: allText.notification['conversationsDeleted‏'], icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
        dispatch(actions.setNotification(notificationToShow));
        e.stopPropagation()
    }

    const trashConversations = async (e) => {
        if (selectedListFlag === flagsList.trash || isSystemWaves) {
            deleteConv(e);
        }
        else {
            let convs = [], notificationToShow;
            if (!conversationsIdsToEdit.length && selectedConversation) {
                convs.push({ "_id": selectedConversation._id, "trash": !selectedConversation.trash.bool })
            }
            else {
                let conversatioInAllConversation;
                // ('one or more is selected edit them')
                conversationsIdsToEdit.forEach(c => {
                    conversatioInAllConversation = allConversations.find(con => con._id === c);
                    convs.push({ "_id": c, "trash": true })
                });
            }
            //show notification trash conversation
            if (convs.length > 1) {
                notificationToShow = { info: `${conversationsIdsToEdit.length} ${allText.header['conversationsTrashed']}`, icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
            }
            else {
                notificationToShow = { info: (allText.header['conversationTrashed']), icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
            }
            props.setNotification(notificationToShow);
            await dispatch(actions.markAsTrashConversationsMidd(convs))
            e.stopPropagation();
        }
    }


    const starConv = async (e) => {
        setCheckboxState(false)
        let convs = [];
        if (!conversationsIdsToEdit.length && selectedConversation) {
            convs.push({ "_id": selectedConversation._id, "starred": !selectedConversation.starred })
        }
        else {
            let conversatioInAllConversation;
            conversationsIdsToEdit.forEach(c => {
                conversatioInAllConversation = allConversations.find(con => con._id === c);
                convs.push({ "_id": c, "starred": !conversatioInAllConversation.starred })
            });
        }
         //show notification star
         const notificationToShow = { info: (allText.header['conversationsUpdated‏']), icon: null, color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
        //  props.setNotification(notificationToShow);
         dispatch(actions.setNotification(notificationToShow))
        await dispatch(actions.editConversationsServer({ conversations: convs, field: "starred" }))
        e.stopPropagation()
    }

    const readConv = async () => {
        setCheckboxState(false)
        if (isSystemWaves) { return; }
        let convs = []
        if (!conversationsIdsToEdit.length && selectedConversation) {
            // ('edit open and nothing selecte')
            convs.push({ "_id": selectedConversation._id, "readed": !selectedConversation.readed })
        }
        else {
            let conversatioInAllConversation;
            // ('one or more is selected edit them')
            conversationsIdsToEdit.forEach(c => {
                conversatioInAllConversation = allConversations.find(con => con._id === c);
                convs.push({ "_id": c, "readed": !conversatioInAllConversation.readed })
            });
        }
        //show notification refresh
        const notificationToShow = { info: (allText.header['conversationsUpdated‏']), icon: null, color: '#1280de', backgroundColor: '#d3eff8', notUndo: true }
        props.setNotification(notificationToShow);
        await dispatch(actions.markAsReadOrUnreadConversationsMidd(convs))
    }

    const archiveConv = async (e) => {
        setCheckboxState(false);
        let convs = [], notificationToShow;
        if (!conversationsIdsToEdit.length && selectedConversation) {
            // ('edit open and nothing selecte')
            convs.push({ "_id": selectedConversation._id, "archived": !selectedConversation.archived })
        }
        else {
            let conversatioInAllConversation;
            // ('one or more is selected edit them')
            conversationsIdsToEdit.forEach(c => {
                conversatioInAllConversation = allConversations.find(con => con._id === c);
                convs.push({ "_id": c, "archived": !conversatioInAllConversation.archived })
            });
        }
        //show notification archived conversation
        if (conversationsIdsToEdit.length > 1) {
            notificationToShow = { info: `${conversationsIdsToEdit.length} ${allText.header['conversationsArchived']}`, icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
        }
        else {
            notificationToShow = { info: (allText.header['conversationArchived']), icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
        }
        props.setNotification(notificationToShow);
        await dispatch(actions.editConversationsServer({ conversations: convs, field: "archived" }))
        e.stopPropagation()
    }

    const filterBySource = (source) => {
        dispatch(actions.setSourceFilter(source))
    }


    const editConversationTag = (e, selectedTag) => {
        setCheckboxState(false)
        let convs = []
        if (!conversationsIdsToEdit.length && selectedConversation) {
            // ('edit open and nothing selecte')
            let t = selectedConversation.tags.find(ta => ta == selectedTag._id)
            if (!t) {
                convs.push({ "_id": selectedConversation._id, "tag": selectedTag._id })
            }
        }
        else {
            // ('one or more is selected edit them')
            conversationsIdsToEdit.forEach(c => {
                let conv = allConversations.filter(con => con._id == c)
                if (conv.length != 0) {
                    let t = conv[0].tags.filter(T => T === selectedTag._id)
                    if (t.length == 0) {
                        convs.push({ "_id": c, "tag": selectedTag._id })
                    }
                }
            });
        }
        if (convs.length != 0) {
            //  show notification add tags;
            let notificationToShow;
            if (convs.length === 1) {
                notificationToShow = { info: allText.notification.ConversationAddedTo + selectedTag.title, icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
            }
            else {
                notificationToShow = { info: allText.notification.ConversationsAddedTo + selectedTag.title, icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
            }
            dispatch(actions.setNotification(notificationToShow))
            dispatch(actions.editConversationsServer({ conversations: convs }))
        }
        e.stopPropagation()
    }

    const removeTag = (e) => {
        setCheckboxState(false)
        let convs = []
        if (!conversationsIdsToEdit.length && selectedConversation) {
            // ('edit open and nothing selecte')
            convs.push({ "_id": selectedConversation._id, "tag": null })
        }
        else {
            // ('one or more is selected edit them')
            conversationsIdsToEdit.forEach(c => {
                convs.push({ "_id": c, "tag": null })
            });
        }
        if (convs.length != 0) {
            //  show notification remove tag
            let notificationToShow;
            if (convs.length === 1) {
                notificationToShow = { info: allText.notification.ConversationRemovedFromLabels, icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
            }
            else {
                notificationToShow = { info: allText.notification.ConversationsRemovedFromLabels, icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
            }
            dispatch(actions.setNotification(notificationToShow))
            dispatch(actions.editConversationsServer({ conversations: convs }))
        }
        e.stopPropagation()
    }

    const selectAllConversation = (selected) => {
        setCheckboxState(!checkboxState)
        dispatch(actions.setSelectedAllConversation(selected));
    }

    const spamConv = async (e) => {
        setCheckboxState(false)
        let convs = []
        conversationsIdsToEdit.forEach(async c => {
            //  show notification spam con
            const notificationToShow = { info: allText.notification.spamConversation, icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
            dispatch(actions.setNotification(notificationToShow))
            await dispatch(actions.editConversationsServer({ conversations: { _id: c, spam: true }, field: "spam" }))
            e.stopPropagation()
            convs.push({ "_id": c, "spam": true })
            let i = c
            let tempConversation = props.allConversations.find(d => d._id === i)
            let tempFrom = tempConversation.waves[0].from

            // alert(tempFrom)
            if (tempFrom === props.init.userName) { return }

            let tempContact = ''

            if (!(tempFrom && tempFrom.includes(`@`))) {

                tempContact = props.contacts.find(s => s.name == tempFrom)._id
            }
            else {
                tempContact = props.contacts.find(s => s.email == tempFrom)._id
            }

            // alert(tempContact)
            props.addSpam(tempContact)
        });

    }
    const removeSpamConv = async (e) => {
        setCheckboxState(false)
        let convs = []
        conversationsIdsToEdit.forEach(async c => {
            //  show notification spam con
            const notificationToShow = { info: allText.notification.removeSpamConversation, icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
            dispatch(actions.setNotification(notificationToShow))
            await dispatch(actions.editConversationsServer({ conversations: { _id: c, spam: true }, field: "spam" }))
            // await dispatch(actions.editConversationsServer({ _id: c, spam: true }, "spam"))

            convs.push({ "_id": c, "spam": true })
            let i = c
            let tempConversation = props.allConversations.find(d => d._id === i)
            let tempFrom = tempConversation.waves[0].from

            alert(tempFrom)
            if (tempFrom === props.init.userName) { return }

            let tempContact = ''

            if (!(tempFrom && tempFrom.includes(`@`))) {

                tempContact = props.contacts.find(s => s.name == tempFrom)._id
            }
            else {
                tempContact = props.contacts.find(s => s.email == tempFrom)._id
            }
            alert(tempContact)
            props.removeSpam(tempContact)
        });
    }
    return (
        <div className="actionsDiv">
            <Tooltip title={<p style={{ fontSize: '11px' }}>{allText.header.refresh}</p>} >
                <div className='action' onClick={(e) => { refresh(e) }}>
                    <img src={refreshDark} alt="" />
                </div>
            </Tooltip>
            <Tooltip title={<p style={{ fontSize: 'x-small' }}>{allText.header.selectAll}</p>}>
                <div className="action">
                    <Checkbox
                        checked={checkboxState}
                        className={`selectAll selectDark  `}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onChange={(e) => { selectAllConversation(e.target.checked) }}
                    />
                </div>
            </Tooltip>
            <Tooltip title={<p style={{ fontSize: 'x-small' }}>{selectedListFlag === flagsList.trash ? allText.header.deleteForever : allText.header.delete}</p>}>
                <div className={`action ${isActionDisabled ? 'disable' : ''}`} onClick={trashConversations}>
                    <TrashIcon className={'strokeDark'} />
                    {/* <img src={trashIcon} alt="" /> */}
                </div>
            </Tooltip>
            {props.selectedListFlag !== props.flagsList.trash &&
                <Tooltip title={<p style={{ fontSize: 'x-small' }}>{allText.header.star}</p>}>
                    <div className={`action ${isActionDisabled || isSystemWaves ? 'disable' : ''}`} onClick={starConv}>
                        <StarIcon className={'strokeDark'} />
                        {/* <img src={starIcon} alt=""></img> */}
                    </div>
                </Tooltip>}
            <Tooltip title={<p style={{ fontSize: 'x-small' }}>{allText.header.readOrUnread}</p>}>
                <div className={`action ${isActionDisabled || isSystemWaves ? 'disable' : ''}`} onClick={readConv}>
                    <ReadIcon className={'strokeDark'} />
                    {/* <img src={readIcon} alt=""></img> */}
                </div>
            </Tooltip>
            {props.selectedListFlag !== props.flagsList.trash && props.selectedListFlag !== props.flagsList.spam &&
                <Tooltip title={<p style={{ fontSize: 'x-small' }}>{allText.header.archived}</p>}>
                    <div className={`action ${isActionDisabled || isSystemWaves ? 'disable' : ''}`} onClick={archiveConv}>
                        <ArchiveIcon className={'strokeDark'} />
                        {/* <img src={archiveIcon} alt=""></img> */}
                    </div>
                </Tooltip>}
            {props.selectedListFlag !== props.flagsList.spam ?
                <Tooltip title={<p style={{ fontSize: 'x-small' }}>{allText.header.spam}</p>}>
                    <div className={`action ${isActionDisabled || isSystemWaves ? 'disable' : ''}`} onClick={spamConv}>
                        <ExclamationOctagon color={"black"} size={18} />
                    </div>
                </Tooltip > :
                <Tooltip title={<p style={{ fontSize: 'x-small' }}>{allText.header.noSpam}</p>}>
                    <div className={`action ${isActionDisabled ? 'disable' : ''}`} onClick={removeSpamConv}>
                        <ExclamationOctagon color={"black"} size={18} />
                    </div>
                </Tooltip>
            }
            <Dropdown style={{ marginLeft: '1px' }} className={`${isActionDisabled || isSystemWaves ? 'disable' : ''}`}>
                <Dropdown.Toggle className="dropdownAction">
                    < Tooltip title={<p style={{ fontSize: 'x-small' }}>{allText.header.label}</p>}>
                        <LabelIcon className={'strokeDark'} />
                        {/* <img className='dropdownLabelImg' src={labelIcon} alt=""></img> */}
                    </Tooltip>
                </Dropdown.Toggle>
                <Dropdown.Menu className="tagsDropdown">
                    {tags && tags.length != 0 ?
                        <>
                            {tags.slice(0).reverse().map(t =>
                                <Dropdown.Item
                                    className="dropdownItemLabel"
                                    onClick={(e) => { editConversationTag(e, t) }} style={{ backgroundColor: t.color }}>
                                    <span>{t.title}</span>
                                </Dropdown.Item>
                            )}
                            <Dropdown.Item onClick={removeTag} className="dropdownItemLabel">
                                <span>{allText.header.noLabel}</span>
                            </Dropdown.Item>
                        </>
                        :
                        <Labels />
                    }
                </Dropdown.Menu>
            </Dropdown>
            {
                isSystemWaves &&
                <Dropdown >
                    <Dropdown.Toggle className="dropdownAction">
                        < Tooltip title={<p style={{ fontSize: 'x-small' }}>{allText.header.filter}</p>}>

                            <img className='dropdownFilterImg' src={filterIcon} alt=""></img>
                        </Tooltip>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {sources.map((s) =>
                            <Dropdown.Item
                                active={sourceFilter === s.name}
                                onClick={() => filterBySource(s.name)}>
                                <div>
                                    <span>
                                        <img className='srcImg' src={s.icon} alt="?"></img>
                                    </span>
                                    <span>{s.name}</span>
                                </div>
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            }

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
    (dispatch) => ({
        getConversationsServer: (val) => { dispatch(actions.getConversationsServer(val)) },
        getSystemWavesServer: (val) => { dispatch(actions.getSystemWavesServer(val)) },
        setNotification: (val) => { dispatch(actions.setNotification(val)) },
        addSpam: (val) => { dispatch(actions.addSpam(val)) },
        removeSpam: (val) => { dispatch(actions.removeSpam(val)) },
        deleteConversationsServer: (val) => { dispatch(actions.deleteConversationsServer(val)) },
        // editConversationsServer: (val) => { dispatch(actions.editConversationsServer(val)) },
    })
)(Actions)

