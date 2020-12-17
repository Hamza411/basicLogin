import React from 'react';
import Table from './Table';

function WelcomePage(props) {

    const addTask = (task) => {

        props.history.push("/createTask")
    }

    return (
        <div>
            <Table />
            <div className="wrapper">
                <button type="button" className="btn btn-dark" onClick={() => addTask()}>Add Task</button>
            </div>
        </div>
    );
}

export default WelcomePage;