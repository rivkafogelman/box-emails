import { React, useState, useEffect } from 'react'
import { connect, Provider, useSelector } from 'react-redux'
// import {
//   setIsReplyMessageOpen,
//   newWave,
//   newConversation,
//   sendEmailServer,
//   setUploadProgress,
//   uploadFilesServer
// } from '../../redux/actions/conversation.actions'
// import { sendGmail } from '../../redux/actions/googleAuth.actions'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './Reply.scss'
import { FaTimes } from 'react-icons/fa'

// import conversationService from '../../services/conversation.service'
// import profileImg from '../../assets/Component 157 – 6.svg'
// import replyIcon from '../../assets/Group 21360.svg'
// import replyAllIcon from '../../assets/Group 21361.svg'
// import forwardIcon from '../../assets/forward.svg'
// import FromEmails from '../from-Email/FromEmails'
import Recipients from '../recipients/Recipients'
import ReactDOMServer from 'react-dom/server'
import store from '../../redux/store'
import showIcon from './assets/show.svg'
import deleteIcon from './assets/delete.svg'
import filesIcon from './assets/files.svg'
// all text
import allText from '../../allText.json'
import Show from './show'
import { useRef } from 'react'
import { actions } from '../../redux/actions/action'

function Reply(props) {

  let ReactQuillReply = ''
  const uploadInput = useRef(null);
  const [recipients, setRecipients] = useState([])
  const [contentQuill, setContentQuill] = useState()
  const [showContent, setShowContent] = useState();
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState([])
  const [filesUpload, setFilesUpload] = useState([])
  const user = useSelector(state => state.init.user)

  useEffect(() => {

    let tempRecipient,
      tempArray = [];
    switch (props.replyType) {
      case 'reply':
        let from = props.selectedConversation.waves[props.selectedConversation.waves.length - 1].from
        for (let x = 2; x < props.selectedConversation.waves.length + 1; x++) {
          if (from === props.user.username)
            from = props.selectedConversation.waves[props.selectedConversation.waves.length - x].from
          else
            break
        }
        tempRecipient = addRecipient(from)
        // pay attention when will it be you have to use () to divide the conditions;
        if (tempRecipient && !tempArray.find(t => tempRecipient.email && t.email === tempRecipient.email || tempRecipient.groupName && t.groupName === tempRecipient.groupName)) {
          tempArray.push(tempRecipient)
        }
        break
      case 'replyAll':
        props.selectedConversation.waves.forEach(w => {
          tempRecipient = addRecipient(w.from)

          if (tempRecipient && !tempArray.find(t => tempRecipient.email && t.email === tempRecipient.email || tempRecipient.groupName && t.groupName === tempRecipient.groupName)) {
            tempArray.push(tempRecipient)
          }
          w.to.forEach(t => {
            tempRecipient = addRecipient(t)
            if (tempRecipient && !tempArray.find(t => tempRecipient.email && t.email === tempRecipient.email || tempRecipient.groupName && t.groupName === tempRecipient.groupName)) {
              tempArray.push(tempRecipient)
            }
          })
        })
        break
      case 'forward':
        break
      default:
        break;
    }
    setRecipients(tempArray)
  }, [props.replyType])


  const addRecipient = (toAdd) => {

    let username = props.user.username
    if (toAdd === username + "@mails.codes" || toAdd === username) {
      return { type: "contact", email: user.username + '@mails.codes', contactName: user.username, contactId: user._id }
    }

    let recipientObj = {}
    let recipient
    switch (true) {
      //for user virtual email
      case toAdd.indexOf("@mails.codes") !== -1:
        toAdd = toAdd.split("@mails.codes")[0]
        recipient = props.usersEmails.find(u => u.username === toAdd)
        if (!recipient) {
          return null
        }
        recipientObj = { type: "contact", email: recipient.username + "@mails.codes", contactName: recipient.username, contactId: recipient._id }
        break;
      //for group
      case props.groups && props.groups.find(g => g.groupName === toAdd):
        recipient = props.groups.find(g => g.groupName === toAdd)
        if (!recipient) {
          return null
        }
        recipientObj = { type: "group", groupName: recipient.groupName }
        break;
      //for userName
      case toAdd.indexOf('@') === -1:
        recipient = props.usersEmails.find(u => u.username === toAdd)
        if (!recipient) {
          return null
        }
        //????
        recipientObj = { type: "contact", email: `${toAdd}@mails.codes`, contactName: recipient.username, contactId: recipient._id }
        break;
      //for email
      default:
        recipient = props.contacts.find(c => c.email === toAdd)
        if (!recipient) {
          return null
        }
        recipientObj = { type: "contact", email: recipient.email, contactName: recipient.name, contactId: recipient._id }
        break;
    }
    return recipientObj
  }

  const sendFrowardMessage = (recipientsToSend, concatenation) => {
    if (props.selectedConversation.source === 'google') {
      let gmailBody = {
        to: recipientsToSend,//???
        massage: ReactQuillReply.getElementsByClassName('ql-editor')[0]
          .innerHTML + concatenation,
        subject: props.selectedConversation.subject
      }
      console.log(' props.sendEmailServer', gmailBody)
      props.sendEmailServer(gmailBody)
    }

    let fwdBody = getForwardBody()
    let wave = {
      body: fwdBody,
      to: recipientsToSend,
      // reply: true,
      files: files
    }
    let conversation = {
      subject: props.selectedConversation.subject,
      source: props.selectedConversation.source,
      fwd: true,
    }
    //-conversationId -for the forward function, to add wave to the sender
    let conversationId = props.selectedConversation._id
    props.addConversationServer({ conversation: conversation, wave: wave, forwardConversationId: conversationId })
  }

  const send = () => {
    let invalidRecipient = recipients.find(r => r.type === "email" && r.valid === false)
    if (invalidRecipient) {
      alert(`The address "${invalidRecipient.email}" in the "To" field was not recognized. Please make sure that all addresses are properly formed`)
    }
    else {
      if (recipients.length) {
        let recipientsToSend = []
        recipients.forEach(r => recipientsToSend.push((r.email || r.groupName)))
        // add the content in show component - concatenation
        let concatenation = ReactDOMServer.renderToStaticMarkup(
          <Provider store={store}>
            <Show
              show={true}
              currWave={props.selectedConversation.waves[props.selectedConversation.waves.length - 1]} />
          </Provider>)
        if (props.replyType === 'forward') {
          sendFrowardMessage(recipientsToSend, concatenation)
        }
        else if (props.replyType === 'reply' || props.replyType === 'replyAll') {
          let wave = {
            body: ReactQuillReply.getElementsByClassName('ql-editor')[0].innerHTML + concatenation,
            to: recipientsToSend,
            conversation: props.selectedConversation._id,
            references: props.selectedConversation.messageId,
            inReplyTo: props.selectedConversation.messageId,
            subject: props.selectedConversation.subject,
            files: files,
            // reply: true
          }
          props.addWaveServer({ wave: wave })
        }
        props.setIsReplyMessageOpen(false)
        props.updateCurrentWaveToShow()
      }
    }
  }

  const uploadFiles = async () => {
    setUploading(true)
    props.setUploadProgress(0)
    let selectedFiles = uploadInput.current.files
    if (selectedFiles) {
      var formData = new FormData()
      let len
      for (len = 0; len < selectedFiles.length; len++) {
        filesUpload.push(selectedFiles[len].name)
        formData.append("file_" + len, selectedFiles[len])
      }
      props.uploadFilesServer(formData)
        .then((result) => {
          if (result === undefined)
            return
          let filesTemp = []
          for (let i = 0; result["file_" + i]; i++) {
            let f = result["file_" + i]
            filesTemp.push({ "name": f.name, "url": f.url })
          }
          setUploading(false)
          if (files.length) {
            for (let index = 0; index < files.length; index++) {
              filesTemp.push(files[index])
            }
          }
          setFiles(filesTemp)
          setFilesUpload([])
          // }
        })
    }
  }

  const deleteFile = (fileToDel) => {
    setFiles(files.filter(f => f.url != fileToDel.url))
  }

  const deleteUpload = (fileName) => {
    setFilesUpload(filesUpload.filter(f => f !== fileName))

  }

  const getForwardBody = () => {
    let myBody = ReactQuillReply.getElementsByClassName('ql-editor')[0].innerHTML
    myBody += '<hr></hr>'
    props.setIsReplyMessageOpen(false)
    props.selectedConversation.waves.slice(0).reverse().forEach(w => {
      myBody += `<div class="pb-2">
                    <div><span>${allText.reply.from}:  ${w.from}</span></div>
                    <div><span>${allText.reply.to}:  ${w.to.map(
        t => t + ` `
      )}</span></div>
                    <div><span>Date:  ${w.timestamp}</span></div>
                    <div class="pl-2">${w.body}</div>
                    </div>`
    })
    return myBody
  }

  return (
    <div className='warpReplyCard'>
      <div className='replyMessageEditorContainer card'>
        <div className='toLine'>
          {/* <img
            className='replyTypeIcon'
            src={
              props.replyType === 'forward'
                ? forwardIcon
                : props.replyType === 'replyAll'
                  ? replyAllIcon
                  : replyIcon
            }
          ></img> */}
          <Recipients recipients={recipients} setRecipients={setRecipients} expand={!props.showOpenConversation} replyType={props.replyType} />
        </div>
        <div
          className='editor-container'
          ref={x => (ReactQuillReply = x)}
          id='editor-container-reply-message'
        >
          <ReactQuill
            onChange={(e) => { setContentQuill(e) }}
            value={contentQuill || ``}
          />
          <div className='pl-3 py-3'>
            <div className='warpperDiv'>
              <img alt='' id={props.selectedConversation.waves[props.selectedConversation.waves.length - 1]._id} src={showIcon} onClick={() => setShowContent(!showContent)}
                style={{ cursor: 'pointer' }} />
            </div>
            <Show
              show={showContent}
              currWave={props.selectedConversation.waves[props.selectedConversation.waves.length - 1]} >
            </Show>
          </div>
        </div>
        {(files || uploading) &&
          <div className="files">
            {uploading && <>
              {/* <Progress progress='value' value={props.uploadProgress} total={100} /> */}
              {filesUpload && filesUpload.map(fileName => (
                <div className="file" >
                  <div class="fileName col-11">{fileName}</div>
                  <span className="uploadAnimationImg"></span>
                  <span className="removeFile" onClick={() => { deleteUpload(fileName) }}><FaTimes /></span>‏
                </div>
              ))}
            </>}

            {files && files.map(f => {
              return (
                <div class="file" f_url={f.url}>
                  <div class="fileName">{f.name}</div>
                  <span className="removeFile" onClick={() => { deleteFile(f) }}><FaTimes /></span>
                </div>
              )
            })}
          </div>}
        <div className='messageFooter d-flex justify-content-start align-items-center'>
         
          <button
            type='button'
            className='sendMessageBtn'
            data-toggle='tooltip'
            data-placement='top'
            title={allText.reply.send}
            onClick={send}
          >
            {allText.reply.send}
          </button>
           <span
            className='pr-2'
            onClick={() => {
              props.setIsReplyMessageOpen(false)
            }}
          >
            <img alt='' src={deleteIcon} />
          </span>
          <span className='pr-2'
            onClick={() => { uploadInput.current.click() }}>
            <img alt='' src={filesIcon} />
            <input type="file" multiple={true} ref={uploadInput} onChange={uploadFiles}
              style={{ display: "none" }}
            />
          </span>
      
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => {
    return {
      tags: state.tags.tags,
      selectedConversation: state.conversations.selectedConversation,
      contacts: state.init.contacts,
      usersEmails: state.init.usersEmails,
      user: state.init.user,
      groups: state.groups.groups,
      showOpenConversation: state.displaySettings.showOpenConversation,
    }
  },


  (dispatch) => ({
    setIsReplyMessageOpen: (val) => { dispatch(actions.setIsReplyMessageOpen(val)) },
    addWaveServer: (val) => { dispatch(actions.addWaveServer(val)) },
    addConversationServer: (val) => { dispatch(actions.addConversationServer(val)) },
    sendEmailServer: (val) => { dispatch(actions.sendEmailServer(val)) },
    setUploadProgress: (val) => { dispatch(actions.setUploadProgress(val)) },
    uploadFilesServer: (val) => { dispatch(actions.uploadFilesServer(val)) }
  })
  // {
  //   setIsReplyMessageOpen,
  //   newWave,
  //   newConversation,
  //   sendGmail,
  //   sendEmailServer,
  //   setUploadProgress,
  //   uploadFilesServer
  // }
)(Reply)
