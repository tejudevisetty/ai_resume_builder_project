import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AIChatSession } from "../AIModal";

export function ResumeForm(){




    const prompt = "Job Title: {jobTitle} , depends on job title give a professional summary 4 to 5 lines for job application . Note: Dont give array of result, generate a paragraph of 4 to 5 lines" ;

    const prompt1 = "Job Designation: {jobTitle} ,  companyName: {companyName} , depends on job designation and company name give a professional experience summary in 4 to 5 bullet points.Give only 1 summary, dont give array of summaries";
    
    const skillsPrompt = `
    Job Title: {jobTitle}
    
    Based on the given job title, provide a categorized list of relevant skills.
    
    Each category should be clearly labeled (e.g., Technical Skills, Frameworks, Tools, Libraries, Platforms, etc.) and followed by a comma-separated list of skills.
    
    Only provide the JSON object as the response. Example structure:
    {
      "jobTitle": "Job Title",
      "Category 1": "skill1, skill2, skill3",
      "Category 2": "skill4, skill5"
    }
    
    Do not include explanations or additional text. Return only one result.
    `;
    
    const GenerateSummaryFromAI = async() => {

        const PROMPT = prompt.replace('{jobTitle}', formik.values.formJobtitle);
        const result = await AIChatSession.sendMessage(PROMPT);
        const summary = JSON.parse(result.response.text());
        const finalResult = summary.professionalSummary;
        formik.setFieldValue('formSummary', finalResult); 


    }

    const GenerateProSummaryFromAI = async() => {

        const PROMPT = prompt1
        .replace('{jobTitle}', formik.values.formJobtitle)
        .replace('{companyName}', formik.values.formCompany);
        const result1 = await AIChatSession.sendMessage(PROMPT);
        const summary1 = JSON.parse(result1.response.text());
        const finalResult1 = summary1.experienceSummary;
        formik.setFieldValue('formExpSummary', finalResult1); 

    }

    const GenerateSkills = async () => {
        const PROMPT = skillsPrompt.replace('{jobTitle}', formik.values.formJobtitle);
        const result = await AIChatSession.sendMessage(PROMPT);
      
        const responseText = await result.response.text();
        const summary = JSON.parse(responseText);
        console.log("Parsed summary:", summary);
      
        const formattedSkills = Object.entries(summary)
          .filter(([key]) => key.toLowerCase() !== 'jobtitle')
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n');
      
          formik.setFieldValue('formSkill', formattedSkills); 
        };
      
      
      

    const navigate = useNavigate();

    let params = useParams();

    const formik = useFormik({
        initialValues: {
            formName : '',
            formEmail: '',
            formNumber: '',
            formUrl : '',
            formSummary : '',
            formStartdate: '',
            formEnddate: '',
            formDesignation: '',
            formCompany: '',
            formExpSummary: '',
            formEduStartdate: '',
            formEduEnddate: '',
            formCollegeName: '',
            formMajor: '',
            formEduSummary: '',
            formProject: '',
            formSkill: '',
            formProDes: '',
            formCertificate: '',
            formGraduation: '',
            formBtechPer: '',
            formJobtitle: ''
        },
        onSubmit: (values) => {
            axios.patch(`http://127.0.0.1:5000/userDetails/${params.id}`, values)

            navigate(`/resumepreview/${params.id}`)
        },
        validate : (values) => {
            const errors = {};

            if(!values.formName && !values.formEmail && !values.formNumber && !values.formUrl && !values.formSummary && !values.formStartdate && !values.formEnddate
                && !values.formCompany && !values.formDesignation && !values.formExpSummary && !values.formEduStartdate && !values.formEduEnddate
                && !values.formCollegeName && !values.formMajor
            ){
                errors.message = "All fields are required";
                return errors;
            }
        }
          
    });
    return(
        <div className="container-fluid mt-5" >
            <div className=" mt-3"> . </div>
            <div className="mt-4">
            <h3 className="text-center" ><b>Step 2</b></h3>
            <p className=" fs-4 text-center m-1 custom-color" >Edit your Form</p>
            <form className=" input-group d-flex justify-content-around mt-5" autoComplete="off" onSubmit={formik.handleSubmit} >
                <div className=" border border-secondary w-75 p-5 font-monospace">
                    <dl>
                        <h5 className="text-center font-monospace form-title">PERSONAL DETAILS</h5>
                        <div className=" d-flex justify-content-around mt-4" >

                        <dt>
                            Name:
                        </dt>
                        <input type="text" className="form-control"  name="formName" value={formik.values.formName}  onChange={formik.handleChange} ></input>
                        

                        <dt>Email:</dt>
                            <input type="email" className="form-control "  name="formEmail" value={formik.values.formEmail} onChange={formik.handleChange}  ></input>
                        </div>
                        <div className=" d-flex justify-content-around mt-4" >


                        <dt>Phone:</dt>
                        <input type="phone" className="form-control" name="formNumber" value={formik.values.formNumber} onChange={formik.handleChange}></input>
                        <dt>Website:</dt>
                        <input type="url" className="form-control" name="formUrl" value={formik.values.formUrl} onChange={formik.handleChange}></input>

                        </div>
                        <div className="d-flex mt-3" ><dt>Job title:</dt>
                                <input type="text" className="form-control" name="formJobtitle" value={formik.values.formJobtitle} onChange={formik.handleChange} ></input>
                        </div>

                        
                        <dt className=" mt-3 " >Professional Summary</dt>
                        <dd>
                            
                    
                            <textarea className="form-control" rows="4" name="formSummary" value={formik.values.formSummary} onChange={formik.handleChange} ></textarea>

                            
                            <button type="button" className="get-started p-1 mt-2" onClick={GenerateSummaryFromAI} >Generate from AI</button><span className=" text-secondary" > *Provide Job title</span>
                            

                        </dd>
                        <h5 className="text-center mb-2 form-title mt-4"  >PROFESSIONAL EXPERIENCE OR INTERNSHIP</h5>
                        
                            <div className="d-grid  mt-4">
                                <dt>Start Date</dt>
                                <dd><input type="date"  className=" form-control" name="formStartdate" value={formik.values.formStartdate}  onChange={formik.handleChange} ></input></dd>
                                <dt>End Date</dt>
                                <dd><input type="date" className=" form-control" name="formEnddate" value={formik.values.formEnddate} onChange={formik.handleChange} ></input></dd>
                            </div>
                            <span className=" d-flex text-secondary" ><input type="checkbox" className=" form-check" name="formExpCheck"></input>Currently I am working here </span>
                            <div className="d-flex mt-3 " >

                            
                                <dt>Designation</dt><input type="text" className="form-control " name="formDesignation" onChange={formik.handleChange} value={formik.values.formDesignation}></input>
                                <dt>Company Name</dt><input type="text" className="form-control " name="formCompany" onChange={formik.handleChange} value={formik.values.formCompany}></input>


                            </div>
                        <dt>Summary</dt>
                        <dd>
                            <textarea className="form-control m-2" rows="4" name="formExpSummary" value={formik.values.formExpSummary} onChange={formik.handleChange}  ></textarea>
                        </dd>
                        <button type="button" className="get-started p-1 mt-2" onClick={GenerateProSummaryFromAI} >Generate with AI</button><span className=" text-secondary" > *Provide Job designation and company name</span>
                    </dl>
                    <h5 className="text-center form-title">EDUCATION</h5>
                    <div className="d-grid mt-4">
                                <dt>Start Date</dt>
                                <dd><input type="date" className=" form-control" name="formEduStartdate" onChange={formik.handleChange} value={formik.values.formEduStartdate} ></input></dd>
                                <dt>End Date</dt>
                                <dd><input type="date" className=" form-control" name="formEduEnddate" onChange={formik.handleChange} value={formik.values.formEduEnddate}></input></dd>
                            </div>
                            <div className="d-flex mt-3 mb-3 " >

                            
                                <dt>University Name</dt><input type="text" className="form-control " name="formCollegeName" onChange={formik.handleChange} value={formik.values.formCollegeName}></input>
                                <dt>Major</dt><input type="text" className="form-control " name="formMajor" onChange={formik.handleChange} value={formik.values.formMajor}></input>


                            </div>
                            <div className="d-flex mt-3 mb-3 " >

                            
                                <dt>Graduation</dt><input type="text" className="form-control " name="formGraduation" onChange={formik.handleChange} value={formik.values.formGraduation}></input>
                                <dt>Percentage</dt><input type="text" className="form-control " name="formBtechPer" onChange={formik.handleChange} value={formik.values.formBtechPer}></input>


                            </div>
                            
                        <dt>Description</dt>
                        <dd><textarea className="form-control m-2" rows="4" name="formEduSummary" onChange={formik.handleChange} value={formik.values.formEduSummary} ></textarea></dd>
                        <h5 className="text-center form-title mt-2">SKILLS</h5>
                        <p className="text-center text-dark">Add your top professional key skills</p>
                        <dt>Skills</dt>

                        <textarea
                        rows="3"
                        className="form-control"
                        name="formSkill"
                        onChange={formik.handleChange}
                        value={formik.values.formSkill}
                        />

                        <button type="button" className="get-started p-1 mt-2" onClick={GenerateSkills} >Generate from AI</button><span className=" text-secondary" > *Provide Job title</span>
                        <h5 className="text-center form-title mt-3" >PROJECTS</h5>
                        <dt>Project Name</dt>
                        <input type="text" className="form-control" name="formProject" onChange={formik.handleChange} value={formik.values.formProject}></input>
                        <dt>Project description</dt>
                        <dd><textarea rows="4" className="form-control" name="formProDes" onChange={formik.handleChange} value={formik.values.formProDes} ></textarea></dd>
                        <h5 className="text-center form-title mt-2">CERTIFICATES</h5>
                        <input type="text" name="formCertificate" className="form-control" placeholder="Certificate" onChange={formik.handleChange} value={formik.values.formCertificate} ></input>
                        {formik.errors.message? <div className="text-danger mx-4" >{formik.errors.message}</div> : null}
                        <div className="text-end mt-3" >
                        <button type="submit" className="get-started p-2 fw-bold w-25">SUBMIT</button>

                        </div>
                </div>
            </form>
            </div>
        </div>
    )
}
