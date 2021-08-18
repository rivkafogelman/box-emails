import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import hub from '../../assets/hubInHeader.svg';
import meeting from '../../assets/meeting.svg';
import { BiErrorCircle } from 'react-icons/bi';
import "antd/dist/antd.css";
import './notification.scss'
import { actions } from '../../redux/actions/action';
// import { UNDO_LAST_NOTIFICATION } from '../../redux/actions/notification.actions';

export default function Notification(props) {
    const dispatch = useDispatch();
    const icon = (icon) => {
        switch (icon) {
            case 'meeting': return <img src={meeting} alt=''/>;
            case 'hub': return <img src={hub} alt=''/>;
            case 'err': return <BiErrorCircle />;
            default: return null;
        }
    }
    const undoNotification = () => {
        notification.close(baseNotification.key);
        // dispatch({ type: UNDO_LAST_NOTIFICATION })
        dispatch(actions.undoLastNotification())
    }

    const currentNotification = useSelector(state => state.notification.currentNotification);
    const baseNotification = currentNotification ? {
        key: 'notification...',
        message: <div className='d-flex justify-content-between'>
            <div>{currentNotification.info || 'Default'}</div>
            {!currentNotification.notUndo&&
            <div className='pointer' onClick={undoNotification}>{'Undo'}</div>}
        </div>,
        className: 'custom-class customNotification',
        placement: 'bottomLeft',
        icon: icon(currentNotification.icon),
        duration: 3,
        style: {
            borderTopColor: currentNotification.color || '#1280de',
            backgroundColor: currentNotification.backgroundColor || 'white',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            width: 300,
        },
    } : ''
    // occoured once!!
    useEffect(() => {
        if (baseNotification)
            notification.open(baseNotification);
    })

    return (
        <></>
    );
};
