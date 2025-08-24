'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { ExternalLink, GitBranch, MessageSquare, Calendar, Plus, Minus } from 'lucide-react';
import { DateTime } from 'luxon';

interface BaseCardData {
  id: string;
  title: string;
  subtitle?: string;
  url?: string;
  metadata?: Record<string, any>;
}

interface CommitCardData extends BaseCardData {
  type: 'commit';
  reponame: string;
  additions: number;
  deletions: number;
  message: string;
  time: number;
  commit: string;
}

interface IssueCardData extends BaseCardData {
  type: 'issue';
  repo_name: string;
  repo_url: string;
  issue_count?: number;
  title: string;
  issue_url: string;
  comment_count: number;
}

interface IssueCountCardData extends BaseCardData {
  type: 'issue_count';
  repo_name: string;
  repo_url: string;
  issue_count: number;
}

export type CardData = CommitCardData | IssueCardData | IssueCountCardData;

interface ProfessionalCardProps {
  data: CardData;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
  maxTextLength?: number;
  onExpand?: (data: CardData) => void;
}

export function ProfessionalCard({ data, variant = 'default', className = '', maxTextLength = 100, onExpand }: ProfessionalCardProps) {
  const formatTime = (timestamp: number) => {
    const dateTime = DateTime.fromMillis(timestamp * 1000);
    const utcDateTime = dateTime.toUTC();
    return utcDateTime.toFormat('dd MMM yy');
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleCardClick = () => {
    if (onExpand) {
      onExpand(data);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return 'p-4';
      case 'featured':
        return 'p-6 border-l-4 border-l-blue-500';
      default:
        return 'p-5';
    }
  };

  const renderCommitCard = (commitData: CommitCardData) => (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 cursor-pointer w-full min-h-[180px] ${className}`}
      onClick={handleCardClick}
    >
      <CardHeader className={getVariantStyles()}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <GitBranch className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <a
              href={commitData.commit}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors truncate"
              onClick={(e) => e.stopPropagation()}
            >
              {commitData.reponame}
            </a>
          </div>
          <Badge variant="outline" className="text-xs flex-shrink-0 ml-2">
            {formatTime(commitData.time)}
          </Badge>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {truncateText(commitData.message, maxTextLength)}
          </p>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <Plus className="h-3 w-3" />
              <span>{commitData.additions}</span>
            </div>
            <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
              <Minus className="h-3 w-3" />
              <span>{commitData.deletions}</span>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );

  const renderIssueCard = (issueData: IssueCardData) => (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 cursor-pointer w-full min-h-[180px] ${className}`}
      onClick={handleCardClick}
    >
      <CardHeader className={getVariantStyles()}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <GitBranch className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <a
              href={issueData.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors truncate"
              onClick={(e) => e.stopPropagation()}
            >
              {issueData.repo_name}
            </a>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            <MessageSquare className="h-3 w-3 text-gray-500" />
            <span className="text-xs text-gray-500">{issueData.comment_count}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="min-h-[2.5rem]">
            <h3 className="font-medium text-gray-900 dark:text-white leading-tight line-clamp-2">
              {truncateText(issueData.title, maxTextLength)}
            </h3>
          </div>
        </div>
      </CardHeader>
    </Card>
  );

  const renderIssueCountCard = (issueCountData: IssueCountCardData) => (
    <Card
      className={`group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 cursor-pointer w-full min-h-[180px] ${className}`}
      onClick={handleCardClick}
    >
      <CardHeader className={getVariantStyles()}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <GitBranch className="h-4 w-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            <a
              href={issueCountData.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors truncate"
              onClick={(e) => e.stopPropagation()}
            >
              {issueCountData.repo_name}
            </a>
          </div>
          <Badge variant="secondary" className="text-lg font-bold flex-shrink-0 ml-2">
            {issueCountData.issue_count}
          </Badge>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 min-h-[2.5rem]">
          Total active issues in repository
        </p>
      </CardHeader>
    </Card>
  );

  switch (data.type) {
    case 'commit':
      return renderCommitCard(data);
    case 'issue':
      return renderIssueCard(data);
    case 'issue_count':
      return renderIssueCountCard(data);
    default:
      return null;
  }
}

interface CardGridProps {
  children: React.ReactNode;
  columns?: number;
  className?: string;
}

export function CardGrid({ children, columns = 1, className = '' }: CardGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-6 px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}