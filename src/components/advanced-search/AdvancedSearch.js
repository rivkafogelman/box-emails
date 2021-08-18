import { connect } from "react-redux"
import React, { useEffect, useState } from 'react'
import './AdvancedSearch.scss'
import trashIcon from '../create-task/assets/greyEmptyTrash.svg'
import { Select, Tag } from 'antd'
import { DatePicker, Space } from 'antd';
import { Tooltip } from '@material-ui/core';
// import { setDisplayRightCard, setConversationsForSearch, setSelectedListFlag, setSourceFilter } from '../../redux/actions/conversation.actions'
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
// all text
import allText from '../../allText.json'
import { data, event } from "jquery"
import Leader from '../Leader/sources'
import '../Leader/Sources.scss'
import ItemsCarousel from 'react-items-carousel';
import closeIcon from '../../assets/closeCreates.svg'
import Recipients from '../recipients/Recipients'
import ContactList from "./ContactList"
import { actions } from '../../redux/actions/action'
import { auto } from "@popperjs/core"

const { Option } = Select;


// import ContactForSearch from "../contact-for-search/contactForSearch"

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

function AdvancedSearch(props) {

    const [category, setCategory] = useState(props.selectedListFlag);
    const [label, setLabel] = useState("Label")
    const [searchDateFrom, setSearchDateFrom] = useState("");
    const [searchDateTo, setSearchDateTo] = useState("");
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [actionsForm, setActionsForm] = useState('')
    const [recipientsTo, setRecipientsTo] = useState([])
    const [recipientsFrom, setRecipientsFrom] = useState([])
    const [key, setKey] = useState(false)
    const [isNotification, setIsNotification] = useState(false)
    useEffect(() => {
        console.log(recipientsFrom);
        console.log(recipientsTo);
    }, [recipientsFrom, recipientsTo])
    // const [formObj, setFormObj] = useState({
    //     form: '',
    //     to: '',
    //     subject: '',
    //     words: ''
    // })
    // const [form, setFrom] = useState('hhh')
    // const [to, setTo] = useState('')
    // const [subject, setSubject] = useState('')
    // const [words, setWords] = useState('')

    const { Option } = Select;
    let lenSource = 0;

    useEffect(() => {
        lenSource = props.sources.length / 5;
        if (lenSource % 1 !== 0)
            lenSource = lenSource - lenSource % 1 + 1;
    }, [props.sources])

    useEffect(() => {
        setCategory(props.selectedListFlag)
        setRecipientsTo([])
        setRecipientsFrom([])
        setLabel("Label")
        setKey(!key)
        // setSearchDateFrom("")
        // handleChangeDateTo("")
        // setSearchDateTo("")

        if (props.conversationsForSearch.length > 0)
            props.setConversationsForSearch('empty')

        if (actionsForm != '')
            actionsForm.resetForm({ values: { content: '' } });
    }, [props.selectedListFlag])

    const handleChangeCategory = (value) => {
        // actions.resetForm({ values: { content: '' } });
        setCategory(value)
        props.setSelectedListFlag(value)
    }
    const handleChangeDateFrom = (date, dateString) => {
        setSearchDateFrom(dateString)
    }
    const handleChangeDateTo = (date, dateString) => {
        setSearchDateTo(dateString)
    }
    const deleteSearchCard = () => {
        props.setDisplayRightCard('')
        props.setConversationsForSearch('')
    }
    // const switchSearch = (c, filterObj) => {
    //     let flag = 0;
    //     let tempFlag = 0;
    //     for (let key in filterObj) {

    //             switch (key) {
    //                 case "from":
    //                     tempFlag = 0;
    //                     if (c.waves[0].from === undefined)
    //                         flag = 1
    //                     else
    //                         //עובר על כל הוובים של שיחה
    //                         //עבור כל וויב בודש אם יש אפילו אחד שמתאים לחיפוש פרום שעשו
    //                         c.waves.forEach(wave => {
    //                         if (wave.from.match(filterObj[key])) {
    //                             tempFlag = 1
    //                             return
    //                         }

    //                     if (tempFlag === 0)
    //                         flag = 1
    //                     break
    //                 case "to":
    //                     //בדיקה של כמה נמענים יש למייל הנוכחי
    //                     //הדגל נדלק במידה ובסוף הבדיקה ב-count =len
    //                     tempFlag = 0;

    //                     let count = 0;
    //                     let len = wave.to.length;
    //                     if (len === 0)
    //                         tempFlag = 1
    //                     else {
    //                         wave.to.forEach(t => {
    //                             let contactEmail = t;
    //                             if (t.indexOf("@") === -1) {
    //                                 if (props.user && props.user._id === t)
    //                                     contactEmail = props.user.email;
    //                                 else {
    //                                     contactEmail = props.contacts.find(x => x._id === t);
    //                                     contactEmail != null ? contactEmail = contactEmail.email : contactEmail = 'chani@leader.codes';
    //                                 }
    //                             }
    //                             console.log("contact email: ", contactEmail)
    //                             if (contactEmail && contactEmail.localeCompare(filterObj[key]) !== 0)
    //                                 count++;
    //                             return

    //                         })
    //                         //אם היה מישהו מתאים במערך של הנמענים על הוויב הנוכחי
    //                         if (count !== len) {
    //                             tempFlag = 1
    //                             return
    //                         }
    //                     }

    //                     if (tempFlag === 0)
    //                         flag = 1
    //                     break
    //                 case "subject":
    //                     if (c.subject.toLowerCase().search(filterObj[key]) === -1)
    //                         flag = 1
    //                     break
    //                 case "words":
    //                     tempFlag = 0;

    //                     if (wave.body.toLowerCase().search(filterObj[key]) !== -1) {
    //                         tempFlag = 1
    //                         return
    //                     }

    //                     if (tempFlag === 0)
    //                         flag = 1
    //                     break
    //                 case "dateFrom":
    //                     var timeStamp = wave.timestamp.split("T")[0];
    //                     timeStamp = new Date(timeStamp);
    //                     let dateFrom = new Date(filterObj[key])
    //                     if (dateFrom > timeStamp)
    //                         flag = 1
    //                     break
    //                 case "dateTo":
    //                     var timeStamp = wave.timestamp.split("T")[0];
    //                     timeStamp = new Date(timeStamp);
    //                     let dateTo = new Date(filterObj[key])
    //                     if (dateTo < timeStamp)
    //                         flag = 1
    //                     break
    //             }
    //         })

    //     }
    // }

    const systemWavesSwitch = (wave, filterObj) => {
        let flag = 0;
        for (let key in filterObj) {
            switch (key) {
                case 'subject':
                    if (wave.subject.toLowerCase().search(filterObj[key]) === -1)
                        flag = 1
                    break
                case 'word': if (wave.body.toLowerCase().search(filterObj[key]) === -1) {
                    flag = 1
                    return
                }
                case "dateFrom":
                    var timeStamp = wave.timestamp.split("T")[0];
                    timeStamp = new Date(timeStamp);
                    let dateFrom = new Date(filterObj[key])
                    if (dateFrom > timeStamp)
                        flag = 1
                    break
                case "dateTo":
                    var timeStamp = wave.timestamp.split("T")[0];
                    timeStamp = new Date(timeStamp);
                    let dateTo = new Date(filterObj[key])
                    if (dateTo < timeStamp)
                        flag = 1
                    break
            }
        }
        return flag;
    }
    const clickSearchCard = (values, actions) => {
        setActionsForm(actions)
        let filterObj = {};

        values = { ...values, from: recipientsFrom, to: recipientsTo, category: category, label: label !== "Label" ? label : "", dateTo: searchDateTo, dateFrom: searchDateFrom };
        for (let key in values) {
            if (values[key] !== "" && values[key].length !== 0) {
                filterObj = {
                    ...filterObj, [key]: values[key]
                }
            }
        }
        let arr = [];
        if (props.selectedListFlag === 'Leader') {
            props.systemWaves.forEach(wave => {
                if (wave.source === props.sourceFilter) {
                    let flag = systemWavesSwitch(wave, filterObj)
                    if (flag === 0)
                        arr.push(wave)
                }
            });
        }
        else {
            props.filteredConversations && props.filteredConversations.forEach(c => {
                let flag = 0;
                let tempFlag = 0;
                for (let key in filterObj) {
                    switch (key) {
                        case "from":
                            tempFlag = 0;
                            if (recipientsFrom.length > 1)
                                flag = 1
                            if (c.waves[0].from === undefined)
                                flag = 1
                            else {
                                c.waves.forEach(wave => {
                                    let recipient = recipientsFrom[0].split("@");
                                    let ans = recipient[1] === "mails.codes" ? recipient[0] : recipientsFrom[0]
                                    if (wave.from == ans) {
                                        tempFlag = 1
                                        return
                                    }
                                })
                            }

                            if (tempFlag === 0)
                                flag = 1
                            break
                        case "to":
                            //בדיקה של כמה נמענים יש למייל הנוכחי
                            //הדגל נדלק במידה ובסוף הבדיקה ב-count =len
                            // tempFlag = 0;
                            c.waves.forEach(wave => {
                                let count = 0;
                                tempFlag = 0
                                let len = wave.to.length;
                                if (len === 0)
                                    tempFlag = 1
                                else {
                                    recipientsTo.map(recipient => {
                                        let to = wave.to.find(t => t === recipient)
                                        if (!to) {
                                            tempFlag = 1
                                            return
                                        }

                                        // wave.to.forEach(t => {
                                        //     if (t && t.localeCompare(filterObj[key]) !== 0)
                                        //         count++;
                                        // let contactEmail = t;

                                        // if (t.indexOf("@") === -1) {
                                        //     if (props.user && props.user._id === t)
                                        //         contactEmail = props.user.email;
                                        //     else {
                                        //         contactEmail = props.contacts.find(x => x._id === t);
                                        //         contactEmail != null ? contactEmail = contactEmail.email : contactEmail = 'chani@leader.codes';
                                        //     }
                                        // }
                                        // console.log("contact email: ", contactEmail)
                                        // if (contactEmail && contactEmail.localeCompare(filterObj[key]) !== 0)
                                        //     count++;
                                        // return

                                    })
                                    //אם היה מישהו מתאים במערך של הנמענים על הוויב הנוכחי
                                    // if (count !== len) {
                                    //     tempFlag = 1
                                    //     return
                                    // }
                                }
                            })
                            if (tempFlag === 1)
                                flag = 1
                            break
                        case "subject":
                            if (c.subject.toLowerCase().search(filterObj[key].toLowerCase()) === -1)
                                flag = 1
                            break
                        case "words":
                            tempFlag = 0;
                            c.waves.forEach(wave => {
                                if (wave.body.toLowerCase().search(filterObj[key].toLowerCase()) !== -1) {
                                    tempFlag = 1
                                    return
                                }
                            })
                            if (tempFlag === 0)
                                flag = 1
                            break
                        case "label":
                            tempFlag = 0;
                            c.tags.forEach(tag => {
                                let findTag = props.allTags.find(x => x._id === tag)
                                if (findTag && findTag.title.toLowerCase() === filterObj[key].toLowerCase()) {
                                    tempFlag = 1
                                    return
                                }
                            })
                            if (tempFlag === 0)
                                flag = 1
                            break
                        case "dateFrom":
                            var timeStamp = c.waves[0].timestamp.split("T")[0];
                            timeStamp = new Date(timeStamp);
                            let dateFrom = new Date(filterObj[key])
                            if (dateFrom > timeStamp)
                                flag = 1
                            break
                        case "dateTo":
                            var timeStamp = c.waves[0].timestamp.split("T")[0];
                            timeStamp = new Date(timeStamp);
                            let dateTo = new Date(filterObj[key])
                            if (dateTo < timeStamp)
                                flag = 1
                            break
                    }
                }
                if (flag === 0)
                    arr.push(c)
            });
        }
        //יש כמה אופציות ל-value של מרך תןצאות החיפוש:
        //מערך ריק:[] איתחול ראשוני
        //מערך מלא: חיפש ומצא
        //מחרוזת not found חיפש ולא מצא
        //מחרוזת empty-מצא אבל עבר קטגוריה
        if (arr.length === 0)
            props.setConversationsForSearch('Not Found')
        else
            props.setConversationsForSearch(arr)
    }

    const children = [];
    if (props.contacts) {
        for (let i = 0; i < props.contacts.length; i++) {
            children.push(<option key={props.contacts[i].email}>{props.contacts[i].email}</option>)
        }
    }


    function handleChange(event) {
        setRecipientsFrom(event)
    }
    function handleChangeRecipTo(event) {
        setRecipientsTo(event)
    }

    return (
        <>
            <div className="searchCard">
                <div className="searchHeader d-flex justify-content-around">
                    <Tooltip title="Close">
                        <img className="closeIcon" src={closeIcon} onClick={deleteSearchCard} />
                    </Tooltip>
                    <h5>Advanced Search</h5>
                    <div></div>
                </div>
                <div className="contectCard">
                    <Formik
                        enableReinitialize
                        initialValues={{
                            subject: '',
                            words: '',
                        }}
                        onSubmit={clickSearchCard}
                    >
                        <Form noValidate>
                            <div className="searchContent">
                                <div className="feildInLead">
                                    <label>Search In:</label>
                                    <Select name="category" className="selectAntd category" value={`${category}`} onChange={handleChangeCategory}>
                                        <Option value="Sent">Sent Items</Option>
                                        <Option value="All">All Items</Option>
                                        <Option value="Box">Box Items</Option>
                                        <Option value="Leader">Leader Items</Option>

                                    </Select>
                                </div>
                                <div className="feildInLead">
                                    <Select
                                        key={key}
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        onChange={e => handleChange(e)}
                                    >
                                        {children}
                                    </Select>
                                    <br />
                                </div>
                                <div className="feildInLead ">
                                    <Select
                                        key={key}
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        // defaultValue={['a10', 'c12']}
                                        onChange={e => handleChangeRecipTo(e)}
                                    >
                                        {children}
                                    </Select>

                                    <br />
                                </div>
                                <div className="feildInLead">
                                    <Field name="subject"
                                        key={key}
                                        type="text"
                                        className="body searchFeilds"
                                        placeholder="Subject" />
                                </div>
                                <div className="feildInLead"  >
                                    <div className="d-flex flex-row " >
                                        <Space direction="vertical">
                                            <DatePicker
                                                key={key}
                                                name="dateFrom" placeholder="Date" className="body searchFeilds" onChange={handleChangeDateFrom} />
                                        </Space>

                                        <span className="-span">_</span>
                                        <Space direction="vertical">
                                            <DatePicker
                                                key={key}
                                                name="dateTo" className="body searchFeilds" onChange={handleChangeDateTo} />
                                        </Space>

                                    </div>
                                </div>
                                <div className="feildInLead">
                                    <Field
                                        key={key}
                                        name="words"
                                        type="text"
                                        className="body searchFeilds"
                                        placeholder="Words" />
                                </div>
                                <div className="feildInLead">
                                    <Select name="label" className="selectAntd labelSelect"
                                        placeholder="Label"
                                        // key={key}
                                        onChange={(e) => {
                                            ;
                                            setLabel(e)
                                        }} >
                                        {props.allTags.map((t) =>
                                            <option style={{ backgroundColor: t.color, margin: "3px 2px 0px 2px", borderRadius: "3px" }} key={t.title}>{t.title}</option>
                                        )}
                                        <option key="Label">No Label</option>

                                    </Select>

                                </div>
                            </div>
                            <hr />
                            <div className="searchFromLeader">
                                <span>Search In Leader:</span>
                                <div style={{
                                    "margin": "0 auto"
                                }}>
                                    <ItemsCarousel
                                        infiniteLoop={false}
                                        gutter={12}
                                        activePosition={'center'}
                                        disableSwipe={false}
                                        alwaysShowChevrons={false}
                                        numberOfCards={5}
                                        slidesToScroll={5}
                                        activeItemIndex={activeItemIndex}
                                        requestToChangeActive={setActiveItemIndex}
                                        rightChevron={'>'}
                                        leftChevron={'<'}
                                    >

                                        {props.sources && props.sources.map((s) =>

                                            <div className={`source ${props.sourceFilter.toLowerCase() === s.name.toLowerCase() ? ` sourceSelected` : ``} row`}
                                                active={props.sourceFilter === s.name}
                                            >
                                                <div onClick={e => {
                                                    props.setSelectedListFlag("Leader");
                                                    props.setSourceFilter(s.name);
                                                    // handleChangeCategory('Leader');
                                                }
                                                }>
                                                    <img src={s.icon} alt="" className="oneIcon" />
                                                </div>
                                            </div>

                                        )}

                                    </ItemsCarousel>

                                </div>

                            </div>
                            <div className="footerBtn">
                                <input type="submit" className="btn create" value="search" />
                            </div>
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
            displayRightCard: state.conversations.displayRightCard,
            filteredConversations: state.conversations.filteredConversations,
            tagFilter: state.conversations.tagFilter,
            selectedListFlag: state.conversations.selectedListFlag,
            contacts: state.init.contacts,
            sources: state.init.sources,
            sourceFilter: state.conversations.sourceFilter,
            systemWaves: state.conversations.systemWaves,
            conversationsForSearch: state.conversations.conversationsForSearch,
            allTags: state.tags.tags
        }
    },

    (dispatch) => ({
        setDisplayRightCard: (val) => { dispatch(actions.setDisplayRightCard(val)) },
        setConversationsForSearch: (val) => { dispatch(actions.setConversationsForSearch(val)) },
        setSelectedListFlag: (val) => { dispatch(actions.setSelectedListFlag(val)) },
        setSourceFilter: (val) => { dispatch(actions.setSourceFilter(val)) }
    })
)(AdvancedSearch)