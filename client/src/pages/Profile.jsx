import React,{useState , useEffect} from 'react'
import { useStateContext } from '../context'
import { DisplayCampaign } from '../components';

const Profile = () => {
  const {contract,address,getUserCampaign} = useStateContext();
  const [campaigns,setCampaigns] = useState([]);
  const [loading , setLoading] = useState(true);

  const fetchAllCampaigns = async()=>{
   const data = await getUserCampaign();
   console.log(Array.isArray(data))
   setLoading(true)
   setCampaigns(data)
   setLoading(false);
  }
  useEffect(()=>{
    fetchAllCampaigns();
  },[contract,address])

  return (
   <DisplayCampaign
   title="All tha Campaigns"
   loading = {loading}
   campaigns = {campaigns}
   />
  )
}

export default Profile