import { connect } from "react-redux"
import React, { useState, useEffect } from 'react'
import './CreateTask.scss'
import trashIcon from './assets/greyEmptyTrash.svg'
import vIcon from './assets/smallWhiteV.svg'
import imgFile from '../../assets/imageFile.svg'
import pdfFile from '../../assets/pdfFile.svg'
import wordFile from '../../assets/wordFile.svg'
// import { addTask } from '../../redux/actions/addTask.actions.js'
import { last } from "lodash"
import { Tooltip } from '@material-ui/core';
import { setDisplayRightCard } from '../../redux/actions/conversation.actions'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// all text
import allText from '../../allText.json'
import { isElementOfType } from "react-dom/cjs/react-dom-test-utils.development"
import closeIcon from '../../assets/closeCreates.svg'
import {actions} from '../../redux/actions/action'


function CreateTask(props) {
    const [subjectForm, setSubjectForm] = useState('')
    const [bodyForm, setBodyForm] = useState('')
    const [assignedChecked, setAssignedChecked] = useState(false)
    const [addFilesChecked, setAddFilesChecked] = useState(false)
    const [dueDateChecked, setDueDateChecked] = useState(false)
    const [task, setTask] = useState(null)
    const [files, setFiles] = useState([])


    const getWaveBodyText = (waveBody) => {
        let textString = ""
        let text = waveBody.split('<');
        for (let i = 0; i < text.length - 1; i++) {
            text[i] = text[i].substring(text[i].indexOf('>') + 1)
            if (i > 0) {
                textString += " " + text[i]
            }
        }
        return textString
    }

    useEffect(() => {
        if (props.selectedConversation) {

            let task
            if (props.selectedConversation.waves && props.selectedConversation.waves.length) {
                task = {
                    "subject": props.selectedConversation.subject,
                    "body": getWaveBodyText(props.selectedConversation.waves[props.selectedConversation.waves.length - 1].body),
                    "files": props.selectedConversation.waves[props.selectedConversation.waves.length - 1].files
                }
            }
            else {
                task = {
                    "subject": props.selectedConversation.subject,
                    //for message without waves- the message body, and for message with waves -the last wave content
                    "body": props.selectedConversation.body,
                }
            }
            setTask(task)
            if (task.subject)
                setSubjectForm(task.subject)
            // subjectRef.current.value = task.subject

            if (task.body)
                setBodyForm(task.body)
            // bodyRef.current.value = getWaveBodyText(task.body)


        }
        setAssignedChecked(false)
        setAddFilesChecked(false)
        setDueDateChecked(false)
    }, [props.selectedConversation])

    const deleteTask = () => {
        props.setDisplayRightCard("")
    }

    const clickCreateTask = (values) => {

        // task = { name: inputValue, description: "", status: status, startDate: today, dueDate: today, "card": props.card._id }

        let newTask = {
            "name": values.subject,
            "description": values.body,
            "dueDate": values.dueDate,
            "card": ''
            // "assignTo": values.assignTo,
            // "files": files,
        }

        if (values.assignTo != "") {
            //to change it!!!
            newTask.assignTo = props.user._id
        }
        props.setDisplayRightCard("")
        props.addTask(newTask)
    }

    const getSrc = (f) => {
        let x = f.substring(f.indexOf('__') + 2)
        x = x.substring(x.indexOf('.') + 1)
        switch (x.toLowerCase()) {
            case "png":
                return imgFile
            case "pdf":
                return pdfFile
            case "word":
                return wordFile
            default:
                break;
        }
    }
    const checkFileClicked = (e) => {

        if (e.target.checked) {
            setFiles(last => [...last, e.target.value])
        }
        else {
            setFiles(files.filter((f) => (f != e.target.value)))

        }
    }
    const getDateTime = () => {
        let tempDate = new Date();
        let date = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
        return date
    }

    return (
        <>
            <div className="taskCard">
                <div className="taskHeader d-flex justify-content-around">
                    <Tooltip title="Close">
                        <img className="closeIcon" src={closeIcon} onClick={deleteTask}/>
                        {/* <img className="trashIcon" src={trashIcon} onClick={deleteTask}></img> */}
                    </Tooltip>
                    <h5>{allText.createTask.createNewTask}</h5>
                    <div></div>
                </div>
                <div className="contentCard">


                    <Formik
                        enableReinitialize
                        initialValues={{
                            subject: subjectForm,
                            body: bodyForm
                        }}
                        onSubmit={clickCreateTask}
                    // dueDate: new Date().toISOString().split('T')[0],
                    // assignTo: ''
                    // validationSchema={userSchema}
                    >
                        <Form noValidate>
                            <div className="taskContent">
                                <div className="feildInLead">
                                    <label>{allText.createTask.subject}</label>
                                    <Field name="subject"
                                        type="text"
                                        className="body" />
                                </div>
                                <div className="feildInLead">
                                    <label>{allText.createTask.body}</label>
                                    <Field name="body"
                                        as="textarea"
                                        className="textareaBody body" />
                                </div>
                                <div className="optionLine feildInLead">
                                    <div className="d-flex justify-content-start " >
                                        <div className={`checkOption ${assignedChecked ? `checkedOption` : ``}`}
                                            onClick={() => { setAssignedChecked(!assignedChecked) }}>
                                            <img src={vIcon} className=""></img>
                                        </div>
                                        <label>{allText.createTask.assignTo}</label>
                                    </div>
                                    {assignedChecked &&
                                        <Field name="assignTo"
                                            type="email"
                                            placeholder={allText.createTask.assignTo}
                                            className="ml-4 body mt-2"
                                            id="form100"
                                        />
                                    }

                                </div>
                                <div className="optionLine feildInLead">
                                    <div className="d-flex justify-content-start " >
                                        <div className={`checkOption ${dueDateChecked ? `checkedOption` : ``}`}
                                            onClick={() => { setDueDateChecked(!dueDateChecked) }}>
                                            <img src={vIcon} className=""></img>
                                        </div>
                                        <label>{allText.createTask.dueDate}</label>
                                    </div>
                                    {dueDateChecked &&
                                        <Field name="dueDate"
                                            type="date"
                                            className="ml-4 body mt-2 pr-3"
                                            id="form100" />}
                                </div>
                                {/* {task && task.files && task.files.length > 0 &&
                                <div className="optionLine feildInLead">
                                    <div className="d-flex justify-content-start " >
                                        <div className={`checkOption ${addFilesChecked ? `checkedOption` : ``}`}
                                            onClick={() => { setAddFilesChecked(!addFilesChecked) }}>
                                            <img src={vIcon} className=""></img>
                                        </div>
                                        <label>{allText.insertFilesIntoTasks}</label>
                                    </div>
                                    {addFilesChecked && <div>
                                        {task.files.map(url =>
                                            <div className="file"><input type="checkbox" value={url} onClick={checkFileClicked}></input><img className="fileImg" src={getSrc(url)}></img><span>{url.substring(url.indexOf('__') + 2)}</span></div>
                                        )}
                                    </div>}
                                </div>} */}
                            </div>
                            <div className="footerBtn">
                                <input type="submit" className="btn create" value={allText.createTask.create} />
                            </div>
                            {/* <div className="footerBtn"><input type="button" className="btn create" value={allText.create} /></div> */}

                        </Form>
                    </Formik>
                </div>
            </div>

        </>)
}

export default connect(
    (state) => {
        return {
            selectedConversation: state.conversations.selectedConversation,
            user: state.init.user,
            displayRightCard: state.conversations.displayRightCard


        }
    },
    (dispatch) => ({
        addTask: (task) => { dispatch(actions.addTaskServer(task))},
        setDisplayRightCard: (val) => { dispatch(actions.setDisplayRightCard(val))},
    })
)(CreateTask)