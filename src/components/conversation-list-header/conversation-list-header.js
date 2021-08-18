import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip';
import './conversation-list-header.scss'
import a from './assets/a.png'
import b from './assets/b.png'
import list1 from './assets/list1.svg'
import list2 from './assets/list2.svg'
import list3 from './assets/list3.svg'
import trashIcon from './assets/trash.svg'
// import {
//     deleteConversations, setChangeDisplayConver, setIndexConversation, setSelectedConversation, setClose
// } from '../../redux/actions/conversation.actions';
// import { setShowOpenConversation } from '../../redux/actions/displaySettings.actions'
// import { setWebhookFlag, setSecondRender } from '../../redux/actions/webhook.actions';
import allText from '../../allText.json';
// import { setNotification } from '../../redux/actions/notification.actions';
import {actions} from '../../redux/actions/action'
// import { setNotification } from '../../redux/actions/notification.actions';
// import ActionsToHeader from '../actions-on-conversations/actionsToHeader'
import Actions from '../actions-on-conversations/actions'

function ConversationListHeader(props) {
    const dispatch = useDispatch();
    const [conversationListLength, setConversationListLength] = useState(props.filteredConversations.length)


    useEffect(() => {
        if (Array.isArray(props.conversationsForSearch) && props.conversationsForSearch && props.conversationsForSearch.length != 0)
            setConversationListLength(props.conversationsForSearch.length)
        else
            if (props.selectedListFlag === props.flagsList.systemWaves == true)
                setConversationListLength(props.systemWaves.length)
            else
                setConversationListLength(props.filteredConversations.length)
    },
        [props.changeDisplayConver,
        props.conversationsForSearch,
        props.filteredConversations,
        props.selectedListFlag === props.flagsList.systemWaves])

    const menuView1 = () => {
        props.setChangeDisplayConver(true)
    }

    const menuView2 = () => {
        props.setChangeDisplayConver(false)
    }

    const setIndexConversation = (indexListConversation) => {
        props.setIndexConversation(indexListConversation)
    }
    const deleteAllInTrash = () => {
        let conversationsIdsToDelete = [];
        if (props.filteredConversations.length) {
            props.filteredConversations.forEach(conversationInTrash => {
                conversationsIdsToDelete.push(conversationInTrash._id);
            })
        }
        //show notification delete all conversations
        const notificationToShow = { info: allText.notification.allMessagesHaveBeenDeleted, icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
        dispatch(actions.setNotification(notificationToShow));
        dispatch(actions.deleteConversationsServer(conversationsIdsToDelete))
    }
    return (
        <div className="conversationsListHeader">
            <div className="d-flex example-parent headerGroup">
                <div className=" col-example">
              <span><Actions/></span> 
                    {/* {
                        
                        props.changeDisplayConver ?
                            <span className="ScreenDispaly">
                                <span ><img src={b} onClick={menuView2} /></span>
                            </span>
                            :
                            <span className="ScreenDispaly">
                                <span ><img src={list3} onClick={menuView1} /></span>
                            </span>
                    } */}
                    {/* {props.showOpenConversation ?
                        <Tooltip title="Close">
                            <span className="ScreenDispaly" onClick={() => {
                                // to display converstions list and not open conversation:
                                props.setClose(true)
                                props.setShowOpenConversation(false);
                                props.setSelectedConversation("");
                                props.setWebhookFlag(false);
                                props.setSecondRender(false);
                            }}><img src={list2} /></span>
                        </Tooltip>
                        :
                        <Tooltip title="Open">
                            <span className="ScreenDispaly openConversationIcon" onClick={() => {
                                props.setShowOpenConversation(true);
                                props.setSelectedConversation(props.filteredConversations[0]);
                                props.setWebhookFlag(false);
                                props.setSecondRender(false);
                            }}><img src={list1} /></span>
                        </Tooltip>
                    } */}
                    {/* <span className="title">
                        {props.selectedListFlag}
                    </span> */}

                    {/* {props.selectedListFlag === props.flagsList.trash && */}
                        {/* // <Tooltip title={allText.deleteForever}> */}
                        {/* //     <img src={trashIcon} alt="" style={{ cursor: 'pointer' }} onClick={deleteAllInTrash} /> */}
                        {/* // </Tooltip> */}
                        {/* // <div className='deleteAllInTrashLabel' onClick={deleteAllInTrash}> */}
                        {/* //     <img src={trashIcon} alt=""   /> */}
                        {/* //     <span style={{ marginLeft: '3px' }}>Empty Trash Now!</span> */}
                        {/* // </div> */}
                    {/* } */}
                </div>
                <div className="ml-auto col-example">
                  
                    {
                    
                        props.changeDisplayConver ?
                            <span className="ScreenDispaly">
                                <span ><img src={b} onClick={menuView2} /></span>
                            </span>
                            :
                            <span className="ScreenDispaly">
                                <span ><img src={list3} onClick={menuView1} /></span>
                            </span>
                    }
                    {props.showOpenConversation ?
                        <Tooltip title="Close">
                            <span className="ScreenDispaly" onClick={() => {
                                // to display converstions list and not open conversation:
                                props.setClose(true)
                                props.setShowOpenConversation(false);
                                props.setSelectedConversation("");
                                props.setWebhookFlag(false);
                                props.setSecondRender(false);
                            }}><img src={list2} /></span>
                        </Tooltip>
                        :
                        <Tooltip title="Open">
                            <span className="ScreenDispaly openConversationIcon" onClick={() => {
                                props.setShowOpenConversation(true);
                                props.setSelectedConversation(props.filteredConversations[0]);
                                props.setWebhookFlag(false);
                                props.setSecondRender(false);
                            }}><img src={list1} /></span>
                        </Tooltip>
                    }
                    {/* <span className="title">
                        {props.selectedListFlag}
                    </span> */}

                    {props.selectedListFlag === props.flagsList.trash &&
                        // <Tooltip title={allText.deleteForever}>
                        //     <img src={trashIcon} alt="" style={{ cursor: 'pointer' }} onClick={deleteAllInTrash} />
                        // </Tooltip>
                        <div className='deleteAllInTrashLabel' onClick={deleteAllInTrash}>
                            {/* <img src={trashIcon} alt=""   /> */}
                            <span style={{ marginLeft: '3px' }}>Empty Trash Now!</span>
                        </div>
                    }

                        {conversationListLength != 0 ?
                            <>
                                <Tooltip title="Right">
                                    <span className="option icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16" onClick={() => { setIndexConversation(props.indexListConversation + 20) }}>
                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                        </svg>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Left">
                                    <span className="option leftIcon" >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16" onClick={() => { setIndexConversation(props.indexListConversation - 20) }}>
                                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                        </svg>
                                    </span>
                                </Tooltip>
                                
                                <span className="option" >
                                    <span >{props.indexListConversation + 1}</span>
                                    <span >{props.indexListConversation + 20 <= conversationListLength ? props.indexListConversation + 20 : conversationListLength}
                                    </span>
                                     <span style={{marginLeft:"3px",marginRight:"3px"}}>of</span> 
                                     <span>{conversationListLength}</span>
                                </span>
                           
                              
                            </>
                            : null
                        }
                </div>

                {/* <hr></hr> */}
            </div>
            <hr></hr>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            conversationsForSearch: state.conversations.conversationsForSearch,
            filteredConversations: state.conversations.filteredConversations,
            indexListConversation: state.conversations.indexListConversation,
            systemWaves: state.conversations.systemWaves,
            // displaySystemWaves: state.conversations.displaySystemWaves,
            flagsList: state.conversations.flagsList,
            showOpenConversation: state.displaySettings.showOpenConversation,
            selectedListFlag: state.conversations.selectedListFlag,
            selectedConversation: state.conversations.selectedConversation,
            changeDisplayConver: state.conversations.changeDisplayConver
        }
    },
    (dispatch) => ({
        setChangeDisplayConver: (val) => { dispatch(actions.setChangeDisplayConver(val))},
        setIndexConversation: (val) => { dispatch(actions.setIndexConversation(val))},
        setWebhookFlag: (val) => { dispatch(actions.setWebhookFlag(val))},
        setSecondRender: (val) => { dispatch(actions.setSecondRender(val))},
        setClose: (val) => { dispatch(actions.setClose(val))},
        setShowOpenConversation: (val) => { dispatch(actions.setShowOpenConversation(val))},
        setSelectedConversation: (val) => { dispatch(actions.setSelectedConversation(val))}
    })
    
)(ConversationListHeader)