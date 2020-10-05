import fetch from "node-fetch"
interface Conversation {
    updatedDateTime: string
    displayName: string
    id: string
}

interface Message {
    text: string
    from: string
    to: string
    id: string
    type: string
    createdDateTime: string
    status: string
    direction: string
}

const messageBirdUrl = "https://conversations.messagebird.com/v1"
const { MB_ACCESS_KEY } = process.env

const retrieveConversations = async () => {
    const result = await fetch(`${messageBirdUrl}/conversations`, {
        headers: {
            Authorization: `AccessKey ${MB_ACCESS_KEY}`,
        },
    })
    const jsonData = await result.json()
    const { items } = jsonData
    const convos: Array<Conversation> = items.map(
        ({ updatedDatetime: updatedDateTime, contact: { displayName }, id }: any) => ({
            updatedDateTime,
            displayName,
            id,
        })
    )
    return convos
}

const retrieveSingleConversation = async (id: string) => {
    const singleConvoData = await fetch(`${messageBirdUrl}/conversations/${id}/messages`, {
        headers: {
            Authorization: `AccessKey ${MB_ACCESS_KEY}`,
        },
    })
    const singleConvoJSON = await singleConvoData.json()
    const { items } = singleConvoJSON

    const messages: Array<Message> = items.map(
        ({
            content: { text },
            from,
            to,
            id,
            type,
            createdDatetime: createdDateTime,
            status,
            direction,
        }: any): Message => ({ text, from, to, id, type, createdDateTime, status, direction })
    )
    return messages
}

const sendMessage = async (id: string, text: string) => {
    const body: any = {
        content: {
            text,
        },
        type: "text",
    }
    const sendResult = await fetch(`${messageBirdUrl}/conversations/${id}/messages`, {
        method: "post",
        headers: {
            Authorization: `AccessKey ${MB_ACCESS_KEY}`,
        },
        body: JSON.stringify(body),
    })
    const resultJSON = await sendResult.json()
    console.log("Result: ", resultJSON)
}

export { retrieveSingleConversation, retrieveConversations, sendMessage }
