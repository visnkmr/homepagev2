// 'use client'
import dynamic from 'next/dynamic'

// import Project from "../src/components/project";
const Project =dynamic(()=>import ("../src/components/project"));
const GridProj =dynamic(()=>import ("../src/components/gridproj"));

import Homepage from "../src/components/homepage";
// import Planglist from "../src/components/planlist";
// import Stats from "../src/components/stats";
import Workinp from "../src/components/wip";
import Footer from "../src/components/footer";
import '../styles/globals.css'
// import Ct from "../src/components/ct";
const Ct =dynamic(()=>import ("../src/components/ct"));

const Commits =dynamic(()=>import ("../src/components/commits"));
// import Commits from "../src/components/commits";
import Topthread from "../src/components/topthread";
import DarkButton from "./but";
import Mq from "../src/components/mq";
import Contactme from "../src/components/contactme";
import AlertInfo from './Alertinfo';
// import { ThemeContext, ThemeProvider } from "../src/components/ThemeContext";
// import { useContext } from "react";
// import { createServerContext } from 'react';

// import dwc from "../src/dealcommits";
// import gtr from "./api/gtr";

export default function Page() {
  // const [apps,setapps]=useState();
  // const[isexpanded,setexpanded]=useState(false)
  // console.log("hello world")
  // console.log(JSON.parse(gtr()))
  // console.log(dwc())
  // console.log("hello")
  // const { dark } = useContext(ThemeContext);

    return (
      <>
      {/* <ThemeProvider> */}
      {/* <div className={dark ? 'dark' : ''}> */}
      {/* <AlertInfo/> */}
      <div className="dark:bg-gray-900">
      
          <Homepage/>
          <span className='m-4'></span>
          {/* <Planglist/> */}
          {/* <div className='grid place-items-center w-full'>
            <div className='container p-10'>

          <div className='grid grid-cols-3 w-full pb-5'>
          <div className='col-span-1'>
              <h1 className='text-4xl'>I......</h1>
            </div>

          </div>
          <div className='grid place-items-center md:grid-cols-3 gap-x-20 '>
            <div className='col-span-1'>
            <p>started out development in visual basic, flashing custom roms on android, then made software for them, been there for transition from eclipse to android studio, later transitioning to a more web centric role and with it came a need for scailing services, understanding fundamentals of linux. With a strong background in computer science, I possess robust system design and programming skills that I continue to refine on a day to day basis. Focusing on performance and efficiency, has helped in making me mostly programming language agnostic while maintaining a strong grasp of underlying concepts.</p>
            </div>
            <div className='md:pt-28 pt-6 col-span-1'>
            <p>I firmly believe in the power of hard work. No matter how many times I need to start over, the thrill of bringing my vision to life is what drives me.</p>
            </div>
            <div className='md:pt-48 pt-6 col-span-1'>
              <p>I value happiness and transparency in the people around me, and I'm genuinely interested in working within a culture that embodies these values.</p>
            </div>
          </div>
            </div>
          </div> */}
          <GridProj/>

          <Ct/>
          <div className="items-center leading-tighter tracking-tight  text-center font-bold text-4xl p-10 pb-18">
        {/* <span className="bg-gray-300"> */}
         Listed below are some of my products
        {/* </span> */}
        </div>

          <Project/>
          
          <Commits/>
          {/* <Contactme/> */}
          {/* <p className="text-center flex justify-center italic">This page was made using NextJS, React and Tailwind.</p> */}
      </div>

        {/* </div> */}
      {/* </ThemeProvider> */}
      </>

    );
  }