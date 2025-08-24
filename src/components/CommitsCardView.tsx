'use client';

import React, { Suspense } from 'react';
import { ProfessionalCard, CardGrid, CardData } from './ProfessionalCard';
import { CardExpandedDialog } from './CardExpandedDialog';
import { eCommit } from '../../app/commits/columns';
import dwc, { tabledata } from '../dealcommits';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Search, Filter, Calendar, GitBranch } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { DateTime } from 'luxon';

function getCommitData(): eCommit[] {
  const res = tabledata("gtr.json");

  const data: eCommit[] = res.map(scommit => {
    const { reponame, additions, deletions, message, time, commit } = scommit;
    return { reponame, additions, deletions, message, time, commit };
  });

  return data;
}

interface CommitsCardViewProps {
  className?: string;
}

export default function CommitsCardView({ className = '' }: CommitsCardViewProps) {
  const searchParams = useSearchParams();
  const reponame = searchParams.get('reponame') || '';
  const message = searchParams.get('message') || '';

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterRepo, setFilterRepo] = React.useState(reponame);
  const [sortBy, setSortBy] = React.useState<'time' | 'reponame' | 'additions'>('time');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');
  const [selectedCard, setSelectedCard] = React.useState<CardData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const allCommits = getCommitData();

  // Filter and sort commits, then limit to last 10
  const filteredCommits = React.useMemo(() => {
    let filtered = allCommits.filter(commit => {
      const matchesSearch = searchTerm === '' ||
        commit.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commit.reponame.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRepo = filterRepo === '' ||
        commit.reponame.toLowerCase().includes(filterRepo.toLowerCase());

      return matchesSearch && matchesRepo;
    });

    // Sort commits
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'time':
          aValue = a.time;
          bValue = b.time;
          break;
        case 'reponame':
          aValue = a.reponame.toLowerCase();
          bValue = b.reponame.toLowerCase();
          break;
        case 'additions':
          aValue = a.additions;
          bValue = b.additions;
          break;
        default:
          aValue = a.time;
          bValue = b.time;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Limit to last 10 commits
    return filtered.slice(-10);
  }, [allCommits, searchTerm, filterRepo, sortBy, sortOrder]);

  const handleSort = (newSortBy: 'time' | 'reponame' | 'additions') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const formatTime = (timestamp: number) => {
    const dateTime = DateTime.fromMillis(timestamp * 1000);
    const utcDateTime = dateTime.toUTC();
    return utcDateTime.toFormat('dd MMM yy');
  };

  const getSortIcon = (column: string) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return '↕';
  };

  const handleCardExpand = (data: CardData) => {
    setSelectedCard(data);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCard(null);
  };

  const commitCards = filteredCommits.map((commit, index) => (
    <ProfessionalCard
      key={`${commit.commit}-${index}`}
      data={{
        id: commit.commit,
        type: 'commit',
        title: commit.message,
        subtitle: commit.reponame,
        url: commit.commit,
        reponame: commit.reponame,
        additions: commit.additions,
        deletions: commit.deletions,
        message: commit.message,
        time: commit.time,
        commit: commit.commit,
        metadata: {
          formattedTime: formatTime(commit.time)
        }
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
              placeholder="Search commits by message or repository..."
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
            onClick={() => handleSort('time')}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Sort by Date {getSortIcon('time')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort('reponame')}
            className="flex items-center gap-2"
          >
            <GitBranch className="h-4 w-4" />
            Sort by Repository {getSortIcon('reponame')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSort('additions')}
            className="flex items-center gap-2"
          >
            Sort by Changes {getSortIcon('additions')}
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing last {filteredCommits.length} commits from {allCommits.length} total
      </div>

      {/* Cards Grid */}
      <CardGrid columns={2} className="max-w-full">
        {commitCards.length > 0 ? (
          commitCards
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No commits found</p>
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