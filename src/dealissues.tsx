'use client'
import { IssueTableData } from '../app/issues/columns';
import { IssuesCountData } from '../app/issues/issues-count-columns';
import { IssuesListData } from '../app/issues/issues-list-columns';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface RawIssuesCountData {
  html_url: string;
  issue_count: number;
  repo_name: string;
}

export interface RawTopIssuesData {
  html_url: string;
  issues: {
    comment_count: number;
    title: string;
    url: string;
  }[];
  repo_name: string;
}

// Get issues count data for the summary table
export function getIssuesCountData(): IssuesCountData[] {
  const { data: issuesCountData } = useQuery({ 
    queryKey: ['issues_count'],
    queryFn: async () => {
      const response = await axios.get('https://cdn.jsdelivr.net/gh/visnkmr/apihub@getissues/issues_count.json');
      return response.data as RawIssuesCountData[];
    }
  });

  if (!issuesCountData) {
    return [];
  }

  return issuesCountData.map(item => ({
    repo_name: item.repo_name,
    html_url: item.html_url,
    issue_count: item.issue_count,
  }));
}

// Get detailed issues list data
export function getIssuesListData(): IssuesListData[] {
  const { data: topIssuesData } = useQuery({ 
    queryKey: ['top_issues'],
    queryFn: async () => {
      const response = await axios.get('https://cdn.jsdelivr.net/gh/visnkmr/apihub@getissues/top_issues.json');
      return response.data as RawTopIssuesData[];
    }
  });

  if (!topIssuesData) {
    return [];
  }

  const transformedData: IssuesListData[] = [];

  topIssuesData.forEach((repoData) => {
    if (repoData.issues && repoData.issues.length > 0) {
      repoData.issues.forEach((issue) => {
        transformedData.push({
          repo_name: repoData.repo_name,
          repo_url: repoData.html_url,
          title: issue.title,
          issue_url: issue.url,
          comment_count: issue.comment_count,
        });
      });
    }
  });

  return transformedData;
}

// Legacy function for backward compatibility
export function getIssuesData(): IssueTableData[] {
  const { data: issuesCountData } = useQuery({ 
    queryKey: ['issues_count'],
    queryFn: async () => {
      const response = await axios.get('https://cdn.jsdelivr.net/gh/visnkmr/apihub@getissues/issues_count.json');
      return response.data as RawIssuesCountData[];
    }
  });

  const { data: topIssuesData } = useQuery({ 
    queryKey: ['top_issues'],
    queryFn: async () => {
      const response = await axios.get('https://cdn.jsdelivr.net/gh/visnkmr/apihub@getissues/top_issues.json');
      return response.data as RawTopIssuesData[];
    }
  });

  if (!issuesCountData || !topIssuesData) {
    return [];
  }

  // Transform the data to match our table structure
  const transformedData: IssueTableData[] = [];

  topIssuesData.forEach((repoData) => {
    const issueCountData = issuesCountData.find((ic) => ic.repo_name === repoData.repo_name);
    const totalIssues = issueCountData ? issueCountData.issue_count : 0;

    if (repoData.issues && repoData.issues.length > 0) {
      repoData.issues.forEach((issue) => {
        transformedData.push({
          repo_name: repoData.repo_name,
          repo_url: repoData.html_url,
          issue_count: totalIssues,
          title: issue.title,
          issue_url: issue.url,
          comment_count: issue.comment_count,
        });
      });
    }
  });

  return transformedData;
}