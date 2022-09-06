import React, { useEffect, useState } from 'react';
import { IFeeling } from "./types";


export function Feelings(props: { apiBase: string }) {

    type FetchStatus = "not-started" | "pending" | "done" | "error"
    const [feelings, setFeelings] = useState<IFeeling[]>([]);
    const [fetchStatus, setFetchStatus] = useState<FetchStatus>("pending");
    useEffect(() => {

        async function fetchAndStoreFeelings() {
            try {
                setFetchStatus("pending")
                const response = await fetch(props.apiBase + "/feelings");
                const json: IFeeling[] = await response.json();
                setFeelings(json);
                setFetchStatus("done")

            } catch (error: unknown) {
                console.error("could not fetch: ", error);
                setFeelings([])
                setFetchStatus("error")
            }
        }
        const id = setInterval(() => fetchAndStoreFeelings(), 5000);
        fetchAndStoreFeelings();
        return () => clearInterval(id);
    }, [props.apiBase]);
    const anyErrorClass = fetchStatus === "error" ? " fetch-error" : "";
    return (
        <div className={"feelings" + anyErrorClass} >
            {fetchStatus === "error" && <div>Failed to fetch</div>}
            <div>
                {
                    feelings.map((f) => (
                        <Feeling key={f.id} {...f} />
                    ))
                }
            </div>
        </div>
    );
}
function Feeling(props: IFeeling) {
    const { username, description, emoji } = props;
    return (
        <div className="feeling">
            <div className="name">{username}</div>
            <div title={description}>{emoji}</div>
        </div>);
}
