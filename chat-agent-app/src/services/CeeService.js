/**
 * CEE 相关计算服务
 */
class CeeService {
  /**
   * 计算中欧计划相关费用
   * @param {number} soldCount 已售商品数量
   * @param {boolean} hasPolishVAT 是否选择波兰税号
   * @param {boolean} hasCzechVAT 是否选择捷克税号
   * @returns {Object} 包含计算结果的对象
   */
  static calculateCEECosts(soldCount, hasPolishVAT, hasCzechVAT) {
    // 计算中欧计划预计节约费用
    const estimatedSaving = soldCount * 0.26;

    // 计算税号选择数量
    const vatCount = [hasPolishVAT, hasCzechVAT].filter(Boolean).length;

    // 计算 VAT 注册成本
    const vatRegistrationCost = (2 - vatCount) * 300;

    // 计算最终节约费用
    const finalSaving = estimatedSaving - vatRegistrationCost;

    return {
      soldCount: Number(soldCount),
      estimatedSaving: Number(estimatedSaving.toFixed(2)),
      vatRegistrationCost: Number(vatRegistrationCost.toFixed(2)),
      finalSaving: Number(finalSaving.toFixed(2)),
      hasPolishVAT: hasPolishVAT,
      hasCzechVAT: hasCzechVAT
    };
  }

  /**
   * 判断是否加入 CEE
   * @param {Object} ceeExpansionCheckli CEE 扩展检查对象
   * @returns {Object} { shouldJoinCEE, hasPolishVAT?, hasCzechVAT? }
   */
  static shouldJoinCEE(ceeExpansionCheckli) {
    const shouldJoin =
      ceeExpansionCheckli["是否启用中欧计划 (CEP)"] === 1 ? true : false;

    if (shouldJoin) {
      return { shouldJoinCEE: true };
    }

    return {
      shouldJoinCEE: false,
      hasPolishVAT:
        ceeExpansionCheckli["是否持有波兰有效增值税号"] === 1 ? true : false,
      hasCzechVAT:
        ceeExpansionCheckli["是否持有捷克有效增值税号"] === 1 ? true : false,
    };
  }
}

export default CeeService;
