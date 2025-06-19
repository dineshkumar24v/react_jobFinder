import {doc,getDoc, updateDoc} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import {db} from '../../../ConfigFireBase/Config'
import {Button} from 'react-bootstrap'
const MyPostings = ()=>{
  const [jobs, setJobs]= useState([])
  const [loading, setLoading] = useState(true) 
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInRecruiter"));
  const loggedInUserName = loggedInUser.user.displayName

  useEffect(()=>{
    const fetchingData = async()=>{
      const docRef = doc(db, "recruiters", loggedInUser.user.displayName)
      const getDocRef = await getDoc(docRef) 
      console.log(getDocRef) 

      if(getDocRef.exists()){ // exists()  is a method
        const data = getDocRef.data()
        console.log(data, "data")
        setJobs(data.jobs || [])
        setLoading(false)
      }
    }
    fetchingData() // invoking an async function
  },[])
  if(loading){
    return <p>loading ........</p>
  } 

  const handleDeleteJob = async (choosedJobIndex)=>{
    let jobsAfterDeleteFiltration = jobs.filter((job,index)=>index !== choosedJobIndex)
    console.log(jobsAfterDeleteFiltration)
    
    const docRef = doc(db, "recruiters", loggedInUserName) 
    await updateDoc(docRef, {
      jobs:jobsAfterDeleteFiltration
    })
    alert("job deleted successfully")
    setJobs(jobsAfterDeleteFiltration)

  }
  return(
    <div>
      {jobs.length > 0 ? <> 
      {jobs.map((job,jobIndex)=>{
        return(
          <div className='jobPostCards'>
            <h2>{job.jobRole}</h2>
            <p>{job.company}</p> 
            <div>
            <Button variant="warning">Edit</Button>
            <Button variant="danger" onClick={()=>handleDeleteJob(jobIndex)}>Delete</Button>
            </div>
          </div>
        )
      })}
      </> : "no jobs posted yet"}
    </div>
  )
}
export default MyPostings