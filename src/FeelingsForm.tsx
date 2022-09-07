import React, { useState } from 'react';
import { Username, Description, Emoji, IFeeling } from "./types";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

import useLocalStorage from "./useLocalStorage"
import { toast } from 'react-toastify';

export function FeelingsForm(props: { apiBase: string }) {


    // Similar to useState but first arg is key to the value in local storage.
    const [username, setUsername] = useLocalStorage<Username>('username', 'nbogie');
    const [description, setDescription] = useState<Description>("");
    const [emoji, setEmoji] = useState<Emoji>("");
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

    async function postFeelings() {

        const newFeeling: IFeeling = { username: username as string, description, emoji };
        const body = JSON.stringify(newFeeling);
        try {
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
            toast.success("updated!", { autoClose: 1000, hideProgressBar: true })
        } catch (error: unknown) {
            toast.error("Error posting: " + error, { autoClose: 2000 });
            console.error("error posting: " + error);
        }
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
        else {
            toast.error("Invalid: enter name and emoji")
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
                placeholder="your github username"
            />

            <button onClick={() => setEmojiPickerVisible(true)}>Emoji {emoji}</button>

            <div>Description: <input value={description}
                onChange={(ev) => setDescription(ev.target.value)}
                placeholder="description" />
            </div>
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
