import { useEffect, useState } from "react";
import axios from "axios";
import { AIChatSession } from "./AIModal";

import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

export function EditForm(){

    const [editData, setEditdata] = useState({});


        const params = useParams();

        const navigate = useNavigate();


        useEffect(() => {
            axios.get(`https://ai-resume-builder-project-server.onrender.com/userDetails/${params.id}`)
            .then((res) => {
                setEditdata(res.data);
            })
        },[params.id])
        
        const prompt = "Job Title: {jobTitle} , depends on job title give a professional summary 4 to 5 lines for job application . Note: Dont give array of result, generate a paragraph of 4 to 5 lines" ;
    
        const prompt1 = "Job title: {jobTitle} and  companyName: {companyName} , depends on job title and company name give a professional experience summary in 4 to 5 bullet points.Give only 1 summary, dont give array of summaries" 

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
        .replace('{jobTitle}', formik.values.formDesignation)
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

    const formik = useFormik({
        initialValues: {
            formName : editData.formName,
            formEmail: editData.formEmail,
            formNumber: editData.formNumber,
            formUrl : editData.formUrl,
            formSummary : editData.formSummary,
            formStartdate: editData.formStartdate,
            formEnddate: editData.formEnddate,
            formDesignation: editData.formDesignation,
            formCompany: editData.formCompany,
            formExpSummary: editData.formExpSummary,
            formEduStartdate: editData.formEduStartdate,
            formEduEnddate: editData.formEduEnddate,
            formCollegeName: editData.formCollegeName,
            formMajor: editData.formMajor,
            formEduSummary: editData.formEduSummary,
            formProject: editData.formProject,
            formSkill: editData.formSkill,
            formProDes: editData.formProDes,
            formCertificate: editData.formCertificate,
            formGraduation: editData.formGraduation,
            formBtechPer: editData.formBtechPer ,
            formJobtitle: editData.formJobtitle 
        },
        enableReinitialize: true,
        onSubmit : (values) => {
            axios.patch(`https://ai-resume-builder-project-server.onrender.com/userDetails/${params.id}`, values)
            .then((res)=> {

                console.log(res.data);

                navigate(`/resumepreview/${params.id}`);
            })
        },
        validate : (values) => {
            const errors = {};

            if(!values.formName || !values.formEmail || !values.formNumber || !values.formUrl || !values.formSummary || !values.formStartdate || !values.formEnddate
                || !values.formCompany || !values.formDesignation || !values.formExpSummary || !values.formEduStartdate || !values.formEduEnddate
                || !values.formCollegeName || !values.formMajor || !values.formProject || !values.formProDes || !values.formBtechPer || !values.formGraduation || !values.formSkill
            ){
                errors.message = "All fields marked with (*) are required";
                return errors;
            }
        }

    })


    
    return(
            <div className="container-fluid mt-5 bg-body-secondary" >
            <div className=" mt-3"> . </div>
            <div className="mt-4">            
            <h3 className="text-center" ><b>Step 2</b></h3>
            <p className=" fs-4 text-center m-1 custom-color" >Edit your Form</p>
            <form className=" input-group d-flex justify-content-around mt-5" autoComplete="off" onSubmit={formik.handleSubmit} >
                <div className="resume-form mb-5 w-75 p-5 font-monospace bg-white">
                    <dl>
                        <h5 className="text-center font-monospace form-title">PERSONAL DETAILS</h5>
                        <div className=" d-flex justify-content-around mt-4" >

                        <dt className="d-flex" >
                            Name <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span>
                        </dt>
                        <input type="text" className="form-control"  name="formName" value={formik.values.formName}  onChange={formik.handleChange} ></input>
                        

                        <dt className="d-flex" >Email <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt>
                            <input type="email" className="form-control "  name="formEmail" value={formik.values.formEmail} onChange={formik.handleChange}  ></input>
                        </div>
                        <div className=" d-flex justify-content-around mt-4" >


                        <dt className="d-flex" >Phone <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt>
                        <input type="phone" className="form-control" name="formNumber" value={formik.values.formNumber} onChange={formik.handleChange}></input>
                        <dt className="d-flex" >Website <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt>
                        <input type="url" className="form-control" name="formUrl" value={formik.values.formUrl} onChange={formik.handleChange}></input>

                        </div>
                        <div className="d-flex mt-3" ><dt className="d-flex" >Job title <span className="bi bi-asterisk text-danger" style={{fontSize: '8px', marginLeft: '-34px'}} ></span></dt>
                                <input type="text" className="form-control" name="formJobtitle" value={formik.values.formJobtitle} onChange={formik.handleChange} ></input>
                        </div>

                        
                        <dt className=" mt-3 " >Professional Summary</dt>
                        <dd>
                     


                            <textarea className="form-control" rows="4" name="formSummary" value={formik.values.formSummary} onChange={formik.handleChange} ></textarea>

                            
                            <button type="button" className="ai-btn p-2 mt-2" onClick={GenerateSummaryFromAI} >Generate from AI</button>

                        </dd>
                        <h5 className="text-center mb-2 form-title mt-4"  >PROFESSIONAL EXPERIENCE OR INTERNSHIP</h5>
                        
                            <div className="d-grid  mt-4">
                                <dt className="d-flex" >Start Date <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt>
                                <dd><input type="date"  className=" form-control" name="formStartdate" value={formik.values.formStartdate}  onChange={formik.handleChange} ></input></dd>
                                <dt className="d-flex" >End Date <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt>
                                <dd><input type="date" className=" form-control" name="formEnddate" value={formik.values.formEnddate} onChange={formik.handleChange} ></input></dd>
                            </div>
                            <span className=" d-flex text-secondary" ><input type="checkbox" className=" form-check" name="formExpCheck"></input>Currently I am working here </span>
                            <div className="d-flex mt-3 " >

                            
                                <dt className="d-flex" >Designation <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt><input type="text" className="form-control " name="formDesignation" onChange={formik.handleChange} value={formik.values.formDesignation}></input>
                                <dt className="d-flex" >Company Name <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt><input type="text" className="form-control " name="formCompany" onChange={formik.handleChange} value={formik.values.formCompany}></input>


                            </div>
                        <dt className="d-flex" >Summary <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt>
                        <dd>
                            <textarea className="form-control m-2" rows="4" name="formExpSummary" onChange={formik.handleChange} value={formik.values.formExpSummary} ></textarea>
                        </dd>
                        <button type="button" className="ai-btn p-2 mt-2" onClick={GenerateProSummaryFromAI} >Generate with AI</button>
                    </dl>
                    <h5 className="text-center form-title">EDUCATION</h5>
                    <div className="d-grid mt-4">
                                <dt className="d-flex" >Start Date <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt>
                                <dd><input type="date" className=" form-control" name="formEduStartdate" onChange={formik.handleChange} value={formik.values.formEduStartdate} ></input></dd>
                                <dt className="d-flex" >End Date <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt>
                                <dd><input type="date" className=" form-control" name="formEduEnddate" onChange={formik.handleChange} value={formik.values.formEduEnddate}></input></dd>
                            </div>
                            <div className="d-flex mt-3 mb-3 " >

                            
                                <dt className="d-flex" >University Name <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt><input type="text" className="form-control " name="formCollegeName" onChange={formik.handleChange} value={formik.values.formCollegeName}></input>
                                <dt className="d-flex" >Major <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt><input type="text" className="form-control " name="formMajor" onChange={formik.handleChange} value={formik.values.formMajor}></input>


                            </div>
                            <div className="d-flex mt-3 mb-3 " >

                            
                                <dt className="d-flex" >Degree <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt><input type="text" className="form-control " name="formGraduation" onChange={formik.handleChange} value={formik.values.formGraduation}></input>
                                <dt className="d-flex" >Percentage <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt><input type="text" className="form-control " name="formBtechPer" onChange={formik.handleChange} value={formik.values.formBtechPer}></input>


                            </div>
                        <dt className="d-flex" >Description</dt>
                        <dd><textarea className="form-control m-2" rows="4" name="formEduSummary" onChange={formik.handleChange} value={formik.values.formEduSummary} ></textarea></dd>
                        <h5 className="text-center form-title mt-2">SKILLS</h5>

                        <p className="text-center text-dark">Add your top professional key skills</p>
                        <dt className="d-flex" >Skills <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt>

                        {
                            

                            <textarea rows="3" className="form-control" name="formSkill" onChange={formik.handleChange} value={formik.values.formSkill}></textarea>


                        }
                        <button type="button" className="ai-btn p-2 mt-2" onClick={GenerateSkills} >Generate from AI</button><span className=" text-secondary" > *Provide Job title</span>


                        <h5 className="text-center form-title mt-3" >PROJECTS</h5>
                        <dt className="d-flex" >Project Name <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt>
                        <input type="text" className="form-control" name="formProject" onChange={formik.handleChange} value={formik.values.formProject}></input>
                        <dt className="d-flex" >Project description <span className="bi bi-asterisk text-danger" style={{fontSize: '8px'}} ></span></dt>
                        <dd><textarea rows="4" className="form-control" name="formProDes" onChange={formik.handleChange} value={formik.values.formProDes} ></textarea></dd>
                        <h5 className="text-center form-title mt-2">CERTIFICATES</h5>
                        <input type="text" name="formCertificate" className="form-control" placeholder="Certificate" onChange={formik.handleChange} value={formik.values.formCertificate} ></input>
                        {formik.errors.message? <div className="text-danger mx-4" >{formik.errors.message}</div> : null}

                        <div className="text-end mt-3" >
                        <button type="submit" className="ai-btn p-2 fw-bold w-25">SUBMIT</button>

                        </div>
                </div>
            </form>

        </div>
        </div>
    )
}
