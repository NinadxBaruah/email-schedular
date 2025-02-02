
// src/app/api/send-email/route.js
import { NextResponse } from 'next/server';
import { EmailService } from '@/utils/emailService';
import { mockMailers, mockLists } from '@/data/mockData';
// import 'dotenv/config';

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  max: 50 // max 50 emails per minute
};

const emailCounts = new Map();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Export the HTTP method handlers
export async function POST(request) {
  try {
    const data = await request.json();
    const { mailerId, listId } = data;

    // Input validation
    if (!mailerId || !listId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const mailer = mockMailers.find(m => m.id === Number(mailerId));
    const list = mockLists.find(l => l.id === Number(listId));

    if (!mailer || !list) {
      return NextResponse.json(
        { error: 'Invalid mailer or list ID' },
        { status: 400 }
      );
    }

    // Rate limiting check
    const now = Date.now();
    const windowStart = now - RATE_LIMIT.windowMs;
    const recentEmails = Array.from(emailCounts.entries())
      .filter(([timestamp]) => timestamp > windowStart)
      .reduce((sum, [, count]) => sum + count, 0);

    if (recentEmails + list.emails.length > RATE_LIMIT.max) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    // Send emails in batches
    const validEmails = list.emails.filter(recipient => emailRegex.test(recipient.email));
    const results = await EmailService.sendBulkEmails(validEmails, mailer.subject, mailer.content);

    // Update rate limiting counter
    emailCounts.set(now, validEmails.length);

    // Clean up old rate limit entries
    for (const [timestamp] of emailCounts) {
      if (timestamp < windowStart) {
        emailCounts.delete(timestamp);
      }
    }

    return NextResponse.json({
      message: `Processed ${validEmails.length} emails`,
      successful: results.successful.length,
      failed: results.failed.length,
      details: {
        successful: results.successful,
        failed: results.failed
      }
    });
  } catch (error) {
    console.error('Error in email sending:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process email request',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (optional)
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}