import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export function RegisterUser(){


    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
 
            name: '',
            email: '',
            pwd: ''

        },
        onSubmit: (values) => {
            axios.post(`http://127.0.0.1:5000/userDetails`, values)
            .then((response) => {
                console.log("User details are:", response.data);
                navigate('/login');
            })
            .catch((error) => {
                console.error("Error is: error:", error)
            })
        },
        validate: (values) => {
            const errors = {};
            if(!values.name){
                errors.name = "Name Required"
            }
            if(!values.email){
                errors.email = "Email Required"
            }
            if(!values.pwd){
                errors.pwd = "password Required"
            }

            return errors;
        }
        
    })

    return(
        <div className="container mt-5" >
            <div className="input-group container d-flex justify-content-around ">

            <form className="input-form form p-5 bg-body-tertiary mt-5" autoComplete="off" onSubmit={formik.handleSubmit} >
            <p className="text-center fs-4 mt-0" style={{width: "290px"}} ><strong>REGISTER</strong></p>
            <p className="text-center text-secondary mb-4">Welcome to QuickCV resume builder</p>

                <dl>
                    <dt>Name:</dt>
                    <dd><input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} className="form-control"></input> </dd>
                    {formik.errors.name?<div className=" text-danger" >{formik.errors.name}</div> : null}
                    <dt>Email:</dt>
                    <dd><input type="email" name="email" autoComplete="off" value={formik.values.email} onChange={formik.handleChange} className="form-control"></input> </dd>
                    {formik.errors.email?<div className=" text-danger" >{formik.errors.email}</div> : null}
                    <dt>Password:</dt>
                    <dd><input type="password" name="pwd" autoComplete="new-password" value={formik.values.pwd} onChange={formik.handleChange} className="form-control"></input> </dd>
                    {formik.errors.pwd?<div className=" text-danger" >{formik.errors.pwd}</div> : null}
                </dl>
                <button to='/login' className="btn btn-primary w-100" type="submit" >REGISTER</button>

            </form>
            </div>

        </div>
    )
}