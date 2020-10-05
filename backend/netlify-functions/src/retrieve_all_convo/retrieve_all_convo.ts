import { APIGatewayEvent, Context } from "aws-lambda"

// Used to receive whatsapp web hook
export async function handler(event: APIGatewayEvent, context: Context) {
    console.log("Access Key: ", process.env.MB_ACCESS_KEY)
    const convos = "test"
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(convos),
    }
}
