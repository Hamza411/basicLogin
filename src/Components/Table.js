import React, { useEffect, useState } from 'react';
import { listTasks } from '../public/endpoints';
import axios from 'axios';
import jwt_decode from "jwt-decode";

function Table() {

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
        console.log("url", url)

        await axios.get(url, {
            headers: headers
        }).then(response => {
            console.log("get all task in table", response.data.tasks)
            setTask(response.data.tasks)

        }).catch(err => {
            console.log("error is", err)
        });
    }


    return (
        <div className="container-fluid">
            <h1>List of Tasks</h1>

            <table class="table table-striped table-dark">
                <thead>
                    <tr>
                        <th>List Of Task</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        task.map(t => {
                            return (
                                <tr key={t.user_id} >
                                    <th>Task Name</th>
                                    <td>{t.name}</td>
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