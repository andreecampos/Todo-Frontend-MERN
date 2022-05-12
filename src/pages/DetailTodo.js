import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios'
import { toast } from "react-toastify"


const DetailTodo = () =>{


    const { id } = useParams()
    const[todoData, setTodoData]= useState("")
    const [task, setTask] = useState("")
    const [description, setDescription] = useState("")
    const [fileData, setFileData] = useState("")
    const [files, setFiles] = useState([])

    //----------------Redigera inputs---------
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

    //loadTodoDetail()
    useEffect(() => {
        loadTodoDetail()
         }, [])

    
    function handleOnSubmit(e){
        e.preventDefault()
        const payload = {task, description}
        const url = `http://localhost:3001/detail/${id}`
        const token = localStorage.getItem('token')
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => console.log(data))

    } 

    //-------MULTER--------------------

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
    
            axios.post("http://localhost:3001/upload/"+ id, data)
                .then((res) => {
            
                    console.log(res.data)
                    setTodoData(res.data)
                    toast.success("Upload Success")
                })
                .catch((e) => {
                    console.error("Error", e)
                    toast.error("Upload Error")
                })
                
        }
        function deleteFile(filename){
            axios.delete("http://localhost:3001/upload/"+ id, {data: {filename:filename}})
            .then((res) => {
        
                console.log(res.data)
                setTodoData(res.data)
                
            })
            .catch((e) => {
                console.error("Error", e)
            
            })
        } 

        //console.log("todoss", todoData)
        //mostrar una pagina e blanco hasta que se carge
        if(!todoData)
        {return null}

    return(
        <main>
            <h1>Detail Page of ID { id } </h1>
            <h2>task: {todoData.task}</h2>
            <p>Description: {todoData.description}</p>
            
            <form  onSubmit={handleOnSubmit}>

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

            <form method="post" action="/upload" id="" onSubmit={onFileSubmit}  >
                <label>Upload your file</label>
                <input 
                    type="file"
                    onChange={onInputChange} 
                    name="file"
                    multiple 
                />
                <button type="submit">Submit</button>
                <br/>
                
            
            </form>
        //man kan kalla file vas som helst 
            {todoData.files.map(file => 
            <div key={file}>
            <a href={`http://localhost:3001/${file}`} >{file}</a>
            <button onClick={()=> deleteFile(file)} >delete</button>
            </div> 
            )}
        </main>
    )
}

export default DetailTodo