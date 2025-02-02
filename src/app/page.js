import MailingScheduler from '../components/MailingScheduler';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Email Campaign Scheduler</h1>
      <MailingScheduler />
    </main>
  );
}
