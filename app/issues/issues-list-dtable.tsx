'use client';
import { Suspense } from "react";
import { IssuesListData } from './issues-list-columns';
import { IssuesDataTable } from './data-table';
import { getIssuesListData } from '../../src/dealissues';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';

interface IssuesListDtableProps {
  columns: ColumnDef<IssuesListData>[];
}

export default function IssuesListDtable({ columns }: IssuesListDtableProps) {
  const data = getIssuesListData();

  return (
    <Suspense fallback={<div>Loading issues list...</div>}>
      <IssuesDataTable columns={columns} data={data} />
    </Suspense>
  );
}