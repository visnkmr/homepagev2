"use client"
import React, { useState, useEffect } from "react";

interface Repo {
  name: string;
  description?: string;
  html_url: string;
  stargazers_count?: number;
}

export default function RepoList() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/visnkmr/homepagev2@main/public/visnkmr_complete_repos.json')
      .then(res => res.json())
      .then((data: Repo[]) => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch repos', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-300">Loading repositories...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-white text-3xl font-bold mb-6 text-center">My GitHub Repositories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map(repo => (
          <div
            key={repo.html_url}
            className="bg-gray-800 border border-gray-700 rounded-lg p-5 hover:bg-gray-750 hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <h3 className="text-red-400 text-xl font-semibold mb-2 underline hover:text-red-300 transition-colors">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {repo.name}
              </a>
            </h3>
            <p className="text-gray-300 mb-3 line-clamp-3">
              {repo.description || 'No description available.'}
            </p>
            <div className="flex items-center justify-between">
              {repo.stargazers_count !== undefined && (
                <span className="flex items-center text-yellow-400">
                  <span className="mr-1">⭐</span>
                  {repo.stargazers_count}
                </span>
              )}
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline hover:no-underline transition-all"
              >
                View →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}