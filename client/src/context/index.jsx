import React, { createContext, useContext } from "react";
import { useContract, useContractWrite, useMetamask, useAddress } from '@thirdweb-dev/react'
import { ethers } from "ethers";
import moment from 'moment';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
 
  const { contract } = useContract("0xF9Ea24eBfBB2Aa453357c8785995798881931e33");
  const { mutateAsync: createCampaign} = useContractWrite(contract, "createCampaign")

  const connect = useMetamask();
  const address = useAddress();
  let add;
  if(address)add = address;

  const publishCampaign = async (form) => {
    console.log("ander aaya")
    try {
      const data = await createCampaign({ args: [
         add,
         form.title,
         form.description,
         form.image, 
         form.target, 
         new Date(form.deadline).getTime()]
        });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const getAllCampaigns = async()=>{
   const campaigns = await contract.call('getCampaigns')

   const parseCamapaigns = campaigns.map((campaign,i)=>({
    owner : campaign.owner,
    title:campaign.title,
    description:campaign.description,
    image:campaign.image,
    deadline: moment(campaign.deadline).format('MMMM Do YYYY, h:mm:ss a'),
    target: ethers.utils.formatEther(campaign.target.toString()),
    amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
    id : i
   }))
   return parseCamapaigns;
  }

  const getUserCampaign = async()=>{
    const data = await getAllCampaigns();
    const filteredCampaign = data.filter((t)=>t.owner === address);

    return filteredCampaign;
  }

  const donate = async(id,amount)=>{
    const data = await contract.call("donateToCampaign",[id],{value: ethers.utils.parseEther(amount)})
    return data;
  }

  const getDonations = async(id)=>{
  
      let data = await contract.call("getDonators" , [id])
      return data
  
  }
  

  return (
    <StateContext.Provider
      value={{
        connect,
        address,
        contract,
        getAllCampaigns,
        createCampaign: publishCampaign,
        getUserCampaign,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);