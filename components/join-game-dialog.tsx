"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { ANIMALS } from "@/lib/game-store"

export function JoinGameDialog() {
  const [code, setCode] = useState("")
  const [username, setUsername] = useState("")
  const [animal, setAnimal] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const joinGame = async () => {
    if (!code || !username || !animal) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)
    setError("")
    
    try {
      const response = await fetch('/api/games/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.toUpperCase(), username, animal })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Store player info in localStorage
        localStorage.setItem('player', JSON.stringify(data.player))
        router.push(`/game/${data.game.id}`)
      } else {
        setError(data.error || "Failed to join game")
      }
    } catch (error) {
      setError("Failed to join game")
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Users className="mr-2 h-4 w-4" />
          Join Game
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join a Game</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="code">Game Code</Label>
            <Input
              id="code"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={6}
            />
          </div>
          
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={15}
            />
          </div>
          
          <div>
            <Label htmlFor="animal">Choose Your Character</Label>
            <Select value={animal} onValueChange={setAnimal}>
              <SelectTrigger>
                <SelectValue placeholder="Select an animal" />
              </SelectTrigger>
              <SelectContent>
                {ANIMALS.map((emoji, index) => (
                  <SelectItem key={index} value={emoji}>
                    {emoji} Animal {index + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          
          <Button onClick={joinGame} disabled={loading} className="w-full">
            {loading ? "Joining..." : "Join Game"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}