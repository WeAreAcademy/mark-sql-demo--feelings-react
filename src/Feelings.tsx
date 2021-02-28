import React, { useEffect, useState } from 'react';
import { IFeeling } from "./types";


export function Feelings(props: { apiBase: string }) {

    const [feelings, setFeelings] = useState<IFeeling[]>([]);
    useEffect(() => {
        async function getFeelings() {
            const response = await fetch(props.apiBase + "/feelings");
            const json: IFeeling[] = await response.json();
            setFeelings(json);
        }
        const id = setInterval(() => getFeelings(), 5000);
        getFeelings();
        return () => clearInterval(id);
    }, [props.apiBase]);
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
