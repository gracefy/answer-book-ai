import clsx from 'clsx'
import { HistoryEntry } from '@/types/historyEntry'
import { Button } from '@/components/ui/Button'
import { ChevronDown } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible'
import { Card, CardContent } from '@/components/ui/Card'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/AlertDialog'

type HistoryCardProps = {
  item: HistoryEntry
  onDelete: (id: string) => void
}

export default function HistoryCard({
  item,
  onDelete,
}: HistoryCardProps & {
  item: HistoryEntry
  onDelete: (id: string) => void
}) {
  return (
    <div className="w-md rounded-xl bg-transparent p-4 md:w-2xl">
      <Card
        className={clsx(
          'border-muted w-full border bg-white/10 shadow-md backdrop-blur-md',
          'transition-colors duration-200 ease-in-out hover:bg-white/20'
        )}
      >
        <CardContent className="space-y-2 p-6">
          <div className="flex items-center justify-between text-xs text-indigo-200">
            <span>{new Date(item.createdAt).toLocaleString()}</span>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-gray-400 hover:text-gray-500"
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                <p>Are you sure you want to delete this entry?</p>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDelete(item.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <Collapsible>
            <CollapsibleTrigger className="text-left text-sm font-semibold text-indigo-300 hover:underline">
              {item.question}
              <ChevronDown className="ml-2 inline-block h-4 w-4 text-indigo-300" />
            </CollapsibleTrigger>
            <CollapsibleContent
              className="leading-ralaxed pt-2 text-sm whitespace-pre-line text-indigo-200"
              style={{
                transitionProperty: 'height, opacity',
              }}
            >
              {item.answer}
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  )
}
