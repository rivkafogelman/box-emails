import React, { useState, useEffect } from 'react';

import { actions } from '../../redux/actions/allActions'
import { useDispatch, useSelector } from 'react-redux';

import firebase from '../../firebase';
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import './notifications.scss'
// import './notifications.css'

import { FaRegBell } from 'react-icons/fa'


export const ConfirmSignal = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const addToken = (value) => dispatch(actions.addTokenToNotification(value))
  const checkTokenExsist = (value) => dispatch(actions.checkToken(value))
  const [token, setToken] = useState('')
  const [isAdded, setIsAdded] = useState(false)
  const { sender } = useParams();

  useEffect(() => {

    console.log("env", process.env.REACT_APP_FIREBASE_API_KEY, process.env.JWT)
    localStorage.removeItem('des');
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
      const messaging = firebase.messaging();
      Notification.requestPermission().then(() => {
        return messaging.getToken();
      }).then((token) => {

        console.log('token', token)
        setToken(token)
        // dispatch(actions.setToken(token))
        // props.setFcmToken(token)

      }).catch((err) => {
        console.log(err)
      })

      messaging.onMessage(function (payload) {

        // self.registration.hideNotification();
        try {
          console.log('Message received. ', payload);

          let noteTitle = payload.notification.title;
          let noteOptions = {
            title: payload.notification.title ? payload.notification.title : 'Leader',
            body: payload.notification.body ? payload.notification.body : 'new conversation from leader sending now',
            icon: payload.notification.icon ? payload.notification.icon : 'leaderNew.png'
          };

          console.log("title ", noteTitle, " ", payload.notification.body);

          new Notification(noteTitle, noteOptions);
        }
        catch (err) {
          console.log('Caught error: ', err);
        }
      });
    }
    console.log('token from component', token)
    console.log('component check', checkTokenExsist(token))
  }, [])

  const add = () => {
    addToken({ 'sender': sender, 'token': token })
    setIsAdded(true)
    // history.push(`/notification/${sender}/addedSuccessful`);
  }

  const close = () => {
    window.open("blank", "_self")
    window.close();
  }
  return (
    <div className='warpConfirm'>
      <Card className='cardConfirm col-4 text-center pb-4'>
        <Card.Body>
          <Card.Title>
            <div className="d-flex justify-content-strat">
              <Button
                variant="light"
                size="sm"
                onClick={(e) => close()}
              >
                X
              </Button>
            </div>
            <FaRegBell className='bellIcon' />
          </Card.Title>
          {!isAdded && <>
            <Card.Text className='cardBodyText h5 text-center my-4'>
              Do you want to get notifications
              <div className='my-2 font-weight-bold'>
                From {sender}
              </div>
            </Card.Text>
            <Button
              size="md"
              variant="link"
              className='px-4'
              onClick={(e) => close()}
            >
              No thanks
            </Button>
            <Button
              size="md"
              variant="primary"
              className='px-4'
              onClick={(e) => add()}
            >
              Accept
            </Button>
          </>}
          {isAdded && <>
            <Card.Text className='h5 text-center my-4 cardBodyText'>
              <div className='my-2 font-weight-bold'>
                You added to list!
              </div>
              Now you stay updated
            </Card.Text>
            <Button
              size="md"
              variant="primary"
              className='px-5'
              onClick={(e) => close()}
            >
              Ok
            </Button>
          </>}
        </Card.Body>
      </Card>
    </div>
  )
}