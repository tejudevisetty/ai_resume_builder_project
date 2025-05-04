import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {  Link, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "../templates/template-2.css";

export function ResumePreview() {
  const [userData, setUserData] = useState({});
  const params = useParams();
  const resumeRef = useRef();

  useEffect(() => {
    axios.get(`https://ai-resume-builder-project-server.onrender.com/userDetails/${params.id}`)
      .then((res) => {
        console.log("Response data is", res.data);
        console.log("template id is:", res.data.templateId);
        setUserData(res.data);
      })
      .catch((err) => console.error(err));
  }, [params.id]);

  const handleDownload = () => {
    const element = resumeRef.current;
    const options = {
      margin: 0,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
  };

  if (userData.templateId === "t2") {
    return (
      <div className=" mt-5 bg-body-secondary" > 
        <div className=" mt-4">  .</div>
        <div className=" text-center mt-3" ><h3>Step 3</h3>
          <p className="  fs-4 custom-color" >Preview & Download</p>
        </div>
        <div className="template-container bg-white p-4" ref={resumeRef}>
          <h1 className="user-name text-center   custom">{userData.formName.toUpperCase()}</h1>
          <div className="contact-info d-flex justify-content-center ">
            {/* <p className=" fw-bold" > {userData.formNumber}  | {userData.formEmail} | {userData.formUrl} </p> */}
            <num className="mt-1" >{userData.formNumber}</num>
            <ul className="d-flex gap-4 mt-1" >
              <li>{userData.formEmail}</li>
              <li>{userData.formUrl}</li>
            </ul>
          </div>
          <h3 className="section-title-2 custom">OBJECTIVE</h3> 
          <p className="summary">
            {userData.formSummary}
          </p>
          

          <h3 className="section-title-2 custom">EDUCATION</h3>
          <div className=" d-flex justify-content-between" >
            <p><strong>{userData.formGraduation  } , {userData.formMajor}</strong></p>
            <p className="fw-bold" >{userData.formEduStartdate} - {userData.formEduEnddate}</p>

          </div>
          <p>{userData.formCollegeName} - {userData.formBtechPer}</p>

          <h3 className="section-title-2 custom">SKILLS</h3>
          <div>
            <ul className="mb-3 mt-3">
              {(userData.formSkill || "").split('\n').map((line, index) => {
                const [category, skills] = line.split(':');
                if (!category || !skills) return null; // Skip lines that don't have both parts
                return (
                  <li key={index}>
                    <strong>{category.trim()}:</strong> {skills.trim()}
                  </li>
                );
              })}
            </ul>
          </div>


          <h3 className="section-title-2 mt-2 custom">EXPERIENCE</h3>
          <div className="d-flex justify-content-between" >

          <p><strong> {userData.formDesignation} , {userData.formCompany} </strong></p>
          <p className=" fw-bold" >{userData.formStartdate} - {userData.formEnddate}</p>


          </div>
          <ul>
                <li>{userData.formExpSummary}</li>
          </ul>

          <h3 className="section-title-2 custom">PROJECTS</h3>
          <p className=" fw-bold " >{userData.formProject}</p>
          <ul >
            
            <li>{userData.formProDes}</li>
          </ul>
          {
            userData.formCertificate
            
            ? 

            <div>

              <h3 className="section-title-2 custom" >CERTIFICATES</h3>
              <p>{userData.formCertificate}</p>

            </div>
            

          :

          null

          }
          

        
        </div>
        <div className=" d-grid mb-3 mt-3" >
          <button className="ai-btn w-25 custom-btn p-2 mt-3 fw-bold " style={{marginLeft: '42%'}} onClick={handleDownload}>DOWNLOAD</button>

          
          <Link to={`/editResumeform/${params.id}`} className="btn ai-btn w-25 custom-btn  p-2 mt-2 fw-bold" style={{marginLeft: '42%'}} >EDIT RESUME</Link>


        </div>


      </div>
    );
  } else {
    return (
      <div className=" mt-5 bg-body-secondary" >
        <div className=" mt-4">  .</div>
        <div className=" text-center mt-3" ><h3>Step 3</h3>
          <p className="  fs-4 custom-color" >Preview & Download</p>
        </div>
        <div className="template-container bg-white mt-3 p-4" ref={resumeRef}>
          <h1 className="text-black fs-3 fw-bold text-center">{userData.formName}</h1>
          <h2 className="title">{userData.formDesignation}</h2>
          <div className="contact-info d-flex justify-content-center ">
            <p className=" fw-bold" > {userData.formNumber}  | {userData.formEmail} | {userData.formUrl} </p>
          </div>
          <h3 className="section-title">OBJECTIVE</h3>
          <p className="summary text-dark">
            {userData.formSummary}
          </p>

          <h3 className="section-title ">SKILLS</h3>
          <div>
            <ul className="mb-3 mt-3">
              {(userData.formSkill || "").split('\n').map((line, index) => {
                const [category, skills] = line.split(':');
                if (!category || !skills) return null; // Skip lines that don't have both parts
                return (
                  <li key={index}>
                    <strong>{category.trim()}:</strong> {skills.trim()}
                  </li>
                );
              })}
            </ul>
          </div>

          
          <h3 className="section-title mt-2">EXPERIENCE</h3>
          <div className="d-flex justify-content-between" >

          <p><strong> {userData.formDesignation} | {userData.formCompany} </strong></p>
          <p className=" fw-bold" >{userData.formStartdate} - {userData.formEnddate}</p>


          </div>
          <ul>
                <li>{userData.formExpSummary}</li>
          </ul>
 
          <h3 className="section-title">EDUCATION</h3>
          <div className=" d-flex justify-content-between" >
            <p><strong>{userData.formGraduation } | {userData.formMajor}</strong></p>
            <p className="fw-bold" >{userData.formEduStartdate} - {userData.formEduEnddate}</p>

          </div>
          <p>{userData.formCollegeName} - {userData.formBtechPer}</p>



          <h3 className="section-title">PROJECTS</h3>
          <p className=" fw-bold " >{userData.formProject}</p>
          <ul >
            
            <li>{userData.formProDes}</li>
          </ul>
          {
            userData.formCertificate
            
            ? 
            
            <div>

              <h3 className="section-title custom" >CERTIFICATES</h3>
              <p>{userData.formCertificate}</p>

            </div>
            

          :

          null

          }
        
        </div>

        <div className=" d-grid mb-3 mt-3" >
          <button className="ai-btn w-25 custom-btn p-2 mt-3 fw-bold " style={{marginLeft: '42%'}} onClick={handleDownload}>DOWNLOAD</button>

          
          <Link to={`/editResumeform/${params.id}`} className="btn ai-btn w-25 custom-btn  p-2 mt-2 fw-bold" style={{marginLeft: '42%'}} >EDIT RESUME</Link>


        </div>
      </div>
    );
  }
};
