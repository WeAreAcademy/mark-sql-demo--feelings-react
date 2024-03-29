import { useEffect, useMemo, useState } from 'react';
import { IFeeling } from "./types";
import { badShuffle, pick } from './utils';
import { toast } from 'react-toastify';

type FetchStatus =
    | { status: "done", feelings: IFeeling[] }
    | { status: "error", error: string }
    | { status: "pending" }
    | { status: "not-started" };


export function Feelings(props: { apiBase: string }) {

    const [fetchStatus, setFetchStatus] = useState<FetchStatus>({ status: "not-started" });
    const [shouldAutoFetch, setShouldAutoFetch] = useState(true);

    const fakeFeelings = useMemo(() => generateFakeFeelings(7), []);
    useEffect(() => {

        async function fetchAndStoreFeelings() {
            try {
                setFetchStatus({ status: "pending" })
                await delay(2000);
                const response = await fetch(props.apiBase + "/feelings");
                const json: IFeeling[] = await response.json();
                setFetchStatus({ status: "done", feelings: json })

            } catch (error: unknown) {
                console.error("could not fetch: ", error);
                setFetchStatus({ status: "error", error: "" + error })
                toast.error("failed to fetch", { autoClose: 1000, hideProgressBar: true })
            }
        }
        fetchAndStoreFeelings();
        if (shouldAutoFetch) {
            const id = setInterval(() => fetchAndStoreFeelings(), 10000);
            return () => clearInterval(id);
        }
    }, [props.apiBase, shouldAutoFetch]);
    const anyErrorClass = fetchStatus.status === "error" ? " fetch-error" : "";
    return (
        <div className={"feelings" + anyErrorClass} >
            <div>auto-refresh: <input type="checkbox" checked={shouldAutoFetch} onChange={() => setShouldAutoFetch(p => !p)} /></div>
            {fetchStatus.status === "error" && <div>Failed to fetch - showing fake data</div>}
            {fetchStatus.status === "pending" && <div>⏳Loading!⌛️</div>}
            {fetchStatus.status === "done" &&
                <FeelingsList feelings={fetchStatus.feelings} />
            }
            {fetchStatus.status === "error" &&
                <FeelingsList feelings={fakeFeelings} />
            }
        </div>
    );
}

function FeelingsList(props: { feelings: IFeeling[] }) {
    return (<div>
        {
            props.feelings.map((f: IFeeling) => (
                <Feeling key={f.id} {...f} />
            ))
        }
    </div>)
}
function Feeling(props: IFeeling) {
    const { username, description, emoji } = props;
    return (
        <div className="feeling">
            <div className="name">{username}</div>
            <div title={description}>{emoji}</div>
        </div>);
}


function delay(duration: number): Promise<void> {
    return new Promise((res, rej) => setTimeout(res, duration));
}

function generateFakeFeelings(num: number): IFeeling[] {
    const allNames = badShuffle("alice bob charlie dave edgar fela gabriela heidi izzy juan kali lionel mali norah ollie paola quintin russ steve toby uhura violet yara zeke".split(" "));
    if (num > allNames.length) {
        throw new Error("too many fake feelings requested: " + num);
    }
    const names = allNames.slice(0, num);
    return names.map((n, ix) => ({
        username: n,
        description: pick('focused tired excited confused'.split(" ")),
        emoji: pick(['🚜', '😎', '🥷🏽', '🤯', "😊", "👍", "✨", "⚡", "😭", "🎉", "🔥", "🤔", "💀"]),
        id: ix
    }))

}