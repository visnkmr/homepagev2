import { Github, Linkedin, Youtube } from "lucide-react";
import React from "react";
// import '../../styles/globals.css'
export default function Footer() {
    return (
      <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(139, 69, 19, 0.3) 0%, transparent 50%)`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Content */}
          <div className="text-center">
            {/* Logo/Brand */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Vishnu N K
              </h3>
              <p className="text-gray-400 mt-2">Building the future, one line at a time</p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-8">
              <a
                aria-label="YouTube"
                target="_blank"
                rel="noreferrer"
                href="https://youtube.com/@vishnunk"
                className="group p-3 bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              >
                <Youtube className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              </a>

              <a
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/vishnunk-59124/"
                className="group p-3 bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              >
                <Linkedin className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              </a>

              <a
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/visnkmr"
                className="group p-3 bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              >
                <Github className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
              >
                Privacy Policy
              </a>

              <a
                aria-label="Telegram"
                target="_blank"
                rel="noreferrer"
                href="https://vishnunkmr.t.me/"
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
              >
                Telegram
              </a>

              <a
                aria-label="Codeberg"
                target="_blank"
                rel="noreferrer"
                href="https://codeberg.org/visnk"
                className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
              >
                Codeberg
              </a>
            </div>

            {/* Divider */}
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mb-6"></div>

            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Vishnu N K. All rights reserved.</p>
              <p className="mt-1 text-xs">
                Crafted with <span className="text-red-400">♥</span> using Next.js, React & Tailwind
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }