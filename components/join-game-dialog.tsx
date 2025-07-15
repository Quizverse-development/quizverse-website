"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function JoinGameDialog() {
  const [gameCode, setGameCode] = useState("")

  const handleJoin = () => {
    // TODO: Implement actual game joining logic with gameCode
    console.log("Joining game with code:", gameCode)
    alert(`Attempting to join game: ${gameCode}`)
    // In a real app, you'd likely redirect or make an API call
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Join Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join a Game</DialogTitle>
          <DialogDescription>Enter the game code provided by your host to join a game.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gameCode" className="text-right">
              Game Code
            </Label>
            <Input
              id="gameCode"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
              className="col-span-3"
              placeholder="e.g., ABC123"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleJoin}>
            Join Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
