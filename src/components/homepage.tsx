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

    return(
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
                <div className="text-center">
                    {/* Main Headline */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                        <span className="block">Building the Future</span>
                        <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            One Line at a Time
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Platform-agnostic developer crafting exceptional experiences across Android, Fire OS, Windows, Linux, Mac, and Web.
                        <span className="block mt-2 font-semibold text-indigo-600 dark:text-indigo-400">
                            Shipping software since 2018. Powering 15M+ sessions worldwide.
                        </span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <a
                            href="https://github.com/visnkmr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-800 dark:to-gray-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            <span>View GitHub</span>
                            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>

                        <a
                            href="https://visnkmr.github.io/appstore"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-1000 animate-pulse"
                        >
                            <span>Explore App Store</span>
                        </a>

                        <button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-gray-200 dark:border-gray-700"
                        >
                            <span>View Projects</span>
                            <svg className="ml-2 w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </button>
                    </div>

                    {/* Store Links */}
                    <div className="flex justify-center">
                        <Stores {...stores} />
                    </div>
                </div>
            </div>

            {/* Projects Preview Toggle */}
            <div className="flex justify-center pb-16">
                <button
                    onClick={() => setsb(e => !e)}
                    className="group relative inline-flex items-center px-6 py-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-all duration-200"
                >
                    <span>{showb ? 'Hide' : 'Show'} Project Catalog</span>
                    <svg className={`ml-2 w-4 h-4 transition-transform ${showb ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Projects Carousel */}
            {showb && (
                <div className="pb-16">
                    <Caro/>
                </div>
            )}
        </div>
    );
}