"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Send, Paperclip, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

const conversations = [
  {
    id: 1,
    name: "Mme. Koné",
    role: "Professeur de Mathématiques",
    avatar: "MK",
    lastMessage: "Les résultats de Kouamé sont excellents ce trimestre",
    time: "Il y a 10 min",
    unread: 2,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "M. Diallo",
    role: "Directeur d'école",
    avatar: "MD",
    lastMessage: "Réunion parent-professeur le 20 mars",
    time: "Il y a 1h",
    unread: 0,
    color: "from-purple-500 to-pink-500",
  },
]

export default function ParentMessagesPage() {
  const [selectedConv, setSelectedConv] = useState(conversations[0])
  const [message, setMessage] = useState("")

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>

      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        <Card className="col-span-1">
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Rechercher..." className="pl-10" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={cn(
                    "w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors",
                    selectedConv.id === conv.id && "bg-blue-50",
                  )}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className={cn("bg-gradient-to-br text-white font-semibold", conv.color)}>
                      {conv.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-gray-900 text-sm">{conv.name}</p>
                      <span className="text-xs text-gray-500">{conv.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{conv.role}</p>
                    <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                      {conv.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={cn("bg-gradient-to-br text-white font-semibold", selectedConv.color)}>
                    {selectedConv.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">{selectedConv.name}</p>
                  <p className="text-xs text-gray-500">{selectedConv.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 max-w-[70%]">
                  <p className="text-sm text-gray-900">Les résultats de Kouamé sont excellents ce trimestre</p>
                  <span className="text-xs text-gray-500 mt-1 block">10:30</span>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Écrire un message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
