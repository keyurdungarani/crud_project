import React, { useState } from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const Create = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // const [error, setError] = useState("");

    const header = { "Access-Control-Allow-Origin": "*" };

    const Navigate = useNavigate("/read");
    // const errors = {
    //     name: "",
    //     email: ""
    // }
    const [errors, setErrors] = useState({
        name: "",
        email: ""
    })

    console.log(errors)

    const handleSubmit = (e) => {
        e.preventDefault();
        const validateEmail = (email) => {
            return email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };

        const isValid = validateEmail(email);

        console.log("🤡 ~ file: Create.js:34 ~ handleSubmit ~ isValid:", name.length > 2);

        setErrors({})

        if (!(name)) {
            setErrors((err) => ({
                ...err,
                name: "Please Enter Name"
            }))
        }
        if (!isValid) {
            setErrors((err) => ({
                ...err,
                email: "Please Enter Valid Email"
            }))
        }

        if (name.length >= 2 && isValid) {
            axios.post(
                "https://65e9627b4bb72f0a9c515536.mockapi.io/crud-operation",
                {
                    name: name,
                    email: email,
                    header,
                }
            )
                .then(() => {
                    Navigate("/read");
                    console.log(name, email)
                })
        }

    }
    return <>
        <h1 className='text-center'>CRUD PROJECT</h1>
        <div className='container'>
            <h3>Create</h3>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" placeholder='Enter Your Name' className={`form-control ${errors?.name && "is-invalid"}`} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => (setName(e.target.value))} />
                    {
                        errors.name && <p>{`${errors.name}`}</p>
                    }
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className={`form-control ${errors?.email && "is-invalid"}`} type="text" placeholder='Enter Your Email' id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    {
                        errors.email &&
                        <p className='text-danger'>{`${errors.email}`}</p>
                    }

                </div>

                <button type="submit" className="btn btn-primary"  >Submit</button>

                <button className='btn btn-success mx-2' onClick={() => Navigate("/read")}>Read Data</button>

            </form>
        </div>
    </>
}

export default Create