import { React, useEffect, useState } from "react";
import { connect } from "react-redux";
import { removeSignature, setSelectedSignatureId } from '../../redux/actions/signature.actions'
import garbage from './assets/trashGrey.svg'

import alertIcon from './assets/alert.svg'
import './Delete&Update.scss'


function DeleteUpdate(props) {

    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        if (props.signatures.length === 0) {
            newSignature()
        }
    }, [])

    const newSignature = () => {
        if (props.signatures.length < 3 || props.user.premium) {
            props.setSelectedSignatureId(-1)
        }
        else {
            setShowAlert(true)
            // alert('You already have 3 signatures or you not premium')
        }
    }

    const editSignature = (id) => {
        props.setSelectedSignatureId(id)
    }

    const removeSignature = (id) => {
        props.removeSignature(id)
        if (props.signatures.length === 1)
            newSignature()
    }

    return (
        <div className="signaturesList">

            <div className="d-flex example-parent headerSignature">
                <div className="p-2 col-example">
                    <div className="d-flex example-parent ">
                        <div className='p-2 col-example col-2 headerText'>
                            <h4 className="p-3 mySignatureHeader"><b>My Signatures</b></h4>
                        </div>
                        <div className="p-2 col-example alertDiv">
                            {showAlert ?
                                <>
                                    <img style={{ width: 20, height: 20 }} src={alertIcon} />
                                    <label className='alertClass'>you have to upgrade your plan</label>
                                </>
                                : ''
                            }
                        </div>
                    </div>

                </div>
                <div className="ml-auto p-2 col-example">
                    <button type="button" className="btn btn-light" onClick={newSignature} className="p-3 create ">Create new+</button>
                </div>
            </div>

            <table className="container">
                <tr className="row header1 align-items-start" >
                    <th></th>
                    <th className="col col1">signature</th>
                    <th className="col">email</th>

                    <th className="col"></th>
                </tr>
                {props.signatures && props.signatures.map((s, index) => (
                    <tr className=" row trc align-items-start signatureRow " >
                        {/* upload_photo */}
                        <td className="pic" style={{ width: "0%" }}><img src={s.upload_photo.url} width="40wh" height="40vh" alt='' /></td>
                        <td className="col " key={index}>{s.signatureName}</td>
                        <td className="col top1">{s.email}</td>

                        <td className="col top1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-pencil-square color1 icon" viewBox="0 0 16 16" onClick={() => editSignature(s._id)}>
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                            <img alt='' className="icon" src={garbage} onClick={() => { removeSignature(s._id) }} />
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            signatures: state.signature.signaturesList,
            defaultSignature: state.signature.defaultSignature,
            mail: state.init.userName,
            user: state.init.user,
        }
    }, {
    setSelectedSignatureId,
    removeSignature
}
)(DeleteUpdate)