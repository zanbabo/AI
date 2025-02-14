<template>
  <div class="chat-container">
    <div class="symbol">

    </div>
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

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import aiAvatarImg from '@/assets/images/aiavator.png';
import emitter from '@/utils/emitter.ts';

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
const sendChatRequest = async (conversationId: string) => {
  if (input.value.trim() === '') return;

  // 添加用户消息到聊天记录
  const userMessage = {
    role: 'user',
    content: input.value
  };
  //ref用.value获取值
  chatMessages.value.push(userMessage);
  scrollToBottom();

  try {
    // 构建包含 conversationid 的 URL
    let baseUrl = 'https://api.coze.cn/v3/chat';
    if (conversationId) {
      //encodeURIComponent 是 JS 中的一个内置函数，它的作用是对 URI 组件进行编码。
      baseUrl += `?conversationid=${encodeURIComponent(conversationId)}`;
    }
    const response = await fetch(baseUrl, {
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

      //使用 TextDecoder 对象将二进制数据块 value 解码为字符串。
      const chunk = new TextDecoder().decode(value);
      //把解码后的字符串 chunk 追加到 partialMessage 中。
      partialMessage += chunk;

      //按照双换行符 \n\n 对 partialMessage 进行分割，得到一个事件数据数组 events。
      // 在服务器端，不同的事件数据通常用双换行符分隔。
      const events = partialMessage.split('\n\n');
      //移除并返回数组的最后一个元素。把这个元素赋值给 partialMessage，
      // 因为这个元素可能是一个不完整的事件数据，需要保留到下一次读取时继续处理。
      partialMessage = events.pop() || '';

      //遍历事件数据数组 events
      for (const event of events) {
        //检查事件数据是否以 event: 开头，若开头符合该格式，说明这是一个有效的事件数据。
        if (event.startsWith('event:')) {
          //按照 data: 对事件数据进行分割，得到一个数组 eventParts，
          // eventParts数组的第一个元素是事件名称部分，第二个元素是事件数据部分。
          const eventParts = event.split('data:');
          //去除事件名称部分的 event: 前缀，并去除首尾的空白字符，得到实际的事件名称 eventName
          const eventName = eventParts[0].replace('event:', '').trim();
          //try...catch 块来捕获可能出现的 JSON 解析错误。
          try {
            //若 事件数据部分eventParts[1] 存在，JSON.parse() 方法将其解析为 JavaScript 对象
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

//回调函数作为参数,组件挂载完成后执行
onMounted(() => {
  scrollToBottom();
  // 监听 send-id 事件
  const onSendId = (conversationId: string) => {
    console.log('接收到的 Conversation ID:', conversationId);
    // 调用发送聊天请求的函数
    sendChatRequest(conversationId);
  };
  emitter.on('send-id', onSendId);

  // 组件卸载时移除监听器
  onUnmounted(() => {
    emitter.off('send-id', onSendId);
  });
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
  //auto 表示当内容超出元素的高度时，会自动显示垂直滚动条
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
  max-width: 700px; /* 输入框最大宽度 */
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