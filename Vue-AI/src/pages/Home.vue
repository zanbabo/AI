<template>
  <div class="chat-container">
    <div class="chat-messages" ref="chatMessagesRef">
      <div
          v-for="(message, index) in chatMessages"
          :key="index"
          :class="{ 'user-message': message.role === 'user', 'ai-message': message.role === 'ai' }"
      >
        <div class="avatar" :style="{ backgroundImage: `url(${message.role === 'user' ? userAvatar : aiAvatar})` }"></div>
        <div class="message-content-wrapper">
          <div class="message-content">
            {{ message.content }}
          </div>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input v-model="input" placeholder="请输入问题" @keyup.enter="sendChatRequest" class="search">
      <button @click="sendChatRequest">发送</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import aiAvatarImg from '@/assets/images/aiavator.png'

// 定义输入框内容、聊天消息数组、聊天消息容器引用
const input = ref('');
const chatMessages = ref<{ role: 'user' | 'ai'; content: string }[]>([]);
const chatMessagesRef = ref<HTMLDivElement | null>(null);

// 定义用户和 AI 的头像地址
const userAvatar = 'https://example.com/user-avatar.png'; // 替换为实际的用户头像地址
const aiAvatar = aiAvatarImg; // 替换为实际的 AI 头像地址

// 定义 token
const token = 'pat_61vQguWkC0iXUADJUvHrv7lUa3MVCngW7aKMVBw2Gaa54Aicx1Aakb9SdVSH3aYg';

// 滚动到聊天窗口底部的函数
const scrollToBottom = () => {
  if (chatMessagesRef.value) {
    chatMessagesRef.value.scrollTop = chatMessagesRef.value.scrollHeight;
  }
};

// 发送聊天请求的函数
const sendChatRequest = async () => {
  if (input.value.trim() === '') return;

  // 添加用户消息到聊天记录
  const userMessage = {
    role: 'user',
    content: input.value
  };
  chatMessages.value.push(userMessage);
  scrollToBottom();

  try {
    const response = await fetch('https://api.coze.cn/v3/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bot_id: '7467544627365773351',
        user_id: '123',
        stream: true,
        auto_save_history: true,
        additional_messages: [
          {
            role: 'user',
            type: 'question',
            content: input.value,
            content_type: 'text'
          }
        ]
      })
    });

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('无法获取响应流读取器');
    }

    let partialMessage = '';
    let aiMessageContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = new TextDecoder().decode(value);
      partialMessage += chunk;

      const events = partialMessage.split('\n\n');
      partialMessage = events.pop() || '';

      for (const event of events) {
        if (event.startsWith('event:')) {
          const eventParts = event.split('data:');
          const eventName = eventParts[0].replace('event:', '').trim();
          try {
            const data = eventParts[1] ? JSON.parse(eventParts[1].trim()) : null;
            switch (eventName) {
              case 'conversation.message.delta':
                const message = data.message || data.content;
                aiMessageContent += message;
                // 更新 AI 消息内容
                if (chatMessages.value.length > 0 && chatMessages.value[chatMessages.value.length - 1].role === 'ai') {
                  chatMessages.value[chatMessages.value.length - 1].content = aiMessageContent;
                } else {
                  const aiMessage = {
                    role: 'ai',
                    content: aiMessageContent
                  };
                  chatMessages.value.push(aiMessage);
                }
                scrollToBottom();
                break;
              case 'conversation.message.completed':
                console.log('完整回复:', aiMessageContent);
                break;
              case 'conversation.chat.failed':
                console.error('对话失败:', data);
                const errorMessage = {
                  role: 'ai',
                  content: '对话失败，请稍后重试。'
                };
                chatMessages.value.push(errorMessage);
                scrollToBottom();
                break;
            }
          } catch (parseError) {
            console.error('JSON 解析出错:', parseError);
          }
        }
      }
    }
  } catch (error) {
    console.error('请求出错:', error);
    const errorMessage = {
      role: 'ai',
      content: '请求出错，请稍后重试。'
    };
    chatMessages.value.push(errorMessage);
    scrollToBottom();
  } finally {
    input.value = ''; // 清空输入框
  }
};

// 组件挂载时滚动到聊天窗口底部
onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped>

.chat-container {
  display: flex;
  flex-direction: column;
  height: 800px;
  width:1100px;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.user-message,
.ai-message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.user-message {
  justify-content: flex-end;
}

.ai-message {
  justify-content: flex-start;
}

.avatar {
  width: 30px;
  height: 30px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-right: 10px;
}

.user-message .avatar {
  margin-left: 10px;
  margin-right: 0;
}

.message-content-wrapper {
  max-width: 70%;
}

.user-message .message-content-wrapper {
  display: flex;
  justify-content: flex-end;
}

.message-content {
  padding: 8px;
  border-radius: 8px;
}

.user-message .message-content {
  background-color: #f0f0f0;
}
.search{
  width:700px;
  height:70px;

}
.chat-input {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding: 10px;

}

.chat-input input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
  max-width: 700px; /* 可根据需要调整输入框最大宽度 */
}

.chat-input button {
  padding: 5px 10px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #40a9ff;
}

</style>