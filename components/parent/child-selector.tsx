"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Child {
  id: string
  name: string
  class: string
  avatar?: string
}

interface ChildSelectorProps {
  children: Child[]
  selectedChildId: string
  onSelect: (childId: string) => void
}

export function ChildSelector({ children, selectedChildId, onSelect }: ChildSelectorProps) {
  const selectedChild = children.find((c) => c.id === selectedChildId)

  return (
    <Select value={selectedChildId} onValueChange={onSelect}>
      <SelectTrigger className="w-full sm:w-[250px] h-12">
        <SelectValue>
          {selectedChild && (
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={selectedChild.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {selectedChild.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium">{selectedChild.name}</p>
              </div>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {children.map((child) => (
          <SelectItem key={child.id} value={child.id}>
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={child.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {child.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{child.name}</p>
                <p className="text-xs text-muted-foreground">{child.class}</p>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
