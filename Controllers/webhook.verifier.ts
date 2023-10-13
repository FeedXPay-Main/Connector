// import express, { Express, Request, Response, NextFunction } from 'express';
// import crypto from 'crypto';

// class WebhookVerifier {
//     secret: string;

//     constructor(secret: string) {
//         this.secret = secret;
//     }

//     verifyWebhook(req: Request, res: Response, next: NextFunction) {
//         const headers = req.headers;
//         const signature = headers['x-webhook-hash'] || headers['svix-signature'] || headers['x-webhook-hash'];

//         if (!signature) {
//             return res.status(400).json({ error: 'Signature header is missing' });
//         }

//         const timestamp = headers['x-webhook-timestamp'] || headers['svix-timestamp'] || null;
//         const requestBody = req.body;

//         if (this.verifySignature(signature, timestamp, requestBody)) {
//             // Webhook verified successfully, process the data here
//             return res.status(200).json({ message: 'Webhook verified' });
//         } else {
//             return res.status(401).json({ error: 'Webhook verification failed' });
//         }
//     }

//     private verifySignature(signature: string, timestamp: string | null, body: any): boolean {
//         const signedContent = timestamp ? `${timestamp}.${JSON.stringify(body)}` : JSON.stringify(body);
//         const expectedSignature = this.calculateSignature(signedContent);
//         return signature === expectedSignature;
//     }

//     private calculateSignature(content: string): string {
//         const hmac = crypto.createHmac('sha256', this.secret);
//         hmac.update(content);
//         return hmac.digest('hex');
//     }
// }

// const app: Express = express();
// app.use(express.json());

// const risevestSecret = 'your_risevest_secret';
// const mapleradSecret = 'your_maplerad_secret';
// const fincraSecret = 'your_fincra_secret';

// const risevestVerifier = new WebhookVerifier(risevestSecret);
// const mapleradVerifier = new WebhookVerifier(mapleradSecret);
// const fincraVerifier = new WebhookVerifier(fincraSecret);

// // Route for Risevest Webhook
// app.post('/risevest-webhook', risevestVerifier.verifyWebhook);

// // Route for Maplerad Webhook
// app.post('/maplerad-webhook', mapleradVerifier.verifyWebhook);

// // Route for Fincra Webhook
// app.post('/fincra-webhook', fincraVerifier.verifyWebhook);

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });



import express, { Express, Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

class WebhookVerifier {
    secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    verifyWebhook(req: Request, res: Response, next: NextFunction) {
        const headers = req.headers;
        const signature = Array.isArray(headers['x-webhook-hash']) ? headers['x-webhook-hash'][0] : headers['x-webhook-hash'];

        if (!signature) {
            return res.status(400).json({ error: 'Signature header is missing' });
        }

        const timestamp = headers['x-webhook-timestamp'] as string | null;
        const requestBody = req.body;

        if (this.verifySignature(signature, timestamp, requestBody)) {
            // Webhook verified successfully, process the data here
            return res.status(200).json({ message: 'Webhook verified' });
        } else {
            this.retryWebhookVerification(req, res, next);
            return res.status(401).json({ error: 'Webhook verification failed' });
        }
    }

    private verifySignature(signature: string, timestamp: string | null, body: any): boolean {
        const signedContent = timestamp ? `${timestamp}.${JSON.stringify(body)}` : JSON.stringify(body);
        const expectedSignature = this.calculateSignature(signedContent);
        return signature === expectedSignature;
    }

    private calculateSignature(content: string): string {
        const hmac = crypto.createHmac('sha256', this.secret);
        hmac.update(content);
        return hmac.digest('hex');
    }

    private retryWebhookVerification(req: Request, res: Response, next: NextFunction) {
        // Retrieve and increment the retry count from the request headers or any tracking mechanism.
        const retryCount = Number(req.headers['x-webhook-retry-count']) || 0;
        
        if (retryCount < 3) {
            // If the number of retries is less than 3, respond with a 200 OK to prevent further retries.
            res.status(200).json({ message: 'Webhook verification failed but acknowledged' });
        } else {
            // If the maximum number of retries (e.g., 3) is reached, respond with an error status.
            res.status(401).json({ error: 'Webhook verification failed after maximum retries' });
        }
    
        // log and track the retry attempts here for monitoring and debugging.
        console.log(`Retry attempt ${retryCount + 1}`);
    }    
}

const app: Express = express();
app.use(express.json());

const risevestSecret = 'your_risevest_secret';
const mapleradSecret = 'your_maplerad_secret';
const fincraSecret = 'your_fincra_secret';
const serverSecret = 'your_server_secret';

const risevestVerifier = new WebhookVerifier(risevestSecret);
const mapleradVerifier = new WebhookVerifier(mapleradSecret);
const fincraVerifier = new WebhookVerifier(fincraSecret);
const server = new WebhookVerifier(serverSecret);

// Route for Risevest Webhook
app.post('/risevest-webhook', risevestVerifier.verifyWebhook);

// Route for Maplerad Webhook
app.post('/maplerad-webhook', mapleradVerifier.verifyWebhook);

// Route for Fincra Webhook
app.post('/fincra-webhook', fincraVerifier.verifyWebhook);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
