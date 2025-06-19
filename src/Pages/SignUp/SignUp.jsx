
import { Form } from "react-bootstrap";
import "./SignUp.css";
import { useState } from "react";
import { authentication, db } from "../../ConfigFireBase/Config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [signUpDetails, setsignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const accountCreated = await createUserWithEmailAndPassword(authentication,signUpDetails.email,signUpDetails.password);
      console.log(accountCreated, "account created object");

      await updateProfile(accountCreated.user, {displayName:signUpDetails.name})  // this is to save the name to the displayName key check the console 

      await setDoc(doc(db, `${signUpDetails.role}s`,signUpDetails.name),{
        name:signUpDetails.name,
        email:signUpDetails.email,
        role:signUpDetails.role,
        id:Date.now() // sets the current date
      })

      alert("Account created successfully and redirecting to Login");
      navigate('/login')

      // setDoc --> it will create doc in the database : it takes 2 values or 2 arguments 
      // 1. arg is all about reference of the doc, we can use doc() as first value
      // 2. value: --> fields to be fit in that doc(1st arg)

      //doc : ---> it is used to create a refernece of the doc means in which db, which collection and which doc should be given
      //  we can pass 3 values
      //  1. value:--> db
      // 2. value:--> collection(recruiters)
      // 3. value:--> docname(rakesh)

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      style={{
        marginTop: "3rem",
        backgroundColor: "lightblue",
        padding: "2rem",
      }}
    >
      <Form style={{ maxWidth: 500, margin: "auto" }} onSubmit={handleSignUpSubmit}>
        {/* // form submit  */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            onChange={(e) =>
              setsignUpDetails({ ...signUpDetails, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onChange={(e) =>
              setsignUpDetails({ ...signUpDetails, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password here"
            onChange={(e) =>
              setsignUpDetails({ ...signUpDetails, password: e.target.value })
            }
          />
        </Form.Group>
        <Form.Label>Choose your role</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) =>
            setsignUpDetails({ ...signUpDetails, role: e.target.value })
          }
        >
          <option>--Choose your role--</option>
          <option value="job_seeker">JobSeeker</option>
          <option value="recruiter">Recruiter</option>
        </Form.Select>
        <button type="submit" id="submitBtn">
          Signup
        </button>
      </Form>
    </div>
  );
};
export default SignUp;
