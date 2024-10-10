import React, { useState } from 'react'
import { Bold, Italic, Underline } from 'lucide-react'

type ToggleOption = 'bold' | 'italic' | 'underline'

interface ToggleButtonProps {
  option: ToggleOption
  isActive: boolean
  onClick: () => void
  icon: React.ElementType
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ option, isActive, onClick, icon: Icon }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-md transition-colors ${
        isActive ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
      }`}
      aria-pressed={isActive}
      aria-label={`Toggle ${option}`}
    >
      <Icon className="w-5 h-5" />
    </button>
  )
}

export default function BoldItalicUnderline() {
  const [activeToggles, setActiveToggles] = useState<Set<ToggleOption>>(new Set())

  const toggleOption = (option: ToggleOption) => {
    setActiveToggles((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(option)) {
        newSet.delete(option)
      } else {
        newSet.add(option)
      }
      return newSet
    })
  }

  return (
    <div className="flex space-x-2 p-4 bg-gray-100 rounded-lg">
      <ToggleButton
        option="bold"
        isActive={activeToggles.has('bold')}
        onClick={() => toggleOption('bold')}
        icon={Bold}
      />
      <ToggleButton
        option="italic"
        isActive={activeToggles.has('italic')}
        onClick={() => toggleOption('italic')}
        icon={Italic}
      />
      <ToggleButton
        option="underline"
        isActive={activeToggles.has('underline')}
        onClick={() => toggleOption('underline')}
        icon={Underline}
      />
    </div>
  )
}