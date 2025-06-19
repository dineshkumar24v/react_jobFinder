import FilterOptions from "./FilterOptions/FilterOptions"
import DisplayJobs from './DisplayJobs/DisplayJobs'
import { useState } from "react"
import { useParams } from "react-router-dom"
import SavedJobs from "./SavedJobs/SavedJobs"
import AppliedJobs from "./AppliedJobs/AppliedJobs"
const JobSeekerDashBoard = ()=>{
  const params=useParams()
  console.log(params, "params")

  function renderComp(){
    // let CompName;
    if(params.savedJobs === "savedJobs"){
      return <SavedJobs/>
    }else if(params.appliedJobs === "appliedJobs"){
      return <AppliedJobs/>
    }else{
      return <DisplayJobs selectJobRole={selectJobRole}/>
    }
  }
 
  const [selectJobRole, setSelectJobRole] = useState("")
  return(
    <div style={{display:"flex",gap:"2rem"}}>
      <div className="jobFilters">
          <FilterOptions  setSelectJobRole={setSelectJobRole}/>
      </div>
      <div className="displayJobs">
        {renderComp()}
      </div>
    </div>
  )
}
export default JobSeekerDashBoard