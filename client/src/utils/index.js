export const checkIfImage = (url)=>{
    const img = new Image();
    img.src= url;
    return new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
}

export const calculateBarGraph = (gaol , raisedAmount)=>{
  return (raisedAmount*100)/gaol;
}

export const remainingDays = (deadline)=>{
  console.log(deadline, Date.now());
  const diff = new Date(deadline).toString() - Date.now().toString();

  return diff
}