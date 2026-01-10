import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then((response) => response.data)
}

const updateResource = (objectToUpdate) => {
    const urlToUpdate = baseUrl.concat('/', objectToUpdate.id)
    const request = axios.put(urlToUpdate, objectToUpdate)
    return request.then((response) => response.data)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const deleteResource = (id) => {
    const urlToDelete = baseUrl.concat('/',id)
        const request = axios.delete(urlToDelete)
    return request.then((response) => response.data)
}
   

export default {getAll,create,deleteResource, updateResource}
