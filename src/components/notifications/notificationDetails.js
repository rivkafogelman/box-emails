import React, { useState } from 'react';

import { actions } from '../../redux/actions/allActions'
import { useDispatch } from 'react-redux';

import firebase from '../../firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button ,Form ,Card} from 'react-bootstrap';
import './notifications.css'
import {FaRegBell} from 'react-icons/fa'
import { CgEnter } from 'react-icons/cg';
import { sendEmailServer } from '../../redux/actions/conversation.actions';
import { StepTitle } from 'semantic-ui-react';


export const NotificationDetails=(props)=>{
  const dispatch = useDispatch();

  const [title,setTitle]=useState('')
  const [body,setBody]=useState('')

  const sendNotificationToAll = (notification) => dispatch(actions.sendNotificationToAll(notification))

  const send=()=>{
    console.log('send func')
    if(title&&body){
      sendNotificationToAll(
      {"notification":
        {
          "title":title,
          "body":body
        }
      })
    setTitle('')
    setBody('')
    }
  }
    return (
    <div className='flex-containerr'style={{backgroundColor:'#7B7D86'}}>
    <Card 
      className='col-4  text-center  pb-4'
      style={{borderTop:'6px solid #3598F4'}}
    // style={{border:'none'}}
    >
  <Card.Body>
    <Card.Title>
      <div className="d-flex justify-content-strat">
      {/* <div className='btn btn-light'>X</div> */}
      <Button variant="light" size="sm">X</Button>
      </div>
       {/* <div 
        className='h1 m-auto p-auto'
        className="d-flex justify-content-center h1"
        style={{border:'3px solid black',borderRadius:'50%'}}
        >  */}
        <FaRegBell  style={{color:'#3598F4',
                            borderRadius:'50%',
                            boxShadow: '0px 3px 6px #00000029',
                            padding:'2%',
                            fontSize: '5rem'}}
        />
      {/* </div> */}
    </Card.Title>
    <Card.Text className='h5 text-center my-4' style={{color:'#7B7D86'}}>
    <input className='row my-2' style={{width:'100%'}} placeholder='title'value={title}onChange={(e)=>setTitle(e.target.value)}></input>
    <input className='row my-2' style={{width:'100%'}} placeholder='body'value={body}onChange={(e)=>setBody(e.target.value)}></input>
    </Card.Text> 
   
      <Button size="md" variant="primary" className='px-4'  onClick={(e)=>send()}>Send Notification</Button>
  </Card.Body>
</Card>

   </div>)
}