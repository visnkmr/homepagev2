// 'use client';

import { findLatestapps } from "../posts";
import { Smartphone, Laptop, Tv } from "lucide-react";

export function indiotherproj(app: any) {
  const tags = app.tags || [];
  const hasAndroid = tags.includes('aas') || tags.includes('gp');
  const hasPC = tags.includes('pc') || tags.includes('win') || tags.includes('lx') || tags.includes('mos');
  const hasTV = tags.includes('tv') || tags.includes('firetv');

  return (
    <div key={`${app.title}`} className="w-full max-w-xs mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group h-80 flex flex-col">
        {/* Header with Icon and Badges */}
        <div className="p-4 pb-3 flex-shrink-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {app.image && (
                <div className="flex-shrink-0">
                  <img
                    src={`https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/${app.image}.webp`}
                    className="w-12 h-12 rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform duration-200"
                    alt={app.title}
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-gray-900 dark:text-white truncate leading-tight">
                  {app.title}
                </h3>
                {/* Other Badges */}
                <div className="flex items-center space-x-1 mt-1 flex-wrap gap-1">
                  {app.oss === "t" && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Open Source
                    </span>
                  )}{/* Download Badge - Independent and Centered */}
                {app.download && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {app.download}
                    </span>
                )}
                </div>

                
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-3 flex-1 overflow-hidden">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
            {app.description || app.content}
          </p>
        </div>

        {/* Platform Icons */}
        <div className="px-4 pb-3 flex-shrink-0">
          <div className="flex items-center space-x-2 flex-wrap">
            {hasAndroid && (
              <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                <Smartphone className="w-3.5 h-3.5" />
                <span className="text-xs">Android</span>
              </div>
            )}
            {hasPC && (
              <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                <Laptop className="w-3.5 h-3.5" />
                <span className="text-xs">PC</span>
              </div>
            )}
            {hasTV && (
              <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                <Tv className="w-3.5 h-3.5" />
                <span className="text-xs">TV</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 pb-4 flex-shrink-0">
          <div className="flex flex-col space-y-1.5">
            {app.oss === "t" && (
              <a
                href={`https://github.com/visnkmr/${app.reponame}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-1.5 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-600 text-white font-medium rounded-lg hover:from-gray-800 hover:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm"
              >
                GitHub
              </a>
            )}
            {app.url && (
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm"
              >
                Try App
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

async function appsfetcher() {
  var apps = await findLatestapps("projects");
  return (
    <>
      {apps.map((app: any) => (
        <div key={app.slug}>
          {indiotherproj(app)}
        </div>
      ))}
    </>
  );
}

export default function GridProj() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Project Showcase
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A curated collection of innovative applications spanning multiple platforms and technologies
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {appsfetcher()}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Interested in more projects? Check out the complete collection on GitHub
          </p>
          <a
            href="https://github.com/visnkmr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
}