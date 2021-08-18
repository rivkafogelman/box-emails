import { connect } from "react-redux";
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react'
import './CreateDeal.scss'
import trashIcon from '../create-task/assets/trash.svg'
import { Tooltip } from '@material-ui/core';
// import { addDeal } from '../../redux/actions/addDeal.actions'
// import { setNotification } from "../../redux/actions/notification.actions";
// import { setDisplayRightCard } from '../../redux/actions/conversation.actions'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as Validation from "../creates/validate";
import closeIcon from '../../assets/closeCreates.svg'
import {actions} from '../../redux/actions/action'

// C:\Users\User\Documents\GitHub\LeaderBoxReact-front\src\assets\closeCreates.svg
// all text
import allText from '../../allText.json'

function CreateDeal(props) {
    const dispatch = useDispatch();
    const [subjectForm, setSubjectForm] = useState('');
    const [mailContacts, setMailContacts] = useState('')

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
        let deal;
        let contacts;
        if (props.selectedConversation) {
            if (props.selectedConversation.waves && props.selectedConversation.waves.length) {
                if (props.userName === props.selectedConversation.waves[0].from)
                    contacts = props.selectedConversation.waves[0].to
                else
                    contacts = props.selectedConversation.waves[0].from

            }
            deal = {
                "name": props.selectedConversation.subject,
                "contact": contacts
            }
            // setDeal(deal);
            if (deal.name)
                setSubjectForm(deal.name)
            if (deal.contact)
                setMailContacts(deal.contact)
            // mailContactsRef.current.value = deal.contact

        }
        // setAssignedChecked(false)
        // setAddFilesChecked(false)
        // setDueDateChecked(false)
    }, [props.selectedConversation])

    const deleteDeal = () => {
        props.setDisplayRightCard("")
    }
    const handleChange = (event) => {
        if (event === "")
            alert("hi")
    }
    const createDeal = (values) => {
        let newDeal = {
            "userId": null,
            "nameDeal": values.subject,
            "mailCustomer": values.mailContacts,
            "dealStage": values.dealStage,
            "pipeline": values.pipeline,
            "companyToDeal": values.company,
            "ownerDeal": '',
            "amount": values.amount,
            "dealType": values.dealType,
            "closeDate": `${values.endDate}T00:00:00.602z`,
            "openDate": `${values.openDate}T00:00:00.602z`
        }

        props.setDisplayRightCard("")
        props.addDeal(newDeal)
    }
    return (
        <>
            <div className="dealCard">
                <div className="dealHeader d-flex justify-content-around">
                    <Tooltip title="Close">
                        <img className="closeIcon" src={closeIcon} onClick={deleteDeal} />
                        {/* <img className="trashIcon" src={trashIcon} onClick={deleteDeal}></img> */}
                    </Tooltip>

                    <h5>{allText.createDeal.createNewDeal}</h5>
                    <div></div>
                    {/* <hr className="createsHr"></hr> */}
                </div>
                <div className="contectCard">


                    <Formik
                        enableReinitialize
                        initialValues={{
                            subject: subjectForm,
                            pipeline: '',
                            dealStage: '',
                            amount: '',
                            mailContacts: mailContacts,
                            dealType: '',
                            company: '',
                            endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
                            openDate: new Date().toISOString().split("T")[0]
                        }}
                        onSubmit={createDeal}
                    >
                        <Form noValidate>
                            <div className="dealContent">
                                <div className="feildInLead">
                                    <label>{allText.createDeal.subject}</label>
                                    <Field name="subject"
                                        type="text"
                                        className="body"
                                    // onKeyUp={e => handleChange(e.target.value)} 
                                    />
                                </div>
                                <div className="feildInLead">
                                    <label>{allText.createDeal.Pipeline}</label>
                                    <Field as="select" name="pipeline"
                                        className="body" >
                                        <option>select...</option>
                                        <option>Appointment scheduled </option>
                                        <option>Qualified to buy </option>
                                        <option>Presentation scheduled</option>
                                        <option>Decision maker bought-in </option>
                                        <option>Contract sent </option>
                                        <option>Closed won</option>
                                        <option>Closed lost</option>
                                    </Field>
                                </div>
                                <div className="feildInLead">
                                    <label>{allText.createDeal.DealStage}</label>
                                    <Field as="select" name="dealStage"
                                        className="body"
                                    >
                                        <option>select...</option>
                                        <option>Appointment scheduled </option>
                                        <option>Qualified to buy </option>
                                        <option>Presentation scheduled</option>
                                        <option>Decision maker bought-in </option>
                                        <option>Contract sent </option>
                                        <option>Closed won</option>
                                        <option>Closed lost</option>
                                    </Field>
                                </div>
                                <div className="feildInLead">
                                    <label>{allText.createDeal.Amount}</label>
                                    <Field
                                        type="text"
                                        name="amount"
                                        className="body" />
                                </div>
                                <div className="feildInLead">
                                    <label>{allText.createDeal.Createdeal}</label>
                                    <Field
                                        name="createDeal"
                                        type="text"
                                        className="body" />
                                </div>
                                <div className="feildInLead">
                                    <label>{allText.createDeal.mailContacts}</label>
                                    <Field
                                        name="mailContacts"
                                        type="text"
                                        className="body" />
                                </div>
                                <div className="feildInLead">
                                    <label>{allText.createDeal.dealType}</label>
                                    <Field as="select" name="dealType"
                                        className="body" >
                                        <option selected>select...</option>
                                        <option>new business</option>
                                        <option>exiting business</option>
                                    </Field>
                                </div>
                                <div className="feildInLead">
                                    <label>{allText.createDeal.company}</label>
                                    <Field name="company"
                                        type="text"
                                        className="body" />
                                </div>
                                <div className="feildInLead">
                                    <label>{allText.createDeal.openDate}</label>
                                    {/* <Field
                                    name="openDate"
                                    format={"d.m.Y"}
                                    mode={"single"}
                                    // validate={Validation.someDate}
                                    component={FlatpickrField}
                                    className="body"
                                /> */}
                                    <Field name="openDate"
                                        type="date"
                                        className="body" />
                                </div>
                                <div className="feildInLead">
                                    <label>{allText.createDeal.endDate}</label>
                                    <Field name="endDate"
                                        type="date"
                                        className="body" />
                                </div>
                            </div>
                            <div className="footerBtn">
                                <input type="submit" className="btn create" value={allText.createDeal.create} />
                            </div>
                        </Form>
                    </Formik>


                </div>

                {/* <div className="dealContent">
                    <label>{allText.nameDeal}</label><br></br>
                    <input type="text" className="subject" ref={nameRef} />
                    <br></br>
                    <label>{allText.pipeline}</label><br></br>
                    <select class="custom-select body" ref={pipelineRef}>
                        <option>select...</option>
                        <option>sales pipeline</option>
                        <option>usd pipeline</option>
                        <option>eur pipeline</option>
                    </select>
                    <br></br>
                    <label>{allText.dealStage}</label><br></br>
                    <select class="custom-select body" ref={dealStageRef}>
                        <option>select...</option>
                        <option>Appointment scheduled </option>
                        <option>Qualified to buy </option>
                        <option>Presentation scheduled</option>
                        <option>Decision maker bought-in </option>
                        <option>Contract sent </option>
                        <option>Closed won</option>
                        <option>Closed lost</option>
                    </select>
                    <br></br>
                    <label>{allText.amount}</label><br></br>
                    <input type="text" className="body" ref={amountRef} />
                    <br></br>
                    <label>{allText.createDeal}</label><br></br>
                    <input type="text" className="body" ref={createDealRef} />
                    <br></br>
                    <label>{allText.mailContacts}</label><br></br>
                    <input type="text" className="body" ref={mailContactsRef} />
                    <br></br>
                    <label>{allText.dealType}</label><br></br>
                    <select class="custom-select body" ref={dealTypeRef}>
                        <option selected>select...</option>
                        <option>new business</option>
                        <option>exiting business</option>
                    </select>
                    <br></br>
                    <label>{allText.company}</label><br></br>
                    <input type="text" className="body" ref={companyRef} />
                    <br></br>
                    <label>{allText.endDate}</label><br></br>
                    <input className="body" type="date" ref={endDateRef} /><br></br>
                    <label>{allText.openDate}</label><br></br>
                    <input className="body" type="date" ref={openDateRef} />
                    <hr></hr>
                </div> */}
                {/* <div className="footerBtn"><input type="button" className="btn create" value={allText.create} onClick={createDeal} /></div> */}
            </div>
        </>
    )
}

export default connect(
    (state) => {
        return {
            selectedConversation: state.conversations.selectedConversation,
            userName: state.init.userName
        }
    },
    
    (dispatch) => ({
        addDeal: (deal) => { dispatch(actions.addDeal(deal))},
        setDisplayRightCard: (val) => { dispatch(actions.setDisplayRightCard(val))},
    })

)(CreateDeal)