import { Link } from "react-router-dom"
import './Sidebar.css'

const Sidebar = ()=>{
  return(
    <div className="sidebar_links">
      <Link to="post_job">PostJob</Link>  
      <Link to="my_postings">MyPostings</Link>
    </div>
  )
}
export default Sidebar

// in link if to = "post_job" --> this will be added as child to the ---> recruiterDashBoard/post_job

// or else if added like this to="/post_job" ---> than this will be added as seperate route not the child of the dashboard  --> post_job