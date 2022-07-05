import { React, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/Home.module.css"
import axios from "axios";

const Todolist = () => {

    const { register, watch } = useForm();
    const [toDoList, setToDoList] = useState([]);

    let newTask = watch("searchItem");

    useEffect(() => {

        axios.get('https://t3wkvsppfh.execute-api.us-east-1.amazonaws.com/production/do-list')
            .then(res => {
                setToDoList(res.data.body)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const changeStatus = (data) => {

        const params = JSON.stringify({

            "done_task": data.done_task,
            "done_date": data.done_date,
            "done_time": data.done_time,
            "done_status": "Done"

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

        setToDoList(toDoList.filter(task => task.done_task !== index))

    }

    const addTask = () => {

        const params = JSON.stringify({

            "done_task": newTask,
            "done_date": new Date().toLocaleDateString(),
            "done_time": new Date().toLocaleTimeString(),
            "done_status": "To do"

        })

        axios
            .post('https://t3wkvsppfh.execute-api.us-east-1.amazonaws.com/production/list', params)
            .then(response => {

                if (response.data.errorMessage) {

                    tconsole.log(response.data.errorMessage);

                } else {

                    console.log("Task added")

                }

            })
            .catch(error => { console.log(error) })

            setToDoList([...toDoList, JSON.parse(params)])

    }

    return (
        <div className={styles.todolist}>
            <input placeholder="Enter Task" className={styles.todolistinput} {...register("searchItem")}></input>
            <button className={styles.todolistbtn} onClick={() => addTask()}>Add Task</button>
            <br></br>
            {
                toDoList.map(task => (
                    <div key={task.done_time} className={styles.taskCard}>
                        <p className={styles.taskP}>{task.done_date}</p>
                        <p>{task.done_time}</p>
                        <p>{task.done_task}</p>
                        <p>{task.done_status}</p>
                        <button className={styles.taskBttn} onClick={() => changeStatus(task)}>Done</button>
                        <br></br>
                    </div>
                ))
            }
        </div>
    );
}

export default Todolist;