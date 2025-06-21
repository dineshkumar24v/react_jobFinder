

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
    <div style={{display:'flex', justifyContent:'space-around',backgroundColor:"lightblue",padding:"8px"}}>
      <Navbar expand="lg" className="bg-body-tertiary" >
      <Container fluid >
        <Navbar.Brand href="#" >Job Kavala</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px',gap:'10px'}}
            navbarScroll>
            
            {loggedInUser ? <><button onClick={handleLogout} id='submitBtn'>logout</button>

            <button onClick={()=>navigate("/job_seekerDashBoard/savedJobs")}>Saved Jobs</button>
            <button onClick={()=>navigate("/job_seekerDashBoard/appliedJobs")}>Applied  Jobs</button>
            </> : <>
              <Link to="/signup" style={{textDecoration:'none'}}>SignUp</Link>
              <Link to="/login" style={{textDecoration:'none'}}>Login</Link>
            </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
export default NavbarComp