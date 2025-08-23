'use client'
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
const Issues =dynamic(()=>import ("../src/components/issues"));
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
        {/* Hero Section */}
        <Homepage/>

        {/* About Section */}
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                The Journey
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                From flashing custom ROMs on Android to building scalable web services, every line of code represents a step in the evolution of technology and user experience.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Innovation First</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Started with Visual Basic, evolved through Android development, and now focused on scalable web solutions and system design.
                </p>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Driven by Passion</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  The thrill of bringing ideas to life fuels every project. No matter the challenges, the joy of creation keeps me moving forward.
                </p>
              </div>

              <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Values Matter</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Building software that enhances lives while fostering happiness, transparency, and meaningful connections in everything I create.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Grid Projects Section */}
        <GridProj/>

        {/* Contact Section */}
        <Ct/>

        {/* Projects Section */}
        <Project/>

        {/* Community Engagement */}
        <Issues/>
        <Commits/>
      </div>
    );
  }