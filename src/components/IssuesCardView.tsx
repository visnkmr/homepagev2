'use client';

import React, { Suspense } from 'react';
import { ProfessionalCard, CardGrid, CardData } from './ProfessionalCard';
import { CardExpandedDialog } from './CardExpandedDialog';
import { IssuesCountData } from '../../app/issues/issues-count-columns';
import { IssuesListData } from '../../app/issues/issues-list-columns';
import { getIssuesCountData, getIssuesListData } from '../dealissues';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Search, Filter, MessageSquare, GitBranch, Users, TrendingUp } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface IssuesCardViewProps {
  className?: string;
}

export function IssuesCountCardView({ className = '' }: IssuesCardViewProps) {
  const searchParams = useSearchParams();
  const reponame = searchParams.get('reponame') || '';

  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState<'repo_name' | 'issue_count'>('issue_count');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');
  const [selectedCard, setSelectedCard] = React.useState<CardData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleCardExpand = (data: CardData) => {
    setSelectedCard(data);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCard(null);
  };

  const allIssuesCount = getIssuesCountData();

  const filteredIssuesCount = React.useMemo(() => {
    let filtered = allIssuesCount.filter(issue => {
      const matchesSearch = searchTerm === '' ||
        issue.repo_name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'repo_name':
          aValue = a.repo_name.toLowerCase();
          bValue = b.repo_name.toLowerCase();
          break;
        case 'issue_count':
          aValue = a.issue_count;
          bValue = b.issue_count;
          break;
        default:
          aValue = a.issue_count;
          bValue = b.issue_count;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Limit to last 10 repositories
    return filtered.slice(-10);
  }, [allIssuesCount, searchTerm, sortBy, sortOrder]);

  const handleSort = (newSortBy: 'repo_name' | 'issue_count') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (column: string) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return '↕';
  };

  const issueCountCards = filteredIssuesCount.map((issueCount, index) => (
    <ProfessionalCard
      key={`${issueCount.repo_name}-${index}`}
      data={{
        id: issueCount.repo_name,
        type: 'issue_count',
        title: issueCount.repo_name,
        subtitle: `${issueCount.issue_count} active issues`,
        url: issueCount.html_url,
        repo_name: issueCount.repo_name,
        repo_url: issueCount.html_url,
        issue_count: issueCount.issue_count,
      }}
      variant="default"
      onExpand={handleCardExpand}
    />
  ));

  return (
    <div className={`space-y-6 px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Search and Filter Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort('repo_name')}
            className="flex items-center gap-2"
          >
            <GitBranch className="h-4 w-4" />
            Sort by Repository {getSortIcon('repo_name')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort('issue_count')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Sort by Issues {getSortIcon('issue_count')}
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing last {filteredIssuesCount.length} repositories from {allIssuesCount.length} total
      </div>

      {/* Cards Grid */}
      <CardGrid columns={3} className="max-w-full">
        {issueCountCards.length > 0 ? (
          issueCountCards
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No repositories found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          </div>
        )}
      </CardGrid>

      {/* Expanded Dialog */}
      <CardExpandedDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        data={selectedCard}
      />
    </div>
  );
}

export function IssuesListCardView({ className = '' }: IssuesCardViewProps) {
  const searchParams = useSearchParams();
  const reponame = searchParams.get('reponame') || '';
  const title = searchParams.get('title') || '';

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterRepo, setFilterRepo] = React.useState(reponame);
  const [sortBy, setSortBy] = React.useState<'repo_name' | 'title' | 'comment_count'>('comment_count');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');
  const [selectedCard, setSelectedCard] = React.useState<CardData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleCardExpand = (data: CardData) => {
    setSelectedCard(data);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCard(null);
  };

  const allIssuesList = getIssuesListData();

  const filteredIssuesList = React.useMemo(() => {
    let filtered = allIssuesList.filter(issue => {
      const matchesSearch = searchTerm === '' ||
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.repo_name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRepo = filterRepo === '' ||
        issue.repo_name.toLowerCase().includes(filterRepo.toLowerCase());

      return matchesSearch && matchesRepo;
    });

    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'repo_name':
          aValue = a.repo_name.toLowerCase();
          bValue = b.repo_name.toLowerCase();
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'comment_count':
          aValue = a.comment_count;
          bValue = b.comment_count;
          break;
        default:
          aValue = a.comment_count;
          bValue = b.comment_count;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Limit to last 10 issues
    return filtered.slice(-10);
  }, [allIssuesList, searchTerm, filterRepo, sortBy, sortOrder]);

  const handleSort = (newSortBy: 'repo_name' | 'title' | 'comment_count') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (column: string) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return '↕';
  };

  const issueListCards = filteredIssuesList.map((issue, index) => (
    <ProfessionalCard
      key={`${issue.issue_url}-${index}`}
      data={{
        id: issue.issue_url,
        type: 'issue',
        title: issue.title,
        subtitle: issue.repo_name,
        url: issue.issue_url,
        repo_name: issue.repo_name,
        repo_url: issue.repo_url,
        issue_url: issue.issue_url,
        comment_count: issue.comment_count,
      }}
      variant="default"
      onExpand={handleCardExpand}
    />
  ));

  return (
    <div className={`space-y-6 px-4 sm:px-6 lg:px-8 ${className}`}>
      {/* Search and Filter Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search issues by title or repository..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex-1 relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Filter by repository name..."
              value={filterRepo}
              onChange={(e) => setFilterRepo(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort('repo_name')}
            className="flex items-center gap-2"
          >
            <GitBranch className="h-4 w-4" />
            Sort by Repository {getSortIcon('repo_name')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort('title')}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Sort by Title {getSortIcon('title')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort('comment_count')}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Sort by Comments {getSortIcon('comment_count')}
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing last {filteredIssuesList.length} discussions from {allIssuesList.length} total
      </div>

      {/* Cards Grid */}
      <CardGrid columns={2} className="max-w-full">
        {issueListCards.length > 0 ? (
          issueListCards
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No discussions found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        )}
      </CardGrid>

      {/* Expanded Dialog */}
      <CardExpandedDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        data={selectedCard}
      />
    </div>
  );
}