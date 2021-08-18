import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getAllSignaturesMidd, addSignatureMidd, editSignatureMidd, removeSignatureMidd, uploadPhotoSignatureMidd, uploadPhotoInFiles } from './middleware/signature.crud'
import { extractJwtMidd, getUserMidd, getContactsMidd, getCalenderMidd, getUsersEmailsMidd, getSourcesMidd, getWebhooksByUserMidd} from './middleware/init.crud'
import { getTagsMidd, addTagMidd, editTagMidd, deleteTagMidd } from './middleware/tags.crud'
import { getConversationsMidd, getSystemWavesMidd, deleteSystemWavesMidd, newConversationMidd, downloadFileMidd, newWaveMidd, editConversationsMidd, editConversationMidd, deleteConversationsMidd, deleteConversationMidd, uploadFilesMidd, sendEmailMidd, createSystemWave, markAsReadOrUnreadConversations, markAsTrashConversationsMidd } from './middleware/conversations.crud'
import { getGroupsMidd, addGroupMidd, deleteGroupMidd, updateGroupMidd } from './middleware/group.crud'
import { removeSpamMidd, addSpamMidd } from './middleware/spam.crud'
import { getDraftsMidd, addDraftMidd, editDraftMidd, deleteDraftMidd } from './middleware/drafts.crud'
import { getAllTemplatesMidd } from './middleware/templates.crud';
import { addDeal } from '../redux/middleware/deal.crud'
import { addMeet } from '../redux/middleware/meet.crud'
import { addTask } from '../redux/middleware/addTask.crud'
import { createLead, createContact } from './middleware/lead.crud'
import { checkSourseOfUsersMidd, CHECK_SOURCE_OF_USER } from './middleware/checkSourceOfUser.crud'
import { getSettings, changeTextColor, uploadPhoto, addBackgroundPhoto, deleteBackgroundPhoto, setBackGroundEmail } from './middleware/settings.crud'
import { getSubUsersMidd, newSubUser, deleteSubUserMidd,addMailChannels,removeMailChannels } from './middleware/subUsers.crud'
import { saveGoogeleTokenMidd, getLabelsGmailMidd, sendGmailMidd, getGmailAddressMidd, gmailListMessagesMidd, getIfGmailLabelsMidd } from './middleware/googleAuth.crud'
import { systemWaveForNotification, sendNotificationToAll, addTokenToNotification, createNewNotification, getAllNotaficaionsToManager, newUserToNotification } from './middleware/notification.crud'
import { getWebhookPropertiesMidd, setSelectedPropsMidd  ,updateNicknameMidd,toggleBlockMidd } from './middleware/webhook.crud'




const store = createStore(
        reducers,
        composeWithDevTools(applyMiddleware(thunk, checkSourseOfUsersMidd,
                getUserMidd, getContactsMidd, getUsersEmailsMidd, getSourcesMidd, 
                // saveGoogeleTokenMidd, getLabelsGmailMidd, sendGmailMidd, getGmailAddressMidd,
                addSignatureMidd, removeSignatureMidd, uploadPhotoSignatureMidd, getAllSignaturesMidd, editSignatureMidd, uploadPhotoInFiles,
                extractJwtMidd,
                getTagsMidd, addTagMidd, editTagMidd, deleteTagMidd, sendEmailMidd, createSystemWave,
                getConversationsMidd, getSystemWavesMidd, deleteSystemWavesMidd, uploadFilesMidd, downloadFileMidd, newConversationMidd, newWaveMidd, editConversationsMidd, editConversationMidd, deleteConversationsMidd, deleteConversationMidd,
                getGroupsMidd, addGroupMidd, deleteGroupMidd, updateGroupMidd,
                getDraftsMidd, addDraftMidd, editDraftMidd, deleteDraftMidd,
                getAllTemplatesMidd, 
                // gmailListMessagesMidd,
                 addDeal, addMeet,
                createLead, 
                // getIfGmailLabelsMidd,
                 removeSpamMidd, addSpamMidd, createContact,
                systemWaveForNotification, sendNotificationToAll, addTokenToNotification, createNewNotification, getAllNotaficaionsToManager, newUserToNotification,
                getWebhookPropertiesMidd, setSelectedPropsMidd,
                addTask,
                markAsTrashConversationsMidd,
                getSubUsersMidd, newSubUser, deleteSubUserMidd,

                getWebhooksByUserMidd, updateNicknameMidd, toggleBlockMidd,
                markAsReadOrUnreadConversations,
                addMailChannels,removeMailChannels,
                uploadPhoto, addBackgroundPhoto, setBackGroundEmail, deleteBackgroundPhoto,

                getSettings, changeTextColor
        ))
)
store.dispatch({ type: CHECK_SOURCE_OF_USER });

store.dispatch({ type: 'EXTRACT_JWT' });



export default store;





