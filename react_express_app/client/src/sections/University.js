import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'

export default function University(){
    const params = useParams(); // you can find the param in index.js file
    
    const [university, setUniversity] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:4000/universities/${params.id}`)
        .then(data => setUniversity(data.data))
    },[])
    return(
        <>
            {
                university.map((data, index) => (
                    <ul>
                        <li>{data.university_name}</li>
                        <li>{data.description}</li>
                        <li>{data.email}</li>
                        <li>{data.image_src}</li>
                        <li>{data.location}</li>
                        <li>{data.number}</li>
                        <li>{data.site}</li>
                        <li>{data.type}</li>
                    </ul>
                ))
            }
            <Link to={`update/${params.id}`}>Update</Link>
        </>
    )
}