import { APIGatewayEvent, Context } from "aws-lambda"
import { retrieveSingleConversation } from "../utils/messagebird-api"

// Used to receive whatsapp web hook
export async function handler(event: APIGatewayEvent, context: Context) {
    console.log("Event: ", event)
    const { queryStringParameters } = event
    const { id } = queryStringParameters!
    const conversation = await retrieveSingleConversation(id)
    console.log("conversation: ", conversation)
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(conversation),
    }
}
