export const GET_ALL_TEMPLATES_SERVER = 'GET_ALL_TEMPLATES_SERVER'
export const SET_CURRENT_TEMPLATE = 'SET_CURRENT_TEMPLATE'
export const SET_TEMPLATES_LIST = 'SET_TEMPLATES_LIST'

export function getAllTemplatesServer() {
    return {
        type: GET_ALL_TEMPLATES_SERVER
    }
}
export function setCurrentTemplate(html) {
    return {
        type: SET_CURRENT_TEMPLATE,
        payload:html
    }
}