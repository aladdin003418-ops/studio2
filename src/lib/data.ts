export const users = [
  { id: 'user-me', name: 'You', avatar: 'https://picsum.photos/seed/0/100/100' },
  { id: 'user-1', name: 'Sarah Lee', avatar: 'https://picsum.photos/seed/1/100/100', status: 'online' },
  { id: 'user-2', name: 'Alex Chen', avatar: 'https://picsum.photos/seed/2/100/100', status: 'offline' },
  { id: 'user-3', name: 'Maria Garcia', avatar: 'https://picsum.photos/seed/3/100/100', status: 'online' },
  { id: 'user-4', name: 'David Kim', avatar: 'https://picsum.photos/seed/4/100/100', status: 'offline' },
  { id: 'user-5', name: 'Emily Rodriguez', avatar: 'https://picsum.photos/seed/5/100/100', status: 'online' },
  { id: 'user-6', name: 'Ben Carter', avatar: 'https://picsum.photos/seed/6/100/100', status: 'offline' },
];

export const chats = [
  {
    id: 'chat-1',
    userId: 'user-1',
    unreadCount: 2,
    messages: [
      { id: 'msg-1-1', text: 'Hey, did you see the new Next.js 15 features?', senderId: 'user-1', timestamp: '10:40 AM' },
      { id: 'msg-1-2', text: 'Yeah, Server Actions are looking pretty sweet!', senderId: 'user-me', timestamp: '10:41 AM' },
      { id: 'msg-1-3', text: 'Totally! I\'m excited to try them out in our project.', senderId: 'user-1', timestamp: '10:41 AM' },
      { id: 'msg-1-4', text: 'Also, the new compiler is a game changer.', senderId: 'user-1', timestamp: '10:42 AM' },
    ]
  },
  {
    id: 'chat-2',
    userId: 'user-2',
    unreadCount: 0,
    messages: [
      { id: 'msg-2-1', text: 'I pushed the latest changes to the `dev` branch.', senderId: 'user-me', timestamp: 'Yesterday' },
      { id: 'msg-2-2', text: 'Got it. I\'ll review them this afternoon.', senderId: 'user-2', timestamp: 'Yesterday' },
    ]
  },
  {
    id: 'chat-3',
    userId: 'user-3',
    unreadCount: 0,
    messages: [
      { id: 'msg-3-1', text: 'Can you help me with a CSS bug? My flexbox is acting weird.', senderId: 'user-3', timestamp: 'Yesterday' },
      { id: 'msg-3-2', text: 'Sure, send me the code snippet.', senderId: 'user-me', timestamp: 'Yesterday' },
    ]
  },
  {
    id: 'chat-4',
    userId: 'user-4',
    unreadCount: 1,
    messages: [
      { id: 'msg-4-1', text: 'Lunch today?', senderId: 'user-4', timestamp: '12:30 PM' },
    ]
  },
    {
    id: 'chat-5',
    userId: 'user-5',
    unreadCount: 0,
    messages: [
      { id: 'msg-5-1', text: 'The new design for the dashboard is approved.', senderId: 'user-5', timestamp: 'Mon' },
       { id: 'msg-5-2', text: 'Great! I will start the implementation.', senderId: 'user-me', timestamp: 'Mon' },
    ]
  },
  {
    id: 'chat-6',
    userId: 'user-6',
    unreadCount: 0,
    messages: [
      { id: 'msg-6-1', text: 'How\'s the Genkit integration going?', senderId: 'user-me', timestamp: 'Tue' },
      { id: 'msg-6-2', text: 'Almost done, just wrapping up the tests.', senderId: 'user-6', timestamp: 'Tue' },
    ]
  },
];

export const getUserById = (id: string) => users.find(user => user.id === id);
export const getChatById = (id: string) => {
    const chat = chats.find(chat => chat.id === id);
    if (!chat) return null;
    const user = getUserById(chat.userId);
    return { ...chat, user };
};
