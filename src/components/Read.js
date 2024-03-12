import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Read = () => {
    const Navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tablemode, setTableMode] = useState('');

    const header = { "Access-Control-Allow-Origin": "*" };
    const getData = () => {
        setLoading(true);
        axios.get("https://65e9627b4bb72f0a9c515536.mockapi.io/crud-operation")
            .then((res) => {
                console.log(res.data)
                setData(res.data)
                setLoading(false);
            })
    }
    useEffect(() => {
        getData()
    }, [])
    { loading && <div>Data Loading...</div> }
    //Delete operation
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
            <h1 className='container text-center'>Read Operation </h1>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" onClick={() => tablemode === '' ? setTableMode('table-dark') : setTableMode('')} />
                <label class="form-check-label" for="flexSwitchCheckDefault">Mode</label>
            </div>
            <div className='container'>
                <table className={`table ${tablemode}`}>
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
                                                <button className='btn btn-success' onClick={() => handleSetItem(eachData.id, eachData.name, eachData.email)}>Edit</button>
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
            </div>
            <div className='container '>
                <button className='btn btn-secondary ' onClick={() => Navigate("/")}>Home</button>
            </div>
        </>
    )
}

export default Read