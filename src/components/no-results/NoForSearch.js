import React from 'react'
import noResultsImg from '../../assets/Group 17302.png'
import './NoResults.css'
export default function NoResults() {
    return (
        <div className="noResultsDiv">
            <h2 className="noResultsHeader">No messages matched your search</h2>
            <img src={noResultsImg} className="noResultsImg" alt=''/>
        </div>
    )
}