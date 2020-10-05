import { APIGatewayEvent, Context } from "aws-lambda"

// Used to receive whatsapp web hook
export async function handler(event: APIGatewayEvent, context: Context) {
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: "Test2" }),
    }
}
