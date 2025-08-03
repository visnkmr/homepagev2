'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import React from 'react';
import LetterClamp from '../../src/components/letterclamp';

export type eIssue = {
  repo_name: string;
  html_url: string;
  issue_count?: number;
  issues?: {
    comment_count: number;
    title: string;
    url: string;
  }[];
};

export type IssueTableData = {
  repo_name: string;
  repo_url: string;
  issue_count: number;
  title: string;
  issue_url: string;
  comment_count: number;
};

export const issuesColumns: ColumnDef<IssueTableData>[] = [
  {
    accessorKey: 'repo_name',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Repository
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({
      getValue,
      row: {
        original: { repo_url },
      },
    }) => {
      const repoName = getValue() as string;
      return (
        <a 
          className='w-32 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300' 
          href={repo_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repoName}
        </a>
      );
    },
  },
  {
    accessorKey: 'issue_count',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total Issues
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const count = getValue() as number;
      return (
        <span className='font-medium text-orange-600 dark:text-orange-400'>
          {count}
        </span>
      );
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Issue Title
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({
      getValue,
      row: {
        original: { issue_url, comment_count },
      },
    }) => {
      const title = getValue() as string;
      return (
        <div className='w-10 sm:w-64'>
          <a 
            href={issue_url}
            target="_blank"
            rel="noopener noreferrer"
            className='text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
          >
            <LetterClamp text={title} />
          </a>
          <br />
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {comment_count} comments
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'comment_count',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Comments
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const count = getValue() as number;
      return (
        <span className='text-center'>
          {count}
        </span>
      );
    },
  },
];