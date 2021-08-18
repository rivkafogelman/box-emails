import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
// import {
//   getConversations,
//   getSystemWaves,
//   setSelectedConversation,
//   setIsReplyMessageOpen,
//   setFilteredConversations,
//   editConversation,
//   draggable,
//   setStartDrag,
//   setDraggableIdConversation,
//   addConversationIdToEdit, removeConversationIdToEdit,
//   convSelectedInShowConv, setClose, setWave,
// } from '../../redux/actions/conversation.actions'
import {actions} from '../../redux/actions/action'

import Conversation from '../conversation/ConversationAndLeaderMessage'
import ConversationsListHeader from '../conversation-list-header/conversation-list-header'
import './ConversationsList.scss'
import { setShowOpenConversation } from '../../redux/actions/displaySettings.actions'
import '../../App.css'
import { setDisplayRightCard } from '../../redux/actions/conversation.actions'
import allText from '../../allText.json'
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import NoConversations from '../no-results/NoConversations'
import { setWebhookFlag, setSecondRender } from '../../redux/actions/webhook.actions'
import NoForSearch from '../no-results/NoForSearch'
function ConversationsList(props) {

  const MINUTE_MS = 30000;
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Logs every minute');
      refresAutoEveryMinute();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  useEffect(() => {

  }, [props.showOpenConversation, props.selectedConversation])

  const convClicked = (e, conv) => {
    // props.setDisplayRightCard("")
    props.setClose(false)
    // props.setShowOpenConversation(true)
    props.setIsReplyMessageOpen(false)
    if (conv.readed !== true) {
      props.editConversationServer({ _id: conv._id, readed: true })
    }
    props.convSelectedInShowConv(conv)
    props.setSelectedConversation(conv)
    props.setWebhookFlag(false);
    props.setSecondRender(false);
    if (props.selectedConversation.sourceIp)
      props.setDisplayRightCard('')
    e.stopPropagation()
  }

  function dragStart(e) {
    props.setStartDrag(true)
    props.draggable(e.draggableId)
    props.addConversationIdToEdit(e.draggableId)
  }
  function dragEnd(e) {
    props.setStartDrag(false)
    props.setDraggableIdConversation(e.draggableId)
    props.removeConversationIdToEdit(e.draggableId)
  }

  const refresAutoEveryMinute = async (e) => {
    try {
      console.log('refresAutoEveryMinute')
      await props.getConversationsServer()
      // e.stopPropagation()
      await props.getSystemWaves()
    } catch (error) {
      console.log("error in refresh conversations", error)
    }
  }

  return (
    <>
      {props.filteredConversations && props.filteredConversations.length == 0 &&
        props.conversationsForSearch && props.conversationsForSearch.length == 0 ?
        <NoConversations />
        :
        <div className="conversationsListContainer">
          <ConversationsListHeader />
          <div className='conversationsList' >
            <DragDropContext onDragEnd={(e) => dragEnd(e)}
              onDragStart={(e) => dragStart(e)}>
              <Droppable droppableId={0} >
                {provided => (
                  <div className='innerDivv'
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {(props.conversationsForSearch === 'Not Found' ? <NoForSearch /> :
                      (props.conversationsForSearch && props.conversationsForSearch !== "empty" &&
                        props.conversationsForSearch.length !== 0) &&
                      props.conversationsForSearch.map((c, ind = props.indexListConversation) => (
                        <>
                          {props.indexListConversation + 20 > ind && ind >= props.indexListConversation ?
                            <div
                              index={ind}
                              key={c._id}
                              onClick={e => {
                                convClicked(e, c)
                              }}
                            >
                              <Conversation conversation={c} key={c._id} index={ind} />
                            </div>
                            : null}
                        </>
                      ))) ||

                      (props.filteredConversations.length !== 0 &&
                        props.filteredConversations.map((c, ind = props.indexListConversation) => (
                          <>
                            {props.indexListConversation + 20 > ind && ind >= props.indexListConversation ?
                              <div
                                key={ind}
                                onClick={e => { convClicked(e, c) }}>
                                <Conversation conversation={c} key={c._id} index={ind} />
                              </div>
                              : null}
                          </>
                        )))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      }
    </>
  )
}

export default connect(
  state => {
    return {
      allConversations: state.conversations.allConversations,
      systemWaves: state.conversations.systemWaves,
      flagsList: state.conversations.flagsList,
      selectedListFlag: state.conversations.selectedListFlag,
      filteredConversations: state.conversations.filteredConversations,
      conversationsForSearch: state.conversations.conversationsForSearch,
      selectedConversation: state.conversations.selectedConversation,
      sourceFilter: state.conversations.sourceFilter,
      tagFilter: state.conversations.tagFilter,
      user: state.init.user,
      ifToFilter: state.conversations.ifToFilter,
      // gmailAddress: state.googleAuth.gmailUserAddress,
      indexListConversation: state.conversations.indexListConversation,
      showOpenConversation: state.displaySettings.showOpenConversation,
      displayRightCard: state.conversations.displayRightCard,

      draggableIdConversation: state.conversations.draggableIdConversation,
      waveSelect: state.conversations.waveSelect,
      webhookFlag: state.webhook.webhookFlag,
      secondRender: state.webhook.secondRender
    }
  },

  (dispatch) => ({
    setDisplayRightCard: (val) => { dispatch(actions.setDisplayRightCard(val))},
    setWebhookFlag: (val) => { dispatch(actions.setWebhookFlag(val))},
    getConversationsServer: (val) => { dispatch(actions.getConversationsServer(val))},
    setSecondRender: (val) => { dispatch(actions.setSecondRender(val))},
    getSystemWaves: (val) => { dispatch(actions.getSystemWaves(val))},
    setSelectedConversation: (val) => { dispatch(actions.setSelectedConversation(val))},
    setIsReplyMessageOpen: (val) => { dispatch(actions.setIsReplyMessageOpen(val))},
    setFilteredConversations: (val) => { dispatch(actions.setFilteredConversations(val))},
    editConversation: (val) => { dispatch(actions.editConversation(val))},
    editConversationServer: (val) => { dispatch(actions.editConversationServer(val))},
    draggable: (val) => { dispatch(actions.draggable(val))},
    setShowOpenConversation: (val) => { dispatch(actions.setShowOpenConversation(val))},
    setStartDrag: (val) => { dispatch(actions.setStartDrag(val))},
    setDraggableIdConversation: (val) => { dispatch(actions.setDraggableIdConversation(val))},
    addConversationIdToEdit: (val) => { dispatch(actions.addConversationIdToEdit(val))},
    removeConversationIdToEdit: (val) => { dispatch(actions.removeConversationIdToEdit(val))},
    setWave: (val) => { dispatch(actions.setWave(val))},
    convSelectedInShowConv: (val) => { dispatch(actions.convSelectedInShowConv(val))},
    setClose: (val) => { dispatch(actions.setClose(val))},
})

)(ConversationsList)

