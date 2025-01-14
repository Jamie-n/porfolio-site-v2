export default function ProgressBar({ barText, percentage }: { barText: string, percentage: number }) {

  return (
    <div>
      <div className="mb-1 text-base font-medium dark:text-white">{barText}</div>
      <div className="flex items-center gap-5">
        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
          <div className="bg-red-500 h-1.5 rounded-full dark:bg-blue-500" style={{ width: `${percentage}%` }} />
        </div>
        <div className="mb-1 text-base font-medium dark:text-white">{percentage / 10}/10</div>
      </div>
    </div>
  )
}
