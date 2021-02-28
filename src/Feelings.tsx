import React, { useEffect, useState } from 'react';
import { IFeeling } from "./types";


export function Feelings(props: any) {


    const [feelings, setFeelings] = useState<IFeeling[]>([]);
    useEffect(() => {
        async function getFeelings() {
            const response = await fetch("http://localhost:4000/feelings");
            const json: IFeeling[] = await response.json();
            console.log("fetched")
            setFeelings(json);
        }

        const id = setInterval(() => getFeelings(), 5000);
        return () => clearInterval(id);
    }, []);
    return (<div className="feelings">{feelings.map((f) => <Feeling key={f.id} {...f} />)}</div>);
}
function Feeling(props: IFeeling) {
    const { username, description, emoji } = props;
    return (
        <div className="feeling">
            <div className="name">{username}</div>
            <div title={description}>{emoji}</div>
        </div>);
}
