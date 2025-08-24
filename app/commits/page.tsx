
'use client';

import React, { Suspense } from 'react';
import '../../styles/committablestyle.css';
import CommitsCardView from '../../src/components/CommitsCardView';

export default function ListCommits(req){
  return(
    <div className='center'>
        <section className='committablestyle flex gap-6 dark:text-white'>
          <div className='m-auto w-full max-w-7xl'>
            <div className='mx-auto gap-4 md:max-w-[58rem] mb-8'>
              <h2 className='font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl'>
                Development Activity
              </h2>
              <p className='text-muted-foreground mt-4'>
                Explore recent commits and development contributions across repositories
              </p>
            </div>
            <Suspense fallback={
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading commits...</p>
                </div>
              </div>
            }>
              <CommitsCardView />
            </Suspense>
            <div className='mt-12 text-center'>
              <p className='max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mx-auto'>
                Professional card-based interface inspired by modern design principles
              </p>
            </div>
          </div>
        </section>
    </div>
  );
}
