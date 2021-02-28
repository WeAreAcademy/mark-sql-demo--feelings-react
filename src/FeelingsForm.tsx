import React, { useState } from 'react';
import { Username, Description, Emoji, IFeeling } from "./types";
import Picker, { IEmojiData } from 'emoji-picker-react';





export function FeelingsForm(props: any) {

    const [username, setUsername] = useState<Username>("");
    const [description, setDescription] = useState<Description>("");
    const [emoji, setEmoji] = useState<IEmojiData | null>(null);


    async function postFeelings() {

        const newFeeling: IFeeling = { username, description, emoji: emoji ? (emoji!.emoji) : "" };
        const body = JSON.stringify(newFeeling);
        console.log("sending body: ", body);
        const response = await fetch("http://localhost:4000/feelings",
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body
            }
        );
        const json = await response.json();
        console.log(json);
    }

    function handleSendClick(ev: any) {
        postFeelings();
        resetForm();
    }
    function resetForm() {
        setEmoji(null)
        setDescription("")
    }

    const onEmojiClick = (event: any, emojiObject: any) => {
        setEmoji(emojiObject);
    };

    return (<div className="feelings-form">

        <input value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            placeholder="your github username" />

        {/* @ts-ignore */}
        {emoji && (<span>You chose: {emoji!.emoji}</span>)}

        <Picker onEmojiClick={onEmojiClick} />

        <input value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="description" />
        <br />
        <button onClick={handleSendClick} >Send</button>
    </div>);
}
