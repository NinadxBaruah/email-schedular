import nodemailer from 'nodemailer';
// import 'dotenv/config';

export class EmailService {
  static async createTransporter() {
    // Validate environment variables first
    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      throw new Error('Email credentials not configured. Please set EMAIL_USER and EMAIL_APP_PASSWORD environment variables.');
    }

    // Create transporter with retry logic
    let retries = 3;
    while (retries > 0) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD
          },
          // Add timeout to prevent hanging
          tls: {
            rejectUnauthorized: true
          },
          pool: true, // Use pooled connections
          maxConnections: 5,
          maxMessages: 100,
          socketTimeout: 30000 // 30 seconds
        });

        // Verify connection configuration
        await transporter.verify();
        return transporter;
      } catch (error) {
        retries--;
        if (retries === 0) {
          throw new Error(`Failed to create email transporter: ${error.message}`);
        }
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  static async sendEmail(recipient, subject, content) {
    if (!recipient?.email || !subject || !content) {
      throw new Error('Missing required email parameters');
    }

    try {
      const transporter = await this.createTransporter();
      
      const mailOptions = {
        from: {
          name: process.env.EMAIL_SENDER_NAME || 'Your Application',
          address: process.env.EMAIL_USER
        },
        to: recipient.email,
        subject: subject,
        html: content.replace('{{name}}', recipient.name || 'Valued Customer'),
        // Add additional headers for better deliverability
        headers: {
          'X-Priority': '3',
          'X-MSMail-Priority': 'Normal'
        }
      };

      const result = await transporter.sendMail(mailOptions);
      return {
        success: true,
        messageId: result.messageId,
        recipient: recipient.email
      };
    } catch (error) {
      // Enhanced error handling with specific error types
      const errorResponse = {
        success: false,
        recipient: recipient.email,
        error: {
          type: 'SEND_FAILED',
          message: 'Failed to send email'
        }
      };

      if (error.code === 'EAUTH') {
        errorResponse.error = {
          type: 'AUTH_ERROR',
          message: 'Email authentication failed. Please check credentials.'
        };
      } else if (error.code === 'ESOCKET') {
        errorResponse.error = {
          type: 'CONNECTION_ERROR',
          message: 'Failed to connect to email server'
        };
      }

      console.error(`Email sending failed for ${recipient.email}:`, {
        error: error.message,
        code: error.code,
        command: error.command
      });

      throw errorResponse;
    }
  }

  static async sendBulkEmails(recipients, subject, content, batchSize = 5) {
    const results = {
      successful: [],
      failed: []
    };

    // Process in batches to avoid overwhelming the server
    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      const batchPromises = batch.map(recipient =>
        this.sendEmail(recipient, subject, content)
          .then(result => results.successful.push(result))
          .catch(error => results.failed.push(error))
      );

      // Wait for batch to complete before proceeding
      await Promise.all(batchPromises);
      
      // Add delay between batches
      if (i + batchSize < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return results;
  }
}