import React from 'react';
import { IssuesListData } from '../../app/issues/issues-list-columns';
import LetterClamp from './letterclamp';

interface IssueCardProps {
  issue: IssuesListData;
}

export default function IssueCard({ issue }: IssueCardProps) {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex justify-between items-start mb-2">
        <a 
          href={issue.repo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          {issue.repo_name}
        </a>
      </div>
      
      <div className="mb-2">
        <a 
          href={issue.issue_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <LetterClamp text={issue.title} />
        </a>
      </div>
      
      <div className="text-gray-500 dark:text-gray-400 text-sm">
        {issue.comment_count} comments
      </div>
    </div>
  );
}