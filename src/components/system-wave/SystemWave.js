import React, { useEffect, useState } from 'react'
import { FaFilter, FaLightbulb, FaCalendarAlt, FaDatabase, FaStar, FaFileAlt, FaHandshake, FaNetworkWired, FaPaperclip, FaDownload } from 'react-icons/fa'

import './SystemWave.scss'
import { connect } from 'react-redux';
import initService from '../../services/init.service'
import conversationService from '../../services/conversation.service'
import Tooltip from '@material-ui/core/Tooltip';
import imgFile from '../../assets/imageFile.svg'
import pdfFile from '../../assets/pdfFile.svg'
import wordFile from '../../assets/wordFile.svg'
import { removeConversationIdToEdit } from '../../redux/actions/conversation.actions'

function SystemWave(props) {
    const sysWave = props.systemWave

    const getWaveBodyText = (waveBody) => {
        let textString = ""
        let text = waveBody.split('<');
        for (let i = 0; i < text.length - 1; i++) {
            text[i] = text[i].substring(text[i].indexOf('>') + 1)
            if (i > 0) {
                textString += " " + text[i]
            }
        }
        return textString
    }
    const getSourceImg = () => {

        let img = props.sourcesArray ? props.sourcesArray.find(s => s.name.toLowerCase() === sysWave.source.toLowerCase()) : null
        if (img)
            return img.icon
    }

    const removeToSelect = (e) => {
        e.stopPropagation()
        props.removeConversationIdToEdit(sysWave._id)
    }

    const getSrc = (f) => {
        let x = f.substring(f.indexOf('__') + 2)
        x = x.substring(x.indexOf('.') + 1)
        switch (x.toLowerCase()) {
            case "png":
                return imgFile
            case "pdf":
                return pdfFile
            case "word":
                return wordFile
            default:
                break;
        }
    }

    const downloadFile = (event, url) => {
        let type = url.substring(url.indexOf('__') + 2)
        type = type.substring(type.indexOf('.') + 1)

        event.stopPropagation()
        conversationService.downloadFile(url, type).then(() => {
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            {sysWave &&
                <div
                    className={`conversationDiv  bord `}>
                    <div className="leftDiv">
                        {props.conversationsIdsToEdit.find(id => id === sysWave._id) &&
                            <div className="sourceCircle showChecked" onClick={removeToSelect}>v</div>
                            ||
                            <div className="sourceCircle">{sysWave.source && <span>{getSourceImg() || "?"}</span>}
                            </div>
                        }
                    </div>

                    <div className="conversationContent">
                        <div className="contactNameAndNumConversations">
                            <span className={`contactNameInConversation ${sysWave.readed == false && `bold`}`}>
                                {sysWave.from}
                            </span>
                        </div>
                        <span className={sysWave.readed == false ? "waveSubjectP bold" : "waveSubjectP"}>
                            {sysWave.subject != null ? sysWave.subject : "(no subject)"}</span>
                        <div className="waveBody">{sysWave.body && getWaveBodyText(sysWave.body)}</div>
                    </div>


                    <div className="dateAndMore">
                        <div className="conversationDate">
                            {sysWave.timestamp && initService.getTime(sysWave.timestamp)}
                        </div>
                        {sysWave.files && sysWave.files.length > 0 && sysWave.files.map(f => {
                            f.url && <div><img src={getSrc(f)} className="fileInConv"></img>
                                <div className="downloadFileIcon" onClick={(e) => downloadFile(e, f)}><FaDownload /></div>
                            </div>
                        }
                        )}
                        {/* {sysWave.source && sourcesArray.find(s => s.name.toLowerCase() == sysWave.source.toLowerCase())
                            && <div className="iconInConv"> {sourcesArray.find(s => s.name.toLowerCase() == sysWave.source.toLowerCase()).icon}</div>} */}
                    </div>
                </div>
            }</>

    )
}

export default connect(
    (state) => {
        return {
            conversationsIdsToEdit: state.conversations.conversationsIdsToEdit,
            sourcesArray: state.conversations.sourcesArray
        }
    },
    {
        removeConversationIdToEdit
    }
)(SystemWave)


