import React from 'react';

function WelcomePage(props) {

    const addTask = (task) => {

        props.history.push("/createTask")
    }

    return (
        <div>
            < div className="form-container" >
                <div className="register-form">
                    <button className="form-field" onClick={() => addTask()}>Add Task</button>
                </div>
            </div >
        </div>
    );
}

export default WelcomePage;