import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

export interface MacroSlice {
  name: string
  value: number
  color: string
}

interface MacroDonutProps {
  data: MacroSlice[]
  centerLabel?: string
  centerValue?: string
  height?: number
}

function DonutTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; payload: MacroSlice }>
}) {
  if (!active || !payload?.length) return null
  const entry = payload[0]
  return (
    <div className="rounded-xl border border-white/10 bg-ink-850/95 px-3.5 py-2 text-xs shadow-card backdrop-blur-md">
      <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: entry.payload.color }} />
      <span className="text-cream-300">{entry.name}: </span>
      <span className="font-semibold text-cream-100">{entry.value}g</span>
    </div>
  )
}

export function MacroDonut({ data, centerLabel, centerValue, height = 240 }: MacroDonutProps) {
  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="68%"
            outerRadius="92%"
            paddingAngle={3}
            cornerRadius={6}
            stroke="none"
            startAngle={90}
            endAngle={-270}
          >
            {data.map((slice) => (
              <Cell key={slice.name} fill={slice.color} />
            ))}
          </Pie>
          <Tooltip content={<DonutTooltip />} cursor={false} />
        </PieChart>
      </ResponsiveContainer>
      {centerValue && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-display text-3xl font-light text-cream-50">{centerValue}</p>
          {centerLabel && <p className="mt-1 text-xs uppercase tracking-widest text-cream-500">{centerLabel}</p>}
        </div>
      )}
    </div>
  )
}
