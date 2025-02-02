import { mockMailers, mockLists } from "../data/mockData";

export class EmailScheduler {
  static schedules = new Map();

  static scheduleEmail(mailing) {
    const { id, mailerId, listId, scheduleDate, scheduleTime } = mailing;
    const scheduledTime = new Date(`${scheduleDate}T${scheduleTime}`);

    // Clear any existing schedule for this mailing
    if (this.schedules.has(id)) {
      clearTimeout(this.schedules.get(id));
    }

    // Calculate delay until scheduled time
    const now = new Date();
    const delay = scheduledTime.getTime() - now.getTime();

    if (delay < 0) {
      throw new Error("Cannot schedule email in the past");
    }

    // Schedule the email
    const timeoutId = setTimeout(() => {
      this.sendEmail(mailing);
      this.schedules.delete(id);
    }, delay);

    this.schedules.set(id, timeoutId);

    // For demo purposes - log scheduling info
    console.log(`Email scheduled for ${scheduledTime.toLocaleString()}`);
    return true;
  }

  static cancelSchedule(mailingId) {
    if (this.schedules.has(mailingId)) {
      clearTimeout(this.schedules.get(mailingId));
      this.schedules.delete(mailingId);
      console.log(`Schedule cancelled for mailing ${mailingId}`);
      return true;
    }
    return false;
  }

  static async sendEmail(mailing) {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000';
    try {
      const response = await fetch(`/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailing),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send emails");
      }
  
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error sending scheduled emails:", error);
      throw error;
    }
  }
}
