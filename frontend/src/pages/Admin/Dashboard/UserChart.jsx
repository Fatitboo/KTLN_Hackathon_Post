import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'



export default function UserChart({sk, cor}) {
	const data = [
		{ name: 'Seeker', value: sk??40 },
		{ name: 'Organizer', value: cor??30 },
		
	]
	
	const RADIAN = Math.PI / 180
	const COLORS = ['#00C49F', '#FFBB28']
	
	const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5
		const x = cx + radius * Math.cos(-midAngle * RADIAN)
		const y = cy + radius * Math.sin(-midAngle * RADIAN)
	
		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		)
	}
	return (
		<div className="w-full h-full grid grid-rows-8 bg-white pt-3 px-3 rounded-sm ">
			<div className="text-gray-700 font-bold mb-5 pl-2 pt-3 row-span-1">User Profile</div>
			<div className="w-full  flex-1 text-xs row-span-5">
				<ResponsiveContainer width="100%" height="80%">
					<PieChart width='100%' height='100%'>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							labelLine={false}
							label={renderCustomizedLabel}
							outerRadius={105}
							fill="#8884d8"
							dataKey="value"
						>
							{data.map((_, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
			<div className='row-span-2 ml-4'>
				<div className='flex mb-3'>
					<div>Number of Seekers: </div>
					<div>{sk}</div>
				</div>
				<div className='flex'>
					<div>Number of Organizers: </div>
					<div>{cor}</div>
				</div>
			</div>
		</div>
	)
}