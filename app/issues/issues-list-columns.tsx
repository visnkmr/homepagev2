'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import React from 'react';
import LetterClamp from '../../src/components/letterclamp';

export type IssuesListData = {
  repo_name: string;
  repo_url: string;
  title: string;
  issue_url: string;
  comment_count: number;
};

export const issuesListColumns: ColumnDef<IssuesListData>[] = [
  {
    accessorKey: 'repo_name',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Active Repository
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
          className='' 
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
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Discussion Topic
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({
      getValue,
      row: {
        original: { issue_url },
      },
    }) => {
      const title = getValue() as string;
      return (
        <div className=''>
          <a 
            href={issue_url}
            target="_blank"
            rel="noopener noreferrer"
            className=''
          >
            <LetterClamp text={title} />
          </a>
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
          Community Response
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const count = getValue() as number;
      return (
        <div className='text-center'>
          <span className='font-medium text-gray-600 dark:text-gray-400'>
            {count}
          </span>
        </div>
      );
    },
  },
];