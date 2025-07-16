"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Home, RotateCcw } from "lucide-react"

export default function MobileHostResultsPage() {
  const params = useParams()
  const router = useRouter()
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`/api/games/${params.id}/leaderboard`)
        const data = await response.json()
        setLeaderboard(data.leaderboard || [])
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error)
      }
    }

    fetchLeaderboard()
  }, [params.id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="container mx-auto max-w-md">
        <div className="text-center mb-6">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-2" />
          <h1 className="text-2xl font-bold">Game Complete!</h1>
          <p className="text-gray-600">Final Results</p>
        </div>
        
        <Card className="shadow-md mb-6">
          <CardHeader>
            <CardTitle>Final Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No players scored</p>
              ) : (
                leaderboard.map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-3 rounded-lg shadow-sm ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300' :
                      index === 1 ? 'bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300' :
                      index === 2 ? 'bg-gradient-to-r from-orange-100 to-orange-200 border border-orange-300' :
                      'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-xl font-bold ${
                        index === 0 ? 'text-yellow-600' :
                        index === 1 ? 'text-gray-600' :
                        index === 2 ? 'text-orange-600' :
                        'text-gray-500'
                      }`}>
                        #{index + 1}
                      </div>
                      <span className="text-2xl">{player.animal}</span>
                      <span className="text-sm font-medium">{player.username}</span>
                    </div>
                    <Badge variant="secondary">
                      {player.score} pts
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => router.push("/mobile")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Host Another Game
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => router.push("/")}
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Desktop Version
          </Button>
        </div>
      </div>
    </div>
  )
}