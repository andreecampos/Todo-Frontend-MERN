import { useParams } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify"


const DetailTodo = () =>{


    const { id } = useParams()
    const[todoData, setTodoData]= useState("")
    const [task, setTask] = useState("")
    const [description, setDescription] = useState("")
    const [fileData, setFileData] = useState("")
    const [files, setFiles] = useState([])

    /*
    const loadTodoDetail = () => {

        fetch(`http://localhost:3001/detail/${id}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
              }
        })
        .then((res) => res.json())
        .then((data) => setTodoData(data.entry));
    }

    loadTodoDetail()

    function handleOnSubmit(e){
        e.preventDefault()
        const payload = {task, description}
        const url = `http://localhost:3001/detail/${id}`
        const token = localStorage.getItem('token')
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => console.log(data))

    } */

    function fetchFileList() {
        const url = `http://localhost:3001/upload`
        const token = localStorage.getItem('token')
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            };
        fetch(url, {
            headers: headers,
          })
            .then((res) => res.json())
            .then((data) => setFileData(data.filename));
         };

         function onInputChange(e){
            console.log(e.target.files)
            setFiles(e.target.files)
        }
        
         function onFileSubmit(e){
            e.preventDefault()
    
            const data = new FormData()
    
            for(let i = 0; i < files.length; i++){
                data.append("file", files[i])
            }
    
            // data.append("file", files) 
    
            axios.post("http://localhost:3001/upload", data)
                .then((e) => {
                    console.log("Success")
                    toast.success("Upload Success")
                })
                .catch((e) => {
                    console.error("Error", e)
                    toast.error("Upload Error")
                })
                fetchFileList()
        }
    return(
        <main>
            <h1>Detail Page of ID { id } </h1>
            <h2>task: {todoData.task}</h2>
            <p>Description: {todoData.description}</p>
            <br/>
            {fileData &&(
                <>
                <h2>Attachments: {fileData}</h2>
                </>
            )}
            
            <form >

                Edit Task: 
                <input
                type="text" placeholder={todoData.task} name={todoData.task}
                onChange={e => setTask(e.target.value)}
                />
                <br/>
                Edit Description
                <textarea 
                type="text" placeholder={todoData.description} value={description}
                onChange={e => setDescription(e.target.value)}
                > Write your task here.....</textarea>
                <br/>
                <button type="submit">Submit</button>
            </form>
            <br/>

            <form method="post" action="/" id="" onSubmit={onFileSubmit}>
                <label>Upload your file</label>
                <input 
                    type="file"
                    onChange={onInputChange} 
                    multiple 
                />
                <button type="submit">Submit</button>
            </form> 

        </main>
    )
}

export default DetailTodo