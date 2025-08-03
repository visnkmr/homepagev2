import React from 'react';
import { IssuesCountData } from '../../app/issues/issues-count-columns';

interface IssuesCountCardProps {
  issueCount: IssuesCountData;
}

export default function IssuesCountCard({ issueCount }: IssuesCountCardProps) {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex justify-between items-center">
        <a 
          href={issueCount.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-lg"
        >
          {issueCount.repo_name}
        </a>
        <div className="text-right">
          <span className="font-bold text-2xl text-orange-600 dark:text-orange-400">
            {issueCount.issue_count}
          </span>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            issues
          </div>
        </div>
      </div>
    </div>
  );
}