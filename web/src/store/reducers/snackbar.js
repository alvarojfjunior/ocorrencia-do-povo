const INITIAL_STATE =  {
    visible: false,
    style: '',
    message: '',
}
export default function snackbar(state = INITIAL_STATE, action) {
    if (action.type === 'SET_SNACKBAR') {
        return {
            ...state, 
            visible: action.visible,
            style: action.style,
            message: action.message,
        }
    }
    return state;
}