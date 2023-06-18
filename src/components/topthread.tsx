import React from "react";
import ScrollText from "./ScrollText";
import Lightbulb from "./Lightbulb";
import Marquee from "react-fast-marquee";

export default function Topthread(){
    return(
        <>
        {/* <ScrollText text="This is a scrolling text.This is a scrolling text." speed={20} /> */}
        
        {/* <section className="flex bg-slate-800"> */}

        <section className="flex bg-slate-800 dark:bg-stone-100	">
            <noscript>
            <div className="sm:flex hidden font-medium px-4 mx-auto py-4 sm:px-6 text-center text-white">
            <Lightbulb/><a className="ps-4 text-black dark:text-white" href={"https://github.com/visnkmr/iomer"}>
                <span className="font-bold ">Filedime (iomer):</span> A simple, High Performance File explorer made using rust for PC. Supports multi-window, tabs, fzf like search, swift folder size compute, hot reload for markdown, html.
                </a>
            </div>
            </noscript>
        <Marquee pauseOnHover>
            <div className="sm:flex hidden font-medium px-4 mx-auto py-4 sm:px-6 text-center">
            <Lightbulb/><a className="ps-4 text-white dark:text-black" href={"https://github.com/visnkmr/iomer"}>
                <span className=" font-bold ">Iomer:</span> 
                <span className="text-sm">
                    A simple, High Performance File explorer made using rust for PC. Supports multi-window, tabs, fzf like search, swift folder size compute, hot reload for markdown, html.
                    </span>
                </a>
            </div>
        </Marquee>
        </section>

        </>

    );
}