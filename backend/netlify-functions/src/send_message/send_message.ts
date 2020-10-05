import { APIGatewayEvent, Context } from "aws-lambda"
import { sendMessage } from "../utils/messagebird-api"

// Used to receive whatsapp web hook
export async function handler(event: APIGatewayEvent, context: Context) {
    const body = JSON.parse(event.body!)
    const { id, text } = body
    console.log("Body: ", body)
    const result = await sendMessage(id, text)
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ done: true }),
    }
}
