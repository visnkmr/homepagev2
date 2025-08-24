'use client';

import React, { useState, useMemo } from 'react';
import { IssuesCountCardView, IssuesListCardView } from './IssuesCardView';
import { getIssuesListData, getIssuesCountData } from '../dealissues';
import IssueCard from './issuecard';
import IssuesCountCard from './issues-count-card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import take from 'lodash.take';

export default function Issues() {
  const allIssuesData = getIssuesListData();
  const allIssuesCountData = getIssuesCountData();
  
  // Mobile sorting and filtering state
  const [countSortField, setCountSortField] = useState<'repo_name' | 'issue_count'>('issue_count');
  const [countSortDirection, setCountSortDirection] = useState<'asc' | 'desc'>('desc');
  const [listSortField, setListSortField] = useState<'repo_name' | 'title' | 'comment_count'>('comment_count');
  const [listSortDirection, setListSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUsingFilters, setIsUsingFilters] = useState(false);

  // Sorted and filtered data for mobile
  const sortedCountData = useMemo(() => {
    return [...allIssuesCountData].sort((a, b) => {
      const aVal = a[countSortField];
      const bVal = b[countSortField];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return countSortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return countSortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });
  }, [allIssuesCountData, countSortField, countSortDirection]);

  // Default mobile data - show 5 most commented issues
  const defaultMobileIssuesData = useMemo(() => {
    return [...allIssuesData]
      .sort((a, b) => b.comment_count - a.comment_count) // Sort by comment count descending
      .slice(0, 5); // Take only top 5
  }, [allIssuesData]);

  const sortedAndFilteredListData = useMemo(() => {
    let filtered = allIssuesData;
    
    // Apply search filter
    if (searchTerm) {
      filtered = allIssuesData.filter(issue => 
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.repo_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      const aVal = a[listSortField];
      const bVal = b[listSortField];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return listSortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return listSortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });
    
    return take(sorted, 20); // Show up to 20 filtered/sorted issues on mobile
  }, [allIssuesData, listSortField, listSortDirection, searchTerm]);

  const handleCountSort = (field: 'repo_name' | 'issue_count') => {
    if (countSortField === field) {
      setCountSortDirection(countSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setCountSortField(field);
      setCountSortDirection('desc');
    }
  };

  const handleListSort = (field: 'repo_name' | 'title' | 'comment_count') => {
    setIsUsingFilters(true);
    if (listSortField === field) {
      setListSortDirection(listSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setListSortField(field);
      setListSortDirection('desc');
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setIsUsingFilters(value.length > 0);
  };

  const resetToDefaults = () => {
    setSearchTerm('');
    setListSortField('comment_count');
    setListSortDirection('desc');
    setIsUsingFilters(false);
  };

  const getSortIcon = (field: string, currentField: string, direction: 'asc' | 'desc') => {
    if (field !== currentField) return <ArrowUpDown className="w-4 h-4" />;
    return direction === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };



  return (
    <>
      <div id="user-engagement" className="p-2 flex flex-col items-center w-full dark:bg-gray-900 dark:text-white">
        <div className="items-center leading-tighter tracking-tight text-center font-bold text-4xl p-10 pb-8">
          Active Community Engagement
        </div>
        {/* <p className="dark:text-white text-xl mb-8 text-center">
          Issues summary and detailed list from tracked repositories
        </p> */}
        
        <div className="hidden sm:block w-full max-w-7xl space-y-8">
          {/* Issues Count Summary Cards */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-center">User Interaction by Repository</h3>
            <IssuesCountCardView />
          </div>

          {/* Detailed Issues List Cards */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-center">Active User Discussions</h3>
            <IssuesListCardView />
          </div>
          
          <div className="flex w-full justify-center items-center mt-4">
            <a
              href="/issues"
              target="_blank"
              className="text-center sm:flex shadow-indigo-500/50 shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-2xl col-span-1 mx-5 xl:mx-4 mb-8 p-4 rounded-full place-self-center hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              Explore Full Community Engagement
            </a>
          </div>
        </div>
        
        <div className="sm:hidden w-full max-w-2xl px-4">
          {/* Issues Count Summary for Mobile */}
          {allIssuesCountData.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">User Interaction by Repository</h3>
              
              {/* Sort Controls for Issues Count */}
              <div className="flex gap-2 mb-4 justify-center flex-wrap">
                <Button
                  variant={countSortField === 'repo_name' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCountSort('repo_name')}
                  className="flex items-center gap-1"
                >
                  Repository {getSortIcon('repo_name', countSortField, countSortDirection)}
                </Button>
                <Button
                  variant={countSortField === 'issue_count' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCountSort('issue_count')}
                  className="flex items-center gap-1"
                >
                  Interactions {getSortIcon('issue_count', countSortField, countSortDirection)}
                </Button>
              </div>
              
              {sortedCountData.map((issueCount, index) => (
                <IssuesCountCard key={`${issueCount.repo_name}-${index}`} issueCount={issueCount} />
              ))}
            </div>
          )}
          
          {/* Issues List for Mobile */}
          {allIssuesData.length > 0 ? (
            <>
              <h3 className="text-xl font-bold mb-4 text-center">
                {isUsingFilters ? 'Active User Discussions' : 'Top Community Discussions'}
              </h3>
              
              {/* Search Input */}
              <div className="mb-4">
                <Input
                  placeholder="Search discussions by title or repository..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full"
                />
                {(searchTerm || isUsingFilters) && (
                  <div className="mt-2 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetToDefaults}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {searchTerm ? 'Clear search' : 'Reset to top discussions'}
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Sort Controls for Issues List */}
              <div className="flex gap-2 mb-4 justify-center flex-wrap">
                <Button
                  variant={listSortField === 'repo_name' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleListSort('repo_name')}
                  className="flex items-center gap-1"
                >
                  Repository {getSortIcon('repo_name', listSortField, listSortDirection)}
                </Button>
                <Button
                  variant={listSortField === 'title' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleListSort('title')}
                  className="flex items-center gap-1"
                >
                  Topic {getSortIcon('title', listSortField, listSortDirection)}
                </Button>
                <Button
                  variant={listSortField === 'comment_count' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleListSort('comment_count')}
                  className="flex items-center gap-1"
                >
                  Response {getSortIcon('comment_count', listSortField, listSortDirection)}
                </Button>
              </div>
              
              {(() => {
                const dataToShow = isUsingFilters ? sortedAndFilteredListData : defaultMobileIssuesData;
                return dataToShow.length > 0 ? (
                  <>
                    {dataToShow.map((issue, index) => (
                      <IssueCard key={`${issue.repo_name}-${index}`} issue={issue} />
                    ))}
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {isUsingFilters ? (
                        <>
                          Showing {dataToShow.length} of {allIssuesData.length} discussions
                          {searchTerm && ` (filtered by "${searchTerm}")`}
                        </>
                      ) : (
                        `Showing top ${dataToShow.length} most discussed issues`
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <p className="text-gray-600 dark:text-gray-400">
                      {searchTerm ? `No discussions found matching "${searchTerm}"` : 'No discussions available'}
                    </p>
                  </div>
                );
              })()}
              
              <div className="flex w-full justify-center items-center mt-4">
                <a
                  href="/issues"
                  target="_blank"
                  className="text-center sm:flex shadow-indigo-500/50 shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-2xl col-span-1 mx-5 xl:mx-4 mb-8 p-4 rounded-full place-self-center hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                >
                  Explore Community Engagement
                </a>
              </div>
            </>
          ) : allIssuesCountData.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-gray-600 dark:text-gray-400">
                No issues data available at the moment.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}