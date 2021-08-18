import { connect } from "react-redux"
import React, { useState } from 'react'
import { FaTrashAlt, FaPalette } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import './Tags.css'
// import { addTag, editTag, editTags, deleteTag, deleteTags, updateTagsIdsToEdit } from '../../redux/actions/tag.actions';
import { setTagFilter } from '../../redux/actions/conversation.actions'
import Tooltip from '@material-ui/core/Tooltip';
import {actions} from '../../redux/actions/action'

// all text
import allText from '../../allText.json'
function Tags(props) {
    const [checkAll, setCheckAll] = useState(false)
    const [colorPickers] = useState([])
    const labelsColorDiv = React.createRef()
    const colorInput = React.createRef()
    const [checkedTag, setCheckedTag] = useState()

    const checkTag = (e, id) => {
         
        if (checkedTag !== id) {
            setCheckedTag(id);
        }
        else {
            setCheckedTag("");
        }
        e.stopPropagation()
    }
    const displayTags = () => {
        return (<>
            {props.tags && props.tags.slice(0).reverse().map((tag, index) =>
                <div tabIndex="-1" className={`oneTagDiv search searchTag ${props.tagFilter === tag._id && `selected`}`} onClick={
                    () => { props.setTagFilter(tag._id) }}>
                       
                    <Tooltip title={allText.tags.select} placement="left-start">
                        <div className="tagColorDivInConfigurator" style={{ backgroundColor: tag.color }}
                            //  onClick={(e) => {
                            //     props.updateTagsIdsToEdit("add", tag._id)
                            //     e.stopPropagation()
                            // }}
                            onClick={(e) => checkTag(e, tag._id)}
                        >

                            <span className="check" style={{
                                display: `${checkedTag === tag._id ? `block` : `none`}`
                                // display: `${props.tagsIdsToEdit.find(t => t === tag._id) ? `block` : `none`}`
                            }}
                            >
                                <FiCheck />
                            </span>
                        </div>
                    </Tooltip>
                    <Tooltip title={allText.labelt.editName} >
                        <p className="searchTxt" contentEditable="false">{tag.title.toString()}</p>
                    </Tooltip>

                    <div className="tagIcons"
                        style={{
                            display: `${checkedTag === tag._id ? `block` : `none`}`
                            // display: `${props.tagsIdsToEdit.find(t => t === tag._id) ? `block` : `none`}`
                        }}>
                    
                            <input type="color" className="tagColorInput tagColorPicker"
                                ref={(cp) => { colorPickers[index] = cp }} onClick={(e) => {
                                    e.stopPropagation()
                                }}
                                onChange={async (e) => {
                                    await props.editTagServer({ _id: tag._id, color: e.target.value })
                                    setCheckedTag("")
                                }} />
                       
                        <span className="tagIcon changeTagColor" onClick={(e) => {
                            colorPickers[index].click()
                            e.stopPropagation()
                        }}><FaPalette /></span>
  
                        <span className="tagIcon removeTag" onClick={(e) => {
                            props.deleteTagServer(tag._id)
                            e.stopPropagation()
                        }}><FaTrashAlt /></span>
                    </div>
                </div>
            )
            }
        </>)
    }
    const randColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16)
    }

    return (<>
        <div className="addCategoryDiv">
            <div className="labelsColorDiv" id="labelsColorDiv" style={{ backgroundColor: randColor() }} ref={labelsColorDiv} onClick={() => { colorInput.current.click() }}></div>
            <input className="tagColorInput" type="color" id="color" ref={colorInput} onChange={(e) => { labelsColorDiv.current.style.backgroundColor = e.target.value }} />
            <input type="text" id="tagTitleInput" className="tagTitleInput" maxLength="20" placeholder={allText.label.addLabel} onKeyPress={(e) => {
                if (e.key === "Enter") {
                    if (e.target.value !== "") {
                        let tag = {
                            "title": e.target.value,
                            "color": labelsColorDiv.current.style.backgroundColor
                        }
                        props.addTagServer(tag)
                        e.target.value = ""
                    }
                }
            }} />
        </div>
        <div className="tagsList" id="tags_list">
            <div tabIndex="-1" className={`oneTagDiv search searchTag allTags ${props.tagFilter === `` && `selected`}`} id='searchTag_allTags' onClick={() => {
                props.setTagFilter('')
            }}>
                {/* <div className="tagColorDivAll" style={{ backgroundColor: "#FFFFFF" }}
                 selected_="false" onClick={(e) => {
                    setCheckAll(!checkAll)
                    updateTagsIdsToEdit("checkAll", "")
                    e.stopPropagation()
                }}
                >
                    <span style={{ display: `${checkAll ? `block` : `none`}` }}><FaCheck /></span>
                </div> */}
                <p>{allText.label.allLabels}</p>
                {/* <div className="tagIcons" id="tagIconsAll">
                    <input type="color" className="tagColorInput tagColorPicker" id="tagColorPicker_allTags" />
                    <span className="tagIcon changeTagColor" id="changeTagColor_allTags"
                        onClick={(e) => { e.stopPropagation() }}><FaPalette /></span>
                    <span className="tagIcon removeTag" id="remove_allTags"
                        onClick={(e) => {
                            if (checkAll) { props.deleteTags("all") }
                            e.stopPropagation()
                        }}><FaTrashAlt /></span>
                </div> */}
            </div>
            {displayTags()}
        </div ></>)

}



export default connect(
    (state) => {
        return {
            tags: state.tags.tags,
            tagFilter: state.conversations.tagFilter,
            tagsIdsToEdit: state.tags.tagsIdsToEdit
        }
    }, (dispatch) => ({
    addTagServer: (value) => { dispatch(actions.addTagServer(value))},
    editTagServer: (val) => { dispatch(actions.editTagServer(val))},
    editTags: (val) => { dispatch(actions.editTags(val))},
    deleteTag: (val) => { dispatch(actions.deleteTag(val))},
    deleteTags: (val) => { dispatch(actions.deleteTags(val))},
    setTagFilter: (val) => { dispatch(actions.setTagFilter(val))},
    updateTagsIdsToEdit: (val) => { dispatch(actions.updateTagsIdsToEdit(val))}
}))(Tags)
