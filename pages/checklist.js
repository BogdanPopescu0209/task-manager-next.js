import { React, useState, useEffect } from "react";
import styles from "../styles/Home.module.css"
import axios from "axios";

const Checklist = () => {

    const [doneList, setDoneList] = useState([]);

    useEffect(() => {

        axios.get('https://t3wkvsppfh.execute-api.us-east-1.amazonaws.com/production/done-list')
            .then(res => {
                setDoneList(res.data.body)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const reinstateTask = (data) => {

        const params = JSON.stringify({

            "done_task": data.done_task,
            "done_date": data.done_date,
            "done_time": data.done_time,
            "done_status": "To do"

        })

        axios
            .put('https://t3wkvsppfh.execute-api.us-east-1.amazonaws.com/production/list', params)
            .then(response => {

                if (response.data.errorMessage) {

                    console.log(response.data.errorMessage);

                } else {

                    console.log("Task updated")

                }

            })
            .catch(error => { console.log(error) })

        const index = data.done_task;

        setDoneList(doneList.filter(task => task.done_task !== index))

    }

    return (
        <div className={styles.todolist}>
            {
                doneList.map(task => (
                    <div key={task.done_time} className={styles.taskCard}>
                        <p className={styles.taskP}>{task.done_date}</p>
                        <p>{task.done_time}</p>
                        <p>{task.done_task}</p>
                        <p>{task.done_status}</p>
                        <button className={styles.taskBttn} onClick={() => reinstateTask(task)}>Reinstate</button>
                        <br></br>
                    </div>
                ))
            }
        </div>
    );
}

export default Checklist;