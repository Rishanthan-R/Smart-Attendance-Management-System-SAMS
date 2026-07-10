'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Avatar } from '@/components/ui/Avatar';
import { mockLiveAttendance, mockSubjects } from '@/lib/mockData';
import { CheckCircle2, XCircle, Users, StopCircle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LiveAttendancePage() {
  const router = useRouter();
  const subject = mockSubjects[0];
  const totalExpected = subject.students;
  
  // Simulate incoming real-time data
  const [stream, setStream] = useState([]);
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < mockLiveAttendance.length) {
        setStream(prev => [mockLiveAttendance[index], ...prev]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const presentCount = stream.filter(s => s.status === 'Verified').length;
  const rejectedCount = stream.filter(s => s.status === 'Rejected').length;

  const columns = [
    {
      key: 'student',
      label: 'Student',
      render: (_, row) => (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Avatar name={row.studentName} initials={row.avatar} size="sm" />
          <div>
            <p className="font-semibold text-[--color-on-surface]">{row.studentName}</p>
            <p className="text-xs text-[--color-on-surface-variant]">{row.studentId}</p>
          </div>
        </motion.div>
      )
    },
    { key: 'time', label: 'Time Joined' },
    { key: 'gpsDistance', label: 'GPS Distance' },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <Badge variant={val === 'Verified' ? 'success' : 'absent'}>
          {val === 'Verified' ? 'Success' : 'Rejected'}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-white p-4 rounded-2xl border border-[--color-outline-variant] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[--color-on-surface]">Live Attendance Stream</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="live" dot>LIVE</Badge>
              <span className="text-xs font-semibold text-[--color-on-surface-variant]">Started at 08:00 AM</span>
            </div>
          </div>
        </div>
        <Button variant="danger" className="gap-2 shadow-sm" onClick={() => router.push('/lecturer')}>
          <StopCircle size={18} /> Close Session
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Stats & Session Info */}
        <div className="lg:col-span-1 space-y-4">
          <Card padding="md" className="bg-[--color-surface-container-lowest]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[--color-on-surface-variant] mb-4">Session Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-[--color-outline]">Subject</p>
                <p className="font-semibold text-[--color-on-surface]">{subject.code}</p>
                <p className="text-xs text-[--color-on-surface-variant]">{subject.name}</p>
              </div>
              <div className="h-px bg-[--color-outline-variant]" />
              <div>
                <p className="text-xs text-[--color-outline]">Location</p>
                <p className="font-semibold text-[--color-on-surface]">FOC Hall 01</p>
              </div>
              <div className="h-px bg-[--color-outline-variant]" />
              <div>
                <p className="text-xs text-[--color-outline]">Type</p>
                <p className="font-semibold text-[--color-on-surface]">Week 07 Lecture</p>
              </div>
            </div>
          </Card>

          <StatCard icon={CheckCircle2} label="Present" value={presentCount} accent="green" />
          <StatCard icon={XCircle} label="Rejected" value={rejectedCount} accent="red" />
          <StatCard icon={Users} label="Total Expected" value={totalExpected} accent="blue" />
        </div>

        {/* Right Column - Data Table */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[--color-on-surface]">Recent Activity</h3>
              <Badge variant="blue" className="bg-blue-50 text-[--color-primary] gap-2 border border-blue-200">
                <RefreshCw size={12} className="animate-spin" /> UPDATING REAL-TIME
              </Badge>
            </div>
            
            <div className="flex-1 rounded-xl overflow-hidden border border-[--color-outline-variant]">
              <Table 
                columns={columns} 
                data={stream} 
                emptyMessage="Waiting for students to join..." 
                className="border-0 rounded-none h-full"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
