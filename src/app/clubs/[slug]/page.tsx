import { notFound } from "next/navigation"
import { Metadata } from "next"
import Image from "next/image"
import { mockClubs } from "@/data/mock-clubs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Globe, Instagram, Linkedin, Mail, MapPin, Users } from "lucide-react"
import { ClubEvents } from "@/components/clubs/club-events"
import { ClubMembers } from "@/components/clubs/club-members"
import { ClubGallery } from "@/components/clubs/club-gallery"
import { ClubAnnouncements } from "@/components/clubs/club-announcements"

interface ClubPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ClubPageProps): Promise<Metadata> {
  const clubParams = await params
  const club = mockClubs.find((c) => c.slug === clubParams.slug)
  if (!club) return {}

  return {
    title: club.name,
    description: club.description,
  }
}

export default async function ClubPage({ params }: ClubPageProps) {
  const clubParams = await params
  const club = mockClubs.find((c) => c.slug === clubParams.slug)
  if (!club) return notFound()

  return (
    <div className="container py-8 space-y-8">
      {/* Hero Section */}
      <div className="relative h-[300px] rounded-lg overflow-hidden">
        <Image
          src={club.coverImage}
          alt={club.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Club Info */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={club.logo} alt={club.name} />
              <AvatarFallback>{club.name[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{club.name}</h1>
              <Badge variant="secondary">{club.category}</Badge>
              <p className="text-muted-foreground">{club.description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>{club.members.length} members</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              <span>{club.events.length} events</span>
            </div>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="w-full md:w-72 space-y-4">
          <Button className="w-full">Join Club</Button>
          <div className="space-y-2">
            <h3 className="font-semibold">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${club.contact.email}`} className="text-primary">
                  {club.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{club.contact.location}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Social Links</h3>
            <div className="flex gap-2">
              {club.socialLinks.website && (
                <Button variant="outline" size="icon" asChild>
                  <a href={club.socialLinks.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {club.socialLinks.instagram && (
                <Button variant="outline" size="icon" asChild>
                  <a href={club.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {club.socialLinks.linkedin && (
                <Button variant="outline" size="icon" asChild>
                  <a href={club.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="events" className="space-y-6">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>
        <TabsContent value="events">
          <ClubEvents events={club.events} />
        </TabsContent>
        <TabsContent value="members">
          <ClubMembers members={club.members} />
        </TabsContent>
        <TabsContent value="gallery">
          <ClubGallery gallery={club.gallery} />
        </TabsContent>
        <TabsContent value="announcements">
          <ClubAnnouncements announcements={club.announcements} />
        </TabsContent>
      </Tabs>
    </div>
  )
} 