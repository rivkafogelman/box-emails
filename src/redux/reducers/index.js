import conversationReducer from './conversation.reducer'
import initReducer from './init.reducer'
import tagsReducer from './tag.reducer'
import signatureReducer from './signature.reducer'
import groupsReducer from './group.reducer'
import draftsReducer from './draft.reducer'
import addTaskReducer from './addTask.reducer'
import addDealReducer from './addDeal.reducer'
import addMeetReducer from './addMeet.reducer'
import templatesReducer from './templates.reducer'
import { combineReducers } from 'redux';
import googleAuthReducer from './googleAuth.reducer'
import notificationReducer from './notification.reducer'
import leadReducer from './lead.reducer'
import displaySettingsReducer from './displaySettings.reducer'
import notifications from './notifications.reducer'
import webhookReducer from './webhook.reducer'
import subUsersReducer from './subUsers.reducer'
import settingsReducer from './settings.reducer'

export default combineReducers({
    conversations: conversationReducer,
    tags: tagsReducer,
    init: initReducer,
    signature: signatureReducer,
    groups: groupsReducer,
    drafts: draftsReducer,
    task: addTaskReducer,
    deal: addDealReducer,
    meet: addMeetReducer,
    googleAuth: googleAuthReducer,
    templates: templatesReducer,
    notification: notificationReducer,
    lead: leadReducer,
    displaySettings: displaySettingsReducer,
    notifications: notifications,
    webhook: webhookReducer,
    subUsers: subUsersReducer,
    settings: settingsReducer

})