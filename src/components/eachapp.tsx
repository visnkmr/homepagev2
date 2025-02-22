
"use client"


import StoreIcons from "./storeicons";
import LineClamp from "./LineClamp";
import { Download } from "lucide-react/";
import Llimage from "./llimage";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";

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
    className="grid place-items-center grid-cols-1 dark:bg-gray-900 dark:text-white rounded-2xl mb-8  "> 
    {!app.image && (<div className="space-y-4 items-center  max-w-[40%] pb-36">
          <h2 className="text-3xl font-bold">{app.title}</h2>
          <p className="text-xl text-white-600">
            {app.content}
          </p>
          
        </div>)}
        {app.image && (
        <div className="hidden lg:block container mx-auto px-4 py-8 max-w-[40%] ">
      <div className="grid grid-cols-2 items-center mb-20 ">
        <div className="space-y-4 items-center  max-w-[70%]">
          <h2 className="text-3xl font-bold">{app.title}</h2>
          <p className="text-xl text-white-600">
            {app.content}
          </p>
          {app.url && (<div className="pt-4">

          <a 
                className="btn btn-primary sm:mb-0 "  
                href={app.url}
                rel="noopener" 
                target="_blank">
                    <Button className="border-black dark:border-white " variant={"outline"}>Checkout {app.title}</Button>
                </a>
          </div>)}
          {app.image && (<div className="space-x-4">
          </div> )}
        </div>
        {app.image && ( <div className="grid place-items-center w-full ">
        <Llimage url={app.image}/>
        </div>
          )}
      </div>
      </div>
    )} 
      {app.image && (
      <div className="lg:hidden container mx-auto px-4 py-8 max-w-[60%] ">
      <div className=" mb-28 grid place-items-center w-full ">
      <div className="mb-5 ">
        <Llimage url={app.image}/>
        </div>
        <div className="space-y-4 items-center">
          <h2 className="text-3xl font-bold text-center">{app.title}</h2>
          <p className="text-xl text-white-600 text-center">
            {app.content}
          </p>
        </div>
        
      </div>
      </div>
     )}
    </div>
    );
}