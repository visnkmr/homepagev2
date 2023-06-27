// 'use client'
import Project from "../src/components/project";
import Homepage from "../src/components/homepage";
// import Planglist from "../src/components/planlist";
// import Stats from "../src/components/stats";
import Workinp from "../src/components/wip";
import Footer from "../src/components/footer";
import '../styles/globals.css'
import Ct from "../src/components/ct";
import Commits from "../src/components/commits";
import Topthread from "../src/components/topthread";
import DarkButton from "./but";
import Mq from "../src/components/mq";
import Contactme from "../src/components/contactme";
// import { ThemeContext, ThemeProvider } from "../src/components/ThemeContext";
// import { useContext } from "react";
// import { createServerContext } from 'react';

// import dwc from "../src/dealcommits";
// import gtr from "./api/gtr";

export default async function Page() {
  // console.log("hello world")
  // console.log(JSON.parse(gtr()))
  // console.log(dwc())
  // console.log("hello")
  // const { dark } = useContext(ThemeContext);

    return (
      <>
      {/* <ThemeProvider> */}
      {/* <div className={dark ? 'dark' : ''}> */}
      <div className="dark:bg-gray-900">
      
          {await Homepage()}
          {/* <Planglist/> */}
          {await Project()}
          <Ct/>
          <Commits/>
          <Contactme/>
          <p className="text-center flex justify-center italic">This page was made using NextJS, React and Tailwind.</p>
      </div>

        {/* </div> */}
      {/* </ThemeProvider> */}
      </>

    );
  }