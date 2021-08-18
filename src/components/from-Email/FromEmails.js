import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
  FaTrashAlt,
  FaPaperclip,
  FaMinus,
  FaExpandAlt,
  FaTimes,
  FaCalendar
} from 'react-icons/fa'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
// import { getGmailAddressServer } from '../../redux/actions/googleAuth.actions'
// import { newConversation, setIsMessageOpen, setEmailFromMassage } from '../../redux/actions/conversation.actions'
// import { deleteGroup, setShow } from '../../redux/actions/group.actions'
import NewGroup from '../new-group/NewGroup'
// import { addDraft, editDraft, deleteDraft, removeNewMessageCard } from '../../redux/actions/draft.actions'
import $ from 'jquery'
import Tooltip from '@material-ui/core/Tooltip'
import conversationService from '../../services/conversation.service'
import profileImg from '../../assets/Component 157 – 6.svg'
import ReactDOMServer from 'react-dom/server'
import uploadAnimation from '../../assets/animation_500_kkl8emcp.gif'
import { Dropdown } from 'semantic-ui-react'
import {actions} from '../../redux/actions/action'

import { Provider } from 'react-redux'
import store from '../../redux/store'
import _ from 'lodash'

function FromEmails(props) {
  const [emailsAll, setEmailsAll] = useState([props.userName + '@mails.codes'])
  const [fromEmails, setFromEmails] = useState([]) //([{key:"1111",value:"1111",text:'1111'},{key:"222",value:"222",text:'222'},{key:"333",value:"333",text:'333'}]
  const [isInitial, setIsInitial] = useState(true)
  let stateOptions = []

  const [selected_Email, setSelected_Email] = useState(props.selectedSubUser+'@mails.codes')
  const [maneger, setManeger] = useState("rivka")
  const [person, setPerson] = useState([
    { name: "yisca", maneger: "rivka" }, { name: "rachel", maneger: "rivka" }, { name: "tamar", maneger: "rivka" }
    , { name: "shira", maneger: "rivka" }, { name: "michal", maneger: "rivka" }, { name: "chani", maneger: "tttt" }
  ])
  let addressDefinitions = emailsAll
  let defaultAddress = emailsAll[0]
  const {selectedFrom,setSelectedFrom}=props;
  // useEffect(() => {
  //   if (props.googleAuth) {
  //     props.getGmailAddressServer()
  //   }
  // }, [setSelected_Email])

  useEffect(() => {
    if (isInitial && props.subUsers) {
      
      let emailsFrom = []
      if(props.selectedSubUser!==props.userName){
        emailsFrom=[props.selectedSubUser+'@mails.codes']
      }
      else{
          props.subUsers.map((person) => {
        emailsFrom.push(person.email)
        // setFromEmails(fromEmails.push(person.email))
      })
      }
    
      setFromEmails(emailsFrom)
      console.log("fromEmail", fromEmails);
      setIsInitial(false)
    }

  }, [props.subUsers,props.selectedSubUser])
  useEffect(()=>{
    props.setEmailFromMassage(selectedFrom);
  },[selectedFrom])
  stateOptions = _.map(fromEmails, (state, index) => ({

    key: fromEmails[index],
    text: state,
    value: fromEmails[index]

  }))

  const onSelected = (event, { value }) => {
    setSelectedFrom(value)
    console.log(value)
    //setSelected_Email(value)
    props.setEmailFromMassage(
      value
    )

  }

  return (
    <div className="dropdownFormEmail">
      <>

        <Dropdown
          // placeholder={props. selectedSubUser+'@mails.codes'}
          fluid
          // multiple
          // search
          selection
        
          options={stateOptions}

          onChange={onSelected}
          
          value={selectedFrom}

        />
        <hr />
      </>


    </div>
  )
}
export default connect(
  state => {
    return {
      isMessageOpen: state.conversations.isMessageOpen,
      contacts: state.init.contacts,
      usersEmails: state.init.usersEmails,
      userName: state.init.userName,
      selectedListFlag: state.conversations.selectedListFlag,
      selectedConversation: state.conversations.selectedConversation,
      signature: state.signature,
      groups: state.groups.groups,
      teams: state.conversations.teams,
      showGroupModal: state.groups.show,
      drafts: state.drafts.drafts,
      newMessagesCards: state.drafts.newMessagesCards,
      googleAuth: state.init.googleAuth,
      gmailUserAddress: state.init.gmailUserAddress,
      subUsers: state.subUsers.subUsers,
      selectedSubUser: state.subUsers. selectedSubUser,
    }
  },

  (dispatch) => ({
    newConversation: (val) => { dispatch(actions.newConversation(val))},
    setIsMessageOpen: (val) => { dispatch(actions.setIsMessageOpen(val))},
    deleteGroup: (val) => { dispatch(actions.deleteGroup(val))},
    setShowGroupModal: (val) => { dispatch(actions.setShow(val))},
    addDraft: (val) => { dispatch(actions.addDraft(val))},
    editDraft: (val) => { dispatch(actions.editDraft(val))},
    deleteDraft: (val) => { dispatch(actions.deleteDraft(val))},
    removeNewMessageCard: (val) => { dispatch(actions.removeNewMessageCard(val))},
    getGmailAddressServer: (val) => { dispatch(actions.getGmailAddressServer(val))},
    setEmailFromMassage: (val) => { dispatch(actions.setEmailFromMassage(val))},
  })
)(FromEmails)