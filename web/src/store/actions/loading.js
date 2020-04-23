export function setLoading (visible, message) {
    return {
        type: 'SET_LOADING',
        visible,
        message,
    }
}