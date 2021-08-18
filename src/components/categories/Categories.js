import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
// import { setSelectedListFlag, setSelectedConversation, setSourceFilter, setTagFilter, setIndexConversation, setClose } from '../../redux/actions/conversation.actions'
// import { setSelectedSignatureId } from '../../redux/actions/signature.actions';
import Signatures from './Signatures'
import Labels from '../labels/Labels'
import { ReactComponent as AllIcon } from '../../assets/icon-1.svg'
import allIcon from '../../assets/icon-1.svg'
import { ReactComponent as BoxIcon } from '../../assets/inbox.svg';

import allText from '../../allText.json'
// import BoxIcon from ''
import { ReactComponent as SentIcon } from '../../assets/icon.svg'

import sentIcon from '../../assets/icon.svg'
import { ReactComponent as LabelsIcon } from '../../assets/icon-4.svg'
// import LabelsIcon from '../../assets/icon-4.svg'
import { ReactComponent as StarredIcon } from '../../assets/whiteEmptyStar.svg'
import starredIcon from '../../assets/whiteEmptyStar.svg'
import { ReactComponent as DraftsIcon } from '../../assets/drafts.svg'
import draftsIcon from '../../assets/drafts.svg'
import { ReactComponent as ArchivedIcon } from '../../assets/Group 21379.svg'
import archivedIcon from '../../assets/Group 21379.svg'
import { ReactComponent as SignatureIcon } from '../../assets/Group 18425.svg'
import signatureIcon from '../../assets/Group 18425.svg'
// import openOptionIcon from '../../assets/Polygon 1.svg'
import { ReactComponent as OpenOptionIcon } from './assets/Polygon 1.svg'

import openOptionIcon from './assets/Polygon 1.svg'
import { ReactComponent as ContactsIcon } from './assets/contacts.svg'
import contactsIcon from './assets/contacts.svg'
// import { ReactComponent as LeaderIcon } from './assets/leader.svg'
// import leaderIcon from './assets/leader.svg'
import leaderDark from './assets/leaderDark.svg'
import leaderLight from './assets/leaderLight.svg'
import { ReactComponent as TemplatesIcon } from './assets/templates.svg'
import templatesIcon from './assets/templates.svg'
import { ReactComponent as CalenderIcon } from './assets/calender.svg'
import calenderIcon from './assets/calender.svg'
import { ReactComponent as SpamIcon } from './assets/spam.svg'
import spamIcon from './assets/spam.svg'
import { ReactComponent as TrashIcon } from './assets/trash.svg'
import trashIcon from './assets/trash.svg'
import Group from './assets/Group.svg'
// import {ReactComponent as Webhook } from './assets/webhook.svg'
import webhookDark from './assets/webhookDark.svg'
import webhookLight from './assets/webhookLight.svg'
import soonIcon from './assets/soon.svg'

import { ReactComponent as GroupIcon } from './assets/Group6.svg'
// import GroupIcon from './assets/Group6.svg'
import { ReactComponent as FlagImg } from '../../assets/flag.svg'
import flagImg from '../../assets/flag.svg'
import flagDark from './assets/flagDark.svg'
import flagLight from './assets/flagLight.svg'

import Templates from '../templates/templates';
import Sources from '../Leader/sources';
import { CgOptions } from 'react-icons/cg'
import './Categories.scss'
import DeleteUpdate from '../signature/Delete&update'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import { editConversation, setDraggableIdConversation, setDisplayRightCard } from '../../redux/actions/conversation.actions';
// import { setShowOpenConversation } from '../../redux/actions/displaySettings.actions'
import Tooltip from '@material-ui/core/Tooltip';
import Groups from '../groups/Groups';
import { actions } from '../../redux/actions/action'

// import { Dropdown } from 'react-bootstrap';
import SubUser from '../from-Email/subUsers/subUser';
import SubUsers from '../from-Email/subUsers/subUser'
import Users from '../UsersManager/Users';
function Categories(props) {
    const cntInbox = useSelector(state => state.conversations.cntInbox)
    const dispatch = useDispatch();

    const list = props.flagsList
    const flag = props.selectedListFlag
    const [displaySources, setDisplaySources] = useState(false)
    const [displaySourcesLeader, setDisplaySourcesLeader] = useState(false)
    const [displaySignatures, setDisplaySignatures] = useState(false)
    const [displayLabels, setDisplayLabels] = useState(false)
    const [displayTemplates, setDisplayTemplates] = useState(false);
    const [displayAll, setDisplayAll] = useState(false)
    const [displayMore, setDisplayMore] = useState(false);
    const [displayGroups, setDisplayGroups] = useState(false)
    const [fromEmails, setFromEmails] = useState([{ key: "1111", value: "1111", text: '1111' }, { key: "222", value: "222", text: '222' }, { key: "333", value: "333", text: '333' }]) //
    const [displayUsersManager, setDisplayUsersManager] = useState(false)

    const [openAllLists, setOpenAllLists] = useState(false)
    //צריך לשנות לרעיון אחר
    const listConvFlag = [list.all, list.box, list.sent, list.archived, list.favorites, list.drafts, list.spam, list.followUp]

    useEffect(() => {
        if (props.showOpenConversation === true) {
            props.setSelectedConversation(props.filteredConversations[0])
        }
        // @shulamitCohen change it to render only when changed category (by props.selectedListFlag);
        // because its reset the selectedConversation in every refresh the conversations;
        // }, [props.filteredConversations])
    }, [props.selectedListFlag])

    const changeListFlag = (lst) => {

        if (props.setCloseJsonParser)
            props.setDisplayRightCard("")
        props.setSelectedListFlag(lst)
        // if (selectedListFlag)

        let res = listConvFlag.find(x => x === lst)
        if (!res || !props.showOpenConversation) {
            props.setSelectedConversation('')
        }
        props.setClose(true)

        if (displaySourcesLeader === true) {
            leaderCategoryClicked(displaySourcesLeader)
        }
        if (displayMore === true) {
            setDisplayMore(!displayMore)
        }
        if (displayLabels === true) {
            LabelsCategoryClicked(displayLabels)
        }
        if (displaySignatures === true) {
            signaturesCategoryClicked(displaySignatures)
        }
        if (displayTemplates === true) {
            templatesCategoryClicked(displayTemplates)
        }
        if (displayGroups === true) {
            groupsCategoryClicked(displayGroups)
        }
        // if(displayLabels===true){
        //     setDisplayLabels(displayLabels)
        // }
    }

    const resetIndexConversation = () => {
        props.setIndexConversation(0)
    }

    const signaturesCategoryClicked = () => {
        setDisplaySignatures(!displaySignatures)
        props.setSelectedSignatureId(null)
    }

    const groupsCategoryClicked = () => {
        setDisplayGroups(!displayGroups)
    }

    const leaderCategoryClicked = () => {
        setDisplaySourcesLeader(!displaySourcesLeader)
    }
    const allCategoryClicked = () => {
        setDisplayAll(!displayAll)
    }
    const sourcesCategoryClicked = () => {
        props.setSourceFilter("all")
        setDisplaySources(!displaySources)
    }

    const LabelsCategoryClicked = () => {
        props.setTagFilter("")
        setDisplayLabels(!displayLabels)
    }

    const templatesCategoryClicked = () => {
        setDisplayTemplates(!displayTemplates)
    }

    const changeOpenAllLists = () => {
        if (openAllLists == false) {
            setDisplayUsersManager(true)
            setDisplaySourcesLeader(true)

            setDisplaySignatures(true)
            props.setSelectedSignatureId(null)

            props.setTagFilter("")
            setDisplayLabels(true)
            setDisplayGroups(true)
            setOpenAllLists(true)


        }
        else {
            setDisplayUsersManager(false)
            setDisplaySourcesLeader(false)

            setDisplaySignatures(false)
            props.setSelectedSignatureId(null)

            props.setTagFilter("")
            setDisplayLabels(false)
            setDisplayGroups(false)
            setOpenAllLists(false)
        }
    }

    // useEffect(() => {
    //     if (displaySourcesLeader === true || displayMore === true || displayLabels === true || displaySignatures === true) {
    //         leaderCategoryClicked(displaySourcesLeader)
    //         setDisplayMore(!displayMore)
    //         LabelsCategoryClicked(displayLabels)
    //         signaturesCategoryClicked(displaySignatures)
    //     }
    // }, [props.setSelectedListFlag])
    function dragEnd(e) {
        console.log(e)
    }
    const draggConversation = (id, category) => {
        if (id !== "") {
            let field = ""
            let object = {}
            switch (category) {
                case list.favorites:
                    object = { _id: id, "starred": true }
                    field = "starred"
                    break;
                case list.archived:
                    object = { _id: id, "archived": true }
                    field = "archived"
                    break;
                case list.spam:
                    object = { _id: id, "spam": true }
                    field = "spam"
                    break;
                default:
                    break;
            }
            props.editConversation(object, field)
            props.setDraggableIdConversation("")
            // props.draggableIdConversation

        }
    }
    return (
        <div className='___categoriesList'>
            <div className={`main ${props.textColor == "dark" ? 'textDark' : 'textLight'} `}>
                <div className="inner">
                    <DragDropContext >
                        <Droppable droppableId={"box"} index={0} onDragEnd={(e) => dragEnd(e)} >
                            {provided => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {/* <Draggable draggableId={"box"} index={0} >
                                        {provided => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                            > */}

                                    {/* <Tooltip title={list.allList} placement="right-start"> */}
                                        {/* <div className={`category${flag.toLowerCase() === list.allList.toLowerCase() ? ` selectedCat` : ``} row`} onClick={(e) => {
                                            changeListFlag(list.allList);
                                            changeOpenAllLists()
                                            e.stopPropagation()
                                        }}>

                                         
                                            <div className='col- name'>{openAllLists ? allText.categories.closeAllList : allText.categories.openAllList}</div>
                                        </div> */}
                                    {/* </Tooltip> */}

                                    {/* <Tooltip title={list.all} placement="right-start"> */}
                                        <div className={`category${flag.toLowerCase() === list.all.toLowerCase() ? ` selectedCat` : ``} row`} onClick={(e) => {
                                            changeListFlag(list.all);
                                            // setDisplayUsersManager(!displayUsersManager)

                                            // if (displaySourcesLeader === true) {
                                            //     leaderCategoryClicked(displaySourcesLeader)
                                            // }
                                            // if (displayMore === true) {
                                            //     setDisplayMore(!displayMore)
                                            // }
                                            // if (displayLabels === true) {
                                            //     LabelsCategoryClicked(displayLabels)
                                            // }
                                            // if (displaySignatures === true) {
                                            //     signaturesCategoryClicked(displaySignatures)
                                            // }
                                            resetIndexConversation();
                                            e.stopPropagation()
                                        }}>

                                            {/* <div className='col-1 p-0'>
                                            {!displayUsersManager ?
                                                <img src={openOptionIcon} className="openOptionIcon" />
                                                :
                                                <img src={openOptionIcon} className="openOptionIcon2" />
                                            }
                                        </div> */}
                                            {props.user && props.user.userType === 'manager' && props.subUsers.length !== 0 ?
                                                <div className='col-1 p-0'>
                                                    {/* <img src={openOptionIcon} className="openOptionIcon" /> */}
                                                    {!displayUsersManager ?
                                                        <OpenOptionIcon className={`openOptionIcon ${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} onClick={(e) => {
                                                            setDisplayUsersManager(!displayUsersManager)
                                                        }} />
                                                        :
                                                        <OpenOptionIcon className={`openOptionIcon2 ${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} onClick={(e) => {
                                                            setDisplayUsersManager(!displayUsersManager)
                                                        }} />

                                                    }
                                                </div>
                                                :
                                                <div className='col-1 p-0'></div>
                                            }

                                            <div className='col-1 p-0'>
                                                <AllIcon className={`${props.textColor == "dark" ? 'iconDark' : 'iconLight'} `} />
                                                {/* <img src={BoxIcon} alt="" className="icon" /> */}
                                            </div>
                                            <div className='col-5 name'>{list.all}</div>
                                        </div>
                                    {/* </Tooltip> */}
                                    {props.user && props.user.userType === 'manager' && props.subUsers.length !== 0 &&
                                        displayUsersManager && <SubUsers />}
                                    {/* <Tooltip title={list.box} placement="right-start"> */}
                                        <div disabled={true} className={`category${flag.toLowerCase() === list.box.toLowerCase() ? ` selectedCat` : ``} row`} onClick={(e) => {
                                            changeListFlag(list.box);
                                            // if (displaySourcesLeader === true) {
                                            //     leaderCategoryClicked(displaySourcesLeader)
                                            // }
                                            // if (displayMore === true) {
                                            //     setDisplayMore(!displayMore)
                                            // }
                                            // if (displayLabels === true) {
                                            //     LabelsCategoryClicked(displayLabels)
                                            // }
                                            // if (displaySignatures === true) {
                                            //     signaturesCategoryClicked(displaySignatures)
                                            // }
                                            resetIndexConversation();
                                            e.stopPropagation()
                                        }}>
                                            <div className='col-1 p-0'></div>
                                            <div className='col-1 p-0'>
                                                <BoxIcon style={{ full: 'none' }} className={`${props.textColor == "dark" ? 'iconDark' : 'iconLight'} `} />

                                                {/* <img src={allIcon} alt="" className="icon" /> */}
                                            </div>
                                            <div className='col-5 name'>{list.box}</div>
                                            <div className='col-5 cntInbox'>{cntInbox ? cntInbox : ''}</div>
                                        </div>
                                    {/* </Tooltip> */}

                                    {/* <Tooltip title={list.sent} placement="right-start"> */}
                                        {/* {displayUsersManager && <Users />} */}
                                        <div className={`category${flag.toLowerCase() === list.sent.toLowerCase() ? ` selectedCat` : ``} row`} onClick={(e) => {
                                            changeListFlag(list.sent);
                                            // if (displaySourcesLeader === true) {
                                            //     leaderCategoryClicked(displaySourcesLeader)
                                            // }
                                            // if (displayMore === true) {
                                            //     setDisplayMore(!displayMore)
                                            // }
                                            // if (displayLabels === true) {
                                            //     LabelsCategoryClicked(displayLabels)
                                            // }
                                            // if (displaySignatures === true) {
                                            //     signaturesCategoryClicked(displaySignatures)
                                            // }
                                            resetIndexConversation();
                                            e.stopPropagation()
                                        }}>
                                            <div className='col-1 p-0'></div>
                                            <div className='col-1 p-0'>
                                                <SentIcon className={`${props.textColor == "dark" ? 'iconDark' : 'iconLight'} `} />
                                                {/* <img src={sentIcon} alt="" className="icon" /> */}
                                            </div>
                                            <div className='col-5 name'>{list.sent}</div>
                                        </div>
                                    {/* </Tooltip> */}
                                    {/* <Tooltip title={list.favorites} placement="right-start"> */}

                                        <div className={`category${flag.toLowerCase() === list.favorites.toLowerCase() ? ` selectedCat` : ``} row`} onMouseOut={(e) => { draggConversation(props.draggableIdConversation, list.favorites) }} onClick={(e) => {
                                            changeListFlag(list.favorites);
                                            // if (displaySourcesLeader === true) {
                                            //     leaderCategoryClicked(displaySourcesLeader)
                                            // }
                                            // if (displayMore === true) {
                                            //     setDisplayMore(!displayMore)
                                            // }
                                            // if (displayLabels === true) {
                                            //     LabelsCategoryClicked(displayLabels)
                                            // }
                                            // if (displaySignatures === true) {
                                            //     signaturesCategoryClicked(displaySignatures)
                                            // }
                                            resetIndexConversation();
                                            e.stopPropagation()
                                        }}>
                                            <div className='col-1 p-0'></div>
                                            <div className='col-1 p-0'>
                                                <StarredIcon className={`${props.textColor == "dark" ? 'iconDark' : 'iconLight'} `} />
                                                {/* <img src={starredIcon} alt="" className="icon" /> */}
                                            </div>
                                            <div className='col-5 name'>{list.favorites}</div>
                                        </div>
                                    {/* </Tooltip> */}
                                    {/* <Tooltip title={list.followUp} placement="right-start"> */}
                                        <div className={`category${flag.toLowerCase() === list.followUp.toLowerCase() ? ` selectedCat` : ``} row`} onClick={(e) => {
                                            changeListFlag(list.followUp);
                                            e.stopPropagation()
                                        }}>
                                            <div className='col-1 p-0'></div>
                                            <div className='col-1 p-0'>
                                                {/* <FlagImg className={`${props.textColor == "dark" ? 'flagDark' : 'flagLight'} `}/> */}
                                                {/* <img src={flagImg} alt="" className="icon" /> */}
                                                {
                                                    props.textColor == "dark" ?
                                                        <img src={flagDark} alt="" className="icon" />
                                                        :
                                                        <img src={flagLight} alt="" className="icon" />

                                                }
                                            </div>
                                            <div className='col-5 name'>{list.followUp}</div>
                                        </div>
                                    {/* </Tooltip> */}
                                    {/* <Tooltip title={list.trash} placement="right-start"> */}
                                        <div className={`category${flag.toLowerCase() === list.trash.toLowerCase() ? ` selectedCat` : ``} row`} onClick={(e) => {
                                            changeListFlag(list.trash);
                                            e.stopPropagation()
                                        }}>
                                            <div className='col-1 p-0'></div>
                                            <div className='col-1 p-0'>
                                                <TrashIcon className={`${props.textColor == "dark" ? 'iconDark' : 'iconLight'} `} />
                                                {/* <img src={trashIcon} alt="" className="icon" /> */}
                                            </div>
                                            <span className='col-5 name'>{list.trash}</span>
                                        </div>
                                    {/* </Tooltip> */}
                                    {/* MORE */}
                                    {/* <div className={`category row`} onClick={(e) => {
                                        setDisplayMore(!displayMore)
                                        e.stopPropagation()
                                    }}>
                                        <div className='col-1 p-0'>
                                            <img src={openOptionIcon} className="openOptionIcon" />
                                        </div>
                                        <div className='col-1 p-0'>
                                            <CgOptions className='icon' />
                                        </div>
                                        <div className='col-5 name'>{list.more}</div>
                                    </div> 
                                    {displayMore &&
                                    <>
                                        </>
                                        }*/}
                                    {/* <Tooltip title={list.drafts} placement="right-start"> */}
                                        <div className={`category${flag.toLowerCase() === list.drafts.toLowerCase() ? ` selectedCat` : ``} row`} onClick={(e) => {
                                            changeListFlag(list.drafts);
                                            e.stopPropagation()
                                        }}>
                                            <div className='col-1 p-0'></div>
                                            <div className='col-1 p-0'>
                                                <DraftsIcon className={`${props.textColor == "dark" ? 'iconDark' : 'iconLight'} `} />
                                                {/* <img src={draftsIcon} alt="" className="icon" /> */}
                                            </div>
                                            <span className='col-5 name'>{list.drafts}</span>
                                        </div>
                                    {/* </Tooltip> */}
                                    {/* <Tooltip title={list.archived} placement="right-start"> */}
                                        <div className={`category${flag.toLowerCase() === list.archived.toLowerCase() ? ` selectedCat` : ``} row`} onMouseOut={(e) => { draggConversation(props.draggableIdConversation, list.archived) }} onClick={(e) => {
                                            changeListFlag(list.archived);
                                            e.stopPropagation()
                                        }}>
                                            <div className='col-1 p-0'></div>
                                            <div className='col-1 p-0'>
                                                <ArchivedIcon className={`${props.textColor == "dark" ? 'iconDark' : 'iconLight'} `} />
                                                {/* <img src={archivedIcon} alt="" className="icon" /> */}
                                            </div>
                                            <span className='col-5 name'>{list.archived}</span>
                                        </div>
                                    {/* </Tooltip> */}
                                    {/* <Tooltip title={list.spam} placement="right-start"> */}
                                        <div className={`category${flag.toLowerCase() === list.spam.toLowerCase() ? ` selectedCat` : ``} row`} onMouseOut={(e) => { draggConversation(props.draggableIdConversation, list.spam) }} onClick={(e) => {
                                            changeListFlag(list.spam);
                                            e.stopPropagation()
                                        }}>
                                            <div className='col-1 p-0'></div>
                                            <div className='col-1 p-0'>
                                                <SpamIcon className={`${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} />
                                                {/* <img src={spamIcon} alt="" className="icon" /> */}
                                            </div>
                                            <span className='col-5 name'>{list.spam}</span>
                                        </div>
                                    {/* </Tooltip> */}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {/* <Tooltip title={list.systemWaves} placement="right-start"> */}
                        <div className={`category row`} onClick={(e) => {
                            changeListFlag(list.systemWaves);
                            // props.setDispSysWvs(!props.dispSysWvs);
                            e.stopPropagation()
                        }}>
                            <div className='col-1 p-0'>
                                {/* <img src={openOptionIcon} className="openOptionIcon" /> */}
                                {!displaySourcesLeader ?
                                    <OpenOptionIcon className={`openOptionIcon ${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} onClick={(e) => {
                                        leaderCategoryClicked()
                                    }} />
                                    :
                                    <OpenOptionIcon className={`openOptionIcon2 ${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} onClick={(e) => {
                                        leaderCategoryClicked()
                                    }} />
                                }
                            </div>
                            <div className='col-1 p-0'>
                                {/* <LeaderIcon className={`${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} /> */}
                                {/* <img src={leaderIcon} alt="" className="icon" /> */}
                                {props.textColor == "dark" ?
                                    <img src={leaderDark} alt="" className="icon" />
                                    :
                                    <img src={leaderLight} alt="" className="icon" />
                                }
                            </div>

                            <div className='col-5 name'>{list.systemWaves}</div>
                        </div>
                    {/* </Tooltip> */}
                    {displaySourcesLeader && <Sources />}
                    {/* <Tooltip title={list.contactList} placement="right-start"> */}
                        <div className={`category${flag.toLowerCase() === list.contactList.toLowerCase() ? ` selectedCat` : ``} row`} onClick={(e) => {
                            changeListFlag(list.contactList);
                            e.stopPropagation()
                        }}>
                            <div className='col-1 p-0'></div>
                            <div className='col-1 p-0'>
                                <ContactsIcon className={`${props.textColor == "dark" ? 'iconDark' : 'iconLight'} `} />
                                {/* <img src={contactsIcon} alt="" className="icon" /> */}
                            </div>
                            <div className='col-5 name'>{list.contactList}</div>
                        </div>
                    {/* </Tooltip> */}
                    {/* <Tooltip title={list.calenderList} placement="right-start"> */}
                        <div className={`category${flag.toLowerCase() === list.calenderList.toLowerCase() ? ` selectedCat` : ``} row`} onClick={(e) => {
                            changeListFlag(list.calenderList);
                            e.stopPropagation()
                        }}>
                            <div className='col-1 p-0'></div>

                            <div className='col-1 p-0'>
                                <CalenderIcon className={`${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} />
                                {/* <img src={calenderIcon} alt="" className="icon" /> */}
                            </div>
                            <div className='col-5 name'>{list.calenderList}</div>
                        </div>
                    {/* </Tooltip> */}
                    {/* setting */}
                    {/* <div className={`category${flag.toLowerCase() === list.settings.toLowerCase() ? ` selectedCat` : ``}`} onClick={(e) => {
                        changeListFlag(list.settings);
                        e.stopPropagation()
                    }}><span className="icon"><img src={settingsIcon} alt="" ></img></span><span>{list.settings}</span>
                    </div> */}
                    {/* <Tooltip title={list.signature} placement="right-start"> */}
                        <div className={`category signaturesInConv ${flag.toLowerCase() === list.signature.toLowerCase() ? ` selectedCat` : ``} row`} onClick={(e) => {
                            props.setSelectedSignatureId(null)
                            changeListFlag(list.signature);

                            e.stopPropagation()
                        }
                        }>
                            {props.signatures && props.signatures.length === 0 ?

                                <div className='col-1 p-0' onClick={(e) => {
                                    setDisplaySignatures(!displaySignatures)
                                }}></div>

                                :
                                <div className='col-1 p-0'>
                                    {!displaySignatures ?
                                        <OpenOptionIcon className={`openOptionIcon ${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} onClick={(e) => {
                                            signaturesCategoryClicked()
                                        }} />
                                        :
                                        <OpenOptionIcon className={`openOptionIcon2 ${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} onClick={(e) => {
                                            signaturesCategoryClicked()
                                        }} />
                                    }
                                </div>
                            }
                            <div className='col-1 p-0'>
                                <SignatureIcon className={`${props.textColor == "dark" ? 'iconDark' : 'iconLight'} `} />
                                {/* <img src={signatureIcon} alt="" className="icon" /> */}
                            </div>
                            <div className='col-5 name'>{list.signature}</div>
                        </div>
                    {/* </Tooltip> */}
                    {displaySignatures && <Signatures />}
                    {/* <Tooltip title={list.lables} placement="right-start"> */}
                        <div className={`category row lablesInCategory`} onClick={(e) => {
                            // changeListFlag(list.lables);

                            e.stopPropagation()
                        }}>
                            {props.tags.length === 0 ?
                                <div className='col-1 p-0'></div>
                                :
                                <div className='col-1 p-0'>
                                    {/* <img src={openOptionIcon} className="openOptionIcon" /> */}
                                    {!displayLabels ?
                                        <OpenOptionIcon className={`openOptionIcon ${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} onClick={() => {
                                            LabelsCategoryClicked()
                                        }} />
                                        :
                                        <OpenOptionIcon className={`openOptionIcon2 ${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} onClick={() => {
                                            LabelsCategoryClicked()
                                        }} />
                                    }
                                </div>
                            }
                            <div className='col-1 p-0'>
                                <LabelsIcon className={`${props.textColor == "dark" ? 'iconDark' : 'iconLight'} `} />
                                {/* <img src={LabelsIcon} alt="" className="icon" /> */}
                            </div>
                            <div className='col-5 name'>{list.lables}</div>
                        </div>
                    {/* </Tooltip> */}
                    {displayLabels && <Labels />}
                    {/* <Tooltip title={list.templates} placement="right-start"> */}
                        <div className={`category ${flag.toLowerCase() === list.templates.toLowerCase() ? ` selectedCat` : ``} row`} onClick={(e) => {
                            changeListFlag(list.templates)
                            e.stopPropagation()
                        }}>
                            {!props.templatesList ?
                                <div className='col-1 p-0'></div>
                                :
                                <div className='col-1 p-0'>
                                    {/* <img src={openOptionIcon} className="openOptionIcon" /> */}
                                    {!displayTemplates ?
                                        <OpenOptionIcon className={`openOptionIcon ${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} onClick={() => {
                                            setDisplayTemplates(!displayTemplates)
                                        }} />
                                        :
                                        <OpenOptionIcon className={`openOptionIcon2 ${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} onClick={() => {
                                            setDisplayTemplates(!displayTemplates)
                                        }} />
                                    }
                                </div>
                            }
                            <div className='col-1 p-0'>
                                <TemplatesIcon className={`${props.textColor == "dark" ? 'iconDark' : 'iconLight'} `} />
                                {/* <img src={templatesIcon} alt="" className="icon" /> */}
                            </div>
                            <div className='col-5 name'>{list.templates}</div>
                        </div>
                    {/* </Tooltip> */}
                    {displayTemplates && <Templates />}
                    {/* <Tooltip title={list.groups} placement="right-start"> */}
                        <div className={`category ${flag.toLowerCase() === list.groups.toLowerCase() ? ` selectedCat` : ``} row`} onClick={(e) => {
                            changeListFlag(list.groups)
                            e.stopPropagation()
                            // groupsCategoryClicked()
                        }}>
                            {props.groups.length === 0 ?
                                <div className='col-1 p-0'></div>
                                :
                                <div className='col-1 p-0'>
                                    {/* <img src={openOptionIcon} className="openOptionIcon" /> */}
                                    {!displayGroups ?
                                        <OpenOptionIcon className={`openOptionIcon ${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} onClick={() => {
                                            setDisplayGroups(!displayGroups)
                                        }} />
                                        :
                                        <OpenOptionIcon className={`openOptionIcon2 ${props.textColor == "dark" ? 'fillDark' : 'fillLight'} `} onClick={() => {
                                            setDisplayGroups(!displayGroups)
                                        }} />
                                    }
                                </div>
                            }
                            <div className='col-1 p-0'>
                                <GroupIcon className={`${props.textColor == "dark" ? 'iconDark' : 'iconLight'} `} />
                                {/* <img src={GroupIcon} alt="" className="icon" /> */}
                            </div>
                            <div className='col-7 name'>{list.groups}</div>
                        </div>
                    {/* </Tooltip> */}
                    {displayGroups && <Groups />}
                    {/* <Tooltip title={list.webhook} placement="right-start"> */}
                        <div className={`category${flag.toLowerCase() === list.webhook.toLowerCase() ? ` selectedCat` : ``} row`} onClick={(e) => {
                            // changeListFlag(list.webhook); coming soon!
                            // WebhookCategoryClicked();ז
                            e.stopPropagation()
                        }}>
                            <div className='col-1 p-0'></div>

                          

                            <div className='col-1 p-0' style={{ float: "flex" }}>

                                {/* <Webhook className={`${props.textColor == "dark" ? 'webhookDark' : 'webhookLight'} `}/> */}
                                {props.textColor == "dark" ?
                                    <img src={webhookDark} alt="" className="icon" style={{ position: 'absolute' }} />
                                    :
                                    <img src={webhookLight} alt="" className="icon" style={{ position: 'absolute' }} />
                                }
                            </div>
                            <div className='col-5 name'> {list.webhook}</div>
                            <div className='col-5 cntInbox'><img className="soonIcon" src={soonIcon} alt=""
                                    style={{ height: "20px", width: "35px", marginLeft: "10%" }}
                                ></img>
                            </div>





                        </div>
                    {/* </Tooltip> */}
                    {/* <Tooltip title={list.usersManager} placement="right-start">
                        <div className={`category${flag.toLowerCase() === list.usersManager.toLowerCase() ? ` selectedCat` : ``} row`} onClick={(e) => {
                            changeListFlag(list.usersManager);
                            setDisplayUsersManager(!displayUsersManager)
                            e.stopPropagation()
                        }}>
                            <div className='col-1 p-0'></div>
                            <div className='col-1 p-0'>
                                <img src={Group} alt="" className="icon" />
                            </div>
                            <span className='col-5 name'>{list.usersManager}</span>
                        </div>
                    </Tooltip> */}
                </div>
            </div >
        </div >
    )
}


export default connect(
    (state) => {
        return {
            flagsList: state.conversations.flagsList,
            selectedListFlag: state.conversations.selectedListFlag,
            signatures: state.signature.signaturesList,
            templatesList: state.templates.templatesList,
            tags: state.tags.tags,
            groups: state.groups.groups,
            draggableIdConversation: state.conversations.draggableIdConversation,
            startDrag: state.conversations.startDrag,
            subUsers: state.subUsers.subUsers,
            sources: state.init.sources,
            setCloseJsonParser: state.webhook.setCloseJsonParser,
            filteredConversations: state.conversations.filteredConversations,
            showOpenConversation: state.displaySettings.showOpenConversation,
            textColor: state.settings.textColor,
            user: state.init.user
        }
    },

    (dispatch) => ({
        setSelectedListFlag: (val) => { dispatch(actions.setSelectedListFlag(val)) },
        setSourceFilter: (val) => { dispatch(actions.setSourceFilter(val)) },
        setTagFilter: (val) => { dispatch(actions.setTagFilter(val)) },
        setSelectedSignatureId: (val) => { dispatch(actions.setSelectedSignatureId(val)) },
        setIndexConversation: (val) => { dispatch(actions.setIndexConversation(val)) },
        editConversation: (val) => { dispatch(actions.editConversation(val)) },
        setDraggableIdConversation: (val) => { dispatch(actions.setDraggableIdConversation(val)) },
        setShowOpenConversation: (val) => { dispatch(actions.setShowOpenConversation(val)) },
        setClose: (val) => { dispatch(actions.setClose(val)) },
        setDisplayRightCard: (val) => { dispatch(actions.setDisplayRightCard(val)) },
        setSelectedConversation: (val) => { dispatch(actions.setSelectedConversation(val)) },

    })
)(Categories)