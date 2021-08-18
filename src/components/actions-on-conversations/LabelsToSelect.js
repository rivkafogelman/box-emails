import { connect } from 'react-redux';
import React from 'react';
// import { editConversations } from '../../redux/actions/conversation.actions';
// import { setDisplayTags } from '../../redux/actions/tag.actions'
import {actions} from '../../redux/actions/action'

import './LabelsToSelect.scss'
function TagsList(props) {

    const editConversationTag = (e, tagId) => {
        let convs = []
        props.conversationsIdsToEdit.forEach(c => {
            convs.push({ "_id": c, "tag": tagId })
        });
        props.setDisplayTags(false)
        props.editConversationsServer(convs)
        e.stopPropagation()
    }
    const removeTag = (e) => {
        let convs = []
        props.conversationsIdsToEdit.forEach(c => {
            convs.push({ "_id": c, "tag": null })
        });
        props.setDisplayTags(false)
        props.editConversationsServer(convs)
        e.stopPropagation()
    }

    return (<div className="LabelsList">
        {props.tags && props.tags.slice(0).reverse().map(t =>
            <div className="lable" onClick={(e) => { editConversationTag(e, t._id) }} style={{ backgroundColor: t.color }}>
                <span>{t.title}</span>
                {/* <a href="#" className="lable list-group-item list-group-item-action" ><div className="tagColorDiv" style={{ backgroundColor: t.color }}></div><span>{t.title}</span></a> */}
            </div>
        )}
        <div className="lable" onClick={removeTag} >
            <span style={{ color: "#0A102E" }}>No label</span>
            {/* <a href="#" className="lable noTag list-group-item list-group-item-action" ><div className="tagColorDiv" ></div><span>No lable</span></a> */}
        </div>
    </div>)
}


export default connect(
    (state) => {
        return {
            tags: state.tags.tags,
            selectedConversation: state.conversations.selectedConversation,
            conversationsIdsToEdit: state.conversations.conversationsIdsToEdit
        }
    },
    (dispatch) => ({
        setDisplayTags: (val) => { dispatch(actions.setDisplayTags(val))},
        editConversationsServer: (val) => { dispatch(actions.editConversationsServer(val))},
    })
)(TagsList)