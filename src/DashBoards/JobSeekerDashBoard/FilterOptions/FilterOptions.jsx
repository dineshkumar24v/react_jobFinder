

const FilterOptions = ({setSelectJobRole})=>{
  const handleJobRole = (role)=>{
    setSelectJobRole(role)
  }
  return(
    <div className="filterOptions">
      <span onClick={()=>handleJobRole("frontend")}>FrontendJobs</span>
      <span onClick={()=>handleJobRole("backend")}>BackendJobs</span>
      <span onClick={()=>handleJobRole("fullstack")}>FullStackJobs</span>
    </div>
  )
}
export default FilterOptions