'use client';

import React, { Suspense } from 'react';
import '../../styles/committablestyle.css';
import { IssuesCountCardView, IssuesListCardView } from '../../src/components/IssuesCardView';

export default function ListIssues() {
  return (
    <div className='center'>
      <section className='committablestyle flex gap-6 dark:text-white'>
        <div className='m-auto w-full max-w-7xl'>
          <div className='mx-auto gap-4 md:max-w-[58rem] mb-8'>
            <h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
              Community Engagement
            </h2>
            <p className='text-muted-foreground mt-4'>
              Explore user interactions and active discussions across repositories
            </p>
          </div>

          {/* Issues Count Summary Cards */}
          <div className='mb-12'>
            <h3 className='text-2xl font-bold mb-6 text-center'>User Interaction by Repository</h3>
            <Suspense fallback={
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading repository interactions...</p>
                </div>
              </div>
            }>
              <IssuesCountCardView />
            </Suspense>
          </div>

          {/* Detailed Issues List Cards */}
          <div className='mb-8'>
            <h3 className='text-2xl font-bold mb-6 text-center'>Active User Discussions</h3>
            <Suspense fallback={
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading active discussions...</p>
                </div>
              </div>
            }>
              <IssuesListCardView />
            </Suspense>
          </div>

          <div className='text-center'>
            <p className='max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mx-auto'>
              Professional card-based interface showcasing active community engagement and user interactions
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}