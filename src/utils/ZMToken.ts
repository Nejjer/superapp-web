const KEY = 'ZM_TOKEN'

export const getZMToken = () => {
    return localStorage.getItem(KEY) || ''
}

export const setZMToken = (token: string) => {
    localStorage.setItem(KEY, token)
}