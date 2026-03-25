'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { SlidersHorizontal, Check } from 'lucide-react'

const options = [
  { label: 'Newest first', value: 'newest', group: 'Date' },
  { label: 'Oldest first', value: 'oldest', group: 'Date' },
  { label: 'A → Z', value: 'az', group: 'Title' },
  { label: 'Z → A', value: 'za', group: 'Title' },
]

export default function SortFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = searchParams.get('sort') ?? 'newest'

  const select = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    router.push(`?${params.toString()}`)
    setOpen(false)
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 h-9 px-4 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
      >
        <SlidersHorizontal size={15} />
        Sort
        {current !== 'newest' && (
          <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">1</span>
        )}
      </button>

      {open && (
        <div className="absolute top-11 left-0 z-10 w-48 bg-white border border-gray-200 rounded-xl overflow-hidden">
          <p className="px-3 pt-3 pb-1 text-xs text-gray-400 uppercase tracking-wide">Sort by date</p>
          {options.filter(o => o.group === 'Date').map(o => (
            <button
              key={o.value}
              onClick={() => select(o.value)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-gray-50"
            >
              <span className={current === o.value ? 'text-blue-600 font-medium' : ''}>{o.label}</span>
              {current === o.value && <Check size={14} className="text-blue-600" />}
            </button>
          ))}
          <div className="border-t border-gray-100 my-1" />
          <p className="px-3 pt-1 pb-1 text-xs text-gray-400 uppercase tracking-wide">Sort by title</p>
          {options.filter(o => o.group === 'Title').map(o => (
            <button
              key={o.value}
              onClick={() => select(o.value)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-gray-50"
            >
              <span className={current === o.value ? 'text-blue-600 font-medium' : ''}>{o.label}</span>
              {current === o.value && <Check size={14} className="text-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}