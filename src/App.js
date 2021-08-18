// import './App.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import searchIcon from './components/search-conversations/assets/searchLight.svg'
// import { getAllSignaturesServer } from "./redux/actions/signature.actions";
// import { getConversations, getSystemWaves } from './redux/actions/conversation.actions'
// import { getEmails, getContacts, getUser, getSources, getWebhooksByUser } from './redux/actions/init.actions'
// import { getGmailAddressServer, getMesagesGmailServer, ifGmailLabels, getLabelsGmailServer } from './redux/actions/googleAuth.actions'

// import { getTags } from './redux/actions/tag.actions'
// import { getGroups } from './redux/actions/group.actions'
// import { getDrafts } from './redux/actions/draft.actions'
// import { getAllTemplatesServer } from './redux/actions/templates.actions'
// import { getSubUsers } from './redux/actions/subUsers.actions'
// import { getSettings } from './redux/actions/settings.actions'
import { useEffect } from 'react';
// import { trashAlt } from '@fortawesome/free-solid-svg-icons'
import NewFrame from './components/new-frame/NewFrame'
import Page404 from './components/not-found/Page404'
import "bootstrap/dist/css/bootstrap.min.css";
import Notification from './components/notification/notification'
import Signature from './components/signature/Signature';
import MeetCreate from './components/create-meeting/MeetCreate';
import LeadCreated from './components/create-lead/LeadCreated';
import ProtectedRoutes from './components/ProtectedRoute/ProtectedRoute'
import { OverlayTrigger, Popover, Button } from 'react-bootstrap'
import { actions } from './redux/actions/action'
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import NotificationButton from './components/new-message/notification';
import { AlertPage, ConfirmSignal } from './components/notifications/confirmSignal';
import { SuccessAddedNotification } from './components/notifications/successAddedNotification';
import Mobile from './components/mobile/mobile'
import { NotificationDetails } from './components/notifications/notificationDetails';

import keys from './Config/keys'


let TokenToString = document.cookie && document.cookie.includes( keys.JWT) ? document.cookie.split(";")
  .filter(s => s.includes(keys.JWT))[0].split("=").pop() : null;


function App(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.notifications.user);
  const setUser = (user) => dispatch(actions.setUser(user));
  const [name, setName] = useState(user)
  const nameRef = useRef('');
  useEffect(() => {
    // props.getUser()
    props.getUserServer()
    props.getSubUsersServer()
    props.getSettingsServer()
    props.getEmails();
    props.getContactsServer();
    props.getConversationsServer();
    props.getSystemWavesServer();
    props.getWebhooksByUser();
    props.getDraftsServer()
    props.getTagsServer();
    props.getGroupsServer();
    props.getAllSignaturesServer()
    props.getAllTemplatesServer()
    // if (props.googleAuth !== "null") {
    //   props.getGmailAddressServer()
    //   props.ifGmailLabels()
    //   props.getLabelsGmailServer()
    //   props.getMesagesGmailServer()
    // }
  }, [props.ifUserFromMobile])


  return (
    <div className='app'>
      <Notification />

      {props.ifUserFromMobile ?
        <Mobile ></Mobile> :
        <Router>
          <Switch>
            <Route component={ConfirmSignal} path={"/notification/:sender"} exact />
            {/* <Route component={SuccessAddedNotification} path={"/notification/:sender/addedSuccessful"} exact /> */}

            <ProtectedRoutes path={"/:userName"} user={TokenToString} component={NewFrame} />
            {/* <Route exact path="/:userName" component={NewFrame}> */}
            {/* </Route> */}

            <Route component={Page404}>
            </Route>

          </Switch>
        </Router>
      }
    </div>
  );
}
{/* <Route exact path="/:userName" component={NewFrame}> */ }
{/* </Route> */ }
export default connect(
  (state) => {
    return {
      // googleAuth: state.googleAuth.google_auth,
      ifUserFromMobile: state.init.ifUserFromMobile
      // username: state.user.username
    }
  }, 
  
  (dispatch) => ({
    getWebhooksByUser: (val) => { dispatch(actions.getWebhooksByUser(val))},
    getConversationsServer: (val) => { dispatch(actions.getConversationsServer(val))},
    getSystemWavesServer: (val) => { dispatch(actions.getSystemWavesServer(val))},
    getTagsServer: (val) => { dispatch(actions.getTagsServer(val))},
    getEmails: (val) => { dispatch(actions.getEmails(val))},
    getContactsServer: (val) => { dispatch(actions.getContactsServer(val))},
    getUserServer: (val) => { dispatch(actions.getUserServer(val))},
    getGroupsServer: (val) => { dispatch(actions.getGroupsServer(val))},
    getDraftsServer: (val) => { dispatch(actions.getDraftsServer(val))},
    getAllSignaturesServer: (val) => { dispatch(actions.getAllSignaturesServer(val))},
    getGmailAddressServer: (val) => { dispatch(actions.getGmailAddressServer(val))},
    getAllTemplatesServer: (val) => { dispatch(actions.getAllTemplatesServer(val))},
    getMesagesGmailServer: (val) => { dispatch(actions.getMesagesGmailServer(val))},
    ifGmailLabels: (val) => { dispatch(actions.ifGmailLabels(val))},
    getLabelsGmailServer: (val) => { dispatch(actions.getLabelsGmailServer(val))},
    getSources: () => { dispatch(actions.getSources())},
    getSubUsersServer: (val) => { dispatch(actions.getSubUsersServer(val))},
    getSettingsServer: (val) => { dispatch(actions.getSettingsServer(val))},
})
)(App);
