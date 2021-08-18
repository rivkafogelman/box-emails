import { getAllByText } from '@testing-library/react'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setSourceFilter } from '../../redux/actions/conversation.actions'
import { setSources } from '../../redux/actions/init.actions'
import './Sources.scss'
import allText from '../../allText.json'
import keys from '../../Config/keys'

function Sources(props) {

    // const [userSources, setUserSources] = useState([]);

    // const isIncludedInWaves = (source) => {
    //     const sourcesArr = props.systemWaves.filter(s => s.source === source.name);
    //     if(sourcesArr.length > 0)
    //         return true;
    //     return false;
    // }

    // const initializeUserSources = () => {
    //     setUserSources(props.sources.filter((s) => {
    //            return isIncludedInWaves(s);
    //         }))
    // }



    const addWebhookNickname = (source, index) => {
        const webhook = props.webhooks.find(w => w.source === source.name);
        if (webhook) {
            const src = { ...source };
            src.nickname = webhook.nickname;
            return src;
        }
        return source;
    }
    useEffect(() => {
        const sourceArray = [...props.sources];
        sourceArray.map((s, i) => sourceArray[i] = addWebhookNickname(s, i))
        props.setSources(sourceArray);
    }, [props.webhooks]);


    return (
        <div className="configuratorSourcesList" >

            

            {props.sources.map((s) =>
                <div key={s._id} className={`source${props.sourceFilter.toLowerCase() === s.name.toLowerCase() ? ` sourceSelected` : ``} row`}
                    active={props.sourceFilter === s.name}
                    onClick={() => props.setSourceFilter(s.name)}>
                    <div className='col-1 p-9'></div>
                    <div className='col-1 p-0 mr-2'>
                        <img src={s.icon} alt="" className="icon" />
                    </div>
                    <span className='col-7'>{s.nickname ? s.nickname : s.name}</span>

                </div>
            )}
            {/* <div tabIndex="-1" className={`d-flex align-items-center lft `}
                onClick={
                    () => {
                        window.open(
                            keys.LOBBY_URL+ props.userName,
                            '_blank'  
                        );
                    }}>{allText.sources.lobby}</div> */}
            {/* <hr className='hrInConfiguratot'/> */}
        </div >
    )
}

export default connect(
    (state) => {
        return {
            sources: state.init.sources,
            sourceFilter: state.conversations.sourceFilter,
            systemWaves: state.conversations.systemWaves,
            webhooks: state.init.webhooks,
            userName:state.init.userName
        }
    },
    {
        setSourceFilter: setSourceFilter,
        setSources
    }
)(Sources)