import React, { useEffect, useState } from 'react';
import { deleteTask, listTasks, updateTask } from '../public/endpoints';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { Redirect } from 'react-router-dom';

function Table(props) {
    const [task, setTask] = useState([]);

    useEffect(() => {
        getTasks()

    }, [])


    const getTasks = async () => {
        const user_id = jwt_decode(localStorage.getItem("token"))._id;
        // console.log("id", user_id)
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
    const onDelete = (tId) => {
        confirmAlert({
            title: 'Warning',
            message: 'Are you sure to Delete this Task ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => yes(tId)
                },
                {
                    label: 'No',
                    onClick: () => no()
                }
            ]
        });
    }
    const yes = (tId) => {
        const token = localStorage.getItem("token")
        const headers = {
            "Content-Type": "application/json",
            Authorization: token
        }
        const url = `${deleteTask}/${tId}`
        axios.delete(url, {
            headers: headers
        }).then(response => {
            // console.log(response.data.tasks)
            setTask(response.data.tasks)

        }).catch(err => {
            console.log("error is", err)
        });
    }

    const no = () => {
        return
    }

    const onEdit = () => {
        console.log("props", props)
        // props.history.push("/createTask")
        // return <Redirect to={
        //     {
        //         pathname: "/createTask",
        //     }
        // } />

        // const token = localStorage.getItem("token")
        // const headers = {
        //     "Content-Type": "application/json",
        //     Authorization: token
        // }
        // const url = `${updateTask}/${uId}`

        // axios.put(url, {
        //     headers: headers
        // }).then(response => {
        //     setTask(response.data.tasks)

        // }).catch(err => {
        //     console.log("error is", err)
        // });
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
                                <tr key={t._id} >
                                    <th>{index + 1}</th>
                                    <td>{t.name}</td>
                                    <td><button type="button" className="btn btn-success" onClick={() => onEdit()}>Edit</button></td>
                                    <td><button type="button" className="btn btn-success" onClick={() => onDelete(t._id)}>Delete</button></td>
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