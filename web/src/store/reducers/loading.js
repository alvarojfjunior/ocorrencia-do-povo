const INITIAL_STATE =  {
    visible: false,
    message: '',
}
export default function loading(state = INITIAL_STATE, action) {
    if (action.type === 'SET_LOADING') {
        return {
            ...state, 
            visible: action.visible,
            message: action.message,
        }
    }
    return state;
}