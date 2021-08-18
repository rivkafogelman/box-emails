import { filter, initial, keyBy } from 'lodash'
import produce from 'immer'
// import {
//     SET_FILTERED_CONVERSATIONS, SET_SELECTED_CONVERSATION, SET_IS_MESSAGE_OPEN, SET_IS_REPLAY_MESSAGE_OPEN, SET_TAG_FILTER, SET_SOURCE_FILTER,
//     SET_SELECTED_LIST_FLAG, ADD_CONVERSATION_ID_TO_EDIT, REMOVE_CONVERSATION_ID_TO_EDIT, SET_CONVERSATIONS_IDS_TO_EDIT, SET_CONVERSATIONS_FOR_SEARCH,
//     SET_UPLOAD_PROGRESS, SET_EMAIL_FROM_MASSAGE, SET_DISPLAY_RIGHT_CARD,
//     SET_EXPAND_MESSAGE, SET_CHANGE_DISPLAY_CONVER, SET_INDEX_CONVERSATION, SET_SELECTED_ALL_CONVERSATION, SET_DRAGGABLE_CONVERSATIONS_ID,
//     SET_START_DRAG,
//     SET_DRAGGABLE_ID_CONVERSATION,
//     SET_CLOSE, SET_CONV_SELECTED_IN_SHOE_CONV,
//     SET_WAVE,
//     REMOVE_CONVERSATIONS,
//     SET_SELECTED_CONVERSATION_WAVE_ID, MARK_AS_TRASH_CONVERSATIONS, MARK_AS_READ_OR_UNREAD_CONVERSATIONS, setFilteredConversations, setConversationsForSearch, setSelectedConversation, markAsTrashConversations
// } from '../actions/conversation.actions'
// import { SET_CONVERSATIONS, SET_SYSTEM_WAVES, ADD_CONVERSATION, ADD_WAVE, EDIT_CONVERSATION, EDIT_CONVERSATIONS, DELETE_SYSTEM_WAVES, DELETE_CONVERSATIONS, DELETE_CONVERSATION, } from '../middleware/conversations.crud'
// import { SET_CONVERSATIONS_GOOGLE } from '../middleware/googleAuth.crud'

import createReducer from "./reducerUtils";

export const initialState = {
    allConversations: [],
    systemWaves: [],
    filteredConversations: [],
    spamConversations: [],
    archivedConversations: [],
    flaggedConversations: [],
    starredConversations: [],
    acceptedConversations: [],
    sentConversations: [],
    trashConversations: [],
    conversationsIdsToEdit: [],
    conversationsForSearch: [],
    //contains the selected list name to show it: sent, box, archived...
    selectedListFlag: "Box",
    //מיותר- למחוק
    // selectedListFlag1: "Box",
    //the source name to filter the conversations
    sourceFilter: "All",
    //the tag id to filter the conversations
    tagFilter: "",
    selectedConversation: "empty",
    selectedConversationWaveId: null,
    isMessageOpen: false,
    isReplyMessageOpen: false,
    teams: [],
    flagsList: { all: 'All', box: 'Box', sent: 'Sent', favorites: 'Favorites', drafts: "Drafts", archived: 'Archived', systemWaves: "Leader", signature: "Signatures", sources: 'Sources', lables: 'Labels', contactList: 'Contacts', google: "Google", templates: 'Templates', settings: 'Settings', more: 'More', followUp: 'FollowUp', calenderList: 'Calender', groups: 'Groups', spam: 'Spam', usersManager: 'UsersManager', webhook: 'Webhook', trash: 'Trash', notes: 'Notes', allList: 'AllList' },
    displaySystemWaves: false,
    ifToFilter: true,
    emailFromAddress: "",
    uploadProgress: 0,
    displayRightCard: "meet",
    expandMessage: false,
    changeDisplayConver: true,
    indexListConversation: 0,
    draggableIdConversation: "",
    startDrag: false,
    waveSelect: false,
    close: false,
    convSelectedShowOpen: "empty",
    cntInbox: 0,
    groups: [],
    userEmail: "",
    mailChannels: []
}

let conversationsTemp = []

const conversationReducer = {
    setConversations(state, action) {
        let x = action.payload.conversations
        //.conversations;
        x = x.filter(conversation => conversation.waves.length !== 0)
        x.sort(function compare(a, b) {
            // sort by pinDate
            var dateA = new Date(a.waves[a.waves.length - 1].timestamp);
            var dateB = new Date(b.waves[b.waves.length - 1].timestamp);
            let todayDate = (new Date()).toISOString().split('T')[0]
            if (a.flagged && a.flagged.bool) {
                let tempDate = new Date(a.flagged.date).toISOString().split('T')[0]
                let dateFlaggedA = new Date(a.flagged.date)
                if (tempDate === todayDate) {
                    let today = new Date()
                    if (dateFlaggedA.getHours() < today.getHours())
                        return dateB - dateFlaggedA
                    else {
                        if (dateFlaggedA.getHours() == today.getHours()) {
                            if (dateFlaggedA.getMinutes() <= today.getMinutes())
                                return dateB - dateFlaggedA
                        }
                    }
                }
            }
            else if (b.flagged && b.flagged.bool) {
                let tempDate = new Date(b.flagged.date).toISOString().split('T')[0]
                let dateFlaggedB = new Date(b.flagged.date)
                if (tempDate === todayDate)
                    return dateFlaggedB - dateA
            }
            return dateB - dateA;
        })

        // x.map(a => state.allConversations.push(a))
        state.allConversations = x
        state.userEmail = action.payload.userEmail
        state.mailChannels = action.payload.mailChannels
        setToLists(state)
    },
    setSystemWaves(state, action) {
        let y = action.payload
        if (y.length) {
            y.sort(function compare(a, b) {
                var dateA = new Date(a.timestamp);
                var dateB = new Date(b.timestamp);
                return dateB - dateA;
            })
        }
        state.systemWaves = y
    },
    addConversation(state, action) {
        //to save also the accepted if he sent to himself-
        //changed by sara malmud -to save only one conversation if the user sent to himself
        conversationsTemp = state.allConversations
        conversationsTemp.push(action.payload.newConversation)
        conversationsTemp.sort(function compare(a, b) {
            var dateA = new Date(a.waves[a.waves.length - 1].timestamp);
            var dateB = new Date(b.waves[b.waves.length - 1].timestamp);
            return dateB - dateA;
        })
        state.allConversations = conversationsTemp
        setToLists(state)
        // state.allConversations = x
        // state.allConversations.push(action.payload.newConversation)
        // action.payload.newContactsToAdd.forEach(c => { addContact(c) })

    },
    addWave(state, action) {
        let con = state.allConversations.find(c => c._id === action.payload.newWave.conversation)
        con.waves.push(action.payload.newWave)
        if (action.payload.conversation) {
            con.readed = action.payload.conversation.readed
            con.readedByRecipients = action.payload.conversation.readedByRecipients
        }
        // when the new wave is a reply and the current user doesnt include in to:
        // if (!action.payload.newWave.reply) {
        //     con.readed = false;
        // }
        state.allConversations.sort(function compare(a, b) {
            var dateA = new Date(a.waves[a.waves.length - 1].timestamp);
            var dateB = new Date(b.waves[b.waves.length - 1].timestamp);
            return dateB - dateA;
        })
        state.selectedConversation = state.allConversations[0]
        setToLists(state)
    },
    editConversation(state, action) {
        let convy = action.payload.conversation
        let c;

        if (convy) {
            if (state.selectedListFlag === state.flagsList.systemWaves) {
                c = state.systemWaves.find(f => f._id === convy._id)
            }
            else {
                c = state.allConversations.find(f => f && f._id === convy._id)
            }

            if (c) {
                c.tag = convy.tag
                c.archived = convy.archived
                c.starred = convy.starred
                c.readed = convy.readed
                c.flagged = convy.flagged
            }
            if (action.payload.field === "starred" || action.payload.field === "archived" || action.payload.field === "followUp" || action.payload.field === "spam") {
                // setToLists(state)
            }
            else {
                //change the filteredConversations
                let fc = state.filteredConversations.find(f => f._id === convy._id)
                if (fc) {
                    fc.tag = convy.tag
                    fc.archived = convy.archived
                    fc.starred = convy.starred
                    fc.readed = convy.readed
                    fc.flagged = convy.flagged
                }
            }
            setToLists(state)
        }
    },
    editConversations(state, action) {
        let conToEdit;
        if (action.payload.field === "starred" || action.payload.field === "archived") {
            action.payload.conversations.forEach(c => {
                if (state.selectedListFlag === state.flagsList.systemWaves) {
                    conToEdit = state.systemWaves.find(a => a._id === c._id)
                }
                else {
                    conToEdit = state.allConversations.find(a => a._id === c._id)
                }
                conToEdit.starred = c.starred
                conToEdit.tag = c.tag
                conToEdit.archived = c.archived
                conToEdit.readed = c.readed
            })
        }
        else {
            let fltrConToEdit = ""
            action.payload.conversations.forEach(c => {
                if (state.selectedListFlag === state.flagsList.systemWaves) {
                    conToEdit = state.systemWaves.find(a => a._id === c._id)
                }
                else {
                    conToEdit = state.allConversations.find(a => a._id === c._id)
                }
                conToEdit.starred = c.starred
                conToEdit.tag = c.tag
                conToEdit.tags = c.tags
                conToEdit.archived = c.archived
                conToEdit.readed = c.readed

                fltrConToEdit = state.filteredConversations.find(a => a._id === c._id)
                fltrConToEdit.starred = c.starred
                fltrConToEdit.tag = c.tag
                fltrConToEdit.tags = c.tags
                fltrConToEdit.archived = c.archived
                fltrConToEdit.readed = c.readed
                //edit the selected conversation fields
                if (state.selectedConversation._id === c._id) {
                    // state.selectedConversation[action.payload.field]=c[action.payload.field]
                    state.selectedConversation.starred = c.starred
                    state.selectedConversation.tag = c.tag
                    state.selectedConversation.tags = c.tags
                    state.selectedConversation.archived = c.archived
                    state.selectedConversation.readed = c.readed
                }
            })
        }
        setToLists(state);
        state.conversationsIdsToEdit = []
    },

    editConversationsBefore(state, action) {
        debugger
        let conversationToEdit
        if (Array.isArray(action.payload.conversations))
            action.payload.conversations.forEach(c => {
                conversationToEdit = state.filteredConversations.find(f => f._id === c._id)
                if (c.tag != undefined) {
                    if (c.tag != null)
                        conversationToEdit.tags.push(c.tag)
                    else
                        conversationToEdit.tags = []
                }
                if (c.starred != null)
                    conversationToEdit.starred = c.starred
            });
    },
    editConversationsErr(state, action) {
        debugger
        let conversationToCancalEdit
        if (Array.isArray(action.payload.conversations))
            action.payload.conversations.forEach(c => {
                conversationToCancalEdit = state.filterConversations.find(f => f._id == c._id)
                if (c.tag && c.tag != null)
                    conversationToCancalEdit.tags = conversationToCancalEdit.tags.filter(t => t != c.tag)
                if (c.starred != null)
                    conversationToCancalEdit.starred = !c.starred
            });
    },
    deleteConversation(state, action) {
        state.allConversations = state.allConversations.filter((con) => con._id !== action.payload)
        setToLists(state)
    },

    setFilteredConversations(state, action) {
        state.filteredConversations = action.payload.filteredConversations
        state.selectedConversation = action.payload.selectedConversation

    },
    setConversationsForSearch(state, action) {
        state.conversationsForSearch = action.payload.conversations

    },
    setSelectedConversation(state, action) {
        state.selectedConversation = action.payload

    },
    convSelectedInShowConv(state, action) {
        state.convSelectedShowOpen = action.payload

    },
    setIsMessageOpen(state, action) {
        state.isMessageOpen = action.payload

    },
    setIsReplyMessageOpen(state, action) {
        state.isReplyMessageOpen = action.payload

    },
    setWave(state, action) {
        state.waveSelect = action.payload

    },
    setSourceFilter(state, action) {
        state.sourceFilter = action.payload
        filterConversations(state)

    },
    setTagFilter(state, action) {
        state.tagFilter = action.payload

    },
    setClose(state, action) {
        state.close = action.payload

    },
    setSelectedListFlag(state, action) {
        state.selectedListFlag = action.payload
        state.sourceFilter = "conversationsTofilter"
        state.sourceFilter = "all"
        state.conversationsIdsToEdit = []
        filterConversations(state)


    },
    addConversationIdToEdit(state, action) {
        state.conversationsIdsToEdit.push(action.payload)

    },
    setConversationsIdsToEdit(state, action) {
        state.conversationsIdsToEdit = []
        //action.payload.check-- if to check all or not
        if (action.payload.check) {
            //if the conversations are filteted by search - add only this conversations ids to conversationsIdsToEdit
            if (action.payload.isForSearch) {
                state.conversationsForSearch.forEach(c => state.conversationsIdsToEdit.push(c._id))
            }
            else {
                state.filteredConversations.forEach(c => state.conversationsIdsToEdit.push(c._id))
            }
        }
        setToLists(state)
    },

    markAsReadOrUnreadConversations(state, action) {
        let conversationToEdit = "";
        action.payload.conversations.forEach(c => {
            if (state.selectedListFlag === state.flagsList.systemWaves) {
                conversationToEdit = state.systemWaves.find(a => a._id === c._id)
            }
            else {
                conversationToEdit = state.allConversations.find(a => a._id === c._id)
            }
            // find the updated conversaton in all conversations and update;
            conversationToEdit.readed = c.readed;
        })
        setToLists(state);
        state.conversationsIdsToEdit = []
    },
    deleteSystemWaves(state, action) {
        let systemTemp = []
        // systemTemp = state.systemWaves.filter(s => {
        //     !state.conversationsIdsToEdit.find(id => id === s._id)
        // })
        state.systemWaves.forEach(s => {
            if (!state.conversationsIdsToEdit.find(id => id === s._id)) {
                systemTemp.push(s)
            }
        })
        state.systemWaves = systemTemp
        state.conversationsIdsToEdit = []
        filterConversations(state)
    },
    deleteConversations(state, action) {
        conversationsTemp = []
        state.conversationsIdsToEdit = action.payload
        state.allConversations.forEach(con => {
            if (!state.conversationsIdsToEdit.find(cId => cId === con._id)) {
                conversationsTemp.push(con)
            }
        })
        state.allConversations = conversationsTemp
        state.conversationsIdsToEdit = []
        setToLists(state)
    },
    deleteConversation(state, action) {
        state.allConversations = state.allConversations.filter((con) => con._id !== action.payload)
        setToLists(state)
    },

    setFilteredConversations(state, action) {
        state.filteredConversations = action.payload.filteredConversations
        state.selectedConversation = action.payload.selectedConversation
    },
    setConversationsForSearch(state, action) {
        state.conversationsForSearch = action.payload

    },
    setSelectedConversation(state, action) {
        state.selectedConversation = action.payload

    },
    convSelectedInShowConv(state, action) {
        state.convSelectedShowOpen = action.payload

    },
    setIsMessageOpen(state, action) {
        state.isMessageOpen = action.payload

    },
    setIsReplyMessageOpen(state, action) {
        state.isReplyMessageOpen = action.payload

    },
    setWave(state, action) {
        state.waveSelect = action.payload

    },
    setSourceFilter(state, action) {
        state.sourceFilter = action.payload
        filterConversations(state)
    },
    setTagFilter(state, action) {
        state.tagFilter = action.payload

    },
    setClose(state, action) {
        state.close = action.payload

    },
    setSelectedListFlag(state, action) {
        state.selectedListFlag = action.payload
        state.sourceFilter = "conversationsTofilter"
        state.sourceFilter = "all"
        state.conversationsIdsToEdit = []
        filterConversations(state)


    },
    addConversationIdToEdit(state, action) {
        state.conversationsIdsToEdit.push(action.payload)

    },
    setConversationsIdsToEdit(state, action) {
        state.conversationsIdsToEdit = []
        //action.payload.check-- if to check all or not
        if (action.payload.check) {
            //if the conversations are filteted by search - add only this conversations ids to conversationsIdsToEdit
            if (action.payload.isForSearch) {
                state.conversationsForSearch.forEach(c => state.conversationsIdsToEdit.push(c._id))
            }
            else {
                state.filteredConversations.forEach(c => state.conversationsIdsToEdit.push(c._id))
            }
        }
    },
    removeConversationIdToEdit(state, action) {
        state.conversationsIdsToEdit = state.conversationsIdsToEdit.filter((id) => id !== action.payload)

    },
    setEmailFromMassage(state, action) {
        state.emailFromAddress = action.payload

    },
    setConversationsGoogle(state, action) {
        action.payload.map(a => {
            console.log("GGGMMAAAIIILL", a);
            state.allConversations.push(a)
        })
    },
    setUploadProgress(state, action) {
        state.uploadProgress = action.payload

    },
    setDisplayRightCard(state, action) {
        state.displayRightCard = action.payload

    },
    setExpandMessage(state, action) {
        state.expandMessage = action.payload
    },
    setChangeDisplayConver(state, action) {
        state.changeDisplayConver = action.payload

    },
    draggable(state, action) {
        state.draggableIdConversation = action.payload

    },
    setSelectedAllConversation(state, action) {
        let conversationsArray = []
        state.conversationsIdsToEdit = []
        if (action.payload) {
            if (state.selectedListFlag === state.flagsList.systemWaves)
                conversationsArray = state.systemWaves
            // state.conversationsIdsToEdit = state.systemWaves
            else
                if (state.conversationsForSearch.length != 0)
                    conversationsArray = state.conversationsForSearch
                // state.conversationsIdsToEdit = state.conversationsForSearch
                else
                    conversationsArray = state.filteredConversations
            // state.conversationsIdsToEdit = state.filteredConversations
            conversationsArray.forEach(conversation => {

                state.conversationsIdsToEdit.push(conversation._id)
            });
        }
    },
    setIndexConversation(state, action) {
        if (action.payload >= 0 && action.payload <= state.filteredConversations.length)
            state.indexListConversation = action.payload

    },
    setStartDrag(state, action) {
        state.startDrag = action.payload

    },
    setDraggableIdConversation(state, action) {
        state.draggableIdConversation = action.payload

    },
    setSelecteConversationWaveId(state, action) {
        state.selectedConversationWaveId = action.payload

    },
    markAsTrashConversations(state, action) {
        let convToEdit = "";
        action.payload.conversations.forEach(c => {
            if (state.selectedListFlag === state.flagsList.systemWaves) {
                convToEdit = state.systemWaves.find(a => a._id === c._id)
            }
            else {
                convToEdit = state.allConversations.find(a => a._id === c._id)
            }
            // find the updated conversaton in all conversations and update;
            convToEdit.trash = c.trash;
        })
        setToLists(state);
        state.conversationsIdsToEdit = []
    },
    markAsReadOrUnreadConversations(state, action) {
        let conversationToEdit = "";
        action.payload.conversations.forEach(c => {
            if (state.selectedListFlag === state.flagsList.systemWaves) {
                conversationToEdit = state.systemWaves.find(a => a._id === c._id)
            }
            else {
                conversationToEdit = state.allConversations.find(a => a._id === c._id)
            }
            // find the updated conversaton in all conversations and update;
            conversationToEdit.readed = c.readed;
        })
        setToLists(state);
        state.conversationsIdsToEdit = []
    }
}

export default produce((state, action) => createReducer(state, action, conversationReducer), initialState);

const setToLists = (state) => {
    state.cntInbox = 0;
    let spamArray = []
    let allArray = []
    let starredArray = []
    let archivedArray = []
    let flaggedArray = []
    let acceptedArray = []
    let sentArray = []
    let trashArray = []
    if (state.allConversations) {
        state.allConversations.forEach(c => {
            if (c.spam || (c.trash && c.trash.bool) || c.archived) {
                if (c.trash && c.trash.bool) {
                    trashArray.push(c)
                }
                else {
                    if (c.spam) {
                        spamArray.push(c);
                        if (c.starred) {
                            starredArray.push(c)
                        }
                    }
                    else {
                        if (c.archived) {
                            archivedArray.push(c);
                            if (c.starred) {
                                starredArray.push(c)
                            }
                        }
                    }
                }
            }
            // in case the conversation will be in box/sent => allArray
            else {
                allArray.push(c)
                if (c.flagged && c.flagged.bool) {
                    flaggedArray.push(c);
                    if (c.starred) {
                        starredArray.push(c)
                    }
                }
                else {
                    if (c.starred) {
                        starredArray.push(c)
                    }
                }
                setAcceptedSent(c, acceptedArray, sentArray, state);
            }
        })
    }
    state.spamConversations = spamArray;
    state.archivedConversations = archivedArray;
    state.starredConversations = starredArray;
    state.flaggedConversations = flaggedArray;
    state.sentConversations = sentArray;
    state.acceptedConversations = acceptedArray;
    state.trashConversations = trashArray;
    // state.allConversations = allArray;
    filterConversations(state)
}

const setAcceptedSent = (c, acceptedArray, sentArray, state) => {
    // console.log(state.allConversations);

    let conditionsArray = []
    if (state.mailChannels && state.mailChannels.length !== 0) {
        conditionsArray = [...state.mailChannels]
    }
    let accepted = false, sent = false;
    let userName = window.location.pathname.split('/')[1];
    if (state.userEmail !== undefined && state.userEmail !== '') {
        userName = state.userEmail.split('@')[0]
    }
    conditionsArray.push(userName)

    c.waves.forEach(w => {

        if (w.from &&
            conditionsArray.includes(w.from.split('@mails.codes')[0])) {
            sent = true;
        }
        if (w.to) {
            //check all recipients if the user includes
            w.to.every((to) => {
                if (to && conditionsArray.includes(to.split('@mails.codes')[0])) {
                    accepted = true
                    return false
                }
                else {
                    //if the user included in group
                    let group = state.groups.find(g => g.groupName === to)
                    if (group) {
                        if (group.members.includes(`${userName}@mails.codes`)) {
                            accepted = true
                            return false
                        }
                        else {
                            return true
                        }
                    }
                    else {
                        return true
                    }
                }
            })
        }
    })
    if (accepted) {
        acceptedArray.push(c);
        if (c.readed === false && c.waves) {
            let toMe = false;
            for (let index = 0; index < c.waves.length && !toMe; index++) {
                const wave = c.waves[index];
                if (wave.to.includes(`${userName}@mails.codes`)) {
                    state.cntInbox += 1;
                    toMe = true;
                }
            }
        }
    }
    if (sent) {
        sentArray.push(c)
    }
}

const filterConversations = (state) => {
    state.filteredConversations = []
    let index = 0
    let filteredArray = []
    let conversationsTofilter = []
    const list = state.flagsList
    const sourceFilter = state.sourceFilter
    if (state.selectedListFlag) {
        switch (state.selectedListFlag) {
            case list.all:
                conversationsTofilter = state.allConversations
                break
            case list.box:
                conversationsTofilter = state.acceptedConversations
                break
            case list.sent:
                conversationsTofilter = state.sentConversations
                break
            case list.archived:
                conversationsTofilter = state.archivedConversations
                break
            case list.favorites:
                conversationsTofilter = state.starredConversations
                break
            case list.followUp:
                conversationsTofilter = state.flaggedConversations
                break
            case list.spam:
                conversationsTofilter = state.spamConversations
                break;
            case list.trash:
                conversationsTofilter = state.trashConversations
                break;
            case list.systemWaves:
                conversationsTofilter = state.systemWaves
                if (sourceFilter.toLowerCase() !== "all") {
                    let sourceLeaderArr = [];
                    conversationsTofilter.forEach(c => {
                        if (sourceFilter.toLowerCase() === c.source.toLowerCase())
                            sourceLeaderArr.push(c)
                    })
                    conversationsTofilter = sourceLeaderArr;
                }
                break;
            case list.google:
                {
                    let array = state.allConversations.filter(con => con.source.toLowerCase() === sourceFilter.toLowerCase())
                    conversationsTofilter = array
                    break
                }
            default: console.log('in default for filter conversation');
                break
        }
    }
    if (conversationsTofilter.length) {
        conversationsTofilter.forEach(c => {
            if (sourceFilter.toLowerCase() === 'all' ||
                (c.source && sourceFilter.toLowerCase() === c.source.toLowerCase() &&
                    (!state.tagFilter || state.tagFilter === c.tag))
            ) {
                filteredArray.push(c)
                index++
            }
        })
        if (index) {
            state.filteredConversations = filteredArray
            // state.selectedConversation = state.filteredConversations[0]
            // console.log('filteredConversations, ', filteredArray)
        }
        //if delete open conversation
        // if (state.selectedConversation && !filteredArray.find(c => c._id === state.selectedConversation._id)) {
        //     state.selectedConversation = filteredArray[0]
        // }
    }
}
