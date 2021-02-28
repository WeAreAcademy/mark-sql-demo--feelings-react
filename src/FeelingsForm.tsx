import React, { useState } from 'react';
import { Username, Description, Emoji, IFeeling } from "./types";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import useLocalStorage from "./useLocalStorage"

export function FeelingsForm(props: { apiBase: string }) {


    // Similar to useState but first arg is key to the value in local storage.
    const [username, setUsername] = useLocalStorage<Username>('username', 'nbogie');
    const [description, setDescription] = useState<Description>("");
    const [emoji, setEmoji] = useState<Emoji>("");
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

    async function postFeelings() {

        const newFeeling: IFeeling = { username: username as string, description, emoji };
        const body = JSON.stringify(newFeeling);
        const response = await fetch(`${props.apiBase}/feelings`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body
            }
        );
        console.log("posted: ", response);
        //const json = await response.json();
        //todo: handle error(s)
    }

    function validateFeelings() {
        return username && emoji;
    }

    function handleSendClick(ev: any) {
        if (validateFeelings()) {
            postFeelings();
            resetForm();
        }
    }
    function resetForm() {
        setDescription("")
    }

    const onEmojiClick = (emojiObject: any) => {
        setEmoji(emojiObject.native);
        setEmojiPickerVisible(false);
    };


    return (<div className="feelings-form">

        <div className='inputs'>
            {/* @ts-ignore */}
            <input value={username}
                onChange={(ev) => {
                    /* @ts-ignore */
                    setUsername(ev.target.value)
                }}
                placeholder="your github username" />

            <span onClick={() => setEmojiPickerVisible(true)}>Emoji: {emoji}</span>


            <input value={description}
                onChange={(ev) => setDescription(ev.target.value)}
                placeholder="description" />
            <br />
            <button onClick={handleSendClick} >Send</button>

        </div>
        {
            emojiPickerVisible && (
                <div className="emoji-picker-wrapper">
                    <Picker onSelect={onEmojiClick} />
                </div>
            )
        }
    </div >);
}
