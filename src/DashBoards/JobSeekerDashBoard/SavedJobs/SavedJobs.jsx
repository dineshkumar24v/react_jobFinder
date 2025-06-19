import React, { useEffect, useState } from 'react'
import {db} from '../../../ConfigFireBase/Config'
import {doc,getDoc} from "firebase/firestore"

const SavedJobs = () => {
  const loggedInJobSeeker = JSON.parse(localStorage.getItem("loggedInJobSeeker"))
  const [loading,setLoading] = useState(true);
  const [savedJobs,setSavedJobs]=useState([]);
  useEffect(()=>{
    let fetchSavedJobs = async ()=>{
      try{
        const docRef = doc(db,"job_seekers",loggedInJobSeeker.user.displayName)
        const mainDocRef = await getDoc(docRef)
        const jobSeekersDocData = mainDocRef.data()
        console.log(jobSeekersDocData, "jobsDocDATA")
        setSavedJobs(jobSeekersDocData.savedJobs)
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    }
    fetchSavedJobs()
  },[]);
  if(loading){
    return <p>getting saved jobs... wait a momment......</p>
  }
  return (
    <div>
      <h1>Saved jobs</h1>
      {savedJobs.map((savedJob)=>{
        return(
          <>
            <h2>{savedJob.jobRole}</h2>
            <p>{savedJob.company}</p>
          </>
        )
      })}
    </div>
  )
}

export default SavedJobs
