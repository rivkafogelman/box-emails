import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from "react-redux";
import Tooltip from '@material-ui/core/Tooltip';
import trashIcon from './assets/trashIcon.svg'
import okIcon from './assets/okIcon.svg'
import { actions } from '../../redux/actions/action'
import SystemColors from '../system-colors/SystemColors';
// import { addTag, editTag, editTags, deleteTag, deleteTags, updateTagsIdsToEdit } from '../../redux/actions/tag.actions';
import { setTagFilter } from '../../redux/actions/conversation.actions'
import { setBodyClicked } from '../../redux/actions/init.actions'
import { setNotification } from "../../redux/actions/notification.actions";
import './Labels.scss'

// all text
import allText from '../../allText.json'

function Labels(props) {
    const dispatch = useDispatch();

    const labelsColorDiv = React.createRef()
    const colorInput = React.createRef()
    const textInput = React.createRef("")

    const [showSystemColors, setShowSystemColors] = useState(false)
    const [showLabelNameBorder, setShowLabelNameBorder] = useState(null)
    const [createNewLabel, setCreateNewLabel] = useState(null)
    const [randomColor, setRandomColor] = useState()
    const [tagToChangeColor, setTagToChangeColor] = useState("");
    const [showOkIcon, setShowOkIcon] = useState(false)

    useEffect(() => {
        setShowSystemColors(false)
        if (tagToChangeColor !== "") {
            props.editTagServer({ "_id": tagToChangeColor, "color": props.selectedColor })
            setTagToChangeColor("")
        }
        else {
            newLabelColorChanged(props.selectedColor)
        }
    }, [props.selectedColor])

    const newLabelColorChanged = (color) => {
        if (labelsColorDiv && labelsColorDiv.current)
            labelsColorDiv.current.style.backgroundColor = color
    }
    useEffect(() => {
        randColor()
    }, [])

    useEffect(() => {
        if (props.bodyClicked === true) {
            setShowSystemColors(false)
            setTagToChangeColor("")
            props.setBodyClicked(false)
        }
    }, [props.bodyClicked])

    // when tagToChangeColor!='' close showsystemcolor
    useEffect(() => {
        if (tagToChangeColor !== '') {
            setShowSystemColors(false)
        }
    }, [tagToChangeColor])

    // when showSystemColors=true close tagToChangeColor
    useEffect(() => {
        if (showSystemColors) {
            setTagToChangeColor('')
        }
    }, [showSystemColors])




    const tagTitleChanged = (e, tagId) => {

        e.stopPropagation()
        if (e.key === "Enter") {
            setShowLabelNameBorder(null)
            e.preventDefault()
            if (e.target.value.trim() !== "") {
                let tag = {
                    "_id": tagId,
                    "title": e.target.value.trim()
                }
                props.editTagServer(tag)
            }
        }
    }

    const randColor = () => {
        let list = Math.floor(Math.random() * 2)
        let ind = Math.floor(Math.random() * 15)
        setRandomColor(props.systemColors[list][ind])
        // return '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
    const createLabel = () => {
        if (textInput.current.value !== "") {
            let tag = {
                "title": textInput.current.value,
                "color": labelsColorDiv.current.style.backgroundColor
            }
            setShowOkIcon(false)
            props.addTagServer(tag)
            setCreateNewLabel(null)
            textInput.current.value = ""
            randColor();
            //show notification create label
            const notificationToShow = { info: (allText.label.labelCreated), icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
            dispatch(setNotification(notificationToShow));
        }
        // props.addTag(tag)
        // setCreateNewLabel(null)
        // textInput.current.value = ""
        // randColor();
        // //show notification create label
        // const notificationToShow = { info: (allText.notification.labelCreated), icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
        // dispatch(setNotification(notificationToShow));
    }

    return (
        <div className='labels'>
            <div tabIndex="-1" className={`d-flex align-items-center oneTagDiv searchTag labelPadding lft ${createNewLabel === 'new' && `labelSelected`}`}
                onClick={
                    (e) => {
                        setCreateNewLabel('new')
                        props.setTagFilter(null)
                        e.stopPropagation()
                    }}>{allText.label.createNewLabel}</div>
            {(createNewLabel === 'new' || createNewLabel === 'edit') &&
                <>
                    <div className='d-flex align-items-center oneTagDiv searchTag '>
                        <Tooltip title={allText.label.changeColor}>
                            <div
                                className="tagColorDivInConfigurator"
                                style={{ backgroundColor: randomColor }}
                                ref={labelsColorDiv}
                                onClick={(e) => {
                                    setShowSystemColors(!showSystemColors);
                                    e.stopPropagation()
                                }}></div>
                        </Tooltip>
                        <input className="tagColorInput" type="color" ref={colorInput} onChange={(e) => { newLabelColorChanged(e.target.value) }} />
                        <input type="text" className="tagTitleInput" ref={textInput} maxLength="20" placeholder={allText.label.addLabel} onKeyPress={(e) => {
                            if (e.target.value !== "")
                                setShowOkIcon(true)
                            if (e.key === "Enter") {
                                if (e.target.value !== "") {
                                    createLabel()
                                }
                            }
                        }}
                            onKeyUp={(e) => {
                                if (e.target.value === "")
                                    setShowOkIcon(false)
                            }}
                        />
                        {showOkIcon ?
                            <img src={okIcon} onClick={() => { createLabel() }} />
                            : ""}
                    </div>
                    {showSystemColors && <SystemColors className='systemColors' colorFor="labels" />}

                </>
            }
            {props.tags && props.tags.map((tag, index) =>
                <>
                    <div tabIndex="-1" className={`d-flex align-items-center oneTagDiv searchTag ${props.tagFilter === tag._id && `labelSelected`} ${index <= 2 ? 'disable' : ""}`} onClick={
                        (e) => {
                            setCreateNewLabel(null)
                            props.setTagFilter(tag._id)
                            e.stopPropagation()
                        }}>
                        <Tooltip title={allText.label.changeColor} placement="left-start">
                            <div className="tagColorDivInConfigurator" style={{ backgroundColor: tag.color }}
                                onClick={e => {
                                    if (tagToChangeColor) {
                                        setTagToChangeColor('')
                                    }
                                    else {
                                        setTagToChangeColor(tag._id)
                                    }
                                    props.setTagFilter(tag._id)
                                    e.stopPropagation()
                                }}
                            ></div>
                        </Tooltip>

                        <Tooltip title={allText.label.editName} >
                            <input
                                key={tag._id}
                                type='text'
                                className='labelNameBorder'
                                style={{ border: showLabelNameBorder === tag._id ? '1px solid #ffffff2b' : 'none' }}
                                onClick={() => setShowLabelNameBorder(tag._id)}
                                onMouseLeave={() => setShowLabelNameBorder(null)}
                                onKeyPress={(e) => tagTitleChanged(e, tag._id)}
                                defaultValue={tag.title}
                            />
                        </Tooltip>
                        {tag._id !== "60e3fa311a408d913fd0ec95" && tag._id !== "60e3fa651a408d913fd0edbe" && tag._id !== "60e3f9271a408d913fd0e622" ?
                            <div className="removeTag" onClick={(e) => {
                                props.deleteTagServer(tag._id)
                                //show notification delete label
                                const notificationToShow = { info: (allText.label.labelDeleted), icon: null, color: '#1280de', backgroundColor: '#d3eff8' }
                                dispatch(setNotification(notificationToShow));
                                e.stopPropagation();
                            }}><img src={trashIcon} /></div> : ''}
                    </div>
                    {tagToChangeColor === tag._id && <SystemColors className='systemColors' colorFor="labels" />}
                </>
            )
            }
        </div >)

}

export default connect(
    (state) => {
        return {
            tags: state.tags.tags,
            tagFilter: state.conversations.tagFilter,
            tagsIdsToEdit: state.tags.tagsIdsToEdit,
            selectedColor: state.tags.selectedColor,
            systemColors: state.init.systemColors,
            bodyClicked: state.init.bodyClicked
        }
    },
    (dispatch) => ({
        addTagServer: (val) => { dispatch(actions.addTagServer(val)) },
        editTagServer: (val) => { dispatch(actions.editTagServer(val)) },
        editTags: (val) => { dispatch(actions.editTags(val)) },
        deleteTagServer: (val) => { dispatch(actions.deleteTagServer(val)) },
        deleteTags: (val) => { dispatch(actions.deleteTags(val)) },
        setTagFilter,
        updateTagsIdsToEdit: (val) => { dispatch(actions.updateTagsIdsToEdit(val)) },
        setBodyClicked
    }))(Labels)