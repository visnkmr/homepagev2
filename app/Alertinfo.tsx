"use client"
import { XIcon } from "lucide-react";
import { useState } from "react";

export default function AlertInfo(){
    const [close,setclose]=useState(false)
    return(
        <div className={`${close?"hidden":"flex justify-center"}`}>
      <div className="m-4 sm:ml-24 flex flex-col border-black dark:border-white border-4 dakr:text-white p-4 rounded-md">
        <div className="flex flex-row justify-between">

          <h2 className="font-bold text-lg">Amazon Appstore App update issue</h2>
          <XIcon onClick={()=>setclose(true)} />
        </div>
          <p>Please be aware of an issue that we have been dealing with recently in regards to updates.
There has been a persistent issue for sometime now, in which even though a newer version of an app is available some users are unable to download it. You can find detailed discussions regarding this on github threads. I have already made amazon aware of this. In the meantime you can find and download app updates @ <a className='dark:text-white text-black' href="https://visnkmr.github.io/appstore">https://visnkmr.github.io/appstore</a></p>
        
      </div>
    </div>
    )
}