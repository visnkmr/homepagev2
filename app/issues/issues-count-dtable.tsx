'use client';
import { Suspense } from "react";
import { IssuesCountData } from './issues-count-columns';
import { IssuesDataTable } from './data-table';
import { getIssuesCountData } from '../../src/dealissues';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';

interface IssuesCountDtableProps {
  columns: ColumnDef<IssuesCountData>[];
}

export default function IssuesCountDtable({ columns }: IssuesCountDtableProps) {
  const data = getIssuesCountData();

  return (
    <Suspense fallback={<div>Loading issues count...</div>}>
      <IssuesDataTable columns={columns} data={data} />
    </Suspense>
  );
}