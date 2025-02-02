export const mockMailers = [
    {
      id: 1,
      name: "Welcome Email",
      subject: "Welcome to Our Platform! 🎉",
      content: `Dear {{name}},
  
  Welcome to our platform! We're excited to have you join our community.
  
  Here are a few things you can do to get started:
  - Complete your profile
  - Explore our features
  - Connect with others
  
  Best regards,
  The Team`
    },
    {
      id: 2,
      name: "Monthly Newsletter",
      subject: "Your Monthly Update - What's New",
      content: `Hi {{name}},
  
  Here are this month's exciting updates:
  - New feature releases
  - Community highlights
  - Upcoming events
  
  Stay tuned for more!`
    },
    {
      id: 3,
      name: "Product Update",
      subject: "New Features Available! 🚀",
      content: `Hello {{name}},
  
  We've added some exciting new features to enhance your experience:
  - Feature 1: Description
  - Feature 2: Description
  - Feature 3: Description
  
  Try them out and let us know what you think!`
    }
  ];
  
  export const mockLists = [
    {
      id: 1,
      name: "All Subscribers",
      emails: [
        { id: 1, name: "John Doe", email: "ninadbaruah@gmail.com" },
        { id: 2, name: "Jane Smith", email: "ninadbaruahh@gmail.com" },
        { id: 3, name: "Bob Wilson", email: "ninadbaruaah@gmail.com" }
      ]
    },
    {
      id: 2,
      name: "Premium Users",
      emails: [
        { id: 4, name: "Alice Johnson", email: "alice@example.com" },
        { id: 5, name: "Charlie Brown", email: "charlie@example.com" }
      ]
    },
    {
      id: 3,
      name: "New Users",
      emails: [
        { id: 6, name: "Diana Prince", email: "diana@example.com" },
        { id: 7, name: "Steve Rogers", email: "steve@example.com" },
        { id: 8, name: "Tony Stark", email: "tony@example.com" }
      ]
    }
  ];
  