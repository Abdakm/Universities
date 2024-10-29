import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function AddUniversity(){
    const navigate = useNavigate()
    
    const onSubmit = (event) => {
        event.preventDefault()

        axios.post('http://localhost:4000/universities/add', values)
        .then(data => console.log(data.message))
        .catch(err => console.log(err.message));
        
        navigate('/universities', {replace: true})
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
    const {
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        handleReset
    } = useFormik({
        initialValues: {
            university_name: '',
            email: '',
            description: '',
            site: '',
            type: '',
            number: '',
            location: '',
        },
//        validationSchema: Yup.object({
//            university_name: Yup.string(),
//            email: Yup.string().email("Please enter a valid email").required("Required"),
//            description: Yup.string().min(30, "at least 30 characters").required("Required"),
//            site: Yup.string().url().required("Required"),
//            type: Yup.string().required("Required"),
//            number: Yup.string().min(10, "check your number !!"),
//            location: Yup.string().required("Required")
//        }),
        onSubmit,
    });
        return(
            <>
                <form style={style} enctype="multipart/form-data" method="POST" >
                    <h1>Add University</h1>
                    <input type='text' value={values.university_name} onChange={handleChange} onBlur={handleBlur} name='university_name' />
                    <input type='text' value={values.email}           onChange={handleChange} onBlur={handleBlur} name='email' />
                    <input type='text' value={values.description}     onChange={handleChange} onBlur={handleBlur} name='description' />
                    <input type='text' value={values.site}            onChange={handleChange} onBlur={handleBlur} name='site' />
                    <input type='text' value={values.type}            onChange={handleChange} onBlur={handleBlur} name='type' />
                    <input type='text' value={values.number}          onChange={handleChange} onBlur={handleBlur} name='number' />
                    <input type='text' value={values.location}        onChange={handleChange} onBlur={handleBlur} name='location' />
                    <input type='file' onChange={handleChange} name='image_src' />
                    <button onClick={handleSubmit}> Add </button>
                </form>
            </>
        )
}