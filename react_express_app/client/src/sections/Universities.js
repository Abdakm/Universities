import {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Universities(){
    const [universities, setUniversities] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:4000/universities')
        .then(data => setUniversities(data.data));
    }, [])
    
    const style ={ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
    return(
        <>
            <div style={style}>
            {
                universities.map((university, index) => (
                    <Link to={`university/${university.id_university}`}>{university.university_name}</Link>
                ))
            }
                <Link to={`universities/add`}> Add </Link>
            </div>
        </>
    )
}