import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './index.css';
import {Home , Profile,CampaignDetails,CreateCampaign} from './pages/index'
import { SideBar,NavBar } from './components';


const App = () => {
  return (
  <div>
    <div className="relative sm:-8 p-4 bg-[#13131] min-h-screen flex flex-row">
    <div className="sm:flex hidden mr-10 relative">
     <SideBar/>
    </div>

    <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
      <NavBar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/create-campaign' element={<CreateCampaign/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/campaign-details/:id' element={<CampaignDetails/>}/>
      </Routes>
    </div>
    </div>
  </div>
    
  )
}

export default App