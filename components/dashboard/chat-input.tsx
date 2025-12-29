"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUp, Mic, Plus, Paperclip, ImageIcon, Camera, FileText, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ChatInputProps {
  onSend?: (message: string) => void
  placeholder?: string
}

export function ChatInput({ onSend, placeholder = "Pose ta question ou demande de l'aide..." }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [message])

  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-full">
      <div className="relative bg-background border-2 border-border rounded-2xl shadow-sm hover:border-primary/50 hover:shadow-md transition-all focus-within:border-primary focus-within:shadow-md">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="w-full resize-none bg-transparent px-14 py-4 text-base placeholder:text-muted-foreground focus:outline-none min-h-[56px]"
        />

        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Plus className="h-5 w-5" />
                <span className="sr-only">Options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>
                <Paperclip className="h-4 w-4 mr-2" />
                Joindre un fichier
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ImageIcon className="h-4 w-4 mr-2" />
                Ajouter une image
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Camera className="h-4 w-4 mr-2" />
                Prendre une photo
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                Document PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link2 className="h-4 w-4 mr-2" />
                Coller un lien
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Send / Voice button */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {message.trim() ? (
            <Button
              type="button"
              onClick={handleSend}
              size="icon"
              className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
            >
              <ArrowUp className="h-4 w-4" />
              <span className="sr-only">Envoyer</span>
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Mic className="h-5 w-5" />
              <span className="sr-only">Message vocal</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
