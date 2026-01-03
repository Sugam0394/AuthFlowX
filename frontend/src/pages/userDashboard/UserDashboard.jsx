import React from 'react'
import "./UserDashboard.css"
import Recommendation from './components/Recommendation'
import TrendingSection from './components/TrendingSection'
import NewToolsSection from './components/NewToolsSection'

function UserDashboard() {
  return (

    <div> 
 <Recommendation />
<TrendingSection /> 
<NewToolsSection />

</div> 
  )
}

export default UserDashboard