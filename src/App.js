import React, { useState } from "react";
import Chart from "react-apexcharts";
import useWebsocket from "./utils/websocket";

const App = () => {
    const [data, setData] = useState([]);
    const [ask, bid, quote] = useWebsocket();

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

    React.useEffect(() => {
        if (ask && bid && quote) {
            setData((prev) => [
                ...prev,
                {
                    x: new Date(),
                    y: [ask, bid, quote, (ask + bid) / 2],
                },
            ]);
        }
    }, [ask]);

    return (
        <div>
            Ask: {ask} Bid: {bid} Quote: {quote}
            <Chart options={options} series={series} type="candlestick" height={350} />
        </div>
    );
};

export default App;
