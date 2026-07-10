'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardSubtitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Info, RefreshCw, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sleep } from '@/lib/utils';
import { mockSubjects, mockHalls, sessionTypes } from '@/lib/mockData';

export default function CreateSessionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    subject: mockSubjects[0].code,
    hall: mockHalls[0].name,
    type: sessionTypes[0],
    date: new Date().toISOString().split('T')[0],
    time: '08:00',
  });

  const handleGenerate = async () => {
    setLoading(true);
    await sleep(1000);
    // Simulate navigation to live session
    router.push('/lecturer/sessions/live/1');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <PageHeader 
        title="Create Attendance Session" 
        subtitle="Initialize a new session and generate OTP for students"
        badge={
          <Badge variant="active" className="gap-1.5" dot>
            GPS: LOCKED ({form.hall.toUpperCase()})
          </Badge>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
            </CardHeader>
            <div className="space-y-4">
              <Select 
                label="Subject Selection" 
                value={form.subject}
                onChange={(e) => setForm({...form, subject: e.target.value})}
                options={mockSubjects.map(s => ({ value: s.code, label: `${s.code} - ${s.name}` }))}
              />
              <Select 
                label="Lecture Hall" 
                value={form.hall}
                onChange={(e) => setForm({...form, hall: e.target.value})}
                options={mockHalls.map(h => ({ value: h.name, label: `${h.name} (Cap: ${h.capacity})` }))}
              />
              <Select 
                label="Session Type" 
                value={form.type}
                onChange={(e) => setForm({...form, type: e.target.value})}
                options={sessionTypes}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input 
                  label="Date" 
                  type="date" 
                  value={form.date}
                  onChange={(e) => setForm({...form, date: e.target.value})}
                />
                <Input 
                  label="Time" 
                  type="time" 
                  value={form.time}
                  onChange={(e) => setForm({...form, time: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <Button 
                  onClick={handleGenerate} 
                  loading={loading}
                  className="w-full py-6 text-lg font-bold shadow-md bg-gradient-to-r from-[--color-primary] to-[--color-primary-container]"
                >
                  <RefreshCw size={20} className={loading ? "animate-spin" : ""} /> 
                  Generate OTP & Start
                </Button>
              </div>
            </div>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <div className="flex gap-3">
              <Info size={20} className="text-blue-600 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">How it works:</p>
                <ul className="list-disc pl-4 space-y-1 text-xs opacity-90">
                  <li>A 6-digit OTP will be generated.</li>
                  <li>Display the OTP on the projector.</li>
                  <li>Students must be inside {form.hall} to verify location.</li>
                  <li>OTP is valid for 10 minutes by default.</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Placeholder Stream */}
        <div className="lg:col-span-2">
          <Card className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8 bg-[--color-surface-container-low] border-dashed border-2">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[--color-primary]">
              <PlayCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold text-[--color-on-surface] mb-2">Ready to Initialize</h3>
            <p className="text-[--color-on-surface-variant] max-w-md">
              Fill in the session details on the left and click "Generate OTP" to start the live attendance stream. 
              Real-time student check-ins will appear here.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
