import { Injectable } from '@angular/core';
import { InboundMessage, Realtime } from 'ably';
import { environment } from '../../../environments/environment.prod';

const NAFATH_CHANNEL_EVENT: string = "statusupdates:"


@Injectable({
    providedIn: 'root'
})
export class AblyService {
    private ably: Realtime;

    constructor() {
        this.ably = new Realtime({ key: environment.ablyAuthKey });
        this.ably.connection.once("connected", () => {
            console.log("Connected to Ably!")
        });
    }

    disconnect() {
        this.ably.close();
    }

    async subscribeToChannel(channelName: string, callback: (message: InboundMessage) => void) {
        const channel = this.ably.channels.get(NAFATH_CHANNEL_EVENT + channelName);

        channel.on((stateChange) => {
            console.log(`Channel "${channelName}" state: ${stateChange.current}`);
        });

        try {
            await channel.subscribe('update', (message: InboundMessage) => {
                callback(message);
            });
        } catch (err) {
            console.error('Subscription error:', err);
        }


        channel.attach();
    }

}
