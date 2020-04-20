export function setSnackbar (visible, style,message) {
    return {
        type: 'SET_SNACKBAR',
        visible,
        style,
        message,
    }
}