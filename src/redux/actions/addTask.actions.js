export const ADD_TASK_SERVER = 'ADD_TASK_SERVER'
export const SET_DISPLAY_TASK = 'SET_DISPLAY_TASK'

export function addTask(task) {
     
    return {
        type: ADD_TASK_SERVER,
        payload: task
    }
}

// export function setDisplayTask(bool) {
     
//     return {
//         type: SET_DISPLAY_TASK,
//         payload: bool
//     }
// }