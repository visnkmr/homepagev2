
"use client"


import StoreIcons from "./storeicons";
import LineClamp from "./LineClamp";
import { Download } from "lucide-react/";
import Llimage from "./llimage";
import { useEffect, useState } from "react";

export default function Eachapp({app}){
    const [show,setshow]=useState(false)
    // const [isHovering, setIsHovered] = useState(false);
//   const onMouseEnter = () => setIsHovered(true);
//   const onMouseLeave = () => setIsHovered(false);
//   useEffect(()=>{
//     console.log("heelo")
//   },[])
  
// useEffect(() => {
//     if(isHovering){
//       console.log("show");
//       setshow(true);
//     } else {
//       console.log("hide");
//       setshow(false);
//     }
//    }, [isHovering]); // Add isHovering as a dependency
    return (
    <div 
    key={app.slug}
    onClick={()=>setshow((old)=>{
        return !old
    })} 
    // onMouseEnter={onMouseEnter}
    // onMouseLeave={onMouseLeave}
    className="sm:flex shadow-indigo-500/50 shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-2xl col-span-1 mx-5 xl:mx-4 mb-8  p-4 ">             
    
      {/* <div className="w-120 p-4">
          <img
          src={image}
          className="w-120 "/>
      </div> */}
      <div className="text-center w-full ">
      <h3 className="font-bold text-center m-4">{app.title}</h3>
        <div className="">
        
        </div>
         {/* <img src={app.image} className="w-full object-contain flex justify-center rounded-2xl " style={{ marginTop: '-15px' }}/> */}
        <div className={`h-96 overflow-hidden ${show?"":"hidden"}`}>
        <Llimage url={app.image}/>
        </div>
        <div className="rounded-xl">

      <noscript>

             <div >{app.content}</div>
            </noscript>
      <LineClamp text={app.content} lines={2} />

      {/* <p className="line-clamp-2 text-center">{content}</p> */}
      

      {/* <img src={image} className="w-32"/> */}
      <div className="flex flex-row"><span className="m-4 flex flex-row">

      <Download className="mr-2"/><LineClamp className="font-bold" text={app.download} lines={2}/>
      </span>
      <StoreIcons storename={app.tags} w={1}/>
      
      </div>
      <LineClamp text={app.excerpt} className="font-bold text-center m-4" lines={1}/>
      {/* <h5 className="line-clamp-2 font-bold text-center m-4">{download}</h5> */}
      
        </div>
      </div>
    </div>
    );
}