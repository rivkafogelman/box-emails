import { connect, useSelector } from "react-redux"
import React, { useEffect, useState } from 'react'
import './CreateLead.scss'
import trashIcon from '../create-task/assets/trash.svg'
import { Tooltip, TextField } from '@material-ui/core';
import { addLeadServer } from '../../redux/actions/lead.actions'
import { setDisplayRightCard } from '../../redux/actions/conversation.actions'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createAutoLead } from "./CreateDinamicLead";
import extractTime from 'extract-time';
//assets
import facebook from './assets/facebook.svg'
import instagram from './assets/instagram.svg'
import twitter from './assets/twitter.svg'
import youtube from './assets/Youtube.svg'
import whatsapp from './assets/whatsapp.svg'
import linkedin from './assets/linkedin.svg'
import extractUrls from 'extract-urls'
import closeIcon from '../../assets/closeCreates.svg'

// allText
import allText from '../../allText.json'

const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const userSchema = Yup.object().shape({
    email: Yup.string().required('This field is required').email('must contains @'),
    fullName: Yup.string().required('This field is required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
})

function CreateLead(props) {

    const selectedConversation = useSelector(state => state.conversations.selectedConversation);
    const selectedConversationWaveId = useSelector(state => state.conversations.selectedConversationWaveId);
    const [dinamicLead, setDinamicLead] = useState(null);

    useEffect(() => {
        // alert(selectedConversationWaveId)
        if (!selectedConversationWaveId || !selectedConversation) { return }
        let currentWaveBody = selectedConversation && selectedConversation.waves.find(wave => wave._id === selectedConversationWaveId).body;
        let div = document.createElement('div')
        div.innerHTML = currentWaveBody;
        let currentWaveBodyText = div.innerText;
        let innerHTML = document.body.innerHTML;
        // use innerHTML without createLead content;
        innerHTML = innerHTML.split(allText.CreateLead.createNewLead)
        // extract urls from innerHTML
        let urls = extractUrls(currentWaveBody);
        let newLead = createAutoLead(currentWaveBodyText, urls);
        setDinamicLead(newLead)
    }, [selectedConversationWaveId])

    const deleteLead = () => {
        props.setDisplayRightCard("")
    }
    const onSubmit = (values) => {
        const newLead = {
            "contact": {
                "name": values.fullName,
                "email": values.email,
                // "firstName": values.firstName,
                // "lastName": values.lastName,
                // "nickName": values.nickName,
                "companyAddress": values.countryAddress,
                "phone": values.phone,
                "fasebook": values.facebook,
                "twitter": values.twitter,
                "whatsapp": values.whatsapp,
                "website": values.website,
                "instagram": values.instagram,
                "youtube": values.youtube,
                "linkedim": values.linkedin
            },
            "withConversation": false,
            "source": {  "type": "box" }
        }
        props.setDisplayRightCard("")
        props.addLeadServer(newLead);
    }
    return (
        <>
            <div className="leadCard">

                <div className="leadHeader d-flex justify-content-around">
                    <Tooltip title="Close">
                        <img className="closeIcon" src={closeIcon} onClick={deleteLead} />
                        {/* <img className="trashIcon" src={trashIcon} onClick={deleteLead}></img> */}
                    </Tooltip>
                    <h5>{allText.CreateLead.createNewLead}</h5>
                    <div></div>
                </div>
                {/* <hr></hr> */}
                <div className="contectCard">

                    <Formik
                        enableReinitialize
                        initialValues={{
                            email: dinamicLead ? dinamicLead.email : '',
                            //  secondEmail: '', firstName: '', lastName: '', 
                            fullName: dinamicLead ? dinamicLead.lastName : '',
                            //   nickName: '',birthday: new Date().toISOString().split('T')[0],
                            phone: dinamicLead ? dinamicLead.phone : '',
                            //   homePhone: '', jobPhone: '', timeToCall: '',
                            address: '', zipCode: '', countryAddress: '',
                            facebook: dinamicLead ? dinamicLead.facebook : '', twitter: dinamicLead ? dinamicLead.twitter : '', instagram: dinamicLead ? dinamicLead.instagram : '',
                            whatsapp: dinamicLead ? dinamicLead.whatsapp : '', linkedin: dinamicLead ? dinamicLead.linkedin : '', youtube: dinamicLead ? dinamicLead.youtube : '', website: dinamicLead ? dinamicLead.website : ''

                        }}
                        onSubmit={onSubmit}
                        validationSchema={userSchema}
                    >
                        <Form noValidate>
                            <div className="leadContent">
                                <div className="feildInLead">
                                    <label>{allText.CreateLead.email}</label>
                                    <Field name="email"
                                        type="email"
                                        className=" body" />
                                    <ErrorMessage name="email"
                                        component="div"
                                        className="erroeForm" />
                                </div>
                                {/* <div className="feildInLead">
                                <label>{allText.secondEmail}</label>
                                <Field name="secondEmail"
                                    type="email"
                                    className="  body" />
                            </div>
                            <div className="feildInLead">
                                <label>{allText.firstName}</label>
                                <Field name="firstName"
                                    type="text"
                                    className=" body"
                                    id="form100" />
                            </div>
                            <div className="feildInLead">
                                <label>{allText.lastName}</label><br />
                                <Field name="lastName"
                                    type="text"
                                    className=" body"
                                    id="form100" />
                            </div> */}
                                <div className="feildInLead">
                                    <label>{allText.CreateLead.fullName}</label><br />
                                    <Field name="fullName"
                                        type="text"
                                        className=" body"
                                        id="form100" />
                                    <ErrorMessage name="fullName"
                                        component="div"
                                        className="erroeForm" />
                                </div>
                                {/* <div className="feildInLead">
                                <label>{allText.nickName}</label><bt />
                                <Field name="nickName"
                                    type="text"
                                    className=" body"
                                    id="form100" />
                            </div>
                            <div className="feildInLead">
                                <label>{allText.birthday}</label><br />
                                <Field name="birthday"
                                    type="date"
                                    className=" body"
                                    id="form100" />
                            </div> */}
                                <div className="feildInLead">
                                    <label>{allText.CreateLead.phoneNumber}</label><br />
                                    <Field name="phone"
                                        type="text"
                                        className=" body"
                                        id="form100" />
                                    <ErrorMessage name="phone"
                                        component="div"
                                        className="erroeForm" />
                                </div>
                                {/* <div className="feildInLead">
                                <label>{allText.homePhone}</label><br />
                                <Field name="homePhone"
                                    type="text"
                                    className=" body"
                                    id="form100" />
                            </div>
                            <div className="feildInLead">
                                <label>{allText.jobPhone}</label><br />
                                <Field name="jobPhone"
                                    type="text"
                                    className=" body"
                                    id="form100" />
                            </div> */}
                                <div className="feildInLead">
                                    <label>{allText.CreateLead.bestTimeToCall}</label><br />
                                    <Field name="timeToCall"
                                        type="text"
                                        className=" body"
                                        id="form100" />
                                </div>
                                <div className="feildInLead">
                                    <label>{allText.CreateLead.address}</label>
                                    <Field name="address"
                                        type="text"
                                        className=" body"
                                        id="form100" />
                                </div>
                                <div className="feildInLead">
                                    <label>{allText.CreateLead.zipcode}</label>
                                    <Field name="zipCode"
                                        type="text"
                                        className=" body"
                                        id="form100" />
                                </div>
                                <div className="feildInLead">
                                    <label>{allText.CreateLead.countryAddress}</label>
                                    <Field name="countryAddress"
                                        type="text"
                                        className=" body"
                                        id="form100" />
                                </div>
                                <p>Social Media</p>
                                <div className="feildInLead socialMedia"  >
                                    <div className="d-flex justify-content-start">
                                        <img src={facebook} className=""></img>
                                        <Field name="facebook"
                                            type="text"
                                            className=" body ml-3"
                                            id="form100" />
                                    </div>
                                </div>
                                <div className="feildInLead socialMedia"  >
                                    <div className="d-flex justify-content-start" >
                                        <img src={twitter} className=""></img>
                                        <Field name="twitter"
                                            type="text"
                                            className=" body ml-3"
                                            id="form100" />
                                    </div>
                                </div>
                                <div className="feildInLead socialMedia"  >
                                    <div className="d-flex justify-content-start" >
                                        <img src={linkedin} className=""></img>
                                        <Field name="linkedin"
                                            type="text"
                                            className=" body ml-3"
                                            id="form100" />
                                    </div>
                                </div>
                                <div className="feildInLead socialMedia">
                                    <div className="d-flex justify-content-start" >
                                        <img src={youtube} className=""></img>
                                        <Field name="youtube"
                                            type="text"
                                            className=" body ml-3"
                                            id="form100" />
                                    </div>
                                </div>
                                <div className="feildInLead socialMedia"  >
                                    <div className="d-flex justify-content-start " >
                                        <img src={whatsapp} className=""></img>
                                        <Field name="whatsapp"
                                            type="text"
                                            className=" body ml-3"
                                            id="form100" />
                                    </div>
                                </div>
                                <div className="feildInLead socialMedia"  >
                                    <div className="d-flex justify-content-start " >
                                        <img src={instagram} className=""></img>
                                        <Field name="instagram"
                                            type="text"
                                            className=" body ml-3"
                                            id="form100" />
                                    </div>
                                </div>
                                <div className="feildInLead socialMedia"  >
                                    <div className="d-flex justify-content-start" >
                                        <img src={instagram} className=""></img>
                                        <Field name="website"
                                            type="text"
                                            className=" body ml-3"
                                            id="form100" />
                                    </div>
                                </div>
                            </div>
                            <div className="footerBtn">
                                <input type="submit" className="btn create" value={allText.CreateLead.create} />
                            </div>
                        </Form>
                    </Formik>
                </div>

            </div>
        </>
    )
}

export default connect(
    (state) => {
        return {
            userName: state.init.userName
        }
    },
    {
        addLeadServer,
        setDisplayRightCard,
    }

)(CreateLead)