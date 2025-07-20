

import {Navbar,Container,Nav} from 'react-bootstrap';
import {Link,useNavigate} from 'react-router-dom'
import { signOut, getAuth } from 'firebase/auth';
const NavbarComp = ()=>{
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInRecruiter"))  || JSON.parse(localStorage.getItem("loggedInJobSeeker"))
  const handleLogout = async()=>{
    const auth = getAuth();
    try{
      await signOut(auth)
      localStorage.removeItem("loggedInRecruiter")
      localStorage.removeItem("loggedInJobSeeker")
      alert("logged out successfully")
      navigate("/login")
    }catch(err){
      console.log(err) 
    }
  };
  return(
    <div>
      <Navbar expand="lg" className="bg-body-tertiary" >
      <Container fluid id='navbarCont'>
        <div className='navLeftCont'>
        <img src='logo.webp' id='navbarLogo'/>
        <Navbar.Brand href="#" id='navLeft'>Job Kavala</Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <div className='navRight'>
        <Navbar.Collapse id="navbarScroll" >
          <Nav
            className="me-auto my-2 my-lg-0" navbarScroll >
            
            {loggedInUser ? <><button className='navRightStyle' onClick={handleLogout} id='submitBtn'>logout</button>

            <button className='navRightStyle' onClick={()=>navigate("/job_seekerDashBoard/savedJobs")}>Saved Jobs</button>
            <button className='navRightStyle' onClick={()=>navigate("/job_seekerDashBoard/appliedJobs")}>Applied  Jobs</button>
            </> : <>
              <Link to="/signup" className='navRightStyle'  style={{textDecoration:'none'}}>Register</Link>
              <Link to="/login" className='navRightStyle' style={{textDecoration:'none'}}>Login</Link>
            </>}
          </Nav>
        </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
    </div>
  )
}
export default NavbarComp