import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const MailerPreview = ({ mailer, list }) => {
  if (!mailer || !list) return null;

  return (
    <Card className="mt-4 bg-gray-50">
      <CardHeader>
        <CardTitle>Email Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Subject:</h3>
            <p className="bg-white p-2 rounded">{mailer.subject}</p>
          </div>
          <div>
            <h3 className="font-semibold">Content:</h3>
            <div className="bg-white p-2 rounded whitespace-pre-wrap">
              {mailer.content.replace('{{name}}', 'Preview User')}
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Recipients:</h3>
            <p className="bg-white p-2 rounded">
              Sending to {list.emails.length} recipients from list: {list.name}
              <br />
              <span className="text-sm text-gray-500">
                Example recipients: {list.emails.slice(0, 2).map(e => e.email).join(', ')}
                {list.emails.length > 2 ? '...' : ''}
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};