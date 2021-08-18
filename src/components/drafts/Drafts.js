import { connect } from "react-redux"
import React, { useEffect, useState } from 'react'
import greyStarIcon from '../../assets/fill_grey_star.svg'
import yellowStarIcon from '../../assets/fill_yellow_star.svg'
import paperClipIcon from '../../assets/paper_clip.svg'
import Tooltip from '@material-ui/core/Tooltip';
import conversationService from '../../services/conversation.service'
// import { addDraft, editDraft, deleteDraft, editDraftOnServer, addNewMessageCard } from '../../redux/actions/draft.actions';
import NewMessage from '../new-message/NewMessage'
import './Drafts.scss'
import {actions} from '../../redux/actions/action'

// all text
import allText from '../../allText.json'
function Drafts(props) {

    const getBodyTxt = (body) => {
        let text = body.split('<');
        let textString = ""
        for (let i = 0; i < text.length - 1; i++) {
            text[i] = text[i].substring(text[i].indexOf('>') + 1)
            if (i > 0) {
                textString += " " + text[i]
            }
        }
        return textString
    }
    const openDraft = (event, draft) => {
        props.addNewMessageCard(draft)
        event.stopPropagation()
    }
    const starDraft = (e, draft) => {
        let draftToEdit = {
            "_id": draft._id,
            "starred": !draft.starred
        }
        props.editDraftOnServer(draftToEdit)
        e.stopPropagation()
    }

    return (<>
        <div className="draftsList">
            {props.drafts && props.drafts.slice(0).reverse().map((d, index) =>
                <div key={index} className="draft" onClick={(e) => openDraft(e, d)}>
                    <div className="leftDiv">
                        <span className="title">{allText.draft.draft}</span>
                        <span className="subject">{d.subject !== "" ? d.subject : "(no subject)"}</span>
                    </div>
                    <div className="centeralDraftDiv">
                        <div className="draftBody">
                            {d.body && getBodyTxt(d.body)}
                        </div>
                    </div>
                    <div className="dateAndMore">
                        <span className="date">{d.timestamp && conversationService.getTime(d.timestamp)}</span>
                        <span className="more">
                            {d.files&&d.files.length > 0 && <span className="filesIcon"><img src={paperClipIcon}></img></span>}
                            <span onClick={(e) => starDraft(e, d)}>{d.starred ? <img src={yellowStarIcon} alt="" style={{"marginLeft":"7px",marginBottom:"3px"}}></img> : <img src={greyStarIcon} alt="" style={{"marginLeft":"7px",marginBottom:"3px"}}></img>}</span>
                        </span>
                    </div>
                </div>)}
        </div>
    </>)

}



export default connect(
    (state) => {
        return {
            drafts: state.drafts.drafts
        }
    },
    (dispatch) => ({
        addDraft: (val) => { dispatch(actions.addDraft(val))},
        editDraft: (val) => { dispatch(actions.editDraft(val))},
        deleteDraft: (val) => { dispatch(actions.deleteDraft(val))},
        addNewMessageCard: (val) => { dispatch(actions.addNewMessageCard(val))},
        editDraftOnServer: (val) => { dispatch(actions.editDraftOnServer(val))},
    })
)(Drafts)