import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockMailers, mockLists } from '../data/mockData';

export const ScheduledMailingsList = ({ mailings, onDelete }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Mailings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mailings.map(mailing => (
            <div key={mailing.id} 
                 className="flex items-center justify-between p-4 border rounded hover:bg-gray-50">
              <div className="space-y-1">
                <div className="font-medium">
                  {mockMailers.find(m => m.id === Number(mailing.mailerId))?.name}
                </div>
                <div className="text-sm text-gray-500">
                  To: {mockLists.find(l => l.id === Number(mailing.listId))?.name}
                </div>
                <div className="text-sm text-gray-500">
                  Scheduled for: {mailing.scheduleDate} at {mailing.scheduleTime}
                </div>
              </div>
              <Button 
                variant="destructive"
                onClick={() => onDelete(mailing.id)}
              >
                Delete
              </Button>
            </div>
          ))}
          {mailings.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No mailings scheduled
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};