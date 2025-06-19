import React, { useEffect, useState } from 'react'
import {db} from '../../../ConfigFireBase/Config'
import {doc,getDoc} from "firebase/firestore"

const AppliedJobs = () => {
  const loggedInJobSeeker = JSON.parse(localStorage.getItem("loggedInJobSeeker"))
  const [loading,setLoading] = useState(true);
  const [appliedJobs,setAppliedJobs]=useState([]);
  useEffect(()=>{
    let fetchAppliedJobs = async ()=>{
      try{
        const docRef = doc(db,"job_seekers",loggedInJobSeeker.user.displayName)
        const mainDocRef = await getDoc(docRef)
        const jobSeekersDocData = mainDocRef.data()
        console.log(jobSeekersDocData, "jobsDocDATA")
        setAppliedJobs(jobSeekersDocData.appliedJobs)
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    }
    fetchAppliedJobs()
  },[]);
  if(loading){
    return <p>getting applied jobs... wait a momment......</p>
  }
  return (
    <div>
      <h1>applied jobs</h1>
      {appliedJobs.map((appliedJob)=>{
        return(
          <> 
            <h2>{appliedJob.jobRole}</h2>
            <p>{appliedJob.company}</p>
          </>
        )
      })}
    </div>
  )
}

export default AppliedJobs
