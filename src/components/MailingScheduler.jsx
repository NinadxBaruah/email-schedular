'use client'

import React, { useState } from 'react';
import { Calendar, Clock, Mail, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { mockMailers, mockLists } from '../data/mockData';
import {useToast} from "@/hooks/use-toast"
import { EmailScheduler } from '../utils/emailSchedular';
import { MailerPreview } from './MailerPreview';
import { ScheduledMailingsList } from './ScheduledMailingsList';
import { Toaster } from './ui/toaster';

const MailingScheduler = () => {
  const [mailings, setMailings] = useState([]);
  const {toast} = useToast()
  const [formData, setFormData] = useState({
    mailerId: '',
    listId: '',
    scheduleDate: '',
    scheduleTime: '',
  });
  const [selectedMailer, setSelectedMailer] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (!formData.mailerId || !formData.listId || !formData.scheduleDate || !formData.scheduleTime) {
        setError('Please fill in all fields');
        return;
      }

      const scheduledDateTime = new Date(`${formData.scheduleDate}T${formData.scheduleTime}`);
      if (scheduledDateTime <= new Date()) {
        setError('Please select a future date and time');
        return;
      }

      const newMailing = {
        id: Date.now(),
        ...formData,
        status: 'scheduled'
      };

     const res =  EmailScheduler.scheduleEmail(newMailing);

     if(true) {
      toast({
        title: 'Email Scheduled',
        description: 'Your email has been scheduled successfully',
      })
     }
      setMailings([...mailings, newMailing]);
      setSuccess('Mailing scheduled successfully!');
      
      // Reset form
      setFormData({
        mailerId: '',
        listId: '',
        scheduleDate: '',
        scheduleTime: '',
      });
      setSelectedMailer(null);
      setSelectedList(null);
    } catch (err) {
      setError(err.message || 'Failed to schedule mailing');
    }
  };

  const handleDelete = async (id) => {
    try {
      EmailScheduler.cancelSchedule(id);
      setMailings(mailings.filter(mailing => mailing.id !== id));
      setSuccess('Mailing deleted successfully!');
    } catch (err) {
      setError('Failed to delete mailing');
    }
  };

  const handleMailerChange = (e) => {
    const mailerId = e.target.value;
    setFormData({ ...formData, mailerId });
    setSelectedMailer(mockMailers.find(m => m.id === Number(mailerId)) || null);
  };

  const handleListChange = (e) => {
    const listId = e.target.value;
    setFormData({ ...formData, listId });
    setSelectedList(mockLists.find(l => l.id === Number(listId)) || null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Schedule New Mailing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mailer">Email Template</Label>
                <select
                  id="mailer"
                  value={formData.mailerId}
                  onChange={handleMailerChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Template</option>
                  {mockMailers.map(mailer => (
                    <option key={mailer.id} value={mailer.id}>{mailer.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="list">Recipient List</Label>
                <select
                  id="list"
                  value={formData.listId}
                  onChange={handleListChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select List</option>
                  {mockLists.map(list => (
                    <option key={list.id} value={list.id}>
                      {list.name} ({list.emails.length} recipients)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="date">Schedule Date</Label>
                <input
                  type="date"
                  id="date"
                  value={formData.scheduleDate}
                  onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
                  className="w-full p-2 border rounded"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <Label htmlFor="time">Schedule Time</Label>
                <input
                  type="time"
                  id="time"
                  value={formData.scheduleTime}
                  onChange={(e) => setFormData({ ...formData, scheduleTime: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <MailerPreview mailer={selectedMailer} list={selectedList} />

            <Button type="submit" className="w-full">Schedule Mailing</Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mt-4">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      <Toaster/>

      <ScheduledMailingsList 
        mailings={mailings} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default MailingScheduler;