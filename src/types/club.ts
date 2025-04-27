export type ClubRole = 'admin' | 'moderator' | 'member';

export type ClubTemplate = 'default' | 'minimal' | 'modern' | 'creative';

export interface ClubMember {
  id: string;
  name: string;
  avatar: string;
  role: ClubRole;
  joinedAt: string;
  department?: string;
  year?: number;
}

export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  image?: string;
  registrationLink?: string;
  registrationDeadline?: string;
  attendees: number;
  maxAttendees?: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface ClubAchievement {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
}

export interface ClubGalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  type: 'image' | 'video';
  date: string;
  eventId?: string;
}

export interface ClubAnnouncement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: ClubRole;
  };
  priority: 'low' | 'medium' | 'high';
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface Club {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  coverImage: string;
  template: ClubTemplate;
  category: string;
  established: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  contact: {
    email: string;
    phone?: string;
    location?: string;
  };
  members: ClubMember[];
  events: ClubEvent[];
  achievements: ClubAchievement[];
  gallery: ClubGalleryItem[];
  announcements: ClubAnnouncement[];
  features: {
    enableEvents: boolean;
    enableGallery: boolean;
    enableAnnouncements: boolean;
    enableMassMessage: boolean;
    enableRegistration: boolean;
  };
} 