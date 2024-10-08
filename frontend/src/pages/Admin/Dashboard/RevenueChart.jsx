import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function RevenueChart({ data }) {
    // const data = [
    //     {
    //         name: '1',
    //         uv: 400,
    //     },
    //     {
    //         name: '2',
    //         uv: 300,
    //     },
    //     {
    //         name: '3',
    //         uv: 200,
    //     },
    //     {
    //         name: '4',
    //         uv: 28,
    //     },
    //     {
    //         name: '5',
    //         uv: 10,
    //     },
    //     {
    //         name: '6',
    //         uv: 0,
    //     },
    //     {
    //         name: '7',
    //         uv: 390,
    //     },
    //     {
    //         name: '8',
    //         uv: 400,
    //     },
    //     {
    //         name: '9',
    //         uv: 300,
    //     },
    //     {
    //         name: '10',
    //         uv: 200,
    //     },
    //     {
    //         name: '11',
    //         uv: 280,
    //     },
    //     {
    //         name: '12',
    //         uv: 190,
    //     },
    //     {
    //         name: '13',
    //         uv: 0,
    //     },
    //     {
    //         name: '14',
    //         uv: 340,
    //     },
    //     {
    //         name: '15',
    //         uv: 400,
    //     },
    //     {
    //         name:'16',
    //         uv: 300,
    //     },
    //     {
    //         name: '17',
    //         uv: 200,
    //     },
    //     {
    //         name: '18',
    //         uv: 270,
    //     },
    //     {
    //         name: '19',
    //         uv: 890,
    //     },
    //     {
    //         name: '20',
    //         uv: 0,
    //     },
    //     {
    //         name: '21',
    //         uv: 340,
    //     },
    //     {
    //         name: '22',
    //         uv: 400,
    //     },
    //     {
    //         name: '23',
    //         uv: 28,
    //     },
    //     {
    //         name: '24',
    //         uv: 200,
    //     },
    //     {
    //         name: '25',
    //         uv: 280,
    //     },
    //     {
    //         name: '26',
    //         uv: 190,
    //     },
    //     {
    //         name: '27',
    //         uv: 0,
    //     },
    //     {
    //         name: '28',
    //         uv: 340,
    //     },
    //     {
    //         name: '29',
    //         uv: 0,
    //     },
    //     {
    //         name: '30',
    //         uv: 340,
    //     },
    // ];
    return (
        <div className='h-[500px] w-full'>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={'100%'}
                    height={'500px'}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}

export default RevenueChart;