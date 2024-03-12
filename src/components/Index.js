import React, { useEffect, useState } from 'react'

const Index = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("update")
    }
    const handleDelete = (e) => {
        e.preventDefault();
        console.log("delete");
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // localStorage.setItem("name", name);
        // localStorage.setItem("email", email);

        // const nameData = localStorage.getItem("name", "email");
        // const emailData = localStorage.getItem("email");
        const oldData = JSON.parse(localStorage.getItem("data")) || [];
        const data = [...oldData, { name, email }];
        // const data2 = data.push(nameData);

        localStorage.setItem("data", JSON.stringify(data));
        setName("")
        setEmail("")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" placeholder='Enter Your Name' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />

                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder='Enter Your Email' id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>

                <button className='btn mx-3 btn-success' onClick={handleUpdate}>Update</button>
                <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
            </form>
        </div>
    )
}

export default Index