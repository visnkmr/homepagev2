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
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 dark:bg-gray-900 dark:text-white">
      {appsfetcher()}
      </div>
      </>
    );
  }