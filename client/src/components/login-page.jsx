import axios from "axios";
import { useFormik } from "formik"
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage(){

    const[ cookies, setCookie] = useCookies(['emailId']);


    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email : '',
            pwd: '',
        },
        onSubmit: (values) => {
            axios.get(`https://ai-resume-builder-project-server.onrender.com/userDetails`).then((res) => {

                let userDetailss = res.data.users.find( user => 
                    values.email === user.email
                )
                if(userDetailss){

                    setCookie('emailId', formik.values.email)

                    navigate(`/resumehomepage/${userDetailss._id}`)

                }
                else{
                    alert("Invalid email")
                }
            })
        }
    });

    return(
        <div className="container mt-5" >
            <div className="input-group container d-flex justify-content-around ">
                <form className="input-form form p-5 bg-body-tertiary mt-5" autoComplete="off" onSubmit={formik.handleSubmit} >
                <p className="text-center fs-4 mt-0" ><strong>LOGIN</strong></p>
                <p className="text-center text-secondary" >Welcome back! Please login to continue</p>
                <dl>
                    <dt>Email:</dt>
                    <dd>
                        <input type="text" name="email" autoComplete="off" value={formik.values.email}  onChange={formik.handleChange} className="form-control"></input>
                    </dd>
                    <dt>Password:</dt>
                    <dd>
                        <input type="password" name="pwd" autoComplete="new-password" value={formik.values.pwd} onChange={formik.handleChange} className="form-control"></input>
                    </dd>
                </dl>
                <button className="btn btn-primary w-100" type="submit" >Login</button>
                <p className="text-center text-secondary mt-3">Don't have an account? <Link to="/register" className="register" >Register</Link></p>

                </form>

            </div>
        </div>
    )
}
