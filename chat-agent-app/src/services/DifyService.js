// src/services/DifyService.js

/**
 * Dify API 服务类
 * 提供与 Dify 平台交互的功能
 */
class DifyService {
  // API 配置
  static config = {
    workflow: {
      // url: 'https://dv61xke3owce1.cloudfront.net/v1/workflows/run',
      url: 'http://190.92.198.173:8090/v1/workflows/run',
      // policy_apiKey: 'app-YSNy2PDLfmm8nsemikpGRrqr',
      // apiKey: 'app-ehHrsGNUVvSVC018IimOZoNc'
    },
    chat: {
      url: 'https://dv61xke3owce1.cloudfront.net/v1/chat-messages',
      apiKey: 'app-YV01Eht8O3ksgCLr2rMIHofF'
    }
  }

  /**
   * 运行工作流
   * @param {Object} inputs 输入参数
   * @param {string} apiKey API 密钥
   * @param {string} user 用户标识，默认为 'abc'
   * @param {string} responseMode 响应模式，默认为 'blocking'
   * @returns {Promise<Object>} API 响应结果
   */
  static async runWorkflow(inputs, apiKey, user = 'abc', responseMode = 'blocking') {
    try {
      const response = await fetch(this.config.workflow.url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
          'Host': 'dv61xke3owce1.cloudfront.net',
          'Connection': 'keep-alive'
        },
        body: JSON.stringify({
          inputs: inputs,
          response_mode: responseMode,
          user
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error running workflow:', error)
      throw error
    }
  }

  /**
   * 发送聊天消息
   * @param {string} query 用户查询
   * @param {string} user 用户标识，默认为 'abc-123'
   * @param {Object} inputs 输入参数，默认为空对象
   * @param {string} responseMode 响应模式，默认为 'streaming'
   * @returns {Promise<ReadableStream>} 可读流，用于处理流式响应
   */
  static async sendChatMessage(query, user = 'abc-123', inputs = {}, responseMode = 'streaming') {
    try {
      const response = await fetch(this.config.chat.url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.chat.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
          'Host': 'dv61xke3owce1.cloudfront.net',
          'Connection': 'keep-alive'
        },
        body: JSON.stringify({
          inputs,
          query,
          response_mode: responseMode,
          user
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // 对于流式响应，返回原始响应流
      if (responseMode === 'streaming') {
        return response.body
      } else {
        return await response.json()
      }
    } catch (error) {
      console.error('Error sending chat message:', error)
      throw error
    }
  }

  /**
   * 处理流式响应
   * @param {ReadableStream} stream 响应流
   * @param {Function} onData 处理数据的回调函数
   * @param {Function} onComplete 完成时的回调函数
   * @param {Function} onError 错误处理回调函数
   */
  static async processStream(stream, onData, onComplete, onError) {
    const reader = stream.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        
        if (done) {
          if (buffer.length > 0) {
            // 处理缓冲区中剩余的数据
            this.processBuffer(buffer, onData)
          }
          onComplete()
          break
        }
        
        // 解码并添加到缓冲区
        buffer += decoder.decode(value, { stream: true })
        
        // 处理缓冲区中的完整消息
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // 保留最后可能不完整的行
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6) // 移除 'data: ' 前缀
            if (data === '[DONE]') {
              onComplete()
              return
            }
            
            try {
              const parsed = JSON.parse(data)
              onData(parsed)
            } catch (e) {
              console.error('Error parsing stream data:', e, data)
            }
          }
        }
      }
    } catch (error) {
      onError(error)
    } finally {
      reader.releaseLock()
    }
  }

  /**
   * 处理缓冲区中的数据
   * @param {string} buffer 数据缓冲区
   * @param {Function} onData 处理数据的回调函数
   */
  static processBuffer(buffer, onData) {
    const lines = buffer.split('\n')
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6)
        if (data === '[DONE]') return
        
        try {
          const parsed = JSON.parse(data)
          onData(parsed)
        } catch (e) {
          console.error('Error parsing buffer data:', e, data)
        }
      }
    }
  }
}

export default DifyService