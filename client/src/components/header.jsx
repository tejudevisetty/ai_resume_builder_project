import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function Header(){

    const navigate = useNavigate();
    


    return(          
        <div className="header " >
            <header className="bg bg-white" >
          <nav className=" navbar container-fluid">
            {/* <h3><Link to='/' className=" navbar-brand m-2">QuickCV</Link></h3> */}
            <img src="/my-logo.PNG" alt="logo-img" onClick={() => {navigate('/')}} style={{cursor: "pointer"}}  ></img>
            <div>

               <Link to='/login' className='btn get-started p-2' >GET STARTED</Link>
            
            </div>        

          </nav>
        </header>
        </div>
    )
}
