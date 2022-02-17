import React, { useState } from "react";
import Chart from "react-apexcharts";
import useWebsocket from "./utils/websocket";

const App = () => {
    const [data, setData] = useState([]);
    const [points, setPoints] = useState([]);
    const [ask, bid, quote] = useWebsocket();

    const round = (num) => Math.round(num * 100) / 100;

    const options = {
        chart: {
            type: "candlestick",
            height: 350,
        },
        title: {
            text: "CandleStick Chart",
            align: "left",
        },
        xaxis: {
            type: "datetime",
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
    };

    const series = [{ data: data }];

    // OHLC Graph: https://money.stackexchange.com/questions/26390/ohlc-chart-is-it-graphed-on-bid-prices-ask-prices-or-executed-trades
    React.useEffect(() => {
        if (ask && bid && quote) {
            setPoints((prev) => [...prev, ask]);
            if (points.length % 3 === 0) {
                const last_data = points.slice(-3);
                const open = last_data[0];
                const low = Math.min(...last_data);
                const high = Math.max(...last_data);
                const close = last_data[2];

                console.log([open, high, low, close]);

                setData((prev) => [
                    ...prev,
                    {
                        x: new Date(),
                        y: [round(open), round(low), round(high), round(close)],
                    },
                ]);
            }
        }
    }, [ask]);

    return (
        <div>
            Ask: {ask} Bid: {bid} Quote: {quote} Data Size: {points.length}
            <Chart options={options} series={series} type="candlestick" height={350} />
        </div>
    );
};

export default App;
