"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  MessageSquare,
  Plus,
  Search,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Brain,
  BookOpen,
  TrendingUp,
  MoreHorizontal,
  Trash2,
  Pencil,
  History,
  ChevronDown,
} from "lucide-react"
import { TaNoteLogo } from "@/components/tanote-logo"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const conversations = [
  { id: "1", title: "Équations du second degré", subject: "Maths", date: "Aujourd'hui" },
  { id: "2", title: "La mitose cellulaire", subject: "SVT", date: "Aujourd'hui" },
  { id: "3", title: "Réactions d'oxydoréduction", subject: "Chimie", date: "Hier" },
  { id: "4", title: "Analyse de texte - Molière", subject: "Français", date: "Hier" },
  { id: "5", title: "Théorème de Pythagore", subject: "Maths", date: "Il y a 3 jours" },
  { id: "6", title: "La Seconde Guerre mondiale", subject: "Histoire", date: "Il y a 5 jours" },
]

const navItems = [
  { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { label: "Diagnostic", href: "/dashboard/diagnostic", icon: Brain },
  { label: "Exercices", href: "/dashboard/exercises", icon: BookOpen },
  { label: "Progression", href: "/dashboard/progress", icon: TrendingUp },
]

interface ConversationSidebarProps {
  isOpen?: boolean
  onClose?: () => void
  onCollapseChange?: (collapsed: boolean) => void
}

export function ConversationSidebar({ isOpen = true, onClose, onCollapseChange }: ConversationSidebarProps) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState("")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(true)

  const filteredConversations = conversations.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const groupedConversations = filteredConversations.reduce(
    (acc, conv) => {
      if (!acc[conv.date]) acc[conv.date] = []
      acc[conv.date].push(conv)
      return acc
    },
    {} as Record<string, typeof conversations>,
  )

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed)
    onCollapseChange?.(collapsed)
  }

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-muted/30 border-r border-border flex flex-col transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          !isOpen && "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "h-14 flex items-center border-b border-border",
            isCollapsed ? "justify-center px-2" : "justify-between px-3",
          )}
        >
          {isCollapsed ? (
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
          ) : (
            <TaNoteLogo size="sm" />
          )}
          {!isCollapsed && (
            <Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden" onClick={onClose}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className={cn("p-2 flex", isCollapsed ? "justify-center" : "justify-end")}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 hidden lg:flex"
                onClick={() => handleCollapse(!isCollapsed)}
              >
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{isCollapsed ? "Agrandir" : "Réduire"}</TooltipContent>
          </Tooltip>
        </div>

        {/* New Chat Button */}
        <div className={cn("px-2", isCollapsed ? "flex justify-center" : "px-3")}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9 bg-background">
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Nouvelle conversation</TooltipContent>
            </Tooltip>
          ) : (
            <Button className="w-full justify-start gap-2 bg-transparent" variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              Nouvelle conversation
            </Button>
          )}
        </div>

        {/* Search - Hidden when collapsed */}
        {!isCollapsed && (
          <div className="px-3 py-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-sm bg-background"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className={cn("py-2", isCollapsed ? "px-2" : "px-3")}>
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-center h-9 w-9 rounded-lg transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-3 w-3" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* History Section */}
        <div className="flex-1 overflow-y-auto px-2">
          {isCollapsed ? (
            <div className="flex justify-center py-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <History className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Historique</TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <Collapsible open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between px-2 py-1 h-7 mb-1">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <History className="h-3 w-3" />
                    Historique
                  </span>
                  <ChevronDown className={cn("h-3 w-3 transition-transform", isHistoryOpen && "rotate-180")} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {Object.entries(groupedConversations).map(([date, convs]) => (
                  <Collapsible key={date} defaultOpen={date === "Aujourd'hui"}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between px-2 py-0.5 h-6 text-[10px] text-muted-foreground hover:text-foreground"
                      >
                        {date}
                        <ChevronDown className="h-2.5 w-2.5" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="space-y-0.5 ml-1">
                        {convs.map((conv) => (
                          <div
                            key={conv.id}
                            className="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer transition-colors"
                          >
                            <MessageSquare className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs truncate">{conv.title}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Pencil className="h-3 w-3 mr-2" />
                                  Renommer
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-3 w-3 mr-2" />
                                  Supprimer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CollapsibleContent>
            </Collapsible>
          )}
        </div>

        {/* User Section */}
        <div className={cn("p-2 border-t border-border", isCollapsed ? "flex justify-center" : "")}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">KY</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right">Kouamé Yao</TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted cursor-pointer transition-colors">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">KY</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">Kouamé Yao</p>
                <p className="text-[10px] text-muted-foreground">Terminale D</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="h-3 w-3 mr-2" />
                      Paramètres
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-destructive">
                    <Link href="/auth/login">
                      <LogOut className="h-3 w-3 mr-2" />
                      Déconnexion
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}
