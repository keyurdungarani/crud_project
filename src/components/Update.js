import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const Navigate = useNavigate();
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setId(localStorage.getItem("id"));
        setName(localStorage.getItem("name"));
        setEmail(localStorage.getItem("email"));
    }, [])
    function handleUpdate(e) {
        e.preventDefault();
        axios.put(`https://65e9627b4bb72f0a9c515536.mockapi.io/crud-operation/${id}`, {
            name: name,
            email: email
        }).then(() => {
            Navigate("/read")
            console.log({ "name": name, "email": email });
        })
        // setName("");
        // setEmail("");
    }
    return (
        <>
            <h1>Update</h1>
            <form >
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" placeholder='Enter Your Name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />

                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder='Enter Your Email' id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleUpdate}>Update</button>
                <button className='btn btn-danger mx-2' onClick={() => Navigate("/read")}>Cancel</button>
            </form>
        </>
    )
}

export default Update