declare module "messagebird-api" {
    // export interface Conversation {
    //     updatedDateTime: string
    //     displayName: string
    //     id: string
    // }
    export function retrieveSingleConversation(id: string): Array<Conversation>
    export function sendMessage(id: string): void
}
