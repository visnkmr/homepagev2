'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import React from 'react';

export type IssuesCountData = {
  repo_name: string;
  html_url: string;
  issue_count: number;
};

export const issuesCountColumns: ColumnDef<IssuesCountData>[] = [
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
        original: { html_url },
      },
    }) => {
      const repoName = getValue() as string;
      return (
        <a 
          className='text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium' 
          href={html_url}
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
          User Interactions
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const count = getValue() as number;
      return (
        <div className='text-center'>
          <span className='font-bold text-2xl text-orange-600 dark:text-orange-400'>
            {count}
          </span>
        </div>
      );
    },
  },
];