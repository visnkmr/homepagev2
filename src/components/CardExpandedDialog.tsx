'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { ExternalLink, GitBranch, MessageSquare, Calendar, Plus, Minus, X } from 'lucide-react';
import { DateTime } from 'luxon';
import { CardData } from './ProfessionalCard';

interface CardExpandedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: CardData | null;
}

export function CardExpandedDialog({ isOpen, onClose, data }: CardExpandedDialogProps) {
  if (!data) return null;

  const formatTime = (timestamp: number) => {
    const dateTime = DateTime.fromMillis(timestamp * 1000);
    const utcDateTime = dateTime.toUTC();
    return utcDateTime.toFormat('dd MMM yy HH:mm');
  };

  const renderCommitContent = (commitData: any) => (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <GitBranch className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {commitData.reponame}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Repository
            </p>
          </div>
        </div>
        <Badge variant="outline">
          {formatTime(commitData.time)}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Commit Message
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            {commitData.message}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Plus className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                Additions
              </span>
            </div>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">
              {commitData.additions}
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Minus className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                Deletions
              </span>
            </div>
            <p className="text-lg font-bold text-red-600 dark:text-red-400">
              {commitData.deletions}
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            variant="outline"
            onClick={() => window.open(commitData.commit, '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View Commit
          </Button>
        </div>
      </div>
    </div>
  );

  const renderIssueContent = (issueData: any) => (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <GitBranch className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {issueData.repo_name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Repository
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-gray-500" />
          <Badge variant="secondary">
            {issueData.comment_count} comments
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Issue Title
          </h4>
          <p className="text-base text-gray-900 dark:text-white font-medium leading-relaxed">
            {issueData.title}
          </p>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            variant="outline"
            onClick={() => window.open(issueData.issue_url, '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View Issue
          </Button>
        </div>
      </div>
    </div>
  );

  const renderIssueCountContent = (issueCountData: any) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GitBranch className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {issueCountData.repo_name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Repository
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="text-2xl px-4 py-2">
          {issueCountData.issue_count}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
            Total Active Issues
          </h4>
          <p className="text-sm text-indigo-700 dark:text-indigo-300">
            This repository currently has {issueCountData.issue_count} active issues and discussions.
          </p>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            variant="outline"
            onClick={() => window.open(issueCountData.repo_url, '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Visit Repository
          </Button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (data.type) {
      case 'commit':
        return renderCommitContent(data);
      case 'issue':
        return renderIssueContent(data);
      case 'issue_count':
        return renderIssueCountContent(data);
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (data.type) {
      case 'commit':
        return `Commit Details`;
      case 'issue':
        return `Issue Details`;
      case 'issue_count':
        return `Repository Statistics`;
      default:
        return 'Details';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{getTitle()}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}