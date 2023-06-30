import React, { createContext, useContext } from "react";
import { useContract, useContractWrite, useMetamask, useAddress } from '@thirdweb-dev/react'
import { ethers } from "ethers";
import moment from 'moment';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
 
  const { contract } = useContract("0xeB6a1D73C800f83f5c67716B5E3799867573409a");
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
         Math.floor(new Date(form.deadline).getTime()/1000),
         form.target, 
        ]
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
    deadline: campaign.deadline._hex,
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
      const numberOfCampaign = data[0].length

      let parseDonation = []

      for(var i=0;i<numberOfCampaign;i++){
       parseDonation.push({
        donator : data[0][i],
        donation: ethers.utils.formatEther(data[1][i].toString())
       })
      }
      return parseDonation;
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