import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Read = () => {
    const Navigate = useNavigate();
    const [data, setData] = useState([]);

    const header = { "Access-Control-Allow-Origin": "*" };
    const getData = () => {
        axios.get("https://65e9627b4bb72f0a9c515536.mockapi.io/crud-operation")
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
    }
    useEffect(() => {
        getData()
    }, [])
    function handleDelete(deleteId) {
        axios.delete(`https://65e9627b4bb72f0a9c515536.mockapi.io/crud-operation/${deleteId}`)
            .then(() => {
                getData()
            }).catch((err) => {
                console.log(err)
            })

        Navigate("/read");
        console.log(deleteId);
    }
    function handleSetItem(id, name, email) {
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
    }
    return (
        <>
            <h1>Read Operation</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col"> </th>
                        <th scope="col"> </th>
                    </tr>
                </thead>
                {data.map((eachData) => {
                    return (
                        <>
                            <tbody>
                                <tr>
                                    <th scope="row">{eachData.id}</th>
                                    <td>{eachData.name}</td>
                                    <td>{eachData.email}</td>
                                    <td>
                                        <Link to={"/update"}>
                                            <button className='btn btn-primary' onClick={() => handleSetItem(eachData.id, eachData.name, eachData.email)}>Edit</button>
                                        </Link>
                                    </td>
                                    <td><button className='btn btn-danger' onClick={() => handleDelete(eachData.id)}>Delete</button></td>
                                </tr>
                            </tbody>
                        </>
                    )
                })
                }
            </table>
            <button onClick={() => Navigate("/")}>Home</button>
        </>
    )
}

export default Read