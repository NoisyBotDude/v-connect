'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { PostCard } from '@/components/feed/post-card';
import mockData from '@/data/mock-feed.json';
import { type Post } from '@/types/feed';

export default function AnnouncementsPage() {
  const [posts, setPosts] = useState<Post[]>(
    mockData.posts.filter((post) => post.isAnnouncement)
  );

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
    toast.success('Post liked!');
  };

  const handleComment = (postId: string, comment: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `c${post.comments.length + 1}`,
                  author: {
                    id: 'current-user',
                    name: 'Current User',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
                  },
                  content: comment,
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : post
      )
    );
    toast.success('Comment added!');
  };

  const handleShare = (postId: string) => {
    toast.success('Share dialog opened!');
  };

  const handleReport = (postId: string) => {
    toast.success('Report submitted!');
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">No Announcements</h2>
        <p className="text-muted-foreground">
          There are no announcements at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onReport={handleReport}
        />
      ))}
    </div>
  );
} 