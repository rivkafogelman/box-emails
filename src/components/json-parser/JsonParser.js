import { connect } from "react-redux";
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect, useOuterClick } from 'react'
import './JsonParser.scss'
import trashIcon from '../create-task/assets/trash.svg'
import closeIcon from './asset/closeIcon.svg'
import vIcon from '../create-task/assets/v.svg'
import imgFile from '../../assets/imageFile.svg'
import pdfFile from '../../assets/pdfFile.svg'
import wordFile from '../../assets/wordFile.svg'
import { isNull, last } from "lodash"
import { Tooltip, TextField } from '@material-ui/core';
import { addDeal } from '../../redux/actions/addDeal.actions'
import { setNotification } from "../../redux/actions/notification.actions";
import { setDisplayRightCard, setClose, setSelectedConversation, setIsMessageOpen } from '../../redux/actions/conversation.actions'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import allText from '../../allText.json';
import { Key } from "react-bootstrap-icons";
import { setWebhookSelectedPropsDb, setJsonParserForm, setShowAll, setWebhookFlag, setSecondRender } from '../../redux/actions/webhook.actions';
import { number } from "yup";
import { Link } from 'react-router-dom';
import { blue } from "@material-ui/core/colors";
// import { Collapse } from 'react-collapse'
import { object } from "yup/lib/locale";
import {actions} from '../../redux/actions/action'


function JsonParser(props) {
    const { conversation } = props;
    const [arrSelections, setArrSelections] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState(null);
    const [conversationBody, setConversationBody] = useState()
    const [isClick, setIsClick] = useState(true)
    const [bodyClassName, setBodyClassName] = useState("")
    const [conversationB, setConversationB] = useState()
    let nameBodyClass = "";

    useEffect(() => {
        if (props.webhookFilteredBody && !props.isShowAll)
            setConversationBody(JSON.parse(props.webhookFilteredBody))
        else {
            setConversationBody(JSON.parse(conversation.body))
        }
        if (props.close && !props.showOpenConversation) {
            props.setDisplayRightCard("")
        }
        props.setJsonParserForm(true)

    }, [conversation, props.close, props.webhookFilteredBody, props.isShowAll])


    useEffect(() => { }, [props.webhookFlag, props.secondRender])

    useEffect(() => {

        if (conversationBody) {
            const convObject = JSON.stringify({ ...conversationBody }, (k, v) => {
                switch (v) {
                    case null:
                        return "null"
                    case false:
                        return "false"
                    case "":
                        return ""
                    default:
                        return v
                }
            })

            convObject.match(/[\u0590-\u05fe]/) ? setBodyClassName("bodyContentRight") : setBodyClassName("bodyContentLeft")
            setConversationB(JSON.parse(convObject))
        }
    }, [conversationBody])


    const findeParent = (parentField, arrField) => {
        // console.log(parentField.parentElement.children[1].trim())
        arrField.push(parentField.children[1].outerText.trim())
        parentField = parentField.parentElement.parentElement;
        if (parentField && parentField.children[1].tagName != "PRE") {
            findeParent(parentField, arrField)
        }
        return arrField
    }

    const onMouseUp = (event, click = true) => {

        if (event.nativeEvent.srcElement.localName !== "em")
            return
        event = event.target
        console.log(event)
        const selectedField = event.outerText.trim();
        const parentField = event.parentElement.parentElement.parentElement;
        const arrField = [selectedField]
        if (parentField && parentField.firstChild.data != "" && parentField.children[1].tagName != "PRE")
            findeParent(parentField, arrField)
        const element = document.getElementById(event.attributes.id.value)
        const reverseArr = arrField.reverse()
        if (!click) {
            return reverseArr
        }

        else {
            if (element.style.backgroundColor === 'yellow') {
                element.style.backgroundColor = ''
                const arrFilter = arrSelections.filter(a => JSON.stringify([...a]) !== JSON.stringify(reverseArr))
                setArrSelections(arrFilter)
            }
            else {
                console.log(reverseArr)
                setArrSelections(arr => [...arr, reverseArr])
                element.style.backgroundColor = 'yellow'


            }
        }
    };

    const onMouseMove = (event) => {
        if (event.nativeEvent.srcElement.localName !== "em" || arrSelections.find(a => JSON.stringify([...a]) === JSON.stringify(onMouseUp(event, false))))
            return
        const element = document.getElementById(event.target.attributes.id.value)
        console.log(document.getElementById(event.target.attributes.id.value))
        element.style.backgroundColor = "#FFFF66"

    }

    const onMouseOut = (event) => {
       
        if (event.nativeEvent.srcElement.localName !== "em" || arrSelections.find(a => JSON.stringify([...a]) === JSON.stringify(onMouseUp(event, false))))
            return
        const element = document.getElementById(event.target.attributes.id.value)
        element.style.backgroundColor = ""

    }
    const openOrCloseIcon = (event) => {
        console.log(event.target.ariaExpanded)
        if (event.target.ariaExpanded === "true"||event.target.ariaExpanded === null)
            event.target.innerText = "+"
        else event.target.innerText = "-"
    }

    const objectToDiv = (convObject, space, space2) => {

        return Object.keys(convObject).map((key, index) => {

            if (typeof convObject[key] === 'object')
                return <div index={index}>
                    {space2}
                    <div id={Math.random() + index + key} className="collapse" data-toggle="collapse" data-target={`#${index + key}`} style={{ display: "inline" }}onClick={(e) => openOrCloseIcon(e)} >
                        {"-"}
                        </div>
                        {" "}
                    <em id={Math.random()}>{key}</em>
                    <div id={`${index + key}`} class="collapse show">
                        {objectToDiv(convObject[key], space + "  ", space2 + "  ")}
                    </div>
                </div>
            else {
                if (convObject[key].toString().split(":", 1)[0] === "https") {
                    return <div index={index + key}>
                        <div></div>
                        {space}
                        <em id={Math.random()} style={{ backgroundColor: backgroundColor }} >{key}</em>
                        {':'}
                        <a href="#" target="_blank" style={{ textDecoration: "underline" }}>{convObject[key]}</a>
                    </div>
                }
                else {
                    return <div index={index + key}>
                        <div></div>
                        {space}
                        <em id={Math.random()} style={{ backgroundColor: backgroundColor }} >{key}</em>
                        {':'}
                        {convObject[key]}
                    </div>

                }
            }
        })
    }

    const saveJsonSelected = () => {
        props.setWebhookSelectedPropsDb(arrSelections)
        props.setWebhookFlag(false)
        props.setSecondRender(false)
        props.setDisplayRightCard("")
        document.getElementById("customSwitch1").click()
        props.setShowAll(false);
    }

    const deleteJsonParser = () => {
        props.setDisplayRightCard("")
    }

    const handleShowAll = () => {
        props.setShowAll(!props.isShowAll);
    }

    return (
        <>
            {conversationB ?
                <div className="JsonPArserCard" >
                    <div className="JsonPArserHeader">
                        <Tooltip title="Trash">
                            <img className="closeIcon" src={closeIcon} onClick={deleteJsonParser}></img>
                        </Tooltip>
                        <h5>{allText.webhook.webhook}</h5>
                    </div>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            subject: conversation.subject,
                            requestIp: conversation.sourceIp,
                            body: ''
                        }}
                        onSubmit
                    >
                        <Form noValidate>
                            <div className="jParserContent">

                                <div className="feildInJp">
                                    <div className="custom-control custom-switch showall">
                                        <input type="checkbox" className="custom-control-input" id="customSwitch1" onClick={handleShowAll}></input>
                                        <label class="custom-control-label" for="customSwitch1">{allText.jsonParser.showAll} </label>
                                    </div>
                                    <label>{allText.jsonParser.subjectName}</label>
                                    <Field name="subject"
                                        type="text"
                                        className="subject" />
                                    <label>{allText.jsonParser.requestIp}</label>
                                    <Field name="requestIp"
                                        type="text"
                                        className="requestIp" />
                                </div>

                                <pre className={bodyClassName}

                                    onMouseUp={(e) => { onMouseUp(e) }}
                                    onMouseOver={(e) => onMouseMove(e)}
                                    onMouseOut={(e) => onMouseOut(e)}>

                                    {
                                        Object.keys(conversationB).map((key, index) =>
                                            typeof conversationB[key] === 'object' ?
                                                <div index={index}>
                                                    <div data-toggle="collapse" data-target={`#${index + key}`}  style={{ display: "inline" }} onClick={(e) => openOrCloseIcon(e)}>{"-"}</div>
                                                    <em id={Math.random()} >{" " + key}</em>
                                                    <div id={`${index + key}`} class="collapse show">
                                                        {objectToDiv(conversationB[key], "   ", " ")}
                                                    </div>

                                                </div> :
                                                conversationB[key].split(":", 1)[0] === "https" ?
                                                    <div index={index}>
                                                        <div style={{ display: "inline" }} onClick={() => setIsClick(!isClick)}></div>
                                                        <em id={Math.random()} style={{ backgroundColor: backgroundColor }} >{'       ' + key}</em>
                                                        {':'}
                                                        <a href="#" target="_blank" >{conversationB[key]}</a>
                                                    </div> :
                                                    <div className="collapseJP" index={index} >
                                                        <div></div>
                                                        <em id={Math.random()} style={{ backgroundColor: backgroundColor }} >{'       ' + key}</em>
                                                        {':' + conversationB[key]}
                                                    </div>
                                        )}
                                    {/* {'}'} */}
                                </pre>
                            </div>
                            <div className="footerBtn">
                                <input type="submit" className="btn save" value={allText.jsonParser.save} onClick={saveJsonSelected} />
                            </div>
                        </Form>
                    </Formik>
                </div>
                : ""}
        </>

    )
}
export default connect(
    (state) => {
        return {
            conversation: state.conversations.selectedConversation,
            webhookSelectedProps: state.webhook.selectedProps,
            close: state.conversations.close,
            showOpenConversation: state.displaySettings.showOpenConversation,
            webhookSelectedProps: state.webhook.selectedProps,
            isShowAll: state.webhook.isShowAll,
            isReplyMessageOpen: state.conversations.isReplyMessageOpen,
            webhookFilteredBody: state.webhook.filteredBody,
            secondRender: state.webhook.secondRender,
            webhookFlag: state.webhook.webhookFlag
        }
    },
    (dispatch) => ({
        setWebhookSelectedPropsDb: (val) => { dispatch(actions.setWebhookSelectedPropsDb(val))}, 
        setDisplayRightCard: (val) => { dispatch(actions.setDisplayRightCard(val))}, 
        setJsonParserForm: (val) => { dispatch(actions.setJsonParserForm(val))}, 
        setShowAll: (val) => { dispatch(actions.setShowAll(val))}, 
        setSelectedConversation: (val) => { dispatch(actions.setSelectedConversation(val))}, 
        setWebhookFlag: (val) => { dispatch(actions.setWebhookFlag(val))}, 
        setSecondRender: (val) => { dispatch(actions.setSecondRender(val))},
    })
)(JsonParser)
