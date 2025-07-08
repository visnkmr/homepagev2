// 'use client';

// import { useState } from "react";

   
import { findLatestapps } from "../posts";

import Eachapp from "./eachapp";
async function appsfetcher() {
  var apps = await findLatestapps("projects");
  // var apps = [] as any;
  //  apps = await findLatestapps("projects/inp");
  return (
    <>
  {apps.map((app:any) => {
    // const [show,setshow]=useState(false);
      return ( 
        <Eachapp app={app}/>
      );
  })}
  </>
  );
}
export default function Project() {
  
    // const [scroll, setScroll] = useState(false);
    return (
      <>
      <div className="grid grid-cols-1 dark:bg-gray-900 dark:text-white">
      {appsfetcher()}
      
      </div>
      {/* <p className="w-full text-center m-5 italic text-xs">Download counts last updated in Dec 2022.</p> */}
      </>
    );
  }