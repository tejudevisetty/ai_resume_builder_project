import { Link } from "react-router-dom";
import { Footer } from "./footer";

export function HomePage(){



    return(
      <div className="container-fluid mt-5 " >
        <main className="container mt-5" >

        <h4 className="text-center mt-5">
  <span className="typing-effect mt-5">Are you struggling to build your own resume?</span>
</h4>



        <p className="text-center main-heading mt-5" >WELCOME TO<span className="main-sub-heading" > AI RESUME BUILDER</span></p>
        <p className="text-center text-secondary fs-4" >Smart Resumes, Smarter Careers.</p>
        <div className="text-center mt-2 " >
        <Link to="/login" className=" btn get-started fs-5 p-2">GET STARTED   <span className="bi bi-arrow-right fw-bold" > </span></Link>

        </div>

        </main>
        <section >
            <h4 className=" mt-5 mb-5 text-center fs-3 fw-bold container" >How  it  Works?</h4>
            <div className="d-flex mt-5 mb-5 justify-content-evenly" >
              <div className="media-card">
              <div className="card p-2" style={{width: "22rem", height: "14rem"}}>
              <div className="bi bi-file-code fs-3 fw-bolder"></div>

              <div className="card-title text-center fs-4 fw-bold">Pick a template<br/>
              
              </div>
              <p className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis necessitatibus, blanditiis dolores facere ullam perspiciatis nobis quas aliquam quibus
              </p>
              
              </div>

              <div className="card p-2" style={{width: "22rem", height: "14rem"}}>
              <div className="bi bi-pen fs-3 fw-bolder"></div>

              <div className="card-title text-center fs-4 fw-bold">Edit your Form<br/>
              
              </div>
              <p className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis necessitatibus, blanditiis dolores facere ullam perspiciatis nobis quas aliquam quibus
              </p>
              
              </div>

              <div className="card p-2" style={{width: "22rem", height: "14rem"}}>
              <div className="bi bi-file-earmark-arrow-down fs-3 fw-bolder"></div>

              <div className="card-title text-center fs-4 fw-bold">Download<br/>
              
              </div>
              <p className="text-center ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis necessitatibus, blanditiis dolores facere ullam perspiciatis nobis quas aliquam quibus
              </p>
              
              </div>
              </div>
              </div>
        </section>

        <div className="container mt-5 ">
          <h3 className="text-center fw-bold mt-5" >Why our website?</h3>
          <div className=" d-flex mt-5 mb-4 ">
            <div className="media-himg">

            <div className=" mt-3 media-himg" >
              <img src="/gpt-image.png" className=" w-75 mt-xl-5 media-img" alt=" "></img>
            </div>

            <div className="w-100 text-center" >

            <div className=" number fw-bold fs-3 " >1</div>
          <h4 className="heading" >AI-Powered Perfection</h4>
          <p className="fs-4 text-secondary" >We use smart AI to sugget the best content to land your dream job.</p>

        <div className=" number m-2 fw-bold fs-3 " >2</div>
          <h4 className="heading" >Instant Resume in Minutes</h4>
          <p className="fs-4 text-secondary" >Just input your details, our tool builds a clean, professional resume instantly.</p>
        

        <div className=" number m-2 fw-bold fs-3 "  >3</div>
        <h4 className="heading" >Modern & ATS-Friendly Templates</h4>
        <p className="fs-4 text-secondary" >Choose from stylish templates designed to pass Applicant Tracking Systems.</p>
        </div>
        </div>

            </div>
          

          </div>

          {/* FAQ for resume builder website */}

          <div className="container-fluid faq mb-5">
            <h2 className=" text-center mt-5 fw-bolder mb-5" >FAQ</h2>
            <div className="accordion accordion-flush mt-5" id="accordionFlushExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    What is a Resume Builder
                  </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">It provides customizable templates and tips to enhance your job application documents and give you a better chance of standing out. 

Jobseeker’s resume builder goes a step further. It includes AI-powered suggestions to help you craft a standout resume .</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    Is the resume builder ATS-friendly?
                  </button>
                </h2>
                <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">Many employers use applicant tracking systems (ATS) to analyze resumes and cover letters before forwarding candidate information to the hiring team. You need to make it past the ATS if you want to land an interview. 
                    Yes it is ATS-Friendly.</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    Can we build our resume with AI?
                  </button>
                </h2>
                <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">Yes we can build resume with AI through this website..</div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                    Is this resume builder free to use?
                  </button>
                </h2>
                <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">Yes it is a free resume builder, which allows you to select a resume template and build out your resume.</div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                    Should I make a different resume for every job application?
                  </button>
                </h2>
                <div id="flush-collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit reprehenderit voluptatum ipsam, animi culpa repellendus non sit dolores soluta deleniti et quaerat deserunt dolorum praesentium, dolor recusandae ratione expedita ea?.</div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                    Is it possible to choose the structure and format of the resume?
                  </button>
                </h2>
                <div id="flush-collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, magnam iusto aperiam enim ipsum earum quibusdam architecto, blanditiis inventore ea minus distinctio saepe quidem aut eaque harum similique, porro quam?.</div>
                </div>
              </div>

              
            </div>
          </div>
          <Footer/>


      </div>
    ) 
  }