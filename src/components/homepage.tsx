"use client"
import React, { useState } from "react";
import Topthread from "./topthread";
import DarkButton from "../../app/but";
import Stores from "./Stores";
// import Storelist from "../shared/types";
import { stores } from "../shared/data";
import Stats from "./stats";
import Mq from "./mq";
import Marquee from "react-fast-marquee";
import '../../styles/globals.css'

import TextTransition, { presets } from 'react-text-transition';


import Workinp from "./wip";
import Caro from "./carousel";
import recentprojs from "./recentprojs";
import Textspin from "./textloop";
import Upto from "./countup";
import { Button } from "../../components/ui/button";
// import showon from '../../app/but'
// import { useEffect } from 'react';
const TEXTS = [
    "Android",
    "Fire OS",
    "Windows",
    "Linux",
    "Mac",
    "Web"
    ];
// const TEXTS = [
//     "Efficient",
//     "Responsive",
//     "Secure",
//     ];
// const DTEXTS = [
//     "Phone",
//     "Tablet",
//     "PC",
//     "TV",
//     ];
export default function Homepage(){
    const [showb,setsb]=useState(false)
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
        <div className="mx-auto px-4 sm:px-6 md:flex justify-center">
            <div className="block md:flex w-full">
            {/* <div className="block md:flex lg:py-16 md:py-12 py-12 text-center"> */}
            <div className="flex flex-col items-center md:pb-0 md:py-0 mx-auto w-full ">
            <div className="flex flex-col sm:flex-row w-full">

                {/* <span className="flex"> */}

                {/* <div className="m-auto"> */}
                {/*<h1 className="font-bold mb-4 font-heading leading-tighter tracking-tighter xl:px-0 xl:text-[3.48rem] px-4 text-2xl sm:text-5xl dark:text-white text-center">
                    /~ <span className="hidden">Coding with Passion and Purpose.</span>  ~/
                /~ Innovative software solutions crafted with expertise. ~/
                /~ Building efficient and effective software for a better world ~/
                /~ Products available for Android, Fire OS, Windows, Linux, Mac, Web Android. ~/
                </h1>*/}
                <div className="w-full">
                <div className="text-gray-900 sm:mb-8 leading-tighter tracking-tighter  px-4 text-2xl dark:text-white m-10 text-center">
                {/* Our products have featured on most media outlets around the world, in most languages.  */}
                Shipping Software since 2018. Powering 15M+ sessions Worldwide.
                {/* <Textspin text={TEXTS} direction={'up'} interval={1500}/> */}
                </div>
                <div className="flex justify-center pb-10">
                <div className="flex flex-col place-items-center gap-4 sm:flex-row">

                    <Stores {...stores} />
                    <Button variant={"outline"} className='hidden sm:block' onClick={()=>{
                        setsb((e)=>!e)
                    }}>Show catalog</Button>
                </div>
                    
                </div>
                <h1 className="text-gray-900 sm:mb-8 text-center font-bold font-heading leading-tighter tracking-tighter xl:px-0 xl:text-[3.48rem] px-4 text-2xl sm:text-5xl dark:text-white "> 
                   
                </h1>
                </div>
                
            

                </div>
                {/* </span> */}
                {/* <span className="flex items-center justify-center">
                    <img alt="image of Vishnu N K" className="rounded-full w-32 sm:w-96 " src="https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/1654419210688.jpg"/>
                </span> */}
            {/* </div> */}

            {/* <div className="sm:flex sm:flex-row"> */}
            

            {/* </div> */}
            
            
            </div>
            
            </div>
            
        </div>
        {/* {recentprojs()} */}
        {/* <Mq/> */}
        {/* <Stats/> */}
        <div className="flex place-content-center w-full">

        {showb?(<><Caro/></>):null}
        </div>
        </div>
        </>
    );
}