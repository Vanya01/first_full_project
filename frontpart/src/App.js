import './App.css';
import {useEffect, useState} from "react";
import {postProduct, deleteProduct, getProducts} from "./services/services";

function App() {
    const [products, setProducts] = useState([]);
    const [turnOn, setTurnOn] = useState('hide');
    const [turnOff, setTurnOff] = useState('show');
    const [productName, setProductName] = useState('productName');
    const [price, setPrice] = useState('price');
    const [img, setImg] = useState('img');

    const empty = {};

    const onSubmitForm = () => {

        let tempProduct = {productName, img, price};

        setProductName({...tempProduct});
        setPrice({...tempProduct});
        setImg({...tempProduct});
    }


    const showForm = () => {
        if (turnOn === 'hide') {
            setTurnOn('show')
        } else if (turnOn === 'show') {
            setTurnOn('hide')
        }
        if (turnOff === 'hide') {
            setTurnOff('show')
        } else if (turnOff === 'show') {
            setTurnOff('hide')
        }
    }

    const onInputProductName = (e) => {
        e.preventDefault();

        let productName = e.target.value;
        setProductName(productName);

        empty.productName = productName;
    }
    const onInputPrice = (e) => {
        e.preventDefault();

        let price = e.target.value;

        setPrice(price);

        empty.price = price;
    }
    const onInputLastName = (e) => {
        e.preventDefault();

        let img = e.target.value;
        setImg(img);

        empty.img = img;
    }

    useEffect(() => {
        getProducts().then(value => setProducts([...value.data]))
    }, []);

    const removeProduct = (id) => {
        deleteProduct(id);
        products.filter((item) => item.id !== id);
    }

    return (
        <>
            <div className={`${turnOn} formContainer`}>

                <form className={'form'} onSubmit={onSubmitForm}>
                    <div className="wrapForm">
                        <h3> Create a new Product ↓</h3>

                        <span className="wrapElementForm">
                                                <h5>Product name</h5>
                                                <input
                                                    className={'formElement'}
                                                    type="text"
                                                    placeholder={'Product name . . .'}
                                                    onInput={onInputProductName}
                                                />
                                            </span>

                        <span className="wrapElementForm">
                                                <h5>Price</h5>

                                                <input
                                                    className={'formElement'}
                                                    type="text"
                                                    placeholder={'price . . .'}
                                                    onInput={onInputPrice}
                                                />
                                            </span>

                        <span className="wrapElementForm">
                                                <h5>Image</h5>

                                                <input
                                                    className={'formElement'}
                                                    type="text"
                                                    placeholder={'image . . .'}
                                                    onInput={onInputLastName}
                                                />
                                            </span>

                        <button className={`createProductBtn`}>Create and refresh</button>

                    </div>
                </form>

            </div>

            <div className={`${turnOff} App`}>

                <div className={`wrapper container`}>

                    <button className={'btnForCreate'} onClick={showForm}> Create a product</button>

                    <div className={`header`}>
                        <h4>PRODUCT_NAME</h4>
                        <h4>PRICE</h4>
                        <h4>COUNT</h4>
                        <h4>TYPE</h4>
                        <h4 id={'deleteClass'}>DELETE</h4>
                    </div>

                    <div className={`main`}>
                        {
                            products.map(product => {

                                return (
                                    <div key={product.id} className="content">
                                        <h5>{product.productName}</h5>
                                        <h5>{product.price}</h5>
                                        <h5>{product.img}</h5>
                                        <button className={'deleteBtn'}
                                                onClick={() => removeProduct(product.id)}> Delete the product
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
