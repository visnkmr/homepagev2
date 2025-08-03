'use client';

import React from 'react';
import '../../styles/committablestyle.css';
import { issuesCountColumns } from './issues-count-columns';
import { issuesListColumns } from './issues-list-columns';
import IssuesCountDtable from './issues-count-dtable';
import IssuesListDtable from './issues-list-dtable';

export default function ListIssues() {
  return (
    <div className='center'>
      <section className='committablestyle flex gap-6 dark:text-white'>
        <div className='m-auto w-full max-w-7xl'>
          <div className='mx-auto gap-4 md:max-w-[58rem] mb-8'>
            <h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
              Community Engagement
            </h2>
          </div>
          
          {/* Issues Count Summary Table */}
          <div className='mb-12'>
            <h3 className='text-2xl font-bold mb-6 text-center'>User Interaction by Repository</h3>
            <IssuesCountDtable columns={issuesCountColumns} />
          </div>
          
          {/* Detailed Issues List Table */}
          <div className='mb-8'>
            <h3 className='text-2xl font-bold mb-6 text-center'>Active User Discussions</h3>
            <IssuesListDtable columns={issuesListColumns} />
          </div>
          
          <p className='max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-center mx-auto'>
            Active community engagement metrics showing user interactions and discussions across repositories
          </p>
        </div>
      </section>
    </div>
  );
}