
"use client"


import StoreIcons from "./storeicons";
import LineClamp from "./LineClamp";
import { Download } from "lucide-react/";
import Llimage from "./llimage";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import Aas from "../stores/aas";
import Gp from "../stores/gp";
import {Badge} from "../../components/ui/badge"

export default function Eachapp({app}){
  console.log(app)
  var showaas,showgps,showmas,showgh
    const [show,setshow]=useState(false)
    var tags=app.tags
    showaas = tags.includes('aas'); 
         showgps = tags.includes('gp'); 
         showmas = tags.includes('ms'); 
         showgh = tags.includes('gh');
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
    // onMouseLeave={onMouseLex ave}
    className="grid place-items-center grid-cols-1 dark:bg-gray-900 dark:text-white rounded-2xl mb-8  "> 
    {!app.image &&  (<div className="space-y-4 items-center  max-w-[40%] pb-36">
      <div className="flex flex-col ">
          <h2 className="text-3xl font-bold">{app.title}</h2>
          {app.oss=="t"?<Badge className="w-fit" variant="secondary">Open Source</Badge>:null}
          </div>
          <p className="text-xl text-white-600">
            {app.content}
          </p>
          {app.oss=="f"?(<Button disabled className=" border-black dark:border-white" variant={"outline"}>Proprietary</Button>):<div className="grid grid-cols-1 space-y-4"><a
        href={`https://github.com/visnkmr/${app.reponame}`} 
        rel="noopener" 
        target="_blank">
          <Button className="border-black dark:border-white " variant={"outline"}>Github</Button>
        </a></div>}
        </div>)}
        {/* for pc and tabs */}
        {app.image && (
        <div className="hidden lg:block container mx-auto px-4 py-8 max-w-[40%] ">
      <div className="grid grid-cols-2 items-center mb-20 ">
        <div className="space-y-2 items-center  max-w-[70%]">
          <div className="flex flex-col">
          <h2 className="text-3xl font-bold">{app.title}</h2>
          {app.oss=="t"?<Badge className="w-fit mb-3" variant="secondary">Open Source</Badge>:null}
          {app.download?<Badge className="w-fit" variant="default">{app.download}</Badge>:null}
          </div>
          <p className="text-xl text-white-600">
            {app.content}
          </p>
          {/* <span> */}
          {/* <p>{tags}</p> */}
          <div className="grid grid-cols-1 space-y-4">
          {showaas && (
      <Aas/>
      )} 
      {showgps && (
      <Gp/>
      )} 
      {/* {showmas && (
      <Mas/>
      )}  */}
      {showgh && (
      // <span className="">
        <a
        href={`${app.oss=="f"?`https://github.com/visnkmr/${app.reponame}/issues`:`https://github.com/visnkmr/${app.reponame}`}`} 
        rel="noopener" 
        target="_blank">
          <Button className="border-black dark:border-white " variant={"outline"}>{`${app.oss=="f"?"Report Issue":"Github"}`}</Button>
        </a>
      // </span>
      )}
          {/* </span> */}
          {/* {app.reponame && (
         
          <a 
                className="btn btn-primary sm:mb-0 "  
                href={`https://github.com/visnkmr/${app.reponame}`}
                rel="noopener" 
                target="_blank">
                    <Button className="border-black dark:border-white " variant={"outline"}>Checkout {app.title}</Button>
                </a>
          )} */}
          </div>
          {app.image && (<div className="space-x-4">
          </div> )}
        </div>
        {app.image && ( <div className="grid place-items-center w-full ">
        <Llimage url={`https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/${app.image}.webp`}/>
        </div>
          )}
      </div>
      </div>
    )} 
    {/* for mob */}
      {app.image && (
      <div className="lg:hidden container mx-auto px-4 py-8 max-w-[60%] ">
      <div className=" mb-28 grid w-full ">
      <div className="mb-5 ">
        <Llimage url={`https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/${app.image}.webp`}/>
        </div>
        <div className="space-y-4">
        <div className="flex flex-col ">
          <h2 className="text-3xl font-bold">{app.title}</h2>
          {app.oss=="t"?<Badge className="w-fit" variant="secondary">Open Source</Badge>:null}
          </div>
          <p className="text-xl text-white-600">
            {app.content}
          </p>
          <div className="grid grid-cols-1 space-y-4">
          {showaas && (
      <Aas/>
      )} 
      {showgps && (
      <Gp/>
      )} 
      {/* {showmas && (
      <Mas/>
      )}  */}
      {showgh && (
      // <span className="">
        <a
        href={`${app.oss=="f"?`https://github.com/visnkmr/${app.reponame}/issues`:`https://github.com/visnkmr/${app.reponame}`}`} 
        rel="noopener" 
        target="_blank">
          <Button className="border-black dark:border-white " variant={"outline"}>{`${app.oss=="f"?"Report Issue":"Github"}`}</Button>
        </a>
      // </span>
      )}
          {/* </span> */}
          {app.url && (
         
          <a 
                className="btn btn-primary sm:mb-0 "  
                href={app.url}
                rel="noopener" 
                target="_blank">
                    <Button className="border-black dark:border-white " variant={"outline"}>Checkout {app.title}</Button>
                </a>
          )}
          </div>
        </div>
        
      </div>
      </div>
     )}
    </div>
    );
}