'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Table, Pagination } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { mockAttendanceHistory, mockSubjects } from '@/lib/mockData';
import { CheckCircle2, XCircle, Clock, Download, Filter } from 'lucide-react';
import { getAttendanceColor } from '@/lib/utils';

export default function AttendanceHistoryPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const itemsPerPage = 8;
  const totalItems = mockAttendanceHistory.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const columns = [
    { key: 'date', label: 'Date', width: '120px' },
    { 
      key: 'subject', 
      label: 'Subject',
      render: (val, row) => (
        <div>
          <p className="font-semibold">{val}</p>
          <p className="text-xs text-[--color-on-surface-variant]">{row.subjectName}</p>
        </div>
      )
    },
    { key: 'type', label: 'Session Type' },
    { key: 'location', label: 'Location' },
    { key: 'time', label: 'Time' },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <Badge variant={val.toLowerCase()}>{val}</Badge>
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Attendance History" 
        subtitle="View and download your past attendance records"
        actions={
          <Button variant="outline" className="gap-2">
            <Download size={16} /> Download CSV
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          icon={CheckCircle2} 
          label="Overall Percentage" 
          value="88.4%" 
          accent="blue" 
          className="bg-gradient-to-br from-[--color-primary] to-blue-800 text-white border-none shadow-lg [&_p]:text-blue-100 [&_.text-3xl]:text-white [&_div]:bg-white/20 [&_div]:text-white"
        />
        <StatCard icon={CheckCircle2} label="Total Days Present" value="114" accent="green" />
        <StatCard icon={XCircle} label="Total Days Absent" value="12" accent="red" />
      </div>

      <div className="bg-white rounded-2xl border border-[--color-outline-variant] shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-[--color-outline-variant] bg-[--color-surface-container-lowest] flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <SearchBar 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Search by subject or location..." 
            />
          </div>
          <div className="w-full sm:w-48">
            <Select 
              options={[
                { value: 'all', label: 'All Subjects' },
                ...mockSubjects.map(s => ({ value: s.code, label: s.code }))
              ]} 
            />
          </div>
          <div className="w-full sm:w-48">
            <Select 
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'present', label: 'Present' },
                { value: 'absent', label: 'Absent' },
                { value: 'late', label: 'Late' },
              ]} 
            />
          </div>
          <Button variant="outline" className="px-3">
            <Filter size={16} />
          </Button>
        </div>

        <Table 
          columns={columns} 
          data={mockAttendanceHistory.slice((page - 1) * itemsPerPage, page * itemsPerPage)} 
          className="border-0 rounded-none shadow-none"
        />
        
        <div className="p-4 border-t border-[--color-outline-variant]">
          <Pagination 
            page={page} 
            totalPages={totalPages} 
            onPageChange={setPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
