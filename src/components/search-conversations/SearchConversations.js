import React, { useEffect } from 'react'
import { connect } from "react-redux"
// import { setIsMessageOpen, setSelectedConversation, setConversationsForSearch } from '../../redux/actions/conversation.actions'
import './SearchConversations.scss'
// import { setDisplayRightCard } from '../../redux/actions/conversation.actions'
import allText from '../../allText.json'
import searchIconDark from './assets/searchDark.svg'
import searchIconLight from './assets/searchLight.svg'
import {actions} from '../../redux/actions/action'

import { useState } from 'react'
import openOptionIcon from '../../assets/Polygon 1.svg'
function SearchConversations(props) {

    useEffect(() => {
        searchInput.current.value = ""
    }, [props.tagFilter, props.selectedListFlag])

    const searchInput = React.createRef()

    const search = (e) => {
        let searchTxt = searchInput.current.value
        // setSearchText(searchTxt)
        let tempArray = []
        let wave
        if (searchTxt !== "") {
            props.filteredConversations && props.filteredConversations.forEach(c => {
                //if the subject contains the searchTxt
                if (c.subject != undefined && c.subject.toLowerCase().indexOf(searchTxt.toLowerCase()) > -1) {
                    tempArray.push(c);

                }
                else {
                    if (c.waves) {
                        // flag use to verify that conversation won't be pushed more than once
                        for (let i = 0, flag = false, wave; i < c.waves.length; i++, flag = false) {
                            wave = c.waves[i]
                            if (wave.from &&
                                //ex: from = "michalgiladi"/ "Time"
                                (wave.from.indexOf('@') === -1 && wave.from.toLowerCase().indexOf(searchTxt) > -1 ||
                                    //ex: from = michalgiladi@gmail.codes
                                    wave.from.slice(0, wave.from.indexOf('@')).toLowerCase().indexOf(searchTxt) > -1)) {
                                tempArray.push(c)
                                flag = true

                            }
                            else
                                if (wave.body && wave.body.toLowerCase().search(searchTxt) !== -1) {
                                    tempArray.push(c);
                                    flag = true;

                                }

                                else {
                                    for (let j = 0; j < wave.to.length; j++) {
                                        let t = wave.to[j];
                                        //for email
                                        if (t.indexOf('@') > -1) {
                                            if (t.slice(0, t.indexOf('@')).toLowerCase().indexOf(searchTxt) > -1) {
                                                tempArray.push(c)
                                                flag = true
                                            }
                                        }
                                        //for group
                                        else {
                                            if (t.indexOf(searchTxt) > -1) {
                                                tempArray.push(c)
                                                flag = true
                                            }
                                        }
                                        if (flag) {
                                            break;
                                        }
                                    }
                                }
                            if (flag) {
                                break
                            }
                        }
                    }
                }
            })
            if (tempArray.length === 0)
                props.setConversationsForSearch('Not Found')
            else
                props.setConversationsForSearch(tempArray)
        }

        else {
            props.setConversationsForSearch("")
            // if (props.filteredConversations !== "empty") {
            //     props.setSelectedConversation(props.filteredConversations[0])
            // }
        }
    }
    const [bothSearch, setBothSearch] = useState(false)
    const showSearchCard = () => {
        if (props.displayRightCard === allText.searchConversations.search) {
            props.setDisplayRightCard('')
            props.setConversationsForSearch('')
            setBothSearch(false)
            return
        }
        props.setDisplayRightCard(allText.searchConversations.search)
        setBothSearch(true)

    }
    return (<>
        <div className={`searchDiv ${props.textColor == "dark" ? 'darkText' : 'lightText'} searchBG  `}>
            <input type="text" className={`searchInput ${bothSearch && "disableColor"}`} disabled={bothSearch} placeholder="Search for messages..." onKeyUp={search} ref={searchInput}></input>
            <span className="searchIconSpan"
                onClick={showSearchCard}
            >
                {
                    props.textColor == 'dark' ?
                        <img src={searchIconDark}></img>
                        :
                        <img src={searchIconLight}></img>

                }
            </span>
        </div>
    </>)
}

export default connect(
    (state) => {
        return {
            filteredConversations: state.conversations.filteredConversations,
            tagFilter: state.conversations.tagFilter,
            selectedListFlag: state.conversations.selectedListFlag,
            displayRightCard: state.conversations.displayRightCard,
            sourceFilter: state.conversations.sourceFilter,
            conversationsForSearch: state.conversations.conversationsForSearch,
            textColor: state.settings.textColor,
            selectedBackground: state.settings.selectedBackground

        }
    },
    (dispatch) => ({
        setDisplayRightCard: (val) => { dispatch(actions.setDisplayRightCard(val))},
        setConversationsForSearch: (val) => { dispatch(actions.setConversationsForSearch(val))},
        setSelectedConversation: (val) => { dispatch(actions.setSelectedConversation(val))},
        setIsMessageOpen: (val) => { dispatch(actions.setIsMessageOpen(val))}
    })
)(SearchConversations)