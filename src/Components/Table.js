import React, { useEffect, useState } from 'react';
import { createTask, listTasks } from '../public/endpoints';
import axios from 'axios';
import jwt_decode from "jwt-decode";

function Table(props) {

    const [task, setTask] = useState([]);

    useEffect(() => {
        getTasks()

    }, [])


    const getTasks = async () => {
        const user_id = jwt_decode(localStorage.getItem("token"))._id;
        const token = localStorage.getItem("token")
        // var data = {}
        // data.id = user_id
        const headers = {
            "Content-Type": "application/json",
            Authorization: token
        }
        // console.log("user", user_id)
        const url = `${listTasks}/${user_id}`

        await axios.get(url, {
            headers: headers
        }).then(response => {
            console.log("get all task in table", response.data.tasks)
            setTask(response.data.tasks)

        }).catch(err => {
            console.log("error is", err)
        });
    }

    const Edit = () => {
        const user_id = jwt_decode(localStorage.getItem("token"))._id;
        const data = {
            user_id,
            name: task
        }
        console.log("data", data)
        const token = localStorage.getItem("token")
        console.log(token);
        const headers = {
            "Content-Type": "application/json",
            Authorization: token
        }
        axios.post(createTask, data, {
            headers: headers
        }).then(response => {
            // console.log(response)
            props.history.push('/createTask')

        }).catch(err => {
            console.log("error is", err)
        });
    }

    return (
        <div className="container-fluid">
            <h1 style={{ textAlign: "center" }}>List of Tasks</h1>

            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th>List Of Task</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        task.map((t, index) => {
                            return (
                                <tr key={index} >
                                    <th>{index}</th>
                                    <td>{t.name}</td>
                                    <td><button type="button" className="btn btn-success" onClick={() => Edit()}>Edit</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;