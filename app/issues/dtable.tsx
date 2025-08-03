'use client';
import { Suspense } from "react";
import { IssueTableData } from './columns';
import { IssuesDataTable } from './data-table';
import { getIssuesData } from '../../src/dealissues';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';

interface IssuesDtableProps {
  columns: ColumnDef<IssueTableData>[];
}

export default function IssuesDtable({ columns }: IssuesDtableProps) {
  const data = getIssuesData();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IssuesDataTable columns={columns} data={data} />
    </Suspense>
  );
}