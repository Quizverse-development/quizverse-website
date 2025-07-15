"use client"

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
import { useState } from "react"

export function CreateGameDialog() {
  const [gameName, setGameName] = useState("")
  const [generatedCode, setGeneratedCode] = useState<string | null>(null)

  const handleCreate = () => {
    // TODO: Implement actual game creation logic
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase() // Simple random code
    setGeneratedCode(newCode)
    console.log("Creating game:", gameName, "with code:", newCode)
    // In a real app, you'd make an API call and get a real code
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Game</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Game</DialogTitle>
          <DialogDescription>Give your game a name and share the generated code with others.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gameName" className="text-right">
              Game Name
            </Label>
            <Input
              id="gameName"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., My Awesome Quiz"
            />
          </div>
          {generatedCode && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="gameCodeDisplay" className="text-right">
                Game Code
              </Label>
              <Input id="gameCodeDisplay" value={generatedCode} readOnly className="col-span-3 font-bold text-lg" />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreate} disabled={!gameName}>
            {generatedCode ? "Game Created!" : "Create Game"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
