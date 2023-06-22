import React, { createContext, useContext } from "react";
import { useContract, useContractWrite, useMetamask, useAddress } from '@thirdweb-dev/react'
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
  

  return (
    <StateContext.Provider
      value={{
        connect,
        address,
        contract,
        createCampaign: publishCampaign
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);