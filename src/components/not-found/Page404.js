import React from 'react'
import Group_614 from '../../assets/Group 614.svg'
import './Page404.css'
export default function Page404() {
    return (
        <div className="page404Div">
            <div className="left">
                <h3>sorry... the page not found</h3>
                <h2>Error</h2>
                <h1>404</h1>
            </div>
            <div className="right">
                <img src={Group_614} className="group_614_img" alt=''/>
            </div>
        </div>
    )
}