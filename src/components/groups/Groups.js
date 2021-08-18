import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
// import { setCurrentGroup } from '../../redux/actions/group.actions'
import { actions } from '../../redux/actions/action'

import './groups.scss'
function Groups(props) {

    const [groupsArray, setGroupsArray] = useState(props.groups.groups)
    const dispatch = useDispatch()

    useEffect(() => {

        console.log(groupsArray + " groupsArray")
    })

    return (
        <>
            <div className={`sorcesList ${props.textColor == "dark" ? 'darkText' : 'lightText'} `} >
                {
                    props.groups.groups &&
                    props.groups.groups.map(group =>
                        <div
                            className={`source ${props.groups && group === props.groups.currentGroup && `selected`}`}
                            onClick={() => {
                                // props.setSelectedListFlag(props.flagsList.groups);
                                props.setCurrentGroup(group)
                                //     props.getSignatureServer(s);
                                // props.setSignatureName(s);
                            }}
                        >
                            {group.groupName}
                        </div>

                    )
                }

            </div>

        </>
    )

}

export default connect(
    (state) => {
        return {
            groups: state.groups,
            textColor: state.settings.textColor
        }
    },
    (dispatch) => ({
        setCurrentGroup: (val) => { dispatch(actions.setCurrentGroup(val)) },
    })
)(Groups)