"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";

const initialData = [
  { date: "Jan", value: 1000 },
  { date: "Feb", value: 1200 },
  { date: "Mar", value: 1100 },
  { date: "Apr", value: 1400 },
  { date: "May", value: 1600 },
  { date: "Jun", value: 1800 },
  { date: "Jul", value: 2000 },
];

interface CustomAxisProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
}

const CustomXAxisTick = ({ x, y, payload }: CustomAxisProps) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="currentColor"
        className="text-xs text-muted-foreground"
      >
        {payload?.value}
      </text>
    </g>
  );
};

const CustomYAxisTick = ({ x, y, payload }: CustomAxisProps) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dx={-25}
        textAnchor="middle"
        fill="currentColor"
        className="text-xs text-muted-foreground"
      >
        ${Number(payload?.value).toLocaleString()}
      </text>
    </g>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      date: string;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload?.[0]) {
    return (
      <div className="bg-card p-3 border rounded-lg shadow-lg">
        <p className="text-sm font-medium">{payload[0].payload.date}</p>
        <p className="text-lg font-bold">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function PerformanceChart() {
  const [data, setData] = useState(initialData.map(item => ({ ...item, value: 0 })));
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(initialData);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Portfolio Performance
          {hoveredValue && (
            <span className="text-lg font-normal animate-fade-in">
              ${hoveredValue.toLocaleString()}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ top: 5, right: 5, bottom: 5, left: 25 }}
              onMouseMove={(e: any) => {
                if (e?.activePayload?.[0]) {
                  setHoveredValue(e.activePayload[0].value);
                }
              }}
              onMouseLeave={() => setHoveredValue(null)}
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date"
                tick={<CustomXAxisTick />}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={<CustomYAxisTick />}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, className: "animate-pulse" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="url(#gradient)"
                strokeWidth={0}
                fill="url(#gradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}