
import { useState } from "react"
import { Button, Modal,Form } from "react-bootstrap"
import {db} from '../../../ConfigFireBase/Config'
import {doc, updateDoc,arrayUnion} from 'firebase/firestore' // arrayUnion method will take data which we are sending
const PostJob = ()=>{
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInRecruiter"))
  const [jobDetails, setJobDetails] = useState({jobRole:"", company:"", jd:""}) 
  const [openModal, setOpenModal] = useState(false)

  const handleClick = ()=>{
    setOpenModal(true)
  }
  const handleClose = ()=>{
    setOpenModal(false)
  }
  const handleJobPosting = async()=>{
    // doc to save the docReference
    const recruiterDocRef = await doc(db, 'recruiters', loggedInUser.user.displayName) 
    // we are already having a data in firebase recruiters so now we want to add an extra field that means we want to update so we 1st import updateDoc from firebase
    // we are using arrayUnion method to send jobPosted data to the firebase so we are sending an object
    await updateDoc(recruiterDocRef,{
      jobs: arrayUnion(jobDetails) 
    })
    alert("job posted")
    handleClose() // handleclose function will be called and modal will be closed
  }
  return(
    <div style={{display:'flex', justifyContent:"center",marginTop:"2rem"}}>
      <Button variant="info" onClick={handleClick}>Post Job</Button>

      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <Form style={{ maxWidth: 500, margin: "auto" }}>   {/* // form submit  */}
              
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="company here"
                  onChange={(e) =>
                    setJobDetails({ ...jobDetails, company: e.target.value })
                  } required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Job description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="jd here"
                  onChange={(e) =>
                    setJobDetails({ ...jobDetails, jd: e.target.value })
                  } required
                />
              </Form.Group>
              <Form.Label>Choose your Job role</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) =>
                  setJobDetails({ ...jobDetails, jobRole: e.target.value })
                } required
              >
                <option>--Choose your role--</option>
                <option value="frontend">frontend developer</option>
                <option value="backend">Backend developer</option>
                <option value="fullstack">fullstack developer</option>
              </Form.Select>
              
            </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={handleJobPosting}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default PostJob