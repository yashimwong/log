import React from "react";

const useWebsocket = () => {
    const socket = React.useRef(null);
    const [ask, setAsk] = React.useState(0);
    const [bid, setBid] = React.useState(0);
    const [quote, setQuote] = React.useState(0);

    React.useEffect(() => {
        socket.current = new WebSocket("wss://ws.binaryws.com/websockets/v3?app_id=1089");
        socket.current.onerror = (error) => {
            console.log("ERROR" + error);
        };
        socket.current.onopen = () => {
            socket.current.send(
                JSON.stringify({
                    ticks: "cryBTCUSD",
                    subscribe: 1,
                })
            );
        };
        socket.current.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            const { ask, bid, quote } = data.tick;
            setAsk(ask);
            setBid(bid);
            setQuote(quote);
        };

        return () => socket.current.close();
    }, []);

    return [ask, bid, quote];
};

export default useWebsocket;
