import { useEffect, useState } from "react"
import {getDocs, collection,updateDoc,arrayUnion,doc,getDoc} from "firebase/firestore"
import {db} from '../../../ConfigFireBase/Config'
const DisplayJobs = ({selectJobRole})=>{
  const loggedinjobSeeker = JSON.parse(localStorage.getItem("loggedInJobSeeker"))
  console.log(selectJobRole, "selectJobRole")
  const [allJobs, setAllJobs] = useState([])
  const [loadingJobs,setLoadingJobs] = useState(true)
  const [filterDataBasedOnJobRole, setFilterDataBasedOnJobRole] = useState([])

  console.log(allJobs,"all jobs")

  useEffect(()=>{
    const fetchingJobs = async()=>{ // here i took a function in useEffect
      try{
        // collection ----- takes 2 arguments ---> 1.database name(we took it as db in config.jsx)  2. collection name(like job_seekers, recruiters)
       const recCollectionRef = collection(db, "recruiters") // 1st i took a collection reference
        const allDocs = await getDocs(recCollectionRef) // with that reference i get the all docs from the firestore
        let jobsFromDocs = [] /// initialy taking any empty array
        allDocs.docs.map((doc)=>{
          let individualDocJobs = doc.data().jobs
          console.log(individualDocJobs)
          individualDocJobs.map((singleJob)=>{
            jobsFromDocs.push(singleJob)
          })
          console.log(jobsFromDocs, "jobsFromDocs")
          // jobsFromDocs.push(doc.data().jobs) // using push method
          // jobsFromDocs = [...jobsFromDocs,doc.data().jobs]  // using spread operator --> the problem here is we get data in array inside another array so 1st map it and then send it to an array
          // console.log(doc.data().jobs,"docs") 
          setAllJobs(jobsFromDocs) // updater function
          setFilterDataBasedOnJobRole(jobsFromDocs)
          setLoadingJobs(false)
        })
      }catch(err){
        console.log(err)
      }
    }
    fetchingJobs()  // hering calling that function
  },[])

  useEffect(()=>{
    // alert("role")
    let roleBasedFilterData = allJobs.filter((job)=>job.jobRole === selectJobRole)
    setFilterDataBasedOnJobRole(roleBasedFilterData)
    console.log(roleBasedFilterData,"filData")
  },[selectJobRole])

  if(loadingJobs){
    return <p>loading Jobs.... wait a momment</p>
  }
  const handleSavedJob =async (savedJob)=>{   // saving jobs onclick
    console.log(savedJob, "saved jobs") 
    try{
      let job_seeker_ref_doc = doc(db, "job_seekers", loggedinjobSeeker.user.displayName)
      // console.log(job_seeker_ref_doc, "job seeker ref doc") 
      let job_seekerDataDoc = await getDoc(job_seeker_ref_doc)
      console.log(job_seekerDataDoc) 

      await updateDoc(job_seeker_ref_doc,{
        savedJobs:arrayUnion(savedJob)
      })
      alert("successfully job saved")
    }
    catch(err){
      console.log(err)
    }
  }
  const handleAppliedJob = async(appliedJob)=>{
    console.log(appliedJob, "applied jobs") 
    try{
      let job_seeker_ref_doc = doc(db, "job_seekers", loggedinjobSeeker.user.displayName)
      // console.log(job_seeker_ref_doc, "job seeker ref doc") 
      let job_seekerDataDoc = await getDoc(job_seeker_ref_doc)
      console.log(job_seekerDataDoc) 

      await updateDoc(job_seeker_ref_doc,{
        appliedJob:arrayUnion(appliedJob)
      })
      alert("successfully applied saved")
    }
    catch(err){
      console.log(err)
    }
  }
  return(
    <div style={{display:"flex",gap:"1rem",flexWrap:"wrap"}}>
    {filterDataBasedOnJobRole.length>0 ? <>

      {filterDataBasedOnJobRole.map((job)=>{
        return(
          <div style={{boxShadow:" rgba(7, 3, 3, 0.35) 0px 5px 15px",borderRadius:"10px",padding:"10px",backgroundColor:"white"}}>
            <h1>{job.jobRole}</h1>
            <p>{job.company}</p>
            <div >
              <button style={{margin:"10px",borderRadius:"5px"}} onClick={()=>handleSavedJob(job)}>save</button>
              <button style={{borderRadius:"5px"}} onClick={()=>handleAppliedJob(job)}>apply</button>
            </div>
          </div>
        )
      })}
    </> : "no jobs found"}

    </div>
  )
}
export default DisplayJobs