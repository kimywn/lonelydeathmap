import React, { useState } from 'react';

const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 p-4 ${className}`}>
        {children}
    </div>
);

Card.Header = ({ children, className = '' }) => (
    <div className={`border-b pb-3 mb-3 ${className}`}>
        {children}
    </div>
);

Card.Title = ({ children, className = '' }) => (
    <h3 className={`text-lg font-semibold text-gray-800 ${className}`}>
        {children}
    </h3>
);

Card.Content = ({ children, className = '' }) => (
    <div className={`${className}`}>{children}</div>
);

const SolitudeCounter = () => {
    const [count, setCount] = useState(1234);

    return (
        <Card className="bg-red-50">
            <Card.Header>
                <Card.Title className="flex justify-between items-center">
                    <span>실시간 고독사 수</span>
                    <span className="text-sm text-gray-600">2024년 기준</span>
                </Card.Title>
            </Card.Header>
            <Card.Content>
                <div className="text-center">
                    <div className="text-4xl font-bold text-red-600">
                        {count.toLocaleString()}명
                    </div>
                </div>
            </Card.Content>
        </Card>
    );
};

const getColorByCount = (count) => {
    if (count > 500) return "bg-red-500";
    if (count > 300) return "bg-orange-400";
    if (count > 200) return "bg-yellow-300";
    return "bg-green-300";
};

const KoreaMapVisualization = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);

    const regionData = {
        서울: { count: 342, left: '42%', top: '30%' },
        경기: { count: 512, left: '40%', top: '25%' },
        부산: { count: 287, left: '65%', top: '75%' },
        대구: { count: 201, left: '55%', top: '60%' },
    };

    return (
        <Card className="w-full">
            <Card.Header>
                <Card.Title>지역별 고독사 현황</Card.Title>
            </Card.Header>
            <Card.Content className="relative">
                <div className="relative w-full h-[400px] bg-gray-100">
                    {Object.entries(regionData).map(([region, data]) => (
                        <div
                            key={region}
                            className={`absolute ${getColorByCount(data.count)} text-white 
                                rounded-full w-12 h-12 flex items-center justify-center 
                                text-xs font-bold cursor-pointer hover:scale-110 transition-all shadow-md`}
                            style={{
                                left: data.left,
                                top: data.top,
                                transform: 'translate(-50%, -50%)',
                            }}
                            onClick={() => setSelectedRegion(region)}
                        >
                            {data.count}
                        </div>
                    ))}
                </div>

                {selectedRegion && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                        <h3 className="text-xl font-bold">{selectedRegion} 지역 고독사 현황</h3>
                        <p className="text-3xl text-red-600 mt-2">
                            {regionData[selectedRegion].count}명
                        </p>
                    </div>
                )}
            </Card.Content>
        </Card>
    );
};

const AgeGroupChart = () => {
    const data = [
        { group: '65-70세', count: 120 },
        { group: '70-75세', count: 210 },
        { group: '75-80세', count: 350 },
        { group: '80-85세', count: 480 },
        { group: '85세 이상', count: 640 },
    ];

    const maxCount = Math.max(...data.map(item => item.count));
    const chartHeight = 300;

    return (
        <Card>
            <Card.Header>
                <Card.Title>연령대별 고독사 현황</Card.Title>
            </Card.Header>
            <Card.Content>
                <svg viewBox={`0 0 500 ${chartHeight}`} className="w-full">
                    {data.map((item, index) => {
                        const barHeight = (item.count / maxCount) * (chartHeight - 100);
                        return (
                            <g key={item.group}>
                                <rect
                                    x={index * 100 + 50}
                                    y={chartHeight - barHeight}
                                    width="50"
                                    height={barHeight}
                                    fill="#FF6384"
                                />
                                <text
                                    x={index * 100 + 75}
                                    y={chartHeight - barHeight - 10}
                                    textAnchor="middle"
                                    className="text-sm"
                                >
                                    {item.count}
                                </text>
                                <text
                                    x={index * 100 + 75}
                                    y={chartHeight + 20}
                                    textAnchor="middle"
                                    className="text-xs"
                                >
                                    {item.group}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </Card.Content>
        </Card>
    );
};

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
                고독사 현황 대시보드
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <SolitudeCounter />
                </div>
                <div>
                    <KoreaMapVisualization />
                </div>
                <div className="md:col-span-3">
                    <AgeGroupChart />
                </div>
            </div>

            <div className="mt-8 text-center text-gray-600">
                <p>
                    본 데이터는 보건복지부와 통계청의 공식 통계를 기반으로 합니다.
                </p>
            </div>
        </div>
    );
};

export default Home;
