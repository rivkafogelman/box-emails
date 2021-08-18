import React from 'react';
import { useSelector } from 'react-redux';
export default function Show(props) {
    const { currWave, show } = props
    const chars = ['<', '>', ' '];
    const date = new Date(currWave.timestamp)
    const contacts = useSelector(state => state.init.contacts)
    const fromName = currWave.from.includes('@') ? contacts.find(c => c.email === currWave.from) ? contacts.find(c => c.email === currWave.from).name : null : currWave.from;
    const fromEmail = currWave.from.includes('@') ? currWave.from : contacts.find(c => c.name === currWave.from) ? contacts.find(c => c.name === currWave.from).email : null;


    return (
        <>   {show &&
            <div className='Show'>
                <div style={{ borderLeft: '#7B7D86 1px solid', height: '50px', marginLeft: '5px', marginTop: '3px' }}></div>
                <div className='bold' style={{ color: '#0A102E' }}>On {date.toString()} {fromName}
                    {fromEmail &&
                        chars[0] + fromEmail + chars[1]}
                    {chars[2]}
                    wrote:</div>
                <div style={{ color: '#7B7D86' }} dangerouslySetInnerHTML={{ __html: currWave.body }} />
            </div>}</>
    )
}