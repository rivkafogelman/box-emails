import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../redux/actions/action'

export default function Templates(props) {
    const templates = useSelector(state => state.templates);
    const newMessagesCards = useSelector(state => state.drafts.newMessagesCards);
    const dispatch = useDispatch();

    useEffect(() => {
        if (templates && templates.templatesList && templates.templatesList.length === 0)
            dispatch(actions.getAllTemplatesServer())
    }, [])
    const changeTemplate = (template) => {
        dispatch(actions.setCurrentTemplate(template))
        if (!templates.currentTemplate && !newMessagesCards.length) {
            dispatch(actions.addNewMessageCard(null))
        }
    }
    return (
        <div className="sorcesList" >
            {templates && templates.templatesList  && templates.templatesList.map(template =>
                <div
                    className={`source ${templates.currentTemplate && template._id === templates.currentTemplate._id && `selected`}`}
                    onClick={() => changeTemplate(template)}>
                    {template.name}
                </div>
            )}
        </div>
    )
}
