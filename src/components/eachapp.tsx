'use client'

import StoreIcons from "./storeicons";
import LineClamp from "./LineClamp";
import { Download } from "lucide-react/";
import Llimage from "./llimage";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import Aas from "../stores/aas";
import Gp from "../stores/gp";
import {Badge} from "../../components/ui/badge"
import ImageCarousel from "./ImageCarousel"; // Import ImageCarousel

export default function Eachapp({app}: {app: any}) {
  const [screenshots, setScreenshots] = useState<string[]>([]);

  const tags = app.tags || [];
  const showaas = tags.includes('aas');
  const showgps = tags.includes('gp');
  const showmas = tags.includes('ms');
  const showgh = tags.includes('gh');

  useEffect(() => {
    let screenshotUrls: string[] = [];
    if (app.screenshot && app.screenshot.length > 0) {
      screenshotUrls = app.screenshot.map((url: string) =>
        `https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/${url.replace(/\.tv$/, '.webp')}`
      );
    } else if (app.image) {
      screenshotUrls = [`https://cdn.jsdelivr.net/gh/visnkmr/visnkmr.github.io@main/images/${app.image}.webp`];
    }
    setScreenshots(screenshotUrls);
  }, [app]);

  const ProjectCard = ({isMobile = false}: {isMobile?: boolean}) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex flex-col space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
              {app.title}
            </h3>
            <div className="flex flex-col space-y-2 ml-4">
              {app.oss === "t" && (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                  Open Source
                </Badge>
              )}
              {app.download && (
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800">
                  {app.download} downloads
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
          {app.content}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-4">
          {showgh && (
            <a
              href={`${app.oss === "f" ? `https://github.com/visnkmr/${app.reponame}/issues` : `https://github.com/visnkmr/${app.reponame}`}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-600 text-white font-medium rounded-lg hover:from-gray-800 hover:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {app.oss === "f" ? "Report Issue" : "View on GitHub"}
            </a>
          )}

          {app.url && (
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Try {app.title}
            </a>
          )}
        </div>

        {/* Store Icons */}
        <div className="flex flex-wrap gap-3">
          {showaas && <Aas />}
          {showgps && <Gp />}
        </div>
      </div>
    </div>
  );

  // No image layout (simple text card)
  if (!app.image) {
    return (
      <div className="max-w-md mx-auto">
        <ProjectCard />
      </div>
    );
  }

  // Always show screenshots if available, regardless of app.image
  if (screenshots.length > 0) {
    return (
      <>
        {/* Desktop Layout */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content Card */}
            <div className="order-2 lg:order-1">
              <ProjectCard />
            </div>

            {/* Screenshots */}
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg">
                <ImageCarousel imageUrls={screenshots} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden max-w-md mx-auto">
          <div className="space-y-6">
            {/* Screenshots */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 shadow-lg">
              <ImageCarousel imageUrls={screenshots} />
            </div>

            {/* Content Card */}
            <ProjectCard isMobile />
          </div>
        </div>
      </>
    );
  }

  // Fallback: Simple layout without screenshots
  return (
    <div className="max-w-md mx-auto">
      <ProjectCard />
    </div>
  );
}
