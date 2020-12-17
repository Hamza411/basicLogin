import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createTask } from '../public/endpoints';
import jwt_decode from "jwt-decode";

function CreateTask(props) {

    const [task, setTask] = useState("");

    const submitForm = () => {


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
            console.log(response)
            props.history.goBack()

        }).catch(err => {
            console.log("error is", err)
        });
    }

    // useEffect(() => {
    //     getTasks()

    // }, [])


    // const getTasks = async () => {
    //     const userId = jwt_decode(localStorage.getItem("token"))._id;
    //     const token = localStorage.getItem("token")
    //     var data = {}
    //     data.id = userId
    //     const headers = {
    //         "Content-Type": "application/json",
    //         Authorization: token
    //     }
    //     console.log("user", userId)
    //     const url = `${listTasks}/${data.id}`
    //     console.log("url", url)

    //     await axios.get(url, {
    //         headers: headers
    //     }).then(response => {
    //         console.log("get all task", response)

    //     }).catch(err => {
    //         console.log("error is", err)
    //     });
    // }
    return (
        <div className="form-container" >
            <div className="register-form">
                <label htmlFor="createTask">Create Task</label>
                <input
                    id="createTask"
                    className="form-field"
                    type="text"
                    placeholder="Create Task"
                    name="createTask"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button className="form-field" onClick={() => submitForm()}>Add Data</button>
                <button className="form-field" onClick={() => props.history.goBack()}>Go Back</button>
            </div>
        </ div>
    );
}

export default CreateTask;