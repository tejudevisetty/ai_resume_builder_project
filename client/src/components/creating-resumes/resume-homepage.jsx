import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Footer } from "../footer";

export function Resumehomepage(){


    let navigate = useNavigate()

    let params = useParams();
    
    function selectedTemplate(templateId){

        const payload = {
            templateId: templateId
        }
        axios.patch(`http://127.0.0.1:5000/userDetails/${params.id}`, payload)
        .then ( (response) => {
            console.log("all details are sent", response.data)
            navigate(`/resumeform/${params.id}`)

        })
    }


    return (
        <div className="container mt-lg-5" >
            <div className="container-fluid  mt-5 ">
            <div className=" mt-4">.</div>
            <h3 className="text-center mt-4"  ><b>Step 1</b></h3>
            <p className=" fs-4 text-center custom-color m-1" >Please select a template for your resume<br/>You can always change it later</p>
            <div className="d-flex justify-content-center mb-4">
            <div className=" mt-5 p-4">
                <img src="/resume-template-1.jpg" className="templates" alt=" " width="400" height="525" onClick={() => selectedTemplate("t1")}  ></img>

            </div>
            

            <div className=" mt-5 p-4">
            <img src="/resume-template-2.jpg" className="templates " alt=" " width="400" height="525" onClick={() => selectedTemplate("t2")} ></img>

            </div>
            </div>

            {/* <div className="container " >
                <div className=" modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className=" modal-dialog modal-xl">
                    <div class="modal-content">
                        <div className="text-end fs-3" >
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>


                        </div>

                    <div className=" modal-body d-flex justify-content-around">
                        <img src="/resume-template-1.jpg" className=" w-50 templates modal-template " alt=" " onClick={() => selectedTemplate("t1")}></img>
                    </div>
                    </div>


                    </div>
                </div>

            </div> */}
            </div>

        </div>
    )
}