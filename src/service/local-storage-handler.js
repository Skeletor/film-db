
export default class LocalStorageHandler {
    static set(key, object) {
        localStorage.setItem(key, JSON.stringify(object))
    }

    static get(key) {
        return JSON.parse(localStorage.getItem(key))
    }
}