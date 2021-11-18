import axios from "axios";

const URL = `http://localhost:5000/users`;

const getUsers = () => axios.get(URL);

const postUsers = ({
                       userName,
                       firstName,
                       lastName,
                       email,
                       userType,
                       password
                   }) => axios.post('http://localhost:5000/users',
    {
        body: JSON.stringify({userName, lastName, firstName, userType, email, password,}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    }).then((response) => response.json())
    .then((json) => console.log(json))




const registration = ({userName, firstName, lastName, email, userType, password}) => {

    fetch('http://localhost:5000/users', {
        method: 'POST',
        body: JSON.stringify({
            userName, firstName, lastName, email, userType, password

        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
}

const deleteUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
}


export {getUsers, postUsers, registration, deleteUser};


