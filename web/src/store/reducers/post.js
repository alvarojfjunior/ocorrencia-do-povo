const INITIAL_STATE =  {
    visible: false,
}

export default function user(state = INITIAL_STATE, action) {
    
    if (action.type === 'SET_POST') {
        return {
            ...state, 
            visible: action.visible,
        }
    }
    
    return state;
}