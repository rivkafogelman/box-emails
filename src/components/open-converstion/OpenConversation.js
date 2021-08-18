import React, { useEffect, useRef, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import imgFile from '../../assets/imageFile.svg'
import pdfFile from '../../assets/pdfFile.svg'
import wordFile from '../../assets/wordFile.svg'
import { BsFillReplyFill } from 'react-icons/bs'
import * as webhookService from '../../services/webhook.service';
import filePdf from './assets/filePdf.svg'

import Doc from '../saveConversationInPDF/saveConversationInPDF'
import download from './assets/download.svg'
// import { setSelectedConversation, editConversations, setIsReplyMessageOpen, downloadFileServer, deleteConversations, deleteConversation, setClose, editConversation, setSelecteConversationWaveId, markAsTrashConversations, setDisplayRightCard } from '../../redux/actions/conversation.actions'
import Reply from '../reply/Reply'
import { FaDownload } from 'react-icons/fa'
// import { RiWhatsappFill } from 'react-icons/ri'
import Tooltip from '@material-ui/core/Tooltip';
import './OpenConversation.scss'
import conversationService from '../../services/conversation.service'
import replyIcon from '../../assets/Group 21360.svg'
import replyAllIcon from '../../assets/Group 21361.svg'
import forwardIcon from '../../assets/forward.svg'
import whatsApp from './assets/whatsApp.svg'
import $ from 'jquery'
import garbage from './assets/garbage.svg'
import return1 from './assets/return1.svg'
import allText from '../../allText.json'
import { actions } from '../../redux/actions/action'

// import { setShowAll, setFilteredBody, getWebhookSelectedProps, setWebhookSelectedProps, setWebhookFlag, setSecondRender, setJsonParserForm } from '../../redux/actions/webhook.actions'
import showIcon from '../reply/assets/show.svg'
import ContactProfile from '../contact-profile/ContactProfile'


function OpenConversation(props) {
    const dispatch = useDispatch();

    const [contact, setContact] = useState(null);
    const [replyType, setReplyType] = useState("reply")
    const [tag, setTag] = useState(null)
    const [tagsArray, setTags] = useState([])
    const [myConv, setMyConv] = useState(null)
    const [waves, setWaves] = useState(null)
    const [displaySystemWaves, setDisplaySystemWaves] = useState(false)
    // contain the id of current wave to expand;
    // or null if no one selected
    const [showCurrentWave, setShowCurrentWave] = useState(null);
    const waveBodyRef = useRef(null);
    // const [webhookFlag, setWebhookFlag] = useState(false);
    // const [secondRender, setSecondRender] = useState(false);


    // פונ זו מתרחשת בלחיצה על כל וייב
    // ומוסיפה את הכפתור שמציג/מסתיר את השרשור
    // קורית בשינוי המשתנה showCurrentWave 

    const addConcatenationToggleButton = () => {
        let parentDiv = document.getElementsByClassName("body")[0];
        let imgExists = document.getElementById('3pointsImg');
        if (parentDiv && !imgExists) {
            let newNode = document.createElement("img");
            newNode.src = showIcon;
            newNode.id = '3pointsImg';
            newNode.style.cursor = 'pointer'
            newNode.addEventListener('click', () => {

                let parentDiv = document.getElementsByClassName("body")[0];
                let showElement = document.getElementsByClassName('Show')[0];
                let gmail_quote = document.getElementsByClassName('gmail_quote')[0];
                if (showElement && showElement.parentElement === parentDiv) {
                    if (showElement.style.display === 'none') {
                        showElement.style.display = 'block';
                    }
                    else {
                        showElement.style.display = 'none';
                    }
                }
                if (gmail_quote && gmail_quote.parentElement === parentDiv) {
                    if (gmail_quote.style.display === 'none') {
                        gmail_quote.style.display = 'block';
                    }
                    else {
                        gmail_quote.style.display = 'none';
                    }
                }
            })
            let showElement = document.getElementsByClassName("Show")[0];
            let gmail_quote = document.getElementsByClassName('gmail_quote')[0];
            if (showElement && showElement.style && showElement.parentElement === parentDiv) {
                showElement.style.display = 'none'
                parentDiv.insertBefore(newNode, showElement)
            }
            if (gmail_quote && gmail_quote.style && gmail_quote.parentElement === parentDiv) {
                gmail_quote.style.display = 'none'
                parentDiv.insertBefore(newNode, gmail_quote)
            }
            // if (parentDiv.children) {                 
            //     let lastChild = parentDiv.children[parentDiv.children.length - 1];
            //     if (lastChild && lastChild.style) {
            //         lastChild.style.display='none'
            //         parentDiv.insertBefore(newNode,lastChild)
            //     }
            // }
        }
    }
    useEffect(() => {

        if (props.conversation) {
            // if (props.conversation&&props.conversation!=='empty') {
            if (props.selectedListFlag !== props.flagsList.systemWaves) {
                setTimeout(() => {
                    let selectedWaveId = props.conversation.waves[props.conversation.waves.length - 1]._id;
                    dispatch(actions.setSelecteConversationWaveId(selectedWaveId))
                    setShowCurrentWave(selectedWaveId)
                    if (props.conversation.waves.length > 1) {
                        scrollToBotton();
                    }
                }, (100));
            }


            setMyConv(props.conversation)


            if (props.conversation.tags && props.tags) {
                let newTagsArray = []
                // if (Object.prototype.toString.call(props.conversation.tag).indexOf("Array") > -1) {
                props.conversation.tags.forEach(t => {
                    let tag = props.tags.find(T => T._id === t)
                    if (tag)
                        newTagsArray.push(tag)
                })
                // }
                // else {

                //     let tag = props.tags.find(t => t._id === props.conversation.tag)

                //     if (tag)
                //         newTagsArray.push(tag)
                // }

                setTags(newTagsArray)
            }
            else {
                setTags([])
                // setTag(null)
            }
            let contact = props.contacts.find(c => c.email === props.conversation.from)
            setContact(contact)
            if (props.conversation.waves) {

                if (props.conversation.readed) {
                    setWaves(props.conversation.waves)
                }
                else {
                    setWaves(props.conversation.waves)
                }
            }
            if (props.conversation.sourceIp) {

                if (!props.webhookFlag && props.webhookProps) {
                    props.setWebhookSelectedProps(null);
                    props.setFilteredBody('');
                    props.setWebhookFlag(true);
                }
                else if (!props.webhookProps) {
                    props.getWebhookSelectedProps();
                    props.setWebhookFlag(true);

                }
                if (props.webhookProps && props.webhookProps.length > 0 && props.secondRender) {
                    const filteredObj = {};
                    filterObject(filteredObj);

                    props.setFilteredBody(JSON.stringify(filteredObj, null, 4));

                }
                props.setSecondRender(true);
            }
        }
    }, [props.conversation, props.webhookProps])

    useEffect(() => {
        setDisplaySystemWaves(props.selectedListFlag === props.flagsList.systemWaves)
    }, [props.selectedListFlag])

    useEffect(() => {
    }, [props.conversationsForSearch, props.selectedConversation])

    // כדי שלא יוצג ריפלי בלחיצה על כל וייב אחר
    useEffect(() => {
        if (props.isReplyMessageOpen) {
            props.setIsReplyMessageOpen(false)
        }
        // כשנבחר וייב אחר 
        // נוסיף לתצוגה שלו את הכפתור שמציג או מסתיר את התצוגה
        addConcatenationToggleButton();
    }, [showCurrentWave])


    const filterObj = (filteredObj, webProp) => {
        console.log('filterObj', filteredObj);
        let anotherObj = JSON.parse(myConv.body);
        let placeHolder = {};
        webProp.forEach(p => {
            if (!filteredObj[p])
                filteredObj[p] = {};
            placeHolder = filteredObj;
            filteredObj = filteredObj[p];
            anotherObj = anotherObj[p];

            if (webProp.indexOf(p) === webProp.length - 1) {
                placeHolder[p] = anotherObj;
            }
        })
    }

    const filterObject = (filteredObj) => {
        props.webhookProps.forEach(w => {
            filterObj(filteredObj, w);
        })
    }


    // useEffect(() => {
    //       

    //     if(myConv && !webhookPropsFlag && !props.webhookProps){
    //         props.setFilteredBody(myConv.body);

    // if(props.webhookFilteredBody){
    //let tempConv = {...props.webhookFilteredBody};
    // tempConv.allJson = tempConv.body;
    // props.setSelectedConversation(tempConv);
    // if(myConv.sourceIP){
    // props.getWebhookSelectedProps();
    // setWebhookPropsFlag(true);
    // }
    // if(props.webhookProps && props.webhookProps.length > 0){
    //     console.log('if', props.webhookProps);
    //     const filteredObj = {};
    //     filterObject(filteredObj);
    // console.log(filteredObj);
    // tempConv = {...props.conversation};
    //let tempConv = JSON.stringify(filteredObj, null, 4);
    // props.setSelectedConversation(tempConv);
    // props.setFilteredBody(JSON.stringify(filteredObj, null, 4));

    // }

    // }

    // }

    // return (() => {
    // props.setWebhookSelectedProps(null);
    //  props.setFilteredBody('');
    //  props.setShowAll(false);
    // })
    // },[myConv, props.webhookProps, props.webhookFilteredBody])


    const scrollToBotton = () => {
        let scrollToBottonDiv = document.getElementById('scrollToBotton');
        if (scrollToBottonDiv) {
            scrollToBottonDiv.scrollIntoView({ block: 'end', behavior: 'smooth' });
        }

    }
    const deleteClicked = () => {
        // props.deleteConversations([props.conversation._id])
        let notificationToShow;
        if (props.selectedListFlag === props.flagsList.trash) {
            notificationToShow = { info: 'Conversations deleted', icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
            dispatch(actions.deleteConversationsServer([props.conversation._id]))
        }
        else {
            notificationToShow = { info: (allText.notification['conversationTrashed']), icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
            dispatch(actions.markAsTrashConversationsMidd([{ "_id": props.conversation._id, "trash": true }]))
        }
        dispatch(actions.setNotification(notificationToShow))
    }
    const replyClicked = () => {
        setReplyType("reply")
        props.setIsReplyMessageOpen(!props.isReplyMessageOpen)
        scrollToBotton();
    }
    const replyAllClicked = () => {
        setReplyType("replyAll")
        props.setIsReplyMessageOpen(!props.isReplyMessageOpen)
        scrollToBotton();
    }
    const forwardClicked = () => {
        setReplyType("forward")
        props.setIsReplyMessageOpen(!props.isReplyMessageOpen)
        scrollToBotton();
    }

    const downloadFile = (event, url) => {

        // let type = url.substring(url.indexOf('__') + 2)
        // type = type.substring(type.indexOf('.') + 1)

        // event.stopPropagation()
        // conversationService.downloadFile(url, type).then(() => {

        props.downloadFileServer(url)
    }

    const displayFromTo = (from) => {
        let userName = props.user.username
        let fromDisp = ""
        if (from) {
            //if it is the user himself
            if (from.slice(0, from.indexOf('@')) === userName) {
                fromDisp = "me"
            }
            else {
                //mail from user contains only username
                //but in the old versions- username@mail.leader.codes
                if (from.indexOf('@mail.leader.codes') !== -1) {
                    fromDisp = from.slice(0, from.indexOf('@'))
                }
                else {
                    //if it's group wich the user create
                    let group = props.groups.find(g => g.groupName === from)
                    if (group != null) {
                        return (<span>{`${from}: ${group.members.map((member, index) => {
                            let contact = props.contacts.find(c => c.email === member)
                            if (contact) {
                                if (index > 0) {
                                    return ` ${contact.email}`
                                }
                                else return contact.email
                            }
                            return '';
                        })}`}
                        </span>)
                    }
                    fromDisp = from
                }
            }
        }
        return fromDisp
    }

    const deleteTag = () => {
        let conv = [{ "_id": myConv._id, "tag": null }]
        props.editConversationsServer(conv)
    }

    const getSrc = (f) => {
        if (!f)
            return null
        let x = f.substring(f.indexOf('__') + 2)
        if (!x)
            return null
        x = x.substring(x.indexOf('.') + 1)
        if (!x)
            return null
        switch (x.toLowerCase()) {
            case "png":
                return imgFile
            case "pdf":
                return pdfFile
            case "word":
                return wordFile
            default:
                return null
        }
    }

    //show the "Reply all" button if there are at least 2 emails to reply
    const showReplyAll = () => {
        let email = props.user.email
        let username = props.user.username
        let emailsList = []
        if (myConv && myConv.waves) {
            myConv.waves.forEach(w => {
                //if it's not the user mail or username
                //and it's  not the same of another mails in this conversation
                if (w.from !== email && w.from !== username && !emailsList.find(e => e === w.from)) {
                    emailsList.push(w.from)
                }
                w.to.forEach(t => {
                    if (t !== email && t !== username && !emailsList.find(e => e === t)) {
                        emailsList.push(t)
                    }
                })
            });
        }
        if (emailsList.length > 1) {
            return true
        }
        return false
    }


    const bodyRef = React.createRef();
    const createPdf = (e) => {
        // $(".pdf-body").addClass("pdfPadding")
        $(".header").addClass("paddingPdf")
        $(".subject").addClass("paddingPdf")
        $(".overFlow").addClass("notOverFlow");
        $(".notOverFlow").addClass("paddingPdf")
        $(".notOverFlow").removeClass("overFlow");
        Doc.createPdf(bodyRef.current, props.jwt, returnClass)
        e.stopPropagation()
    }

    const returnClass = (child1, child2, child3) => {
        $(".notOverFlow").removeClass("paddingPdf")
        $(".notOverFlow").addClass("overFlow");
        $(".overFlow").removeClass("notOverFlow");
        $(".header").removeClass("paddingPdf")
        $(".subject").removeClass("paddingPdf")
        bodyRef.current.children[0].appendChild(child1)
        bodyRef.current.children[0].appendChild(child2)
        let ch = bodyRef.current.children[2].children[0].children[bodyRef.current.children[2].children[0].children.length - 1]
        bodyRef.current.children[2].children[0].removeChild(bodyRef.current.children[2].children[0].children[bodyRef.current.children[2].children[0].children.length - 1])
        bodyRef.current.children[2].children[0].appendChild(child3)
        bodyRef.current.children[2].children[0].appendChild(ch)
    }

    const changeWaveDisplay = (waveId) => {
        dispatch(actions.setSelecteConversationWaveId(waveId))
        setShowCurrentWave(waveId);
    }

    const isCloseJsonParser = () => {
        if (props.isCloseJsonParser)
            props.setDisplayRightCard("")
    }


    const openWhatsAppByclick = (e) => {
        if (e.target.className === "imgIcon") {
            const number = e.target.nextSibling.data.trim()
            window.open(
                `https://wa.me/${number}`,
                '_blank'
            );
        }
    }


    const findPhoneNumber = (body) => {
        let indexArr = [];
        let div = document.createElement('div')
        div.innerHTML = body.replaceAll("<", " <").replaceAll(">", "> ");
        let currentWaveBodyText = div.innerText;
        currentWaveBodyText = currentWaveBodyText.replaceAll('\xa0', '  ');
        let arr = currentWaveBodyText && currentWaveBodyText.split(' ');
        if (arr.length)
            arr = arr.filter(word => word.length !== 0 && word.length !== 1)
        if (!arr.length) return
        arr[arr.length - 1] = arr[arr.length - 1].split('\n')[0];
        arr.forEach(element => {
            if (element.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
                let newIndex = 0;
                let index = body.indexOf(element);
                if (indexArr.includes(index)) {
                    index = indexArr[indexArr.length - 1] + 10;
                    newIndex = body.slice(index).indexOf(element);
                }

                let output = body.slice(0, index + newIndex) +
                    `<img alt='' class="imgIcon" src="${whatsApp}" style="height:20px"></img> `
                    + body.slice(index + newIndex);

                body = output;
                indexArr.push(index + 90 + newIndex);
            }
        })
        return body
    }


    return (
        <>
            {myConv &&
                <div className="openConversationDiv">
                    <section className="pdf-container">
                        <section className="pdf-body" ref={bodyRef}>
                            <div className="title">
                                {props.showOpenConversation == false && props.close == false ?
                                    <span onClick={() => { props.setClose(true); props.setSelectedConversation(""); isCloseJsonParser() }}><img alt='' src={return1} /></span>
                                    // <span onClick={() => { props.setClose(true); isCloseJsonParser() }}><img alt='' src={return1} /></span>
                                    : null}
                                <span className="subject">
                                    {myConv.fwd && <span>Fwd: </span>}
                                    {myConv.subject ? myConv.subject : '(no subject)'}
                                </span>
                                {/* <img src={pdf} alt='' className="pdfImage" onClick={() => createPdf()} /> */}
                                {tagsArray &&
                                    tagsArray.map(tag =>
                                    (
                                        <div className="tagInConv"> <span style={{ backgroundColor: tag.color }} className="name">{tag.title}</span >
                                            <Tooltip title="Remove label"><span className="delete" onClick={() => { deleteTag(tag) }}>x</span></Tooltip></div>

                                    ))
                                }
                                {!displaySystemWaves &&
                                    <>
                                        <Tooltip title="delete">
                                            <span className="reply" onClick={deleteClicked}>
                                                <span><img alt='' className="trashIcon" src={garbage}/></span>
                                            </span>
                                        </Tooltip>
                                        <Tooltip title={allText.openConversation.downloadPDF}>
                                            <div className="reply" ><img alt='' src={filePdf} className="pdfImage" onClick={(e) => createPdf(e)} /></div>
                                        </Tooltip>
                                    </>
                                }
                            </div>
                            <hr />
                            <div className="overFlow">
                                {!displaySystemWaves ?
                                    <>
                                        {waves && waves.map((wave, index) =>
                                            <div id={wave._id} key={wave._id}
                                                style={{ height: props.conversation.waves.length === 1 ? '77vh' : '' }}>
                                                {() => {
                                                    let contact = props.contacts.find(c => c.email === wave.from)
                                                    setContact(contact)
                                                }}
                                                {index === props.conversation.waves.length - 1 &&
                                                    <div id='scrollToBotton' />}
                                                <div className="details" onClick={() => changeWaveDisplay(wave._id)}>
                                                    <div className="profileImgDiv">
                                                        <ContactProfile conversation={props.conversation} />
                                                    </div>
                                                    <div className="fromAndTo">
                                                        <span className="from">
                                                            {displayFromTo(wave.from)}
                                                        </span>
                                                        <span className="to">
                                                            {(wave.to && wave.to.length > 0) &&
                                                                <div className="conversationTo"><span>to </span>
                                                                    {wave.to.map((t, ind) => (<>
                                                                        <span>{displayFromTo(t)}</span>
                                                                        {ind !== wave.to.length - 1 && <span>, </span>}
                                                                    </>
                                                                    ))}
                                                                </div>}
                                                        </span>
                                                    </div>
                                                    <div className="date">{conversationService.getTime(wave.timestamp, true)}</div>
                                                    <Tooltip title="Reply">
                                                        <span className="reply" onClick={replyClicked}>
                                                            <span className="replyIcon"><BsFillReplyFill /></span>
                                                        </span>
                                                    </Tooltip>
                                                </div>
                                                {showCurrentWave === wave._id &&
                                                    <>

                                                        <div className="body" ref={waveBodyRef} onClick={(e) => openWhatsAppByclick(e)} dangerouslySetInnerHTML={{ __html: findPhoneNumber(wave.body) }} ></div>
                                                        {(wave.files.length > 1 || wave.files.length === 1) &&
                                                            <div className="filesInOpenConv">
                                                                {wave.files.map((f) => <>
                                                                    {f.name && f.name.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                        <Tooltip title="download">
                                                                            <div className="attachedFile" onClick={(e) => downloadFile(e, f)} >
                                                                                <div className="fileHeaderImg">
                                                                                    <div className="downloadImagIcon" ><FaDownload /></div>
                                                                                    <span className="imgName">{f.url.substring(f.url.indexOf('__') + 2)}</span>
                                                                                    <img alt='' className="imgFile" src={f.url}></img>
                                                                                </div>
                                                                                {/* <a href={f} target="_blank" rel="noopener noreferrer">{f.substring(f.indexOf('__') + 2)}</a> */}
                                                                            </div>
                                                                        </Tooltip>
                                                                        :
                                                                        <Tooltip title="download">
                                                                            <div className="attachedFile" onClick={(e) => downloadFile(e, f)} >
                                                                                <div className="fileHeader"><img alt='' src={getSrc(f.url)}></img><span>{f.url.substring(f.url.indexOf('__') + 2)}</span></div>
                                                                                <div className="downloadFileIcon" ><FaDownload /></div>
                                                                                {/* <a href={f} target="_blank" rel="noopener noreferrer">{f.substring(f.indexOf('__') + 2)}</a> */}
                                                                            </div>
                                                                        </Tooltip>
                                                                    }
                                                                </>
                                                                )}
                                                            </div>}
                                                        <hr />
                                                        <div className="replyOptions">
                                                            <div className="option" onClick={replyClicked}><img alt='' src={replyIcon}></img><span>Reply</span></div>
                                                            {showReplyAll() && <div className="option" onClick={replyAllClicked}><img alt='' src={replyAllIcon}></img><span>Reply All</span></div>}
                                                            <div className="option" onClick={forwardClicked}><img alt='' src={forwardIcon}></img><span>Forward</span></div>
                                                        </div>
                                                        {/* {props.isReplyMessageOpen && <Reply
                                                            updateCurrentWaveToShow={e => setShowCurrentWave(null)}
                                                            replyType={replyType} />} */}
                                                    </>
                                                }

                                                {/* <div className="body" ref={waveBodyRef} dangerouslySetInnerHTML={{ __html: wave.body }} ></div>
                                                <hr></hr>
                                                {(wave.files.length > 1 || wave.files.length === 1) &&
                                                    <div className="filesInOpenConv">
                                                        {wave.files.map((f) => <>
                                                            {console.log(f)}
                                                            {f.name.match(/.(jpg|jpeg|png|gif)$/i) ?
                                                                <div className="attachedFile" onClick={(e) => downloadFile(e, f)} >
                                                                    <div className="fileHeaderImg">
                                                                        <div className="downloadImagIcon" ><FaDownload /></div>
                                                                        <span className="imgName">{f.url.substring(f.url.indexOf('__') + 2)}</span>
                                                                        <img alt='' className="imgFile" src={f.url}></img>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <Tooltip title="download">
                                                                    <div className="attachedFile" onClick={(e) => downloadFile(e, f)} >
                                                                        <div className="fileHeader"><img alt='' src={getSrc(f.url)}></img><span>{f.url.substring(f.url.indexOf('__') + 2)}</span></div>
                                                                        <div className="downloadFileIcon" ><FaDownload /></div>
                                                                    </div>
                                                                </Tooltip>
                                                            }
                                                        </>
                                                        )}
                                                    </div>} */}

                                            </div>
                                        )}
                                        {props.isReplyMessageOpen && <Reply
                                            updateCurrentWaveToShow={e => setShowCurrentWave(null)}
                                            replyType={replyType} />}

                                    </> :
                                    <>
                                        <hr />
                                        <div className="details">
                                            <div className="leftDiv">
                                                <ContactProfile source={myConv.source} />
                                            </div>
                                            <div className="fromAndTo">
                                                <span className="from">{myConv.source}
                                                </span>
                                            </div>
                                            <div className="date">{conversationService.getTime(myConv.timestamp, true)}</div>
                                        </div>

                                        {myConv.sourceIp ?
                                            <pre className="body" dangerouslySetInnerHTML={{ __html: props.webhookFilteredBody && !props.isShowAll ? props.webhookFilteredBody : myConv.body }}></pre>
                                            /* !myConv.sourceIP || props.isShowAll ? myConv.body : props.webhookFilteredBody */
                                            : <div className="body" dangerouslySetInnerHTML={{ __html: myConv.body }}></div>}
                                        {myConv.files &&
                                            <div className="filesInOpenConv">
                                                {myConv.files && myConv.files.map(f => <>{f.url &&
                                                    <div className="attachedFile" >
                                                        <div className="fileHeader"><img alt='' src={getSrc(f.url)}></img><span>{f.substring(f.indexOf('__') + 2)}</span></div>
                                                        <div className="downloadFileIcon" onClick={(e) => downloadFile(e, f)}><FaDownload /></div>
                                                        {/* <a href={f} target="_blank" rel="noopener noreferrer">{f.substring(f.indexOf('__') + 2)}</a> */}
                                                    </div>
                                                }</>
                                                )}
                                            </div>}
                                    </>
                                }
                            </div>
                        </section>
                    </section>

                </div >
            }</>)
}

export default connect(
    (state) => {
        return {
            conversation: state.conversations.selectedConversation,
            allConversations: state.conversations.allConversations,
            user: state.init.user,
            username: state.init.username,
            isReplyMessageOpen: state.conversations.isReplyMessageOpen,
            contacts: state.init.contacts,
            tags: state.tags.tags,
            sourcesArray: state.conversations.sourcesArray,
            conversationsIdsToEdit: state.conversations.conversationsIdsToEdit,
            flagsList: state.conversations.flagsList,
            systemWaves: state.conversations.systemWaves,
            selectedListFlag: state.conversations.selectedListFlag,
            jwt: state.init.jwt,
            changeDisplayConver: state.conversations.changeDisplayConver,
            showOpenConversation: state.displaySettings.showOpenConversation,
            close: state.conversations.close,
            webhookProps: state.webhook.selectedProps,
            isShowAll: state.webhook.isShowAll,
            webhookFilteredBody: state.webhook.filteredBody,
            webhookFlag: state.webhook.webhookFlag,
            secondRender: state.webhook.secondRender,
            groups: state.groups.groups,
            conversationsForSearch: state.conversations.conversationsForSearch,
            isCloseJsonParser: state.webhook.setCloseJsonParser,
        }
    },
    (dispatch) => ({
        setWebhookFlag: (val) => { dispatch(actions.setWebhookFlag(val)) },
        setSecondRender: (val) => { dispatch(actions.setSecondRender(val)) },
        setWebhookSelectedProps: (val) => { dispatch(actions.setWebhookSelectedProps(val)) },
        setShowAll: (val) => { dispatch(actions.setShowAll(val)) },
        setFilteredBody: (val) => { dispatch(actions.setFilteredBody(val)) },
        setIsReplyMessageOpen: (val) => { dispatch(actions.setIsReplyMessageOpen(val)) },
        editConversation: (val) => { dispatch(actions.editConversation(val)) },
        downloadFileServer: (val) => { dispatch(actions.downloadFileServer(val)) },
        deleteConversationsServer: (val) => { dispatch(actions.deleteConversationsServer(val)) },
        deleteConversation: (val) => { dispatch(actions.deleteConversation(val)) },
        setClose: (val) => { dispatch(actions.setClose(val)) },
        getWebhookSelectedProps: (val) => { dispatch(actions.getWebhookSelectedProps(val)) },
        setSelectedConversation: (val) => { dispatch(actions.setSelectedConversation(val)) },
        editConversationsServer: (val) => { dispatch(actions.editConversationsServer(val)) },
        setDisplayRightCard: (val) => { dispatch(actions.setDisplayRightCard(val)) },
        setJsonParserForm: (val) => { dispatch(actions.setJsonParserForm(val)) },
    })


)(OpenConversation)
