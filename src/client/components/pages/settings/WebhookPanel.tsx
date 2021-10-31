import {faVial} from '@fortawesome/free-solid-svg-icons';
import Button from '../../global/Button2';
import Panel from '../../global/Panel';
import TextInput from '../../global/TextInput';
import {useState} from "react";


export function WebhookPanel() {
    let userWebhook: any
    const axios = require('axios');
    if (localStorage.getItem('userWebhook') === undefined) {
        userWebhook = ""
    } else {
        userWebhook = localStorage.getItem('userWebhook')
    }
    const [usersWebhook, setUsersWebhook] = useState(userWebhook);

    function sendToDiscord() {
        localStorage.setItem('userWebhook', usersWebhook);
        axios({
            method: "post",
            url: usersWebhook,
            headers: {
                "Content-Type": "application/json",
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
            },
            data: JSON.stringify({
                embeds: [{
                    color: 3313216,
                    timestamp: new Date(),
                    author: {
                        name: 'NFT Reserved',
                    },
                    fields: [
                        {
                            name: "Session Number:",
                            value: '|| Test ||'
                        }
                    ]
                }]
            })
        })


    }

    return (

        <Panel>
            <h3>Webhooks</h3>
            <div style={{display: 'flex'}}>

                <TextInput label="Discord" value={usersWebhook}
                           onChange={(e) => setUsersWebhook(e.target.value)}/>
                <Button bright icon={faVial} text="Test"
                        onClick={() => sendToDiscord()}
                />
            </div>
        </Panel>
    );
}

export default WebhookPanel;
