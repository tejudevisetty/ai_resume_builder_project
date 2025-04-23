import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { HomePage } from './components/home-page';
import { LoginPage } from './components/login-page';
import { Resumehomepage } from './components/creating-resumes/resume-homepage';
import { ResumeForm } from './components/creating-resumes/resume-form';
import { ResumePreview } from './components/creating-resumes/resume-preview';
import { RegisterUser } from './components/register';
import { Header } from './components/header';
import { ATSChecker } from './components/ats-score-checker';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditForm } from './components/edit-resumeForm';
import { Footer } from './components/footer';



function App() {
  return (
    <div className="App"> 
        
        <BrowserRouter>
        <Header/>
        <Routes >
          <Route path='/' element={<HomePage/>} />
          <Route path='/register' element={<RegisterUser/>}/>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/resumehomepage/:id' element={<Resumehomepage/>}/>
          <Route path='/resumeform/:id' element={<ResumeForm/>} />
          <Route path='/resumepreview/:id' element={<ResumePreview/>}/>
          <Route path='/atsScorechecker' element={<ATSChecker/>}/>
          <Route path='/editResumeform/:id' element={<EditForm/>}/>

        </Routes>
        <ToastContainer position="top-center" />

        </BrowserRouter> 
    </div>
  );
}
export default App;
 