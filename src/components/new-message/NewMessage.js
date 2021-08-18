import React, { useState, useEffect, useRef } from 'react'
import { connect } from "react-redux";
import { useSelector, useDispatch } from 'react-redux';
import { FaTrashAlt, FaPaperclip, FaMinus, FaExpandAlt, FaTimes, FaCalendar, FaHeart } from 'react-icons/fa'
import './NewMessage.scss'
import Rolling from './assets/Rolling.gif'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { newConversation, setIsMessageOpen, sendEmailServer, uploadFilesServer, setSelectedListFlag, setUploadProgress, setExpandMessage, EDIT_CONVERSATION_SERVER } from '../../redux/actions/conversation.actions'
// import { setSelectedSignatureId } from '../../redux/actions/signature.actions'
// import { addDraft, editDraft, editDraftOnServer, deleteDraft, removeNewMessageCard, expandMessage, minimize, addNewMessageCard } from '../../redux/actions/draft.actions'
import $ from 'jquery'
import Tooltip from '@material-ui/core/Tooltip'
import conversationService from '../../services/conversation.service'
import profileImg from '../../assets/Component 157 – 6.svg'
import paperClipGrey from './assets/paperClipGrey.svg'
import signature from './assets/signature.svg'
import trashGrey from './assets/trashGrey.svg'
import emojiIcon from '../../assets/emoji.svg'

import calendarCheckGrey from './assets/calendarCheckGrey.svg'
import plusMiniGrey from './assets/plusMiniGrey.svg'
import SignaturePreview from '../signature/SignaturePreview'
import ReactDOMServer from 'react-dom/server'
import uploadAnimation from '../../assets/animation_500_kkl8emcp.gif'
import { Dropdown, Progress } from 'semantic-ui-react'
import templatesIcon from './assets/templates.svg'
// import { setNotification } from '../../redux/actions/notification.actions';
// import { sendGmail } from '../../redux/actions/googleAuth.actions'
import _ from 'lodash'
import FromEmails from '.././from-Email/FromEmails'
import { Provider } from 'react-redux';
import store from '../../redux/store'
// import { setCurrentTemplate } from '../../redux/actions/templates.actions';
import { SocialIcon } from 'react-social-icons'
// import { actions } from '../../redux/actions/allActions'
// all text
import allText from '../../allText.json'
import Recipients from '../recipients/Recipients'
import EmojiePicker from './emojie-picker/EmojiePicker';
import keys from '../../Config/keys'
import { actions } from '../../redux/actions/action'


// import { Emoji } from 'emoji-mart'
var Image = Quill.import('formats/image');
Image.className = 'custom-class-to-image';
Quill.register(Image, true);

function NewMessage(props) {

  const [isNotification, setIsNotification] = useState(false)

  const sendNotificationToAll = (notification) => dispatch(actions.sendNotificationToAll(notification))
  const flagsList = useSelector(state => state.conversations.flagsList)
  //the selected emails and groups in To line:
  const [emailsBcc, setEmailsBcc] = useState([])
  const [emailsCc, setEmailsCc] = useState([])
  const [selectEmailId, setSelectEmailId] = useState()
  const [groups, setGroups] = useState([])
  const [emails, setEmails] = useState([])
  const [recipients, setRecipients] = useState([])
  const [displayEmojies, setDisplayEmojies] = useState(false)
  const [changeFiles, setChangeFile] = useState([])
  const [changeSubjectTemp, setChangeSubjectTemp] = useState(false)
  const dispatch = useDispatch();
  // //moved to recipients-------------------------------------------------------
  //const [correctRecipients, setCorrectRecipients] = useState([])
  // const [displayCreateGroup, setDisplayCreateGroup] = useState(false)
  // const [displayContacts, setDisplayContacts] = useState(false)
  // //for the search: teamsList, groupsList and contactsList:
  // const [teamsList, setTeamsList] = useState([])
  // const [groupsList, setGroupsList] = useState([])
  // const [contactsList, setContactsList] = useState([])
  // const newMessageToP = useRef(null),
  // newMessageTo = useRef(null),
  // groupNameInpt = React.createRef()
  // const [groupNameExists, setGroupNameExists] = useState(false)
  const sendSystemWave = (notif) => dispatch(actions.systemWaveForNotification(notif))

  const [mouseIn, setMouseIn] = useState(false);

  const [filesUpload, setFilesUpload] = useState([])
  const [files, setFiles] = useState([])
  const ReactQuillNew = useRef(null),
    newWaveSubject = useRef(null),
    uploadInput = useRef(null),
    newMessageCc = useRef(null),
    newMessageBcc = useRef(null),
    newMessageCcP = useRef(null),
    newMessageBccP = useRef(null)

  // const [expand, setExpand] = useState(false)
  const [minimize, setMinimize] = useState(false)
  const [once, setOnce] = useState(true)
  const [uploading, setUploading] = useState(false)
  // const [loadSignatureDataOnce, setLoadSignatureDataOnce] = useState(true)
  const [dataForMeeting, setDataForMeeting] = useState()
  const [showCreateMeeting, setShowCreateMeeting] = useState(false)
  const [initMeetingOnce, setInitMeetingOnce] = useState(false)
  const [contentQuill, setContentQuill] = useState('')
  const [displaySignature, setDisplaySignature] = useState(true);
  const [myDraft, setMyDraft] = useState()
  const [displayCc, setDisplayCc] = useState(false)
  const [displayBcc, setDisplayBcc] = useState(false)
  const [currentTypeTo, setCurrentTypeTo] = useState('')
  const [selectedSignatureIdForNewMessage, setSelectedSignatureIdForNewMessage] = useState(null)
  const [ifSaveDraftInserver, setIfSaveDraftInserver] = useState(false)
  const [saveDraftTemp, setSaveDraftTemp] = useState(false)
  const [positionOnQuill, setPositionOnQuill] = useState(0)
  const [selectedFrom, setSelectedFrom] = useState(props.selectedSubUser + '@mails.codes')
  const clickedOnTemplateImg = (<img src={templatesIcon} alt="" className="icon" />)
  const clickedOnSignatureImg = (<img src={signature} alt="" style={{ height: "24px", width: "25px" }} className="icon" />)
  // let props.newMessagesCards = props.newMessagesCards.length;
  let ifNewDraft = false

  useEffect(() => {
    let filesUploadArray = filesUpload
    console.log(filesUploadArray)
    changeFiles.forEach(fileTemp =>
      filesUploadArray = filesUploadArray.filter(file => file != fileTemp.name)
    )
    console.log(filesUploadArray)
    setFilesUpload(filesUploadArray)
    if (changeFiles != []) {
      setFiles(changeFiles.concat(files))
    }
    setUploading(true)

  }, [changeFiles])

  useEffect(() => {
    if (props.myMessage) {
      // for 'open draft' card or when props.newMessagesCards.length changed
      debugger
      if (props.myMessage.draft) {
      
        console.log("is open draft", props.myMessage.draft)
        setMyDraft(props.myMessage.draft)
        //check if subUser of manager create the draft
        if (props.myMessage.draft.user !== props.user._id) {
          props.subUsers.forEach((s) => {
            if (s._id === props.myMessage.draft.user) {
              setSelectedFrom(s.username + '@mails.codes')
            }
          })
        }
        if (props.myMessage.draft && props.myMessage.draft.to && props.myMessage.draft.to.length) {
          let tempContact, recipientObj, tempRecipientsArr = []
          setRecipients([])
          console.log("to draft:", props.myMessage.draft.to)
          props.myMessage.draft.to.forEach(tempTo => {
            if (props.groups.find(g => g.groupName === tempTo)) {
              recipientObj = { type: "group", groupName: tempTo }
            }
            else {
              tempContact = props.contacts.find(c => c.email === tempTo)
              if (tempContact) {
                recipientObj = { "type": "contact", "email": tempTo, "contactName": tempContact.name, "contactId": tempContact._id }
              }
              else {
                let valid = ValidateEmail(tempTo)
                recipientObj = { "type": "email", "email": tempTo, "valid": valid }
              }

            }
            tempRecipientsArr = [...tempRecipientsArr, recipientObj]

            console.log("recipients after open", recipients)
          });
          setRecipients([...tempRecipientsArr])
        }
        if (props.myMessage.draft.body !== "<p><br></p>") {
          setContentQuill(props.myMessage.draft.body)
        }
        if(props.myMessage.draft.templateId){
          if(props.templates.templatesList){
            const template=props.templates.templatesList.find(t=>t._id===props.myMessage.draft.templateId)
            props.setCurrentTemplate(template)
          }      
        }
        if (props.myMessage.draft.files) {
          let filesToAdd = []
          props.myMessage.draft.files.forEach(f => {
            filesToAdd.push({ "name": f.substring(f.indexOf('__') + 2), "url": f })
          })
          setFiles(filesToAdd)
        }
      }else{
        //when this useEffect append because change props.newMessagesCards.length 
        //and the message card is new
        setSelectedFrom(props.selectedSubUser + '@mails.codes');
        setRecipients([]);
        newWaveSubject.current.innerText=''
        props.setCurrentTemplate(null)
        setContentQuill('')
        setFiles([])
        setMyDraft(null)
      }

    }
  }, [props.newMessagesCards.length])//needs this property for case of 
                                     //there is some open message cards and user close one card  
 

  useEffect(() => {
    // reset current template with null;
    return () => {
      props.setCurrentTemplate(null)
    }
  }, [])

  useEffect(() => {
    //for the first time after opening this newMessageCard-
    console.log("props.myMessage.draft", props.myMessage.draft)
    if (!myDraft && !props.myMessage.draft) {
      ifNewDraft = true
    }
    let messageBody, messageSubject = ""
    messageBody = ReactQuillNew.current && ReactQuillNew.current.state.value
    messageSubject = newWaveSubject.current.innerText
    let recipientsDrafts = []
    recipients.forEach(r => recipientsDrafts.push(r.email || r.groupName))
    //for new draft -save the draft content
    if (ifNewDraft && (messageSubject.length === 1 || extractContent(messageBody).length === 1 || recipientsDrafts.length !== 0)) {
      let newDraft = {
        from: selectedFrom.split('@')[0],
        to: recipientsDrafts,
        body: messageBody,
        files: files,
        subject: messageSubject,
      }

      if (props.templates.currentTemplate) {
        newDraft.templateId = props.templates.currentTemplate._id
      }

      ifNewDraft = false;
      props.addDraftServer({ ...newDraft, messageId: props.myMessage.messageId })
    }
    else {
      // props.myMessage.draft- contains the open draft object
      if (props.myMessage.draft) {
        let recipientsDrafts = []
        recipients.forEach(r => recipientsDrafts.push(r.email || r.groupName))
        let draftToEdit = {
          from:selectedFrom.split('@')[0],
          to: recipientsDrafts,
          body: messageBody,
          files: files,
          subject: messageSubject,
          _id: props.myMessage.draft._id,
          //templateId:props.templates.currentTemplate?props.templates.currentTemplate._id:null
        }
        if(props.templates.currentTemplate){
          draftToEdit.templateId=props.templates.currentTemplate._id
        }
        console.log("draftToEdit", draftToEdit)
        console.log("🚀 ~ file: NewMessage.js ~ line 231 ~ useEffect ~ ifSaveDraftInserver", ifSaveDraftInserver)
        if (ifSaveDraftInserver) {
          props.editDraftOnServer(draftToEdit);
          setIfSaveDraftInserver(false)
        }
        else {
          props.editDraft(draftToEdit);
        }
      }
    }
  }, [
    ReactQuillNew.current && ReactQuillNew.current.state.value,
    changeSubjectTemp,
    files,
    recipients,
    saveDraftTemp
  ])
  useEffect(() => {
    const saveDraftInserver = setInterval(() => {
      setIfSaveDraftInserver(true);
      setSaveDraftTemp(!saveDraftTemp);
      return () => {
        clearInterval(saveDraftInserver)
      }
    }, 60 * 1000)

  })
  useEffect(() => {
    let signatureId = -1// -1 means to the default signature 
    if (props.signatures.length !== 0) {
      signatureId = props.signatures[0]._id
    }
    setSelectedSignatureIdForNewMessage(signatureId)

  }, [props.signatures])
  useEffect(()=>{
    console.log("useEffect props.myMessage",props.myMessage)
  },[props.myMessage])
  // useEffect(() => {
  //   console.log("positionOnQuill",positionOnQuill)
  //   if (positionOnQuill !== -1) {
  //     const quill = ReactQuillNew.current;
  //     const editor = quill.getEditor();
  //   //  editor.insertEmbed(positionOnQuill, 'image', emojiCurrentSrc)
  //    // editor.setSelection(positionOnQuill+1)
  //     console.log("in open picker",editor.root.ownerDocument.getSelection())
  //   }

  // }, [positionOnQuill])

  const closeEmojiesPopup = (e) => {
    console.log("mouseDown!!", e)
    console.log(e)
    if (e.target.className !== "insertEmoji" && e.target.className !== "emoji-img" && displayEmojies) {
      setDisplayEmojies(false)
    }

  }
  // useEffect(() => {
  // props.newMessagesCards = props.newMessagesCards.length
  // }, [props.newMessagesCards])

  // const closeMessage = (e) => {
  // props.removeNewMessageCard(props.myMessage.messageId)
  // // props.setIsMessageOpen(false)
  // e.stopPropagation()
  // props.setExpandMessage(false)
  // }
  // const expandMessage = (e) => {
  // setMinimize(false)
  // props.setExpandMessage(!props.expand)
  // e.stopPropagation();
  // }
  const ValidateEmail = (mail) => {
    console.log(mail);
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      .test(mail) === true
  }
  const extractContent = (s) => {
    var span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };
  const deleteMessageClicked = (e) => {
    // need to delete the draft just if clicked on the trash icon
    if (myDraft && e !== "fromX") {
      props.deleteDraftServer(myDraft._id)
    }
    props.expand(false)
    console.log("before x message",props.newMessagesCards)
    props.removeNewMessageCard({id:props.myMessage.messageId})
  }

  // useEffect(() => {
  //   if (props.templates.currentTemplate)
  //     alert(props.templates.currentTemplate.html)
  // }, [props.templates.currentTemplate])



  const onEmojiClick = async (event, emojiObject) => {
    if (event.target.currentSrc) {
      const quill = ReactQuillNew.current;
      const editor = quill.getEditor();
      // console.log(editor.root.ownerDocument.getSelection())
      editor.insertEmbed(positionOnQuill, 'image', event.target.currentSrc)
      if (displayEmojies) {

        editor.setSelection(positionOnQuill + 1)
      }
    }

  };
  const uploadFiles = async () => {
    setUploading(true)
    props.setUploadProgress(0)
    let selectedFiles = uploadInput.current.files
    if (selectedFiles) {
      var formData = new FormData()
      let newFilesUpload = []
      let len
      for (len = 0; len < selectedFiles.length; len++) {
        newFilesUpload.push(selectedFiles[len].name)
        // filesUpload.push(selectedFiles[len].name)
        formData.append("file_" + len, selectedFiles[len])
      }
      if (newFilesUpload.length != 0) {
        setFilesUpload([...filesUpload, ...newFilesUpload])
      }
      dispatch(actions.uploadFilesServer(formData))
        // props.uploadFilesServer(formData)
        // 
        // props.setUploadProgress(Math.round((100 * event.loaded) / event.total));
        // conversationService.uploadFiles(formData)
        .then((result) => {
          scrollDown()
          if (result === undefined)
            return

          let filesTemp = []
          for (let i = 0; result["file_" + i]; i++) {
            let f = result["file_" + i]
            filesTemp.push({ "name": f.name, "url": f.url })
          }
          setUploading(false)

          setChangeFile(filesTemp)

        })
    }
  }

  const getSignaturePreview = () => {
    return (<>
      <SignaturePreview signatureIdForNewMessage={selectedSignatureIdForNewMessage} sentToGoogle={true} />
      {/* <div className='micro'>Made with ❤ by <a href={keys.BOX_URL} target="_blank">Leader Box</a> </div> */}

    </>)
  }


  const sendMessage = async () => {
    if (isNotification === true) {
      sendNotif()
      props.removeNewMessageCard(props.myMessage.messageId)
      props.expand(false)
      return
    }
    if (props.selectedSignatureId === -1 && displaySignature) {
      alert("You'm about to send an email with a default signature!")
    }
    let invalidRecipient = recipients.find(r => r.type === "email" && r.valid === false)
    if (invalidRecipient) {
      alert(`The address "${invalidRecipient.email}" in the "To" field was not recognized. Please make sure that all addresses are properly formed`)
    }
    else {

      if (recipients.length) {
        let recipientsToSend = []
        recipients.forEach(r => recipientsToSend.push(r.email || r.groupName))
        let messageSubject = newWaveSubject.current.innerText
        var messageBody = ReactQuillNew.current.state.value;
        // add template to wave body;
        if (props.templates && props.templates.templatesList && props.templates.currentTemplate) {
          messageBody += props.templates.currentTemplate.html;
        }
        if (displaySignature) {
          const html = ReactDOMServer.renderToStaticMarkup(
            <Provider store={store}>
              {await getSignaturePreview()}
            </Provider>
          )
          messageBody += html.toString()
        }
        let wave = {
          from: props.emailFromAddress,
          body: messageBody,
          to: recipientsToSend,
          files: files
        }
        let conversation = {
          subject: messageSubject,
          source: 'Box', //changed from Leader Box,
        }
        if (props.emailFromAddress === props.gmailUserAddress) {
          // let gmailBody = { "to": wave.to, "subject": newWaveSubject.current.innerText, "massage": wave.body }
          // console.log(" props.sendGmail", gmailBody)
          // //show notification send mail
          // const notificationToShow = { info: (allText.messageSent), icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
          // dispatch(setNotification(notificationToShow))
          // // props.sendGmail(gmailBody)
          // // // props.sendEmailServer({
          // // // subject: newWaveSubject.current.innerText,
          // // // source: 'Box' //changed from Leader Box
          // // // })
        }
        else {
          //show notification send mail
          const notificationToShow = { info: allText.newMessage.messageSent, icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
          dispatch(actions.setNotification(notificationToShow))
          props.addConversationServer(conversation, wave, null, props.myMessage.draft && props.myMessage.draft._id)
          props.removeNewMessageCard(props.myMessage.messageId)
          props.expand(false)
          // move to reducer after success
          // if (props.myMessage.draft) {
          //   props.deleteDraft(props.myMessage.draft._id)
          // } 
        }
      }
    }
  }

  const onClickSignature = (e) => {
    // close new message 
    props.removeNewMessageCard(props.myMessage.messageId)
    // show current signture;
    dispatch(actions.setSelectedListFlag(flagsList.signature));
  }

  const onClickCreateMeeting = (e) => {
    e.stopPropagation()
    let tempData = {
      title: newWaveSubject.current.value,
      description: ReactQuillNew.current.getElementsByClassName('ql-editor')[0].innerText,
      participants: ['5fa3cf7806a5f93fca6f1e1e']
      //props.contacts
    }
    const closeMessage = (e) => {
      props.removeNewMessageCard(props.myMessage.messageId)
      // props.setIsMessageOpen(false)
      e.stopPropagation()
    }
    props.removeNewMessageCard(props.myMessage.messageId)
  }

  const onChangeSignature = (i) => {
    let signature = props.signatures[i];
    setSelectedSignatureIdForNewMessage(signature._id)
    setDisplaySignature(true);
  }

  const modules = {
    toolbar: [
      // [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      // ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }
  const sendNotif = () => {
    let messageBody, messageSubject = "", messageImg = ""
    messageBody = ReactQuillNew.current.editingArea.innerText
    messageSubject = newWaveSubject.current && newWaveSubject.current.innerText
    messageImg = "https://files.codes/uploads/postman/others/1621926635018__finance.svg"
    // files[0]
    console.log('EE', messageSubject)
    const notification = {
      "title": messageSubject,
      "body": messageBody,
      "image": messageImg,
      "icon": "https://files.codes/uploads/michalgiladi/others/1622111501224__boxIconLight.svg"
    }
    console.log('EEno', notification.title)
    sendNotificationToAll(notification)
    console.log('SSSSnotification', notification)
    sendSystemWave(notification)
  }

  const deleteFile = (fileToDel) => {
    setFiles(files.filter(f => f.url != fileToDel.url))
  }

  const deleteUpload = (fileName) => {
    setFilesUpload(filesUpload.filter(f => f != fileName))
    console.log(filesUpload)
  }
  const scrollDown = () => {
    let scrollDownDiv = document.getElementById('scrollDown');
    if (scrollDownDiv) {
      scrollDownDiv.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }
  return (
    <>
      {<div className={`newMessageDiv ${props.myMessage.expand ? `expand` : props.myMessage.minimize ? `minimize` : ``}`} onClick={(e) => closeEmojiesPopup(e)} >
        <div className="newWaveTitle">
          {isNotification ? <label>{allText.notification.newNotification}</label> :
            <label>{allText.newMessage.newMessage}</label>}
          <span className="MessageTitleIcons">
            <Tooltip title={allText.newMessage.minimize}>
              <span className="displayMaxOrMin" onClick={(e) => {
                props.minimize({ minimize: !props.myMessage.minimize, id: props.myMessage.messageId })
                props.expandMessage({ expand: false, id: props.myMessage.messageId, from: false });

                if (props.newMessagesCards.length > 1) {
                  if ((props.newMessagesCards[props.newMessagesCards.length - 1].messageId !== props.myMessage.messageId &&
                    props.newMessagesCards[props.newMessagesCards.length - 1].expand === false) ||
                    props.newMessagesCards[props.newMessagesCards.length - 2].expand === false)
                    props.expand(false)
                }
                else
                  props.expand(false)
                // if (props.newMessagesCards.length > 1 && props.newMessagesCards[props.newMessagesCards.length - 1].messageId === props.myMessage.messageId
                // && props.newMessagesCards[props.newMessagesCards.length - 2].expand
                // || props.newMessagesCards[props.newMessagesCards.length - 1].expand)
                // props.expand(true)
                // else
                // props.expand(false)

              }}><FaMinus /></span>
            </Tooltip>
            <Tooltip title={allText.newMessage.fullScreen}>
              <span className="displayMaxOrMin" onClick={(e) => {
                props.expandMessage({ expand: !props.myMessage.expand, id: props.myMessage.messageId, from: true })
                props.minimize({ minimize: false, id: props.myMessage.messageId })
                props.expand(!props.myMessage.expand)
                e.stopPropagation()
              }}><FaExpandAlt /></span>
            </Tooltip>
            <Tooltip title={allText.newMessage.close}>
              <span className="closeMessage" onClick={async (e) => {
                await setIfSaveDraftInserver(true);
                await setSaveDraftTemp(!saveDraftTemp);
                deleteMessageClicked("fromX")
                props.expand(false)
              }}><FaTimes /></span>
            </Tooltip>
          </span>
        </div>
        <div style={{ "display": `${!props.myMessage.minimize ? `block` : `none`} ` }}>
          {props.subUsers.length !== 0 && <FromEmails selectedFrom={selectedFrom} setSelectedFrom={setSelectedFrom} />}
          <Recipients
            recipients={recipients}
            setRecipients={setRecipients}
            isNotification={isNotification}
            setIsNotification={setIsNotification}
            expand={props.myMessage.expand}
          />
          <hr />
          <div className="newWaveSubject" id="newWaveSubject" contentEditable="true"  suppressContentEditableWarning={true} maxLength="35" data-text={`${allText.newMessage.subject}: `} onInput={() => { ; setChangeSubjectTemp(!changeSubjectTemp) }} ref={newWaveSubject}>{myDraft && myDraft.subject}</div>
          <hr />
          <div className="newMessageDisplaying" >
            <ReactQuill
              ref={ReactQuillNew}
              className="react-quill quillContectDiv"
              style={{ minHeight: props.templates && props.templates.templatesList && props.templates.currentTemplate ? '0' : '36vh' }}
              name="editor"
              theme='snow'
              modules={modules}
              onChange={(e) => { setContentQuill(e) }}
              value={contentQuill || ``}
            />
            {props.templates && props.templates.templatesList && props.templates.currentTemplate &&
              <div className="displayTmplateInQuill" dangerouslySetInnerHTML={{ __html: props.templates.currentTemplate.html }}></div>}
            {!isNotification &&
              displaySignature ?
              <div className="previewSignatureDiv" >
                <SignaturePreview className="signature-prev" signatureIdForNewMessage={selectedSignatureIdForNewMessage} />
                {/* <div className='micro'>Made with ❤ by <a href={keys.BOX_URL} target="_blank">Leader Box</a> </div> */}
              </div> : <span />
            }
            {displayEmojies && <div className="emojiePicker"><EmojiePicker onEmojiClick={onEmojiClick} /></div>}
            {(files || uploading) &&
              <div className="files">
                {uploading && <>
                  {filesUpload && filesUpload.map(fileName => (
                    <div className="file" >
                      <div class="fileName col-11">{fileName}</div>
                      {/* <img src={uploadAnimation} class="uploadAnimationImg"></img> */}
                      {/* <img src={Rolling}></img> */}
                      <span className="uploadAnimationImg"></span>
                      <span className="removeFile" onClick={() => { deleteUpload(fileName) }}><FaTimes /></span>
                    </div>
                  ))}
                </>}
                {files && files.map(f => (
                  <div class="file" f_url={f.url}><div class="fileName openFileUrl" onClick={() => window.open(f.url)}>{f.name}</div><span className="removeFile" onClick={() => { deleteFile(f) }}><FaTimes /></span></div>

                ))}
              </div>}

            <div id="scrollDown"></div>
          </div>
          <div className="messageFooter">‏
            <button type="button" className="btn sendMessageBtn" onClick={sendMessage}>{allText.newMessage.send}</button>
            <span className="options">
              <Tooltip title={allText.newMessage.attachFiles}>
                <span className="option" onClick={() => { uploadInput.current.click() }}>
                  <img src={paperClipGrey} alt="Add file" />
                </span></Tooltip>
              <input type="file" multiple={isNotification ? false : true} ref={uploadInput} onChange={uploadFiles}
                style={{ display: "none" }}
              />

              {/* templates */}
              {!isNotification && <>
                <span className="options">
                  <Tooltip title={allText.newMessage.addTemplate}>
                    <Dropdown trigger={clickedOnTemplateImg} icon={null} onClick={(e) => closeEmojiesPopup(e)}>
                      <Dropdown.Menu>
                        <Dropdown.Item key={1} text={allText.newMessage.noTemplate}
                          active={!props.templates.currentTemplate}
                          value='Off Topic' onClick={() => {
                            dispatch(actions.setCurrentTemplate(null))
                          }} />
                        {props.templates && props.templates.templatesList && props.templates.templatesList && props.templates.templatesList.map(template => {
                          return (
                            <>
                              {/* <Dropdown.Divider /> */}
                              <Dropdown.Item key={template._id} text={template.name}
                                active={template._id === (props.templates.currentTemplate && props.templates.currentTemplate._id)}
                                value='Off Topic' onClick={() => {
                                  dispatch(actions.setCurrentTemplate(template))
                                }} />
                            </>)
                        })}
                      </Dropdown.Menu>
                    </Dropdown></Tooltip>
                </span>
                <span className="options">
                  {/* <div className="ql-onChangeSignature">{allText.changeSinature}</div> */}
                  <Tooltip title={allText.newMessage.signature}>
                    <Dropdown trigger={clickedOnSignatureImg} icon={null} floating onClick={(e) => closeEmojiesPopup(e)}>
                      <Dropdown.Menu>
                        <Dropdown.Item key={1} text={allText.newMessage.noSignature}
                          value='Off Topic' onClick={() => {

                            setDisplaySignature(false)
                          }} />
                        {props.signatures && props.signatures.map((item, index) => {
                          return (
                            <>
                              <Dropdown.Divider />
                              <Dropdown.Item key={1} text={item.signatureName}
                                value='Off Topic' onClick={async (e) => {
                                  onChangeSignature(index)
                                  // await props.getSignatureServer(item);
                                  // setDisplaySignature(true);
                                  // props.setSignatureName(item)
                                }} />
                            </>)
                        })}
                      </Dropdown.Menu>
                    </Dropdown></Tooltip>
                  <span className="options">
                    <Tooltip title={allText.newMessage.insertEmoji}>
                      <span className="insertEmoji option " onClick={(e) => { setDisplayEmojies(!displayEmojies); }}><img src={emojiIcon} alt={allText.newMessage.insertEmoji} style={{ height: "25px", width: "25px", marginLeft: "-0.4vh" }} /></span>
                    </Tooltip>
                  </span>
                </span>
              </>}

            </span>
            <span className="options">
              <span className="deleteMessage" id="deleteMessage" onClick={deleteMessageClicked}><img src={trashGrey} alt={allText.newMessage.delete}></img></span>
            </span>
            {/* {displayEmojies&& <EmojiePicker onEmojiClick={onEmojiClick}/>} */}
          </div>
        </div>
      </div >}
    </>
  )
}

export default connect(
  (state) => {
    return {
      isMessageOpen: state.conversations.isMessageOpen,
      uploadProgress: state.conversations.uploadProgress,
      usersEmails: state.init.usersEmails,
      user: state.init.user,
      username: state.init.userName,
      selectedListFlag: state.conversations.selectedListFlag,
      selectedConversation: state.conversations.selectedConversation,
      signatures: state.signature.signaturesList,
      selectedSignatureId: state.signature.selectedSignatureId,
      showGroupModal: state.groups.show,
      drafts: state.drafts.drafts,
      newMessagesCards: state.drafts.newMessagesCards,
      googleAuth: state.init.googleAuth,
      emailFromAddress: state.conversations.emailFromAddress,
      gmailUserAddress: state.googleAuth ? state.googleAuth.gmailUserAddress : null,
      templates: state.templates,
      contacts: state.init.contacts,
      groups: state.groups.groups,
      subUsers: state.subUsers.subUsers,
      selectedSubUser: state.subUsers.selectedSubUser,

    }
  },

  (dispatch) => ({
    addConversationServer: (conversation, wave, forward, draftId) => { dispatch(actions.addConversationServer({ conversation, wave, forward, draftId })) },
    setIsMessageOpen: (val) => { dispatch(actions.setIsMessageOpen(val)) },
    addDraftServer: (val) => { dispatch(actions.addDraftServer(val)) },
    editDraftOnServer: (val) => { dispatch(actions.editDraftOnServer(val)) },
    editDraft: (val) => { dispatch(actions.editDraft(val)) },
    deleteDraftServer: (val) => { dispatch(actions.deleteDraftServer(val)) },
    removeNewMessageCard: (val) => { dispatch(actions.removeNewMessageCard(val)) },
    setUploadProgress: (val) => { dispatch(actions.setUploadProgress(val)) },
    uploadFilesServer: (val) => { dispatch(actions.uploadFilesServer(val)) },
    sendGmail: (val) => { dispatch(actions.sendGmail(val)) },
    sendEmailServer: (val) => { dispatch(actions.sendEmailServer(val)) },
    setExpandMessage: (val) => { dispatch(actions.setExpandMessage(val)) },
    minimize: (val) => { dispatch(actions.minimizeMessage(val)) },
    expandMessage: (val) => { dispatch(actions.expandMessage(val)) },
    setSelectedSignatureId: (val) => { dispatch(actions.setSelectedSignatureId(val)) },
    addNewMessageCard: (val) => { dispatch(actions.addNewMessageCard(val)) },
    setCurrentTemplate: (val) => { dispatch(actions.setCurrentTemplate(val)) }
  })

)(NewMessage)