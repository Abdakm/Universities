import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Update(){
    const params = useParams(); // you can find the params in index.js file
    const navigate = useNavigate()
    const [university, setUniversity] = useState({});
    const [permission, setPermission] = useState(false)
    const id = params.id
    useEffect(() => {
        async function fetchData(){
            await axios.get(`http://localhost:4000/universities/${id}`)
            .then(data => setUniversity(data.data[0]))  
            .catch(err => console.log(err))
        }
        fetchData()
    },[])
    setTimeout(() => {
        if(university.length === 0){
            setPermission(false)
        } else {
            setPermission(true)
        }
    },[1000])
    const handleSubmit = (event) => {
        event.preventDefault()
        
        axios.put(`http://localhost:4000/universities/${params.id}`, university)
        .then((data) => {
            console.log(data.data)
            navigate(`/universities/university/${id}`, {replace : true})
        })
        .catch((err) => {
            console.log(err.response.data.message)
        })
      
    }
    const handleChange = (event) => {
        setUniversity({...university, [event.target.name]: event.target.value})
    }
    
    const style = {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        alignItems: 'center',
        justifyContent: 'center',
        height: '500px',
        background: "lightblue",
    }
    if(permission){
        return(
            <>
                <form style={style} enctype="multipart/form-data" method="POST" >
                    <h1>Update</h1>
                    <input type='text' value={university.university_name} onChange={handleChange} name='university_name' />
                    <input type='text' value={university.email}           onChange={handleChange} name='email' />
                    <input type='text' value={university.description}     onChange={handleChange} name='description' />
                    <input type='text' value={university.site}            onChange={handleChange} name='site' />
                    <input type='text' value={university.type}            onChange={handleChange} name='type' />
                    <input type='text' value={university.number}          onChange={handleChange} name='number' />
                    <input type='text' value={university.location}        onChange={handleChange} name='location' />
                    <input type='file'                                    onChange={handleChange} name='image_src' />
                    <button onClick={handleSubmit}> Update </button>
                </form>
            </>
        )
    } else {
          return(
            <h1>Waitting...</h1>
         )
    }
}