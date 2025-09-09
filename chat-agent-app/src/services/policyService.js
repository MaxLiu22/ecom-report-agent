// policyService.js
import DifyService from '@/services/DifyService.js'

class PolicyService {
    constructor() {
        // 定义必需的字段
        this.apikey = 'app-zlEpRwbnkrRu4DiyN4wTgitu'
      }

  /**
   * 解析 EU_expansion_checkli，提取有效增值税号和授权仓储国家
   * 并调用 DifyService.runWorkflow
   * @param {Array} EU_expansion_checkli 数据数组
   * @param {string} sellerCID 卖家ID
   * @returns {Promise<Object>} API 响应结果
   */
    async processAndRun(EU_expansion_checkli, sellerCID) {
      try {
        // 找出两个目标指标
        const vatRow = EU_expansion_checkli.find(item => item['指标'] === '持有有效增值税号国家')
        const warehouseRow = EU_expansion_checkli.find(item => item['指标'] === '授权仓储国家')
    
        if (!vatRow || !warehouseRow) {
          throw new Error('缺少必要的指标行：持有有效增值税号国家 或 授权仓储国家')
        }
    
        // 提取国家名（值为 1）
        const vatCountries = Object.keys(vatRow)
          .filter(key => key !== '指标' && vatRow[key] === 1)
          .join('，')   // 用中文逗号拼接
    
        const warehouseCountries = Object.keys(warehouseRow)
          .filter(key => key !== '指标' && warehouseRow[key] === 1)
          .join('，')
    
        // 准备 inputs
        const inputs = {
          sellerCID: sellerCID,
          vatCountries: vatCountries,
          warehouseCountries: warehouseCountries
        }
    
        // 调用 DifyService workflow
        const result = await DifyService.runWorkflow(inputs, this.apikey)
        const outputs = result.data.outputs
    
        return outputs
      } catch (error) {
        console.error('Error in PolicyService.processAndRun:', error)
        throw error
      }
    }
}

export default PolicyService
