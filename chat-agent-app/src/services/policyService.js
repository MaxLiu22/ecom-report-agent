// policyService.js
import DifyService from '@/services/DifyService.js'

class PolicyService {
    constructor() {
        // 定义必需的字段
        this.apikey = 'app-YSNy2PDLfmm8nsemikpGRrqr'
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

      // 去掉 "指标" 字段
      const vatCountries = { ...vatRow }
      delete vatCountries['指标']

      const warehouseCountries = { ...warehouseRow }
      delete warehouseCountries['指标']

      // 准备 inputs
      const inputs = {
        sellerCID: sellerCID,
        vatCountries: JSON.stringify(vatCountries),
        warehouseCountries: JSON.stringify(warehouseCountries)
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
