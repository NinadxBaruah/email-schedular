# Email Campaign Scheduler

A React-based email campaign scheduling system that allows users to schedule, manage, and track email campaigns using customizable templates and recipient lists.

## Features

- 📅 Schedule email campaigns for future dates and times
- 📧 Manage email templates and recipient lists
- 👥 Preview campaigns before scheduling
- 🔔 Real-time notifications for scheduling and sending events
- 📊 Track scheduled campaigns
- ⚡ Cancel or modify scheduled campaigns

## Tech Stack

- React 18+
- Next.js 14
- Shadcn/UI Components
- Tailwind CSS
- Lucide Icons

## Prerequisites

Before you begin, ensure you have installed:
- Node.js 18.0 or higher
- npm or yarn or pnpm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/NinadxBaruah/email-schedular.git
cd email-scheduler
```

2. Install dependencies:
```bash
npm install

```

3. Install required shadcn/ui components:
```bash
npx shadcn@latest add toast
npx shadcn@latest add card
npx shadcn@latest add button
npx shadcn@latest add label
npx shadcn@latest add alert
```

4. To run

```bash
npm install
and
npm run dev


```
## Will be available on PORT 3000

## Usage

### Setting Up Email Templates

Create your email templates in the `mockData.js` file:

```javascript
export const mockMailers = [
  {
    id: 1,
    name: "Welcome Email",
    subject: "Welcome to Our Service",
    content: "Hello {name}, welcome to..."
  },
  // Add more templates...
];


### Setting Up Recipient Lists

Define your recipient lists in the same `mockData.js` file:

```javascript
export const mockLists = [
  {
    id: 1,
    name: "New Subscribers",
    emails: ["user1@example.com", "user2@example.com"]
  },
  // Add more lists...
];
```

### Scheduling an Email Campaign

1. Select an email template from the dropdown
2. Choose a recipient list
3. Set the date and time for the campaign
4. Review the preview
5. Click "Schedule Mailing"

### Managing Scheduled Campaigns

- View all scheduled campaigns in the list below the scheduler
- Cancel any scheduled campaign by clicking the delete button
- Monitor sending status through toast notifications

## Component Structure

