import { useState, useEffect } from 'react'

let listeners = []
let toastsState = []

function notifyListeners() {
  listeners.forEach(listener => listener(toastsState))
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function toast({ ...props }) {
  const id = generateId()
  const dismiss = () => {
    toastsState = toastsState.filter(t => t.id !== id)
    notifyListeners()
  }
  const update = (newProps) => {
    toastsState = toastsState.map(t => t.id === id ? { ...t, ...newProps } : t)
    notifyListeners()
  }

  toastsState = [
    { ...props, id, dismiss, update },
    ...toastsState,
  ].slice(0, 1)
  notifyListeners()

  return { id, dismiss, update }
}

export function useToast() {
  const [state, setState] = useState(toastsState)

  useEffect(() => {
    listeners.push(setState)
    return () => { listeners = listeners.filter(l => l !== setState) }
  }, [])

  useEffect(() => {
    const timeouts = []
    state.forEach((t) => {
      if (t.duration === Infinity) return
      const timeout = setTimeout(() => { t.dismiss() }, t.duration || 5000)
      timeouts.push(timeout)
    })
    return () => { timeouts.forEach(timeout => clearTimeout(timeout)) }
  }, [state])

  return { toast, toasts: state }
}
