import express, { Express, Request, Response } from 'express';


export interface IConnectInstance {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}

export class Connect implements IConnectInstance {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}

interface Maplerad {
    url: string;
    name: string;
    description: string;
    variables: [];
}

class MapleradVerification {
    protected maplerad: Maplerad;
    constructor(url: string, name: string, description: string, variables: []) {
        this.maplerad = {
            url: url,
            name: name,
            description: description,
            variables: variables
        }
    }
}



class BalanceUpdater {
    private balance: number = 0; // Initialize balance to 0

    constructor() {
        // Initialize your Express app and set up the webhook route
        this.app = express();
        this.app.use(express.json());
        this.setupWebhookRoute();
    }

    private setupWebhookRoute() {
        this.app.post('/fincra-webhook', (req: Request, res: Response) => {
            const webhookData = req.body;

            if (webhookData.event === 'payout.successful') {
                // Extract payout information from the webhook payload
                const amountReceived = webhookData.data.amountReceived;
                const customerReference = webhookData.data.customerReference;

                // Update the balance based on the received amount
                this.updateBalance(amountReceived);

                // You can also log the customer reference or any other relevant information
                console.log(`Balance updated for customer ${customerReference}`);
                
                // Send a response to acknowledge receipt of the webhook
                res.status(200).json({ message: 'Webhook received and processed' });
            } else {
                // Handle other webhook events or ignore them
                res.status(200).json({ message: 'Webhook event not relevant' });
            }
        });
    }

    private updateBalance(amount: number) {
        // Implement your balance update logic here, for example, adding the received amount
        this.balance += amount;
        console.log(`Balance updated to ${this.balance}`);
    }

    public startServer(port: number) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

const balanceUpdater = new BalanceUpdater();
const port = 3000; // Set your desired port
balanceUpdater.startServer(port);
