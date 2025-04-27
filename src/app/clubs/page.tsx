import { Metadata } from "next"
import { mockClubs } from "@/data/mock-clubs"
import { ClubCard } from "@/components/clubs/club-card"
import { ClubsHeader } from "@/components/clubs/clubs-header"

export const metadata: Metadata = {
  title: "Clubs & Societies",
  description: "Discover and join various clubs and societies at your university",
}

export default function ClubsPage() {
  return (
    <div className="container py-8 space-y-8">
      <ClubsHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  )
} 