import { useState } from "react"
import {signInWithEmailAndPassword} from 'firebase/auth'
import { authentication } from "../../ConfigFireBase/Config"
import { Link, useNavigate } from "react-router-dom"
import {Form} from 'react-bootstrap'

function Login(){
  const navigate = useNavigate()
  const [loginDetails, setLoginDetails] = useState({email:"",password:"", role:""})
  const handleLoginSubmit = async(e)=>{
    e.preventDefault()
    const {email,password,role} = loginDetails // de-structuring
    try{
      const loggedInUser = await signInWithEmailAndPassword(authentication,email,password)
      alert("LoggedIn successfully")
      if(role === 'recruiter'){
        localStorage.setItem("loggedInRecruiter", JSON.stringify(loggedInUser))
      }else{
        localStorage.setItem("loggedInJobSeeker",JSON.stringify(loggedInUser)) 
      }
      navigate(`/${role}DashBoard`) 
    } 
    catch(err){
      console.log(err) 
    }
  }
  return(
    <div
    style={{
        marginTop: "3rem",
        backgroundColor: "lightblue",
        padding: "2rem",
      }}>
      <Form style={{ maxWidth: 500, margin: "auto" }} onSubmit={handleLoginSubmit}>   {/* // form submit  */}
        
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password here"
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, password: e.target.value })
            }
          />
        </Form.Group>
        <Form.Label>Choose your role</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, role: e.target.value })}>
          <option value="">--Choose your role--</option>
          <option value="job_seeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </Form.Select>
        <button type="submit" id="submitBtn">Login </button>
        <Link to="/signup">go to SignupForm</Link>
      </Form>
    </div>
  )
}
export default Login

