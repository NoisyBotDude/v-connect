'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { PostCard } from '@/components/feed/post-card';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import mockData from '@/data/mock-feed.json';
import { type Post } from '@/types/feed';

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(mockData.posts);

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
    // In a real app, this would open a share dialog
    toast.success('Share dialog opened!');
  };

  const handleReport = (postId: string) => {
    // In a real app, this would open a report dialog
    toast.success('Report submitted!');
  };

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                🏠 Home Feed
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                📢 Announcements
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                🔍 Lost & Found
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                👥 My Clubs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Chess Tournament</h4>
                <p className="text-sm text-muted-foreground">
                  March 25th, 2 PM
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Graduation Ceremony</h4>
                <p className="text-sm text-muted-foreground">
                  May 15th, 10 AM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Feed */}
        <div className="space-y-6 md:col-span-2">
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
      </div>
    </div>
  );
} 