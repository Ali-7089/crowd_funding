import React, {createContext,useContext}  from "react";
import {useContract , useContractWrite , useMetamask , useAddress} from '@thirdweb-dev/react'

const StateContext = createContext();

export const StateContextProvider = ({children})=>{
  const {contract} = useContract('0x7E972AfE092c5E7F92EC137E40f5E2031c5711f3');
  const {mutateAsync:createCampaign} = useContractWrite(contract,'createCampaign');

  const connect = useMetamask();
  const address = useAddress();

  const publishCampaign = async(form)=>{
   try{
    const data = await createCampaign([
      address,
      form.title,
      form.description,
      form.image,
      new Date(form.deadline).getTime(),
      form.target
    ])

    console.log("contract called successfully" , data);
   }catch(error){
    console.log("contract calling failed" , error)
   }
  }

  return(
    <StateContext.Provider
    value ={{
        connect,
        address,
        contract,
        createCampaign:publishCampaign
    }}
    >
        {children}
    </StateContext.Provider>
  )
}

export const useStateContext = ()=> useContext(StateContext);