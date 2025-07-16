// 'use client';

// import { useState } from "react";

   
import Link from "next/link";
import { findLatestapps } from "../posts";

import Eachapp from "./eachapp";
import { Smartphone, Laptop, Tv } from "lucide-react";
export function indiotherproj(app){
    // console.log(app.title+"---"+searchfor+app.title.includes(searchfor))
    // const searchParams = useSearchParams()
    // // const search= if typeof searchParams.get("searchfor") === 'string'?searchParams.get("searchfor")=='string':undefined;
    // let searchfor = searchParams.get('searchfor')!==null?searchParams.get('searchfor'):""
    // if(!searchfor){
    //   searchfor=""
    // }
  //   if (!app.title.toLowerCase().includes(searchfor.toLowerCase()) && !app.content.toLowerCase().includes(searchfor.toLowerCase()) 
  //   || !app.image
  // ) {
  //       return (
  //         <>
          
  //         </>
  //       );
  //     }
    //   else
      {

          return ( 
            

        <div 
        key={`${app.title}`} 
        className="flex lg:max-w-full lg:ms-0 lg:mx-0 max-w-[70%] ms-5 mx-auto">             
        
          {/* <div className="w-120 p-4">
              <img
              src={image}
              className="w-120 "/>
          </div> */}
          <div className="overflow-hidden hover:border-gray-950 dark:hover:border-slate-200 border-2 border-transparent">
            <div className="p-2">
          <div> {/* <Link> */}
          {/* <div className="flex justify-center m-4">
            <Download className="mr-2"/><LineClamp className="font-bold" text={app.download} lines={2}/>
            </div> */}
            {/* <div className="">
            <LineClamp text={app.excerpt} className="font-bold text-center m-4" lines={1}/>
            </div> */}
            {/* <div className="flex justify-center">
             <div className="overflow-hidden"> */}
             {/* https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/ */}
            <div className="flex m-4">
      <div className="overflow-hidden flex ">
        {/* {
          version && version.length>0? <Badge className="absolute top-2 right-2 z-10 bg-black ">
          {version}
        </Badge>:""
        } */}
        {/* <img 
          src={imageUrl} 
          alt={altText}
          className="w-full max-w-md object-cover flex justify-center rounded-2xl"
        /> */}
        <div className="flex flex-row ">
          {/* url={} label={app.title} version={app.version} */}

        {app.image?(<img  src={`https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/${app.image}.webp`} className="object-cover object-top w-24 h-24 dark:border-2 border-0 border-gray-600 " aria-label={app.title}/>):null} 
        {/* {app.image?(<img  src={`${app.image}`} className="object-cover object-top w-24 h-24 dark:border-2 border-0 border-gray-600 " aria-label={app.title}/>):null} */}
        <div className="ps-4 ">
          <p className="dark:text-white ">{app.title}</p>
          <span className="text-slate-600 dark:text-slate-400 ">

          <div className="flex flex-row ">
          {app.download?(<><p className="text-sm ">{app.download}</p>
  <p className="text-sm ps-1 pe-1">•</p></>):null}
  {app.oss=="t"?(<><p className="text-sm ">{"FOSS"}</p>
  <p className="text-sm ps-1 pe-1">•</p></>):null}
          {/* <p className="text-sm">Free</p> */}
          {((app.tags).includes('aas')||(app.tags).includes('gp'))?(<Smartphone className="ms-2 h-5 w-5"/>):null}
          {((app.tags).includes('pc')||(app.tags).includes('win'))?(<Laptop className="ms-2 h-5 w-5"/>):null}
          {((app.tags).includes('aas')||(app.tags).includes('gp'))?(<Tv className="ms-2 h-5 w-5"/>):null}
          </div>
          <p className="text-sm line-clamp-2">{app.description?app.description:app.content}</p>
          </span>
        </div>
        </div>
      </div>
    </div>
             {/* <img src={app.image} className="w-full object-contain flex justify-center rounded-2xl " style={{ marginTop: '-15px' }}/> */}
            {/* </div>
            </div> */}
            <div className="rounded-xl">
    
          {/* <h3 className="font-bold text-center">{app.title}</h3> */}
          <noscript>
    
                 <div >{app.content}</div>
                </noscript>
          {/* <LineClamp text={app.content} lines={2} /> */}
    
          {/* <p className="line-clamp-2 text-center">{content}</p> */}
          {/* <a 
            href="https://github.com/visnkmr" 
            className="flex justify-center m-4 mr-2 rounded-md border shadow-md p-5 bg-green-400 hover:bg-green-700 dark:bg-green-800"
            rel="noopener" 
            target="_blank">
            <Download className="mr-5"/>Download
            </a> */}
    
          {/* <img src={image} className="w-32"/> */}
          {/* <StoreIcons storename={app.tags} w={1}/> */}
          {/* <h5 className="line-clamp-2 font-bold text-center m-4">{download}</h5> */}
          
            </div>
            </div>{/* </Link> */}
            </div>
          </div>
        </div>
          );
      }
}
async function appsfetcher() {
  var apps = await findLatestapps("projects");
  // var apps = [] as any;
  //  apps = await findLatestapps("projects/inp");
  return (
    <>
  {apps.map((app:any) => {
    // const [show,setshow]=useState(false);
      return ( 
        <>
        {indiotherproj(app)}
        </>
      );
  })}
  </>
  );
}
export default function GridProj() {

    // const [scroll, setScroll] = useState(false);
    return (
      <>
      <div className="box dark:bg-gray-900 dark:text-white lg:ms-20 lg:mr-20 ">
      {appsfetcher()}
      
      </div>
      {/* <p className="w-full text-center m-5 italic text-xs">Download counts last updated in Dec 2022.</p> */}
      </>
    );
  }