<template>
  <div class="container">
    <header>
      <h1>BIXD头程省钱计算器<br><span class="subtitle">BIXD Cost Calculator</span></h1>
      
      <div class="description">
        <button class="description-toggle" @click="toggleDescription">
          <span>ℹ️</span>
          <span>{{ showDescription ? '收起详情 Hide Details' : '什么是BIXD (Bounded Warehouse)？What is BIXD (Bounded Warehouse)?' }}</span>
        </button>
        <div v-show="showDescription" class="description-content">
          <h3>什么是BIXD (Bounded Warehouse)？</h3>
          <p>亚马逊英欧头程整合计划 (BIXD) 通过合并英德货件至荷兰保税仓，帮助卖家：</p>
          <ul>
            <li><strong>延迟分仓决策</strong>：货件抵荷兰前2.5周可调整库存分配</li>
            <li><strong>简化物流</strong>：亚马逊端到端运输+清关（当前支持英国与德国）</li>
          </ul>
          
          <h3>BIXD核心优势</h3>
          <ul>
            <li>💰 <strong>降本15%+</strong>：合并小货凑整柜，规模经济降低单价</li>
            <li>📦 <strong>统一管理</strong>：单票货件追踪，减少运营负担</li>
            <li>📊 <strong>精准预测</strong>：延后分仓决策，避免库存偏差</li>
            <li>🛃 <strong>清关高效</strong>：一次申报，透明查验，税率简化</li>
          </ul>
        </div>
      </div>
    </header>

    <div class="bixd-intro">
      <div class="intro-title">什么是BIXD (Bounded Warehouse)？</div>
      <div class="intro-content">
        亚马逊英欧头程整合计划(BIXD)是一项简化英国与欧盟头程入仓的解决方案：卖家可以把发往英国和欧盟（包括德国、西班牙、法国、意大利和波兰等国家）的货件合并成一个货件，统一发往位于荷兰的亚马逊保税仓。在货件抵达荷兰港口前约2.5周，卖家可以根据实际市场需求，灵活决定英欧两地的库存分仓数量。随后，亚马逊全球物流将负责端到端运输和清关业务，并根据卖家的分仓决策，将货物调拨至英国和欧盟相应的物流中心。这一创新模式让卖家能够延迟物流决策，实现更智能的库存管理。
      </div>
      
      <div class="advantages">
        <div class="advantage-card advantage-1">
          <h4>💰 更好的现金流管理</h4>
          <p>合并较小货运（小方数变大方数，凑整柜概率更高）实现规模经济，降低每单位运输成本，与分多批装运相比可节省至少约15%的运费</p>
        </div>
        <div class="advantage-card advantage-2">
          <h4>📦 更便捷的货件管理</h4>
          <p>一个合并货件发送至荷兰保税仓，无需管理单独的英国和欧盟货运。统一货件追踪，亚马逊负责所有区域分类和配送，减少运营工作量</p>
        </div>
        <div class="advantage-card advantage-3">
          <h4>📊 更精准的销售预测</h4>
          <p>延后物流决策（可在船靠港前2.5周再行决策），使销售预测更加准确，避免缺货或冗余库存的问题</p>
        </div>
        <div class="advantage-card advantage-4">
          <h4>🛃 更高效的清关服务</h4>
          <p>亚马逊全球物流官方管理的清关行保驾护航，只需一次清关文件。简化申报文件、查验进度透明、税率计算简单、支持递延</p>
        </div>
      </div>
      
      <div class="description" style="margin-top: 20px;">
        <button class="description-toggle" @click="toggleEnglishVersion">
          <span>🇺🇸</span>
          <span>{{ showEnglishVersion ? 'Hide English Version' : 'English Version' }}</span>
        </button>
        <div v-show="showEnglishVersion" class="description-content">
          <div class="intro-title">What is BIXD (Bounded Warehouse)?</div>
          <div class="intro-content">
            BIXD is a streamlined shipping solution pilot program that allows you to send one consolidated shipment from China to both UK and EU marketplaces through our bonded facility in the Netherlands (NL). With Amazon Global Logistics managing end-to-end transportation and customs brokerage, you can make smarter inventory decisions just 2.5 weeks before your stock arrives at its destination.
          </div>
          
          <div class="advantages">
            <div class="advantage-card advantage-1">
              <h4>💰 Enhanced Cash Flow Management</h4>
              <p>BIXD allows sellers to consolidate smaller shipments into larger volumes, effectively converting LCL to FCL shipments. This consolidation enables better economies of scale, significantly reducing per-unit shipping costs. Compared to split shipments, sellers can achieve approximately 15% savings on shipping expenses, directly improving their cash flow management.</p>
            </div>
            <div class="advantage-card advantage-2">
              <h4>📦 Simplified Shipment Management</h4>
              <p>Instead of managing separate shipments for the UK and EU markets, sellers can now send one consolidated shipment to the Netherlands bonded warehouse. This unified approach provides seamless tracking and monitoring of all inventory movements. Amazon takes full responsibility for regional sorting and distribution, substantially reducing sellers' operational workload and simplifying their logistics management process.</p>
            </div>
            <div class="advantage-card advantage-3">
              <h4>📊 More Accurate Sales Forecasting</h4>
              <p>BIXD introduces a flexible logistics decision-making timeline, allowing sellers to make final inventory allocation decisions just 2.5 weeks before vessel arrival. This delayed decision point enables sellers to base their distribution choices on recent sales data, resulting in more precise sales forecasting and inventory planning. This feature significantly reduces the risks of stockouts or excess inventory across different regions.</p>
            </div>
            <div class="advantage-card advantage-4">
              <h4>🛃 Professional Customs Handling</h4>
              <p>The program offers professional customs handling through Amazon-managed customs brokers, streamlining the entire clearance process. Sellers benefit from a single customs documentation requirement, transparent inspection progress, and simplified tax calculations. The service also supports deferred customs clearance, making the entire process more efficient and hassle-free for sellers while maintaining full compliance with regulatory requirements.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="calculator">
      <div class="section-title">通过BIXD出运 Ship w/ BIXD</div>
      
      <form @submit.prevent="calculateCost">
        <div class="form-group">
          <label for="port">出运港口 Shipping City</label>
          <select v-model="formData.port" @change="updatePriceTable" required>
            <option value="">请选择港口 Select Port</option>
            <option value="shanghai">上海 Shanghai</option>
            <option value="shenzhen">深圳 Shenzhen</option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="ukVolume">英国货件 UK Shipment (CBM立方米)</label>
            <input type="number" v-model.number="formData.ukVolume" @input="updateVolumeHint" step="0.01" min="0" placeholder="0.00">
          </div>
          <div class="form-group">
            <label for="deVolume">德国货件 DE Shipment (CBM立方米)</label>
            <input type="number" v-model.number="formData.deVolume" @input="updateVolumeHint" step="0.01" min="0" placeholder="0.00">
            <div class="price-hint" v-html="volumeHint"></div>
          </div>
        </div>

        <div v-show="formData.port" class="price-table">
          <table>
            <thead>
              <tr>
                <th>货量区间 Volume (CBM立方米)</th>
                <th>单价 Price per CBM立方米 (人民币¥)</th>
                <th>固定费用 Fixed Fee (人民币¥)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tier, index) in currentPriceTiers" :key="index" :class="{ highlighted: highlightedTier === index }">
                <td>{{ formatTierRange(tier, index) }}</td>
                <td>{{ tier.price.toFixed(2) }}</td>
                <td>{{ tier.fixedFee.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="fixed-fee-note">*固定费用含清关及调拨 Fixed fee includes customs clearance and allocation</div>
        </div>

        <div class="form-section">
          <div class="section-title">不使用BIXD出运 Not Ship w/ BIXD</div>
          
          <div class="form-group">
            <label for="alternativeOption">选择出运方式 Choose Shipping Method</label>
            <select v-model="formData.alternativeOption" required>
              <option value="">请选择 Please Select</option>
              <option value="agl">使用AGL出运 Ship w/ AGL</option>
              <option value="3pl">使用三方承运商出运 Ship w/ 3PL carrier</option>
            </select>
          </div>

          <div v-show="formData.alternativeOption === '3pl'">
            <div class="country-section">
              <div class="country-title">🇬🇧 英国货件 UK Shipment</div>
              <div class="form-row">
                <div class="form-group">
                  <label for="ukUnitPrice">单价 Price per CBM立方米 (¥)</label>
                  <input type="number" v-model.number="formData.ukUnitPrice" step="0.01" min="0" placeholder="0.00">
                </div>
                <div class="form-group">
                  <label for="ukClearanceFee">清关费用 Customs Fee (¥)</label>
                  <input type="number" v-model.number="formData.ukClearanceFee" step="0.01" min="0" placeholder="0.00">
                </div>
              </div>
            </div>

            <div class="country-section">
              <div class="country-title">🇩🇪 德国货件 DE Shipment</div>
              <div class="form-row">
                <div class="form-group">
                  <label for="deUnitPrice">单价 Price per CBM立方米 (¥)</label>
                  <input type="number" v-model.number="formData.deUnitPrice" step="0.01" min="0" placeholder="0.00">
                </div>
                <div class="form-group">
                  <label for="deClearanceFee">清关费用 Customs Fee (¥)</label>
                  <input type="number" v-model.number="formData.deClearanceFee" step="0.01" min="0" placeholder="0.00">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="shipmentDate">预计创建货件日期 Booking Date</label>
          <input type="date" v-model="formData.shipmentDate" required>
        </div>

        <button type="submit" class="calculate-btn">计算成本对比 Compare Cost</button>
      </form>

      <div v-show="showResults" class="results">
        <h3>成本对比结果 Cost Saving</h3>
        <div class="comparison">
          <div class="cost-item bixd">
            <h4>BIXD方案 BIXD Solution</h4>
            <div class="price">{{ formatCurrency(results.bixdTotal) }}</div>
            <div class="discount">{{ results.discountInfo }}</div>
          </div>
          <div class="cost-item current">
            <h4>{{ results.alternativeTitle }}</h4>
            <div class="price">{{ formatCurrency(results.currentTotal) }}</div>
          </div>
        </div>
        <div class="savings" :style="savingsStyle">
          <div v-show="results.showEarlyBird" class="early-bird-tag">早鸟8折 Early Bird 20% OFF</div>
          <div class="amount">{{ results.savingsText }}</div>
          <div class="percentage">({{ Math.abs(results.savingsPercentage).toFixed(1) }}%)</div>
        </div>
      </div>
    </div>

    <footer class="disclaimer">
      <p><strong>免责声明 Disclaimer:</strong></p>
      <p>1) 数据基于AGL价卡，生效日期：2025年7月16日 | Data based on AGL price card, effective date: July 16, 2025</p>
      <p>2) 报价包含：启运港至亚马逊中心的跨境物流费（详情咨询客户经理） | Quote includes: Cross-border logistics from departure port to Amazon centers (consult account manager for details)</p>
      <p>3) 不包含：关税、保险费、查验费等非代理服务费用 | Excludes: Duties, insurance, inspection fees and other non-agency service costs</p>
      <p style="margin-top: 10px; font-size: 11px;">最后更新 Last Updated: {{ lastUpdate }}</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'BIXDCostCalculator',
  data() {
    return {
      showDescription: false,
      showEnglishVersion: false,
      showResults: false,
      highlightedTier: -1,
      volumeHint: '',
      formData: {
        port: '',
        ukVolume: 0,
        deVolume: 0,
        alternativeOption: '',
        ukUnitPrice: 0,
        ukClearanceFee: 0,
        deUnitPrice: 0,
        deClearanceFee: 0,
        shipmentDate: new Date().toISOString().split('T')[0]
      },
      results: {
        bixdTotal: 0,
        currentTotal: 0,
        discountInfo: '',
        alternativeTitle: '',
        savingsText: '',
        savingsPercentage: 0,
        showEarlyBird: false
      },
      priceCard: {
        shanghai: [
          { min: 0, max: 5, price: 728.77, fixedFee: 1055.66 },
          { min: 5, max: 10, price: 692.35, fixedFee: 1055.66 },
          { min: 10, max: 15, price: 638.16, fixedFee: 1055.66 },
          { min: 15, max: Infinity, price: 624.84, fixedFee: 1055.66 }
        ],
        shenzhen: [
          { min: 0, max: 5, price: 741.00, fixedFee: 1188.72 },
          { min: 5, max: 10, price: 704.58, fixedFee: 1188.72 },
          { min: 10, max: 15, price: 650.39, fixedFee: 1188.72 },
          { min: 15, max: Infinity, price: 643.10, fixedFee: 1188.72 }
        ]
      },
      aglPriceCard: {
        shanghai: {
          uk: [
            { min: 1, max: 5, price: 631.38, fixedFee: 667.80 },
            { min: 5, max: 10, price: 607.22, fixedFee: 667.80 },
            { min: 10, max: 15, price: 557.95, fixedFee: 667.80 },
            { min: 15, max: Infinity, price: 497.94, fixedFee: 667.80 }
          ],
          de: [
            { min: 1, max: 5, price: 728.77, fixedFee: 1055.66 },
            { min: 5, max: 10, price: 692.35, fixedFee: 1055.66 },
            { min: 10, max: 15, price: 638.16, fixedFee: 1055.66 },
            { min: 15, max: Infinity, price: 624.84, fixedFee: 1055.66 }
          ]
        },
        shenzhen: {
          uk: [
            { min: 1, max: 5, price: 642.04, fixedFee: 800.86 },
            { min: 5, max: 10, price: 617.88, fixedFee: 800.86 },
            { min: 10, max: 15, price: 568.61, fixedFee: 800.86 },
            { min: 15, max: Infinity, price: 508.59, fixedFee: 800.86 }
          ],
          de: [
            { min: 1, max: 5, price: 741.00, fixedFee: 1188.72 },
            { min: 5, max: 10, price: 704.58, fixedFee: 1188.72 },
            { min: 10, max: 15, price: 650.39, fixedFee: 1188.72 },
            { min: 15, max: Infinity, price: 643.10, fixedFee: 1188.72 }
          ]
        }
      },
      discountRules: [
        { startDate: "2025-06-01", endDate: "2025-09-30", discount: 0.8, name: "夏季8折" },
        { startDate: "2025-10-01", endDate: "2025-10-30", discount: 0.9, name: "秋季9折" },
        { startDate: "2025-11-01", endDate: "2025-12-31", discount: 1.0, name: "无折扣" }
      ]
    }
  },
  computed: {
    currentPriceTiers() {
      return this.formData.port ? this.priceCard[this.formData.port] : []
    },
    savingsStyle() {
      const savings = this.results.currentTotal - this.results.bixdTotal
      if (savings > 0) {
        return { background: 'linear-gradient(135deg, #27ae60, #2ecc71)' }
      } else if (savings < 0) {
        return { background: 'linear-gradient(135deg, #e74c3c, #c0392b)' }
      } else {
        return { background: 'linear-gradient(135deg, #95a5a6, #7f8c8d)' }
      }
    },
    lastUpdate() {
      return new Date().toLocaleString('zh-CN') + ' / ' + new Date().toLocaleString('en-US')
    }
  },
  methods: {
    toggleDescription() {
      this.showDescription = !this.showDescription
    },
    toggleEnglishVersion() {
      this.showEnglishVersion = !this.showEnglishVersion
    },
    updatePriceTable() {
      this.updateVolumeHint()
    },
    updateVolumeHint() {
      const totalVolume = (this.formData.ukVolume || 0) + (this.formData.deVolume || 0)
      const tier = this.getTieredPrice(this.formData.port, totalVolume)
      
      this.highlightedTier = -1
      let hintText = ''
      
      if (tier && totalVolume > 0) {
        const tiers = this.priceCard[this.formData.port]
        const tierIndex = tiers.findIndex(t => t === tier)
        this.highlightedTier = tierIndex
        
        let rangeText
        if (tierIndex === 0) {
          rangeText = `1-${tier.max}CBM立方米`
        } else if (tier.max === Infinity) {
          rangeText = `>${tier.min}CBM立方米`
        } else {
          rangeText = `${tier.min}-${tier.max}CBM立方米`
        }
        
        hintText = `通过BIXD整合英国和德国货件后，您的总货量为${totalVolume.toFixed(2)}CBM立方米，满足${rangeText}区间，运费单价为¥${tier.price.toFixed(2)}/CBM立方米，固定费用为¥${tier.fixedFee.toFixed(2)}`
      }
      
      if (totalVolume >= 68) {
        if (hintText) hintText += '<br>'
        hintText += '<span style="color: #7f8c8d;">总货量超过40HQ柜，如需整柜服务，请详询客户经理。</span>'
      }
      
      this.volumeHint = hintText
    },
    getTieredPrice(port, volume) {
      const adjustedVolume = Math.max(volume, 1)
      const tiers = this.priceCard[port]
      if (!tiers) return null
      
      for (const tier of tiers) {
        if (adjustedVolume >= tier.min && adjustedVolume <= tier.max) {
          return tier
        }
      }
      return tiers[tiers.length - 1]
    },
    getAglTieredPrice(port, country, volume) {
      const adjustedVolume = Math.max(volume, 1)
      const tiers = this.aglPriceCard[port][country]
      if (!tiers) return null
      
      for (const tier of tiers) {
        if (adjustedVolume >= tier.min && adjustedVolume <= tier.max) {
          return tier
        }
      }
      return tiers[tiers.length - 1]
    },
    getApplicableDiscount(date) {
      const checkDate = new Date(date)
      for (const rule of this.discountRules) {
        const start = new Date(rule.startDate)
        const end = new Date(rule.endDate)
        if (checkDate >= start && checkDate <= end) {
          return rule
        }
      }
      return { discount: 1.0, name: "无折扣" }
    },
    calculateBixdCost(port, ukVolume, deVolume, shipmentDate) {
      const totalVolume = ukVolume + deVolume
      const adjustedTotalVolume = Math.max(totalVolume, 1)
      const tier = this.getTieredPrice(port, adjustedTotalVolume)
      if (!tier) return { total: 0, discount: null }

      const baseCost = (adjustedTotalVolume * tier.price) + tier.fixedFee
      const discount = this.getApplicableDiscount(shipmentDate)
      const finalCost = baseCost * discount.discount

      return {
        total: finalCost,
        baseCost: baseCost,
        discount: discount,
        tier: tier
      }
    },
    calculateAglCost(port, ukVolume, deVolume) {
      const adjustedUkVolume = Math.max(ukVolume, ukVolume > 0 ? 1 : 0)
      const adjustedDeVolume = Math.max(deVolume, deVolume > 0 ? 1 : 0)
      
      let ukCost = 0
      let deCost = 0
      
      if (adjustedUkVolume > 0) {
        const ukTier = this.getAglTieredPrice(port, 'uk', adjustedUkVolume)
        if (ukTier) {
          ukCost = (adjustedUkVolume * ukTier.price) + ukTier.fixedFee
        }
      }
      
      if (adjustedDeVolume > 0) {
        const deTier = this.getAglTieredPrice(port, 'de', adjustedDeVolume)
        if (deTier) {
          deCost = (adjustedDeVolume * deTier.price) + deTier.fixedFee
        }
      }
      
      return ukCost + deCost
    },
    calculateCurrentCost(ukPrice, ukFee, dePrice, deFee, ukVolume, deVolume) {
      const adjustedUkVolume = Math.max(ukVolume, ukVolume > 0 ? 1 : 0)
      const adjustedDeVolume = Math.max(deVolume, deVolume > 0 ? 1 : 0)
      return (adjustedUkVolume * ukPrice + ukFee) + (adjustedDeVolume * dePrice + deFee)
    },
    formatCurrency(amount) {
      return `¥${amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    },
    formatTierRange(tier, index) {
      if (index === 0) {
        return `1-${tier.max}CBM立方米（包含1CBM立方米及以下）`
      } else if (tier.max === Infinity) {
        return `>${tier.min}CBM立方米（包含${tier.min}CBM立方米）`
      } else {
        return `${tier.min}-${tier.max}CBM立方米（包含${tier.min}CBM立方米）`
      }
    },
    saveUserInput(data) {
      const timestamp = new Date().toISOString()
      const inputData = {
        ...data,
        timestamp: timestamp,
        id: Date.now()
      }
      
      const existingData = JSON.parse(localStorage.getItem('bixd_user_inputs') || '[]')
      existingData.push(inputData)
      
      if (existingData.length > 100) {
        existingData.splice(0, existingData.length - 100)
      }
      
      localStorage.setItem('bixd_user_inputs', JSON.stringify(existingData))
    },
    calculateCost() {
      const { port, ukVolume, deVolume, alternativeOption, shipmentDate } = this.formData
      
      if (!port || (!ukVolume && !deVolume) || !alternativeOption) {
        alert('请填写必要信息 Please fill in required information')
        return
      }

      let currentCost = 0
      let alternativeTitle = ''

      if (alternativeOption === 'agl') {
        currentCost = this.calculateAglCost(port, ukVolume, deVolume)
        alternativeTitle = 'AGL方案 AGL Solution (Non BIXD)'
      } else if (alternativeOption === '3pl') {
        const { ukUnitPrice, ukClearanceFee, deUnitPrice, deClearanceFee } = this.formData
        currentCost = this.calculateCurrentCost(ukUnitPrice, ukClearanceFee, deUnitPrice, deClearanceFee, ukVolume, deVolume)
        alternativeTitle = '三方承运商方案 3PL Solution'
      }

      this.saveUserInput(this.formData)

      const bixdResult = this.calculateBixdCost(port, ukVolume, deVolume, shipmentDate)
      const savings = currentCost - bixdResult.total
      const savingsPercentage = currentCost > 0 ? (savings / currentCost * 100) : 0

      this.results = {
        bixdTotal: bixdResult.total,
        currentTotal: currentCost,
        alternativeTitle: alternativeTitle,
        savingsPercentage: savingsPercentage,
        showEarlyBird: bixdResult.discount && bixdResult.discount.discount === 0.8
      }

      if (bixdResult.discount && bixdResult.discount.discount < 1) {
        const discountAmount = bixdResult.baseCost - bixdResult.total
        this.results.discountInfo = `${bixdResult.discount.name} (省${this.formatCurrency(discountAmount)})`
      } else {
        this.results.discountInfo = bixdResult.discount.name
      }

      if (savings > 0) {
        this.results.savingsText = `预计节省 Estimated Savings: ${this.formatCurrency(savings)}`
      } else if (savings < 0) {
        this.results.savingsText = `BIXD多花 BIXD costs more: ${this.formatCurrency(Math.abs(savings))}`
      } else {
        this.results.savingsText = `成本相同 Same cost`
      }

      this.showResults = true
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f7fa;
  color: #333;
  line-height: 1.6;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

header h1 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 28px;
}

.subtitle {
  font-size: 18px;
  color: #7f8c8d;
  font-weight: normal;
}

.description {
  background: #e8f4fd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  position: relative;
}

.description-toggle {
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  text-align: left;
}

.description-content {
  margin-top: 15px;
  font-size: 14px;
  color: #555;
}

.description-content h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 16px;
}

.description-content ul {
  margin-left: 20px;
  margin-top: 8px;
}

.description-content li {
  margin-bottom: 8px;
}

.bixd-intro {
  background: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.intro-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: center;
}

.intro-content {
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 25px;
  text-align: left;
}

.advantages {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.advantage-card {
  padding: 20px;
  border-radius: 8px;
  color: white;
  text-align: center;
}

.advantage-card h4 {
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
}

.advantage-card p {
  font-size: 13px;
  line-height: 1.5;
  text-align: left;
}

.advantage-1 { background: #232f3e; }
.advantage-2 { background: #ff9900; }
.advantage-3 { background: #146eb4; }
.advantage-4 { background: #ff6600; }

.calculator {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-section {
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-top: 20px;
}

.country-section {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
}

.country-title {
  font-weight: 600;
  color: #34495e;
  margin-bottom: 10px;
  font-size: 16px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
  font-size: 14px;
}

input, select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  outline: none;
  border-color: #3498db;
}

.price-hint {
  font-size: 12px;
  color: #27ae60;
  margin-top: 5px;
  font-weight: 500;
}

.calculate-btn {
  width: 100%;
  background: #3498db;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 20px;
}

.calculate-btn:hover {
  background: #2980b9;
}

.results {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.results h3 {
  margin-bottom: 20px;
  color: #2c3e50;
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.cost-item {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 6px;
  text-align: center;
}

.cost-item.bixd {
  border-left: 4px solid #27ae60;
}

.cost-item.current {
  border-left: 4px solid #e74c3c;
}

.cost-item h4 {
  margin-bottom: 10px;
  color: #555;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

.discount {
  font-size: 12px;
  color: #27ae60;
  font-weight: 500;
}

.savings {
  color: white;
  padding: 20px;
  border-radius: 6px;
  text-align: center;
  position: relative;
}

.savings .amount {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.savings .percentage {
  font-size: 14px;
  opacity: 0.9;
}

.early-bird-tag {
  position: absolute;
  top: -8px;
  right: 10px;
  background: #f39c12;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}

.price-table {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  margin-top: 10px;
}

.price-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  border-radius: 6px;
  overflow: hidden;
}

.price-table th, .price-table td {
  padding: 12px 8px;
  text-align: center;
  border: none;
}

.price-table th {
  background: #1e3a8a;
  color: white;
  font-weight: 600;
}

.price-table tr:nth-child(even) {
  background: #e0f2fe;
}

.price-table tr:nth-child(odd) {
  background: #f0f9ff;
}

.price-table tr.highlighted {
  background: #fbbf24 !important;
  color: #1f2937;
  font-weight: 600;
}

.fixed-fee-note {
  font-size: 11px;
  color: #7f8c8d;
  font-style: italic;
  margin-top: 8px;
}

.disclaimer {
  background: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  margin-top: 30px;
  font-size: 12px;
  color: #7f8c8d;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .form-row, .comparison {
    grid-template-columns: 1fr;
  }
  
  .advantages {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 10px;
  }
  
  .calculator, .bixd-intro {
    padding: 20px;
  }
}
</style>
