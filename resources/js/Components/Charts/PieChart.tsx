import React from 'react';

interface PieChartData {
    name: string;
    value: number;
    percentage: number;
}

interface PieChartProps {
    data: PieChartData[];
    title: string;
    colors?: string[];
}

const COLORS = [
    '#10b981', '#059669', '#34d399', '#6ee7b7', '#a7f3d0',
    '#065f46', '#022c22', '#111827', '#ffffff', '#000000'
];

export default function PieChart({ data, title, colors = COLORS }: PieChartProps) {
    if (data.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">{title}</h3>
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No data available</p>
            </div>
        );
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -Math.PI / 2;

    const slices = data.map((item, index) => {
        const sliceAngle = (item.value / total) * Math.PI * 2;
        const startAngle = currentAngle;
        const endAngle = currentAngle + sliceAngle;

        const x1 = 50 + 40 * Math.cos(startAngle);
        const y1 = 50 + 40 * Math.sin(startAngle);
        const x2 = 50 + 40 * Math.cos(endAngle);
        const y2 = 50 + 40 * Math.sin(endAngle);

        const largeArc = sliceAngle > Math.PI ? 1 : 0;
        const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`;

        currentAngle = endAngle;

        return (
            <path
                key={index}
                d={pathData}
                fill={colors[index % colors.length]}
                stroke="white"
                strokeWidth="2"
            />
        );
    });

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">{title}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie Chart */}
                <div className="flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-40 h-40">
                        {slices}
                    </svg>
                </div>

                {/* Legend */}
                <div className="space-y-2 overflow-y-auto max-h-48">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                            <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: colors[index % colors.length] }}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-gray-700 dark:text-gray-300 truncate font-medium">{item.name}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs">
                                    {item.value} ({item.percentage}%)
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
