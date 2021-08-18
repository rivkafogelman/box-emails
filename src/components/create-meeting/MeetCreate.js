import { connect } from "react-redux"
import React, { useState, useEffect } from 'react'
import trashIcon from '../create-task/assets/greyEmptyTrash.svg'
import { Tooltip, TextField } from '@material-ui/core';
// import { Modal, Button, Form } from 'react-bootstrap'
import userMultiple from '../../assets/user-multiple.svg'
import time from '../../assets/time.svg'
import locationPin from '../../assets/location-pin.svg'
import notification from '../../assets/notification-line.svg'
import ReactQuill from 'react-quill';
import './CreateMeeting.scss'
// import { Form, Button } from 'react-bootstrap'
import { setDisplayRightCard } from '../../redux/actions/conversation.actions'
// import { addMeet } from '../../redux/actions/addMeeting.actions'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// alltext
import allText from '../../allText.json'
import {actions} from '../../redux/actions/action'

import closeIcon from '../../assets/closeCreates.svg'
function CreateTask(props) {

    // const subjectRef = React.createRef()
    const [subjectForm, setSubjectForm] = useState('')
    const [bodyForm, setBodyForm] = useState('')
    const [guestForm, setGuestForm] = useState('')
    let time = new Date().toISOString().split('T')[1].split(':');
    const deleteMeet = () => {
        props.setDisplayRightCard("")
    }

    const saveMeeting = (values) => {
        // const eventSchema = mongoose.Schema({
        //     title: { type: String },
        //     start: { type: Date, require: true, },
        //     end: { type: Date, },
        //     rrule: { type: Object, },
        //     id: { type: mongoose.Schema.Types.ObjectId, },
        //     place: { type: String, },
        //     createdDate: { type: Date },
        //     maxParticipants: { type: Number, },
        //     classNames: { type: String, },
        //     description: { type: String, },
        //     responsibles: [{ type: String, }],
        //     goals: { type: String, },
        //     aims: { type: String, },
        //     contactId: { type: String, },
        //     taskId: { type: String, },
        //     image: {  type: String, },          
        //     registrationURL: { type: String },
        //     allDay: { type: Boolean }
        // })
        let date = new Date().toISOString();
        if (values.timeFrom === '')
            values.timeFrom = '09:00'
        // values.timeFrom = `${time[0]}:${time[1]}`
        if (values.timeTo === '')
            values.timeTo = '09:30'
        // values.timeTo = `${time[0]}:${time[1]}`
        let newMeet = {
            "title": values.subject,
            "start": `${values.meetDate}T${values.timeFrom}:00.602z`,
            "end": `${values.meetDate}T${values.timeTo}:00.602z`,
            "place": values.location,
            "description": values.body,
            "category": "60c1e1828ca612c4a1fe0b54‏"
        }
        props.setDisplayRightCard("")
        props.addMeet(newMeet)
    }

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
        setSubjectForm(props.selectedConversation && props.selectedConversation.subject);
        if (props.selectedConversation && props.selectedConversation.waves) {
            setBodyForm(getWaveBodyText(props.selectedConversation.waves[props.selectedConversation.waves.length - 1].body))
            if (props.userName === props.selectedConversation.waves[0].from)
                setGuestForm(props.selectedConversation.waves[0].to)
            else
                setGuestForm(props.selectedConversation.waves[0].from)
        }

    }, [props.selectedConversation])
    return (
        <>
            <div className="MeetCard">
                <div className="MeetHeader d-flex justify-content-around">
                    <Tooltip title="Close">
                        <img className="closeIcon" src={closeIcon} onClick={deleteMeet} />
                        {/* <img className="trashIcon" src={trashIcon} onClick={deleteMeet}></img> */}
                    </Tooltip>
                    <h5 className="titleCreateMeeting">{allText.createMeet.createNewMeet}</h5>
                    <div></div>
                </div>
                {/* <hr></hr> */}
                <div className="contentCard">

                    <Formik
                        enableReinitialize
                        initialValues={{
                            subject: subjectForm,
                            body: bodyForm,
                            meetDate: new Date().toISOString().split('T')[0],
                            timeTo: ``,
                            timeFrom: ``,
                            location: '',
                            guest: guestForm,
                            reminder: ''

                        }}
                        onSubmit={saveMeeting}
                    // validationSchema={userSchema}
                    >
                        <Form noValidate>
                            <div className="leadContent">
                                <div className="feildInLead">
                                    <label>{allText.createMeet.subject}</label>
                                    <Field name="subject"
                                        type="text"
                                        className="  body" />
                                </div>
                                <div className="feildInLead">
                                    <label>{allText.createMeet.body}</label>
                                    <Field name="body" component="textarea"
                                        className="textareaBody  body"

                                    />
                                </div>

                                <div className="feildInLead">
                                    <label>{allText.createMeet.dueDate}</label>
                                    <Field name="meetDate"
                                        type="date"
                                        className="  body" />
                                </div>
                                <div style={{ paddingTop: "6%" }}></div>
                                <div className="feildInLead socialMedia"  >
                                    <div className="d-flex justify-content-start " >
                                        <img src={time} className=""></img>
                                        <Field name="timeFrom"
                                            type="text"
                                            placeholder={`09:00 am`}
                                            className=" body ml-3"
                                            id="form100" />
                                        <span className="-span">_</span>
                                        <Field name="timeTo"
                                            type="text"
                                            placeholder={`09:30 am`}
                                            className=" body ml-3"
                                            id="form100" />
                                    </div>
                                </div>
                                <div className="feildInLead socialMedia"  >
                                    <div className="d-flex justify-content-start " >
                                        <img src={userMultiple} className=""></img>
                                        <Field name="guest"
                                            type="text"
                                            placeholder="Add Guests"
                                            className=" body ml-3"
                                            id="form100" />
                                    </div>
                                </div>
                                <div className="feildInLead socialMedia"  >
                                    <div className="d-flex justify-content-start " >
                                        <img src={locationPin} className=""></img>
                                        <Field name="location"
                                            type="text"
                                            placeholder="Add Location"
                                            className=" body ml-3"
                                            id="form100" />
                                    </div>
                                </div>
                                <div className="feildInLead socialMedia"  >
                                    <div className="d-flex justify-content-start " >
                                        <img src={notification} className=""></img>
                                        <Field name="reminder"
                                            type="text"
                                            placeholder="10 Minutes Befor"
                                            className=" body ml-3"
                                            id="form100" />
                                    </div>
                                </div>

                            </div>
                            <div className="footerBtn">
                                <input type="submit" className="btn create" value={allText.createMeet.create} />
                            </div>
                        </Form>
                    </Formik>








                    {/* <Form className="MeetContent">
                        <Form.Group className="formGroupBlock " controlId="formBasicSubject">
                            <Form.Label>{allText.subject}</Form.Label>
                            <Form.Control className="formControlSubject"
                                name="subject"
                                type="text"
                                placeholder="Subject"
                                ref={subjectRef}
                            />
                        </Form.Group>
                        <Form.Group className="formGroupBlock" controlId="formBasicBody">
                            <Form.Label>{allText.body}</Form.Label>
                            <Form.Control as="textarea"
                                // type="textarea"
                                name="body"
                                placeholder="body"
                                ref={bodyRef} />
                        </Form.Group>
                        <Form.Group roup className="formGroupBlock" controlId="formBasicDob">
                            <Form.Label>{allText.dueDate}</Form.Label>
                            <Form.Control
                                type="date"
                                name="dob"
                                placeholder="Date of Birth"
                                ref={dateRef}
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group className="d-flex justify-content-start" controlId="formBasicTime">
                            <img src={time} className=""></img>
                            <Form.Control
                                type="text"
                                placeholder="10:30 am"
                                className="FormInputWithIcon"
                                ref={timeFromRef}
                            />
                            <span className="-span">_</span>
                            <Form.Control
                                type="text"
                                placeholder="11:30 am"
                                ref={timeToRef}
                            />
                        </Form.Group>
                        <Form.Group className="d-flex justify-content-start" controlId="formBasicLocation">
                            <img src={locationPin} className=""></img>
                            <Form.Control
                                type="number"
                                name="location"
                                placeholder="Add Location"
                                step="10"
                                min="10"
                                max="100"
                                className="FormInputWithIcon"
                                ref={locationRef} />
                        </Form.Group>
                        <Form.Group className="d-flex justify-content-start" controlId="formBasicGuest">
                            <img src={userMultiple} className=""></img>
                            <Form.Control
                                type="text"
                                name="guest"
                                placeholder="Add Guests"
                                className="FormInputWithIcon"
                                ref={guestRef} />
                        </Form.Group>
                        <Form.Group className="socialMedia" controlId="formBasicReminder">
                            <img src={notification} className=""></img>
                            <Form.Control
                                type="text"
                                name="reminder"
                                placeholder="10 Minutes Befor"
                                className="FormInputWithIcon"
                                ref={notificationRef} />
                        </Form.Group>
                    
                    </Form> */}
                    {/* <div className="footerBtn">
                        <button type="submit" onClick={saveMeeting} className="btn btnCreate" >{allText.create}</button>
                    </div> */}
                </div>
            </div>

        </>)
}

export default connect(
    (state) => {
        return {
            selectedConversation: state.conversations.selectedConversation,
            user: state.init.user,
            userName: state.init.userName
        }
    },
    (dispatch) => ({
        addMeet: (meet) => { dispatch(actions.addMeetServer(meet))},
        setDisplayRightCard: (val) => { dispatch(actions.setDisplayRightCard(val))},
    })

)(CreateTask)
