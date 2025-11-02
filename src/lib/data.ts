export const users = [
  { id: 'user-me', name: 'شما', avatar: 'https://picsum.photos/seed/0/100/100' },
  { id: 'user-1', name: 'سارا رضایی', avatar: 'https://picsum.photos/seed/1/100/100', status: 'online' },
  { id: 'user-2', name: 'علی چن', avatar: 'https://picsum.photos/seed/2/100/100', status: 'offline' },
  { id: 'user-3', name: 'ماریا گارسیا', avatar: 'https://picsum.photos/seed/3/100/100', status: 'online' },
  { id: 'user-4', name: 'دیوید کیم', avatar: 'https://picsum.photos/seed/4/100/100', status: 'offline' },
  { id: 'user-5', name: 'امیلی رودریگز', avatar: 'https://picsum.photos/seed/5/100/100', status: 'online' },
  { id: 'user-6', name: 'بن کارتر', avatar: 'https://picsum.photos/seed/6/100/100', status: 'offline' },
];

export const chats = [
  {
    id: 'chat-1',
    userId: 'user-1',
    unreadCount: 2,
    messages: [
      { id: 'msg-1-1', text: 'سلام، ویژگی‌های جدید Next.js 15 رو دیدی؟', senderId: 'user-1', timestamp: '۱۰:۴۰' },
      { id: 'msg-1-2', text: 'آره، Server Actions خیلی خوب به نظر میان!', senderId: 'user-me', timestamp: '۱۰:۴۱' },
      { id: 'msg-1-3', text: 'دقیقا! من هیجان‌زده‌ام که تو پروژه‌مون امتحانشون کنم.', senderId: 'user-1', timestamp: '۱۰:۴۱' },
      { id: 'msg-1-4', text: 'کامپایلر جدید هم فوق‌العاده‌ست.', senderId: 'user-1', timestamp: '۱۰:۴۲' },
    ]
  },
  {
    id: 'chat-2',
    userId: 'user-2',
    unreadCount: 0,
    messages: [
      { id: 'msg-2-1', text: 'آخرین تغییرات رو به شاخه `dev` پوش کردم.', senderId: 'user-me', timestamp: 'دیروز' },
      { id: 'msg-2-2', text: 'باشه. بعد از ظهر بررسیشون می‌کنم.', senderId: 'user-2', timestamp: 'دیروز' },
    ]
  },
  {
    id: 'chat-3',
    userId: 'user-3',
    unreadCount: 0,
    messages: [
      { id: 'msg-3-1', text: 'میتونی تو یه باگ CSS کمکم کنی؟ فلکس‌باکسم عجیب رفتار می‌کنه.', senderId: 'user-3', timestamp: 'دیروز' },
      { id: 'msg-3-2', text: 'حتما، قطعه کد رو برام بفرست.', senderId: 'user-me', timestamp: 'دیروز' },
    ]
  },
  {
    id: 'chat-4',
    userId: 'user-4',
    unreadCount: 1,
    messages: [
      { id: 'msg-4-1', text: 'ناهار امروز؟', senderId: 'user-4', timestamp: '۱۲:۳۰' },
    ]
  },
    {
    id: 'chat-5',
    userId: 'user-5',
    unreadCount: 0,
    messages: [
      { id: 'msg-5-1', text: 'طرح جدید داشبورد تایید شد.', senderId: 'user-5', timestamp: 'دوشنبه' },
       { id: 'msg-5-2', text: 'عالی! پیاده‌سازیش رو شروع می‌کنم.', senderId: 'user-me', timestamp: 'دوشنبه' },
    ]
  },
  {
    id: 'chat-6',
    userId: 'user-6',
    unreadCount: 0,
    messages: [
      { id: 'msg-6-1', text: 'ادغام Genkit چطور پیش میره؟', senderId: 'user-me', timestamp: 'سه‌شنبه' },
      { id: 'msg-6-2', text: 'تقریبا تمومه، فقط دارم تست‌ها رو تموم می‌کنم.', senderId: 'user-6', timestamp: 'سه‌شنبه' },
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
