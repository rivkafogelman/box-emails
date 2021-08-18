import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setSelectedSignatureId } from '../../redux/actions/signature.actions';

import allText from '../../allText.json';
import './Categories.scss'
function Signatures(props) {
    const dispatch = useDispatch();
    const [createNewSignature,setCreateNewSignature]=useState(false);
    return (
        <div className= {`signaturesList ${props.textColor == "dark" ? 'darkText': 'lightText'} `}  >
            {props.signatures && props.signatures.map(s =>
                <div
                    className={`signature${props.selectedSignatureId === s._id ? `Selected` : ``}`}
                    onClick={() => {
                        // props.setSelectedListFlag(props.flagsList.signature);
                        props.setSelectedSignatureId(s._id)
                    }}>
                    {s.signatureName}
                </div>
            )
            }
            {props.signatures&& props.signatures.length === 0 && <div className={`signature${createNewSignature?'Selected':''}`} onClick={() => {
                setCreateNewSignature(true)
                dispatch(setSelectedSignatureId(-1))
            }}>{allText.signature.createNew}</div>}
        </div >
    )
}

export default connect(
    (state) => {
        return {
            signatures: state.signature.signaturesList,
            selectedSignatureId: state.signature.selectedSignatureId,
            textColor: state.settings.textColor
            // flagsList: state.conversations.flagsList,
        }
    }, {
    setSelectedSignatureId
}
)(Signatures)