// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setSourceFilter } from '../../redux/actions/conversation.actions';

// import './filter.scss'

// export default function Filter(props) {
//     const dispatch = useDispatch();

//     const sources = useSelector(state => state.init.sources)

//     const filterBySource = (source) => {
//         dispatch(setSourceFilter(source))
//         // setDisplayFilter(false)
//     }
//     return (
//         <div className="sourcesList">
//             { sources && sources.map(s =>
//                 <div className="source" onClick={() => filterBySource(s.name)}>
//                     <img className='srcImg mr-1' src={s.icon} alt="?"></img>
//                     <span>{s.name}</span>
//                 </div>)}
//         </div>
//     )
// }