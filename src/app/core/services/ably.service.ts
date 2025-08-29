import { Realtime } from 'ably';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
    providedIn: 'root',
})
export class AblyService {
    private ably!: Realtime;

    constructor() {

    }


    initAbly(transId: string, callback: (message: any) => void): void {
        this.ably = new Realtime({ key: environment.ablyAuthKey });
        this.ably.connection.once("connected", () => {
            console.log("Connected to Ably!");
            this.subscribeToChannel(transId, callback)
        });
    }


    private async subscribeToChannel(transId: string, callback: (message: any) => void) {
        const channel = this.ably.channels.get(transId);
        try {
            channel.subscribe((message) => {
                callback(message);
            });
            console.log(`Subscribed to channel: ${transId}`);
        } catch (err) {
            console.error("Subscription error:", err);
        }
    }



    // Clean up Ably resources
    disconnect() {
        this.ably.close();
    }


}
