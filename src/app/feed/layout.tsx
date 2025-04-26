'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Filter,
  TrendingUp,
  Clock,
  Star,
  Users,
  Megaphone,
  Search,
  MapPin,
  SlidersHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const feedTabs = [
  {
    title: 'All Posts',
    href: '/feed',
    icon: TrendingUp,
  },
  {
    title: 'Announcements',
    href: '/feed/announcements',
    icon: Megaphone,
  },
  {
    title: 'Lost & Found',
    href: '/feed/lost-found',
    icon: Search,
  },
  {
    title: 'Club Events',
    href: '/feed/events',
    icon: Users,
  },
  {
    title: 'Campus Updates',
    href: '/feed/campus',
    icon: MapPin,
  },
];

const sortOptions = [
  { label: 'Latest', value: 'latest', icon: Clock },
  { label: 'Popular', value: 'popular', icon: TrendingUp },
  { label: 'Most Liked', value: 'most-liked', icon: Star },
];

const categoryFilters = [
  { label: 'Academic', value: 'academic' },
  { label: 'Sports', value: 'sports' },
  { label: 'Cultural', value: 'cultural' },
  { label: 'Technical', value: 'technical' },
  { label: 'Others', value: 'others' },
];

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const pathname = usePathname();
  const [sortBy, setSortBy] = useState('latest');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Feed Navigation */}
      <div className="sticky top-0 z-30 bg-white border-b">
        <div className="container max-w-7xl mx-auto">
          <div className="py-4 space-y-4 md:space-y-0">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="w-full md:w-auto md:flex-1 md:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    className="pl-9 w-full"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0">
                      <SlidersHorizontal className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Feed Filters</SheetTitle>
                      <SheetDescription>
                        Customize your feed by applying filters.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">Sort By</h3>
                        <div className="space-y-2">
                          {sortOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                              <Button
                                key={option.value}
                                variant={sortBy === option.value ? "default" : "ghost"}
                                className="w-full justify-start"
                                onClick={() => setSortBy(option.value)}
                              >
                                <Icon className="h-4 w-4 mr-2" />
                                {option.label}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-3">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                          {categoryFilters.map((category) => (
                            <Button
                              key={category.value}
                              variant={selectedCategories.includes(category.value) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleCategory(category.value)}
                            >
                              {category.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              <nav className="flex space-x-1 min-w-max">
                {feedTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = pathname === tab.href;
                  return (
                    <Link key={tab.href} href={tab.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "relative rounded-none whitespace-nowrap",
                          isActive && "text-primary font-medium"
                        )}
                      >
                        <Icon className="h-4 w-4 mr-2 shrink-0" />
                        {tab.title}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          />
                        )}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Feed Content */}
      <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6">
          {/* Quick Links - Left Sidebar */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-[5.5rem] space-y-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    My Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Saved Posts
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    My Clubs
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="lg:col-span-7">
            {children}
          </main>

          {/* Upcoming Events - Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[5.5rem] space-y-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium mb-3">Upcoming Events</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium">Tech Fest 2024</p>
                    <p className="text-muted-foreground">March 15, 2024</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Cultural Night</p>
                    <p className="text-muted-foreground">March 20, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 