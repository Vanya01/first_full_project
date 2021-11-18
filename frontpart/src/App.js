import './App.css';
import {useEffect, useState} from "react";
import {getUsers, deleteUser, registration, postUsers} from "./services/services";

function App() {
    const [users, setUsers] = useState([]);
    const [turnOn, setTurnOn] = useState('hide');
    const [turnOff, setTurnOff] = useState('show');
    const [userName, setUserName] = useState('userName');
    const [firstName, setFirstName] = useState('firstName');
    const [lastName, setLastName] = useState('lastName');
    const [email, setEmail] = useState('email');
    const [password, setPassword] = useState('password');

    const empty = {};

    const onSubmitForm = (e) => {
        let tempUser = {userName, lastName, firstName, email, password};

        setUserName({...tempUser});
        setFirstName({...tempUser});
        setLastName({...tempUser});
        setEmail({...tempUser});
        setPassword({...tempUser});

        registration(tempUser)
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

    const onInputUserName = (e) => {
        e.preventDefault();

        let userName = e.target.value;
        setUserName(userName);

        empty.userName = userName;
    }
    const onInputFirstName = (e) => {
        e.preventDefault();

        let firstName = e.target.value;
        setFirstName(firstName);

        empty.firstName = firstName;
    }
    const onInputLastName = (e) => {
        e.preventDefault();

        let lastName = e.target.value;
        setLastName(lastName);

        empty.lastName = lastName;
    }
    const onInputEmail = (e) => {
        e.preventDefault();

        let email = e.target.value;
        setEmail(email);

        empty.email = email;
    }
    const onInputPassword = (e) => {
        e.preventDefault();

        let password = e.target.value;
        setPassword(password);

        empty.password = password;
    }

    useEffect(() => {
        getUsers().then(value => setUsers([...value.data]))
    }, []);

    const removeUser = (id) => {
        deleteUser(id);
        users.filter((item) => item.id !== id);
    }

    return (
        <>
            <div className={`${turnOn} formContainer`}>

                <form className={'form'} onSubmit={onSubmitForm}>
                    <div className="wrapForm">
                        <h3> Create a new User ↓</h3>

                        <span className="wrapElementForm">
                                                <h5>User name</h5>

                                                <input
                                                    className={'formElement'}
                                                    type="text"
                                                    placeholder={'User name . . .'}
                                                    onInput={onInputUserName}
                                                />
                                            </span>

                        <span className="wrapElementForm">
                                                <h5>First name*</h5>

                                                <input
                                                    className={'formElement'}
                                                    type="text"
                                                    placeholder={'First name . . .'}
                                                    onInput={onInputFirstName}
                                                />
                                            </span>

                        <span className="wrapElementForm">
                                                <h5>Last name*</h5>

                                                <input
                                                    className={'formElement'}
                                                    type="text"
                                                    placeholder={'Last name . . .'}
                                                    onInput={onInputLastName}
                                                />
                                            </span>

                        <span className="wrapElementForm">
                                                <h5>Email*</h5> <small id={'emailRequire'}>*Require @</small> <br/>

                                                <input
                                                    className={'formElement'}
                                                    type="text"
                                                    placeholder={'Email . . .'}
                                                    onInput={onInputEmail}
                                                />
                                            </span>

                        <span className="wrapElementForm">
                                                <h5>Password*</h5> <small id={'smallIncludes'}>*Require a number and a Big letter </small>

                                                <input
                                                    className={'formElement'}
                                                    type="password"
                                                    placeholder={'Password . . .'}
                                                    onInput={onInputPassword}
                                                />
                                            </span>

                        <button className={`createUserBtn`}>Create and refresh</button>

                    </div>
                </form>

            </div>

            <div className={`${turnOff} App`}>

                <div className={`wrapper container`}>

                    <button className={'btnForCreate'} onClick={showForm}> Create an user</button>

                    <div className={`header`}>
                        <h3>USERNAME</h3>
                        <h3>FIRST NAME</h3>
                        <h3>LAST NAME</h3>
                        <h3>EMAIL</h3>
                        <h3>TYPE</h3>
                        <h3 id={'deleteClass'}>DELETE</h3>
                    </div>

                    <div className={`main`}>
                        {
                            users.map(user => {

                                return (
                                    <div key={user.id} className="content">
                                        <h5>{user.userName}</h5>
                                        <h5>{user.firstName}</h5>
                                        <h5>{user.lastName}</h5>
                                        <h5>{user.email}</h5>
                                        <h5>{user.userType}</h5>
                                        <button className={'deleteBtn'} onClick={() => removeUser(user.id)}> Delete the
                                            user
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
