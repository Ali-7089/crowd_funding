export const checkIfImage = (url,callback)=>{
    const img = new Image();
    img.src = url;

    if(src.complete) callback(true)

    img.onload =()=> callback(true);
    img.onerror = ()=> callback(false); 
}