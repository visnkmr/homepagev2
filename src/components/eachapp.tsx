
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
    // onClick={()=>setshow((old)=>{
    //     return !old
    // })} 
    // onMouseEnter={onMouseEnter}
    // onMouseLeave={onMouseLeave}
    className="grid place-items-center sm:grid-cols-1 xl:grid-cols-1 dark:bg-gray-900 dark:text-white rounded-2xl mb-8  "> 
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-28">
        <div className="space-y-4 items-center">
          <h2 className="text-3xl font-bold">{app.title}</h2>
          <p className="text-white-600">
            {app.content}
          </p>
          <div className="space-x-4">
          </div>
        </div>
        <div className="w-48">
        <Llimage url={app.image}/>
        </div>
      </div>
      </div>
    {/* <div className="grid md:grid-cols-2 gap-12 ">
      
    <div className="col-span-1" >
      <h1 className="">
        {app.title}
      </h1>
      <p className="">
      {app.content}
      </p>
    </div>
    <div className="col-span-1 ">
      <Llimage url={app.image}/>
    </div>
      </div>             */}
      {/* <div className="w-120 p-4">
          <img
          src={image}
          className="w-120 "/>
      </div> */}
      {/* <div className="text-center w-full ">
      <h3 className="font-bold text-center m-4">{app.title}</h3>
        <div className="">
        
        </div> */}
         {/* <img src={app.image} className="w-full object-contain flex justify-center rounded-2xl " style={{ marginTop: '-15px' }}/> */}
        {/* <div className={`h-96 overflow-hidden ${show?"":"hidden"}`}>
        
        </div>
        <div className="rounded-xl">

      <noscript>

             <div >{app.content}</div>
            </noscript>
      <LineClamp text={app.content} lines={2} /> */}

      {/* <p className="line-clamp-2 text-center">{content}</p> */}
      

      {/* <img src={image} className="w-32"/> */}
      {/* <div className="flex flex-row m-4 place-content-center">
      {app.download?(<><span className="flex flex-row m-4"><Download className="mr-2"/><LineClamp className="font-bold" text={app.download} lines={2}/></span></>):null}
      
      
      <StoreIcons storename={app.tags} w={1}/>
      
      </div> */}
      {/* <LineClamp text={app.excerpt} className="font-bold text-center m-4" lines={1}/> */}
      {/* <h5 className="line-clamp-2 font-bold text-center m-4">{download}</h5> */}
      
        {/* </div> */}
      {/* </div> */}
    </div>
    );
}