import type { Metadata } from 'next'
import HistorySection from './HistorySection'

export const metadata: Metadata = {
  title: 'AnswerBook – History',
  description: 'View your past questions and answers.',
}

export default function HistoryPage() {
  return <HistorySection />
}
