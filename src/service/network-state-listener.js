
const NetworkStateListener = (stateChangedCallback) => {
    window.addEventListener('online', () => {
        stateChangedCallback(true)
    })
    window.addEventListener('offline', () => {
        stateChangedCallback(false)
    })
}

export default NetworkStateListener