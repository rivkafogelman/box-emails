import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { actions } from '../../redux/actions/allActions'
import { useDispatch, useSelector } from 'react-redux';
// import {  } from '@material-ui/core';
import { Button, Form } from 'react-bootstrap';

export default function NotificationButton(props) {
    const dispatch = useDispatch();
    const getNotifications = () => dispatch(actions.getAllNotaficaionsToManager())
    const notificationsList = useSelector(state => state.notifications.allNotifications);
    const addUserToNotification = (notificationId) => dispatch(actions.newUserToNotification(notificationId))
    const addNotification = (notification) => dispatch(actions.createNewNotification(notification))
    const [name, setName] = useState('')
    const [code, setCode] = useState('')

    const add = (e) => {
        console.log('add: ' + e.target.id)
        addUserToNotification({ "notificationId": e.target.id })
    }
    const remove = (e) => {
        console.log('remove: ' + e.target.id)
    }
    const createNotif = () => {
        if (name && code) {
            addNotification({
                "newNotification": {
                    "code": code,
                    "name": name,
                    "usersList": []
                }
            })
            setName('')
            setCode('')
        }
    }


    const checkType = (typeing) => {
        if (typeing === 'push:') {
            getNotifications();
            if (notificationsList === '') {
                addNotification({
                    "newNotification": {
                        "code": 'push:',
                        "name": 'notification',
                        "usersList": []
                    }
                })

            }
        }

        return (
            <>
                {/*   
            <Form className='col-4'
            style={{width:'20%',border:'1px solid black'}}
            className='m-auto p-auto'
            >
            <Button variant="primary"onClick={(e)=>getNotifications()}>
                Display Notifications
            </Button>

    {notificationsList && notificationsList.map(notif => (
      <Form.Group controlId="formBasicCheckbox"className='p-auto'>
            <Form.Check 
                type="checkbox" 
                label={notif._id} 
                onChange={(e)=>e.target.checked===true?add(e):remove(e)}
            />
        </Form.Group>
    ))}
</Form>

         <Form 
         style={{width:'20%',border:'1px solid black'}}
         className='col-8 m-auto p-auto'
         >
    <Form.Group>
        <Form.Label classname='font-weight-bold'>Create New Notification:</Form.Label>
    </Form.Group>
<Form.Group controlId="formBasicEmail">
    <Form.Label>Enter name</Form.Label>
    <Form.Control 
        type="text" 
        placeholder="Notification" 
        value={name}
        onChange={(e)=>setName(e.target.value)}/>
</Form.Group>

<Form.Group controlId="formBasicPassword">
    <Form.Label>Enter Code</Form.Label>
    <Form.Control 
        type="text" 
        placeholder="NOTIFICATION" 
        value={code}
        onChange={(e)=>setCode(e.target.value)}
    />
</Form.Group>
<Button variant="primary"onClick={(e)=>createNotif()}>
    create notification
</Button>
</Form>
  */}
                <input onBlur={(e) => checkType(e.target.value)} size='10' />
            </>)
    }
}