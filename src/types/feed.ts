export interface Author {
  id: string;
  name: string;
  avatar: string;
  role?: string;
  university?: string;
}

export interface Comment {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: Author;
  content: string;
  images?: string[];
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLiked: boolean;
  isAnnouncement?: boolean;
  isLostFound?: boolean;
}

export interface FeedData {
  posts: Post[];
} 