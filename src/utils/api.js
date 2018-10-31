export const getDatabases = () => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/build/databases`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

export const getRoutes = () => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/build/routes`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}