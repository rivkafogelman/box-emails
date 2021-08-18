import React, { useState } from 'react'
import {connect, useSelector } from "react-redux"
import { changeEnableGoogleToken } from '../../redux/actions/googleAuth.actions'
// all text
import allText from '../../allText.json'
import './settings.scss'

 function CreateLead(props) {
    const [enable, setEnable] = useState(true)

    const gmailUserAddress = useSelector(state => state.googleAuth.gmailUserAddress);
    const userName=useSelector(state=>state.init.userName);
 
    return (
        <div className='settings'>
            {/* title */}
            <div className='row'>
                <span className='title ml-2'>{allText.settings.accountSettings}</span>
            </div>
            {/* content */}
            <div className='row d-flex align-items-center my-4'>
                <div className='col-2'>
                    <span className='label'>{allText.settings.leaderBox}</span>
                </div>
                <div className='col-5 box'>
                    <div className='font-weight-bold d-flex justify-content-center'>{allText.settings.yourleaderBoxAccount}</div>
                    <div className='d-flex justify-content-center'>{userName}{allText.settings.mailsCodes}</div>
                </div>
                <div className='col-4'></div>
            </div>
            <hr />
            <div className='row d-flex align-items-center my-4'>
                <div className='col-2'>
                    <span className='label'>{allText.settings.connected}</span>
                </div>
                <div className='col row p-0 d-flex justify-content-between'>
                    <div className='col-6 customDiv'>
                        <div className='d-flex justify-content-between box'>
                            { enable?<div>{gmailUserAddress}</div>:<div></div> }
                            {props.googleAuth!=='NULL'&& enable ?
                            <div className='text-danger pointer' 
                            onClick={() => {console.log(enable) ;setEnable(!enable)  ;
                             props.changeEnableGoogleToken()}} >{allText.settings.remove}</div>:
                             <div className='text-danger pointer'  
                             onClick={() => {console.log(enable);setEnable(!enable);
                                props.changeEnableGoogleToken() }}>Add</div>}
                            
                        </div>
                        {!gmailUserAddress &&
                            <div className='addEmail mt-2'>
                                <a href="https://dev.leader.codes/" target="_blank">{allText.settings.addEmailAccount}</a>
                            </div>}
                    </div>
                    {/* <div className='col mt-2'>
                        <input id='import' type='checkbox' />
                        <label htmlFor='import' className='ml-1'>Import labels</label>
                        <input id='last' type='checkbox' className='ml-3' />
                        <label htmlFor='last' className='ml-1'>Up to 100 last emails</label>
                    </div> */}
                </div>
            </div>
            <hr />
        </div>
    )
}

export default connect(
    (state) => {
        return {
            googleAuth: state.googleAuth.google_auth
        }
    }, {
        changeEnableGoogleToken
})(CreateLead)