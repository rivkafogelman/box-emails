import React from 'react'
import './NoResults.css'
export default function NoFromWahtsApp() {

    const refToExtensions = () => {
        window.open(
            "https://chrome.google.com/webstore/category/extensions?hl=iw&gl=CZ",
            '_blank'
        );
    }

    return (
        <div className="noFromWhatsAppDiv">
            <h2 className="noFromWhatsAppHeader">Want to add WhatsApp conversations?</h2>
            <h2 className="noMessagesFooter">Click here to download the Leader extension from chrome webstore</h2>
            <button className="noFromWhatsAppBtn form-control" onClick={refToExtensions}>Leader extension</button>
            <p className="noFromWhatsAppP">Add "Leader" label for the conversations in WhatsApp you want to add in Leader box</p>
        </div>
    )
}

