// stores/conversationStore.ts
import { defineStore } from 'pinia';

export const useConversationStore = defineStore('conversation', {
    //状态
    state: () => ({
        //当前正在进行的聊天会话
        currentConversation: {
            id: null as string | null,//类型断言解决红线
            messages: [] as { role: 'user' | 'ai'; content: string[] }[]
        },
        conversationHistory: [] as { id: string; messages: { role: 'user' | 'ai'; content: string }[] }[]
    }),
    actions: {
        startNewConversation(conversationId: string) {
            if (this.currentConversation.id) {
                this.conversationHistory.push({...this.currentConversation });
            }
            this.currentConversation = {
                id: conversationId,
                messages: []
            };
        },
        addMessageToCurrentConversation(message: { role: 'user' | 'ai'; content: string }) {
            this.currentConversation.messages.push(message);
        },
        deleteConversationFromHistory(conversationId: string) {
            this.conversationHistory = this.conversationHistory.filter(
                (conversation) => conversation.id!== conversationId
            );
        },
        getConversationFromHistory(conversationId: string) {
            return this.conversationHistory.find((conversation) => conversation.id === conversationId);
        }
    }
});