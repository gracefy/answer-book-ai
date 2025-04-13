import { useState, useEffect } from 'react'

import { ApiResponse } from '@/types/api'

export function useAnswerFlow() {
  const [explanation, setExplanation] = useState('')
  const [loadingExplanation, setLoadingExplanation] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const getExplanation = async (lastQuestion: string, answer: string) => {
    console.log('Getting explanation for:', `Last Question: ${lastQuestion}\n`, `Answer: ${answer}`)

    if (loadingExplanation || explanation) return

    if (!lastQuestion?.trim() || !answer?.trim()) {
      console.warn('Missing question or answer before fetch')
      return
    }

    setLoadingExplanation(true)

    try {
      const res = await fetch('/api/explanation', {
        method: 'POST',
        body: JSON.stringify({ lastQuestion, answer }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) {
        console.error('Server error:', res.statusText)
        setExplanation('The spirits remain silent.')
        return
      }

      const data = await res.json()
      // console.log('Raw explanation response:', data)

      console.log('AI explanation:', data.data)

      setExplanation(data.data || 'The spirits remain silent.')
    } catch (error) {
      console.error('Error fetching explanation:', error)
      setExplanation('The spirits remain silent.')
    } finally {
      setLoadingExplanation(false)
    }
  }

  return {
    explanation,
    loadingExplanation,
    expanded,
    setExpanded,
    setExplanation,
    getExplanation,
  }
}
