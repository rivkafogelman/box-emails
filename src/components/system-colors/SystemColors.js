import { connect } from "react-redux"
import React, { useEffect } from 'react'
import { setSelectedColor } from '../../redux/actions/tag.actions'
import { setSelectedColorSignature } from '../../redux/actions/signature.actions'
import './SystemColors.scss'
// all text
import allText from '../../allText.json'
function SystemColors(props) {

    const selectColor = (event, color) => {
        switch (props.colorFor) {
            case "labels":
                props.setLabelsSelectedColor(color)
                break;
            case "signature":
                props.setSelectedColorSignature(color)
                break;
            default:
                break;
        }
        event.stopPropagation()
    }

    useEffect(() => {

    }, [])
    
    return (
        <>
            {props.systemColors &&
                <div className="systemColors">
                    {props.systemColors.map(list => list.map(c =>
                        <div className="oneColor"
                            style={{ "backgroundColor": c }}
                            onClick={(e) => {
                                selectColor(e, c);
                                e.stopPropagation()
                            }}></div>)
                    )}
                    {props.colorFor === "signature" && props.defaultColor &&
                        <div>
                            <span>{allText.systemColors.defaultColor}</span>
                            <div
                                className="oneColor"
                                style={{ "backgroundColor": props.defaultColor }}
                                onClick={(e) => {
                                    selectColor(e, props.defaultColor);
                                    e.stopPropagation()
                                }}></div>
                        </div>}
                </div>
            }</>)
}

export default connect(
    (state) => {
        return {
            systemColors: state.init.systemColors
        }
    },
    {
        setLabelsSelectedColor: setSelectedColor,
        setSelectedColorSignature: setSelectedColorSignature
    }
)(SystemColors)