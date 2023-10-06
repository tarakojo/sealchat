

export type ChatHistoryAttribute = 'me' | 'seal-default';
export type ChatHistoryEntry = {
    text : string,
    timestamp : number,
    attribute : ChatHistoryAttribute,
}

const ChatHistoryMaxSize = 200;

let chatHistory : ChatHistoryEntry[] = [];

export const getLength = () => {
    return chatHistory.length;
}

export const getEntry = (index : number) => {
    return chatHistory[index];
}

export const append = (entry : ChatHistoryEntry) => {    
    chatHistory.push(entry);
    if (chatHistory.length > ChatHistoryMaxSize) {
        chatHistory.shift();
    }
}

export const init = () => {

}
