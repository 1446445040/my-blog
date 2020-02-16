import axios from 'axios'
// const baseUrl = 'http://localhost:3000'
const baseUrl = 'https://www.biubiubius.com'
axios.defaults.baseURL = baseUrl

export const getArticle = date => axios.post('/articles', { date })

export const getArticleList = () => axios.get('/articles/list')

export const addArticle = data => axios.post('/add', data)

export const admin = data => axios.post('/admin', data)

export const getUserInfo = () => axios.get('/user')
export const setUserInfo = data => axios.post('/user/set', data)
