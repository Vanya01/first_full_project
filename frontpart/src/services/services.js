import axios from "axios";

const URL = `http://localhost:5000/products`;

const getProducts = () => axios.get(URL);

const postProduct = ({
                         price,
                         img,
                         productName
                     }) => axios.post('http://localhost:5000/products',
    {
        body: JSON.stringify({price,img,productName}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    }).then((response) => response.json())
    .then((json) => console.log(json))


const deleteProduct = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
}


export {getProducts, postProduct, deleteProduct};


