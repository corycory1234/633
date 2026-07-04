export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export const CONTACTS: Contact[] = [
  { id: '1',  name: 'Alex Lin',    phone: '+886 912 345 678', email: 'alex.lin@gmail.com' },
  { id: '2',  name: 'Betty Chen',  phone: '+886 923 456 789', email: 'betty.chen@icloud.com' },
  { id: '3',  name: 'Carlos Wang', phone: '+886 934 567 890', email: 'carlos.wang@outlook.com' },
  { id: '4',  name: 'Diana Huang', phone: '+886 945 678 901', email: 'diana.huang@gmail.com' },
  { id: '5',  name: 'Eric Wu',     phone: '+886 956 789 012', email: 'eric.wu@gmail.com' },
  { id: '6',  name: 'Fiona Zhang', phone: '+886 967 890 123', email: 'fiona.z@me.com' },
  { id: '7',  name: 'Grace Liu',   phone: '+886 978 901 234', email: 'grace.liu@gmail.com' },
  { id: '8',  name: 'Henry Ho',    phone: '+886 989 012 345', email: 'henry.ho@icloud.com' },
  { id: '9',  name: 'Iris Yang',   phone: '+886 900 123 456', email: 'iris.yang@gmail.com' },
  { id: '10', name: 'Jason Chou',  phone: '+886 911 234 567', email: 'jason.chou@gmail.com' },
  { id: '11', name: 'Karen Lee',   phone: '+886 922 345 678', email: 'karen.lee@outlook.com' },
  { id: '12', name: 'Liam Chang',  phone: '+886 933 456 789', email: 'liam.chang@gmail.com' },
];

const AVATAR_PALETTE = ['#0A84FF', '#30D158', '#FF9F0A', '#FF375F', '#BF5AF2', '#5E5CE6'];

export function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name[0].toUpperCase();
}

export function getContactSections(): { title: string; data: Contact[] }[] {
  const sorted = [...CONTACTS].sort((a, b) => a.name.localeCompare(b.name));
  const map = new Map<string, Contact[]>();
  for (const contact of sorted) {
    const letter = contact.name[0].toUpperCase();
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(contact);
  }
  return Array.from(map.entries()).map(([title, data]) => ({ title, data }));
}

export function getContactById(id: string): Contact | undefined {
  return CONTACTS.find(c => c.id === id);
}
