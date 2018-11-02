export const getDatabases = () => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API}/build/databases`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

export const getRoutes = () => {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_API}/build/routes`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}