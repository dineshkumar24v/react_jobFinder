import {Routes, Route} from 'react-router-dom'
import NavbarComp from './Comps/Navbar/Navbar'
import SignUp from './Pages/SignUp/SignUp'
import Login from './Pages/Login/Login'
import RecruiterDashBoard from './DashBoards/RecruiterDashBoard/RecruiterDashBoard'
import PostJob from './DashBoards/RecruiterDashBoard/PostJob/PostJob'
import MyPostings from './DashBoards/RecruiterDashBoard/MyPostings/MyPostings'
import JobSeekerDashBoard from './DashBoards/JobSeekerDashBoard/JobSeekerDashBoard'
import DisplayJobs from './DashBoards/JobSeekerDashBoard/DisplayJobs/DisplayJobs'
import { useState } from 'react'
const App = ()=>{
  const [params,setParams] = useState("") 
  return(
    <div>
      <NavbarComp/>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/recruiterDashBoard' element={<RecruiterDashBoard/>}>
              <Route path='post_job' element={<PostJob/>}/>
              <Route path='my_postings' element={<MyPostings/>}/>
        </Route>
        <Route path='/job_seekerDashBoard' element={<JobSeekerDashBoard params={params}/>}/>
        <Route path='/job_seekerDashBoard/:savedJobs' element={<JobSeekerDashBoard setParams={setParams}/>}/>

        <Route path='/job_seekerDashBoard/:appliedJobs' element={<JobSeekerDashBoard setParams={setParams}/>}/>

        <Route path='displayJobs' element={<DisplayJobs/>}/>
      </Routes>
    </div>
  )
}
export default App 




