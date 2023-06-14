
import React from "react";
import Topthread from "./topthread";
import DarkButton from "../../app/but";
import Stores from "./Stores";
// import Storelist from "../shared/types";
import { stores } from "../shared/data";
import Stats from "./stats";
import Mq from "./mq";
import Marquee from "react-fast-marquee";
import '../../styles/globals.css'



import Workinp from "./wip";
import Caro from "./carousel";
import recentprojs from "./recentprojs";
// import showon from '../../app/but'
// import { useEffect } from 'react';

export default async function Homepage(){
    // var randval="no";
    // useEffect(() => {
    //     if(showon()){
    //         randval="ol"
    //     }else{
    //         randval="po"
    //     }
    //     // This function will run whenever the value of showon changes
    //     console.log('showon has changed to', showon);
    //   }, [showon]);
    return(
        <>
        
        
        <div className="dark:bg-gray-900">
        <div className="mx-full px-4 sm:px-6 md:flex h-auto">
            <div className="block md:flex md:text-left text-center items-center w-full">
            {/* <div className="block md:flex lg:py-16 md:py-12 md:text-left py-12 text-center"> */}
            <div className="flex flex-col items-center basis-3/5 md:pb-0 md:pr-16 md:py-0 mx-auto">
            

            {/* <div className="sm:flex sm:flex-row"> */}
            <Caro/>

            <p className="text-gray-900 dark:text-white sm:text-xl">
                {/* Our products have featured on most media outlets around the world, in most languages.  */}
                Products available for Android, Fire OS, Windows, Linux, Mac, Web.
                </p>
                <div className="flex flex-col sm:flex-row items-center">
            
                <span>

                <div>
                {/*<h1 className="font-bold mb-4 font-heading leading-tighter tracking-tighter xl:px-0 xl:text-[3.48rem] px-4 text-2xl sm:text-5xl dark:text-white">
                    /~ <span className="hidden">Coding with Passion and Purpose.</span>  ~/
                /~ Innovative software solutions crafted with expertise. ~/
                Building efficient and effective software for a better world
                /~ Products available for Android, Fire OS, Windows, Linux, Mac, Web Android. ~/
                </h1>*/}
                <div className="justify-center items-center">
                
                <div className="flex items-center justify-center flex-col flex-nowrap gap-4 m-auto w-full md:justify-start md:m-0 sm:flex-row sm:w-full">
                
                    <Stores {...stores} />
                </div>
                <Stats/>
                </div>
                
            

                </div>
                </span>
                
            </div>
            {/* </div> */}
            
            
            </div>
            
            </div>
            
        </div>
        
        {/* <Mq/> */}

        </div>
        </>
    );
}