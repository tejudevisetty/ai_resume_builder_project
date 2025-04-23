import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function Header(){

    const [cookies, removeCookie] = useCookies(['emailId']);

    function handleLogout(){

        removeCookie('emailId',{ path: '/'})
        
    }

    const navigate = useNavigate();

    


    return(
        <div className="header " >
            <header className="bg bg-white" >
          <nav className=" navbar container-fluid">
            {/* <h3><Link to='/' className=" navbar-brand m-2">QuickCV</Link></h3> */}
            <img src="/my-logo.png" alt="logo-img" onClick={() => {navigate('/')}} style={{cursor: "pointer"}}  ></img>
            <div>
            {
                cookies.emailId?

                    <Link to='/login' className='btn get-started p-2' >GET STARTED</Link>

                    :

                    <Link to='/' className='btn btn-outline-dark' onClick={handleLogout} >LOGOUT</Link>

            }
            
            </div>        

          </nav>
        </header>
        </div>
    )
}