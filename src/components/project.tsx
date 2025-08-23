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
    return (
      <section id="projects" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A curated collection of innovative software solutions designed to enhance user experiences across multiple platforms
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-8 lg:gap-12">
            {appsfetcher()}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Want to see more? Check out the complete collection on GitHub
            </p>
          </div>
        </div>
      </section>
    );
  }