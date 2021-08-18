export const GET_WEBHOOK_SELECTED_PROPS = 'GET_WEBHOOK_SELECTED_PROPS'
export const SET_WEBHOOK_SELECTED_PROPS_DB = 'GET_WEBHOOK_SELECTED_PROPS_DB'
export const SET_JSON_PARSER_FORM = 'SET_JSON_PARSER_FORM'
export const SET_SHOW_ALL = 'SET_SHOW_ALL'
export const SET_FILTERED_BODY = 'SET_FILTERED_BODY';
export const SET_WEBHOOK_FLAG = 'SET_WEBHOOK_FLAG';
export const SET_SECOND_RENDER = 'SET_SECOND_RENDER';
export const UPDATE_NICKNAME = 'UPDATE_NICKNAME'
export const TOGGLE_BLOCK = 'TOGGLE_BLOCK'
export const SET_WEBHOOK_SELECTED_PROPS = 'SET_WEBHOOK_SELECTED_PROPS';
// export const SET_SOURCE_IP = 'SET_SOURCE_IP';
export const GET_WEBHOOKS_BY_USER = 'GET_WEBHOOKS_BY_USER'
export const SET_WEBHOOKS_BY_USER = 'SET_WEBHOOKS_BY_USER'
export const AFTER_TOGGLE = 'AFTER_TOGGLE'


export function getWebhookSelectedProps() {

    return {
        type: GET_WEBHOOK_SELECTED_PROPS,
        // payload: selectedProps;
    }
}
export function setWebhookSelectedPropsDb(selectedProps) {
    return {
        type: SET_WEBHOOK_SELECTED_PROPS_DB,
        payload: selectedProps
    }
}
export function setJsonParserForm(setJsonParser) {
    return {
        type: SET_JSON_PARSER_FORM,
        payload: setJsonParser
    }
}
export function updateNickname(Sip, text) {
    return {
        type: UPDATE_NICKNAME,
        payload: { Sip: Sip, nickname: text }
    }
}
export function toggleBlock(Sip) {
    return {
        type: TOGGLE_BLOCK,
        payload: Sip
    }
}
export function setShowAll(isShowAll) {

    return {
        type: SET_SHOW_ALL,
        payload: isShowAll
    }
}
export function setFilteredBody(filteredBody) {

    return {
        type: SET_FILTERED_BODY,
        payload: filteredBody
    }
}
export function setWebhookSelectedProps(selectedProps) {

    return {
        type: SET_WEBHOOK_SELECTED_PROPS,
        payload: selectedProps
    }
}
export function setWebhookFlag(bool) {
 
    return {
        type: SET_WEBHOOK_FLAG,
        payload: bool
    }
}
export function setSecondRender(bool) {

    return {
        type: SET_SECOND_RENDER,
        payload: bool
    }
}
export function afterToggle(Sip, blocked) {
    return {
        type: AFTER_TOGGLE,
        payload: { ip: Sip, blocked: blocked }
    }
}