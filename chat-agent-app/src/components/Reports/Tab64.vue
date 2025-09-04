<template>
  <div class="container bixd-theme">
    <header>
      <h1 class="page-title">BIXD头程省钱计算器<br><span class="subtitle">BIXD Cost Calculator</span></h1>
      
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

    <div class="bixd-intro card-block">
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

    <div class="calculator card-block">
      <div class="section-title accent-section">通过BIXD出运 Ship w/ BIXD</div>
      
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
          <div class="section-title sub-section">不使用BIXD出运 Not Ship w/ BIXD</div>
          
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
        <h3 class="results-title">成本对比结果 Cost Saving</h3>
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
/* ================= Theme Tokens (scoped) ================= */
.bixd-theme { --color-primary:#232f3e; --color-primary-grad-end:#2f3d4a; --color-accent:#ff9900; --color-accent-alt:#ffb84d; --color-bg:#f5f7fa; --color-surface:#ffffff; --color-border:#e3e6ea; --color-soft-border:#eceff3; --color-text:#232f3e; --color-text-sec:#555; --radius-sm:6px; --radius-md:10px; --radius-lg:14px; --shadow-sm:0 2px 6px -2px rgba(0,0,0,.08),0 1px 3px rgba(0,0,0,.06); --shadow-md:0 4px 14px -4px rgba(0,0,0,.12),0 2px 6px -2px rgba(0,0,0,.08); --shadow-hover:0 10px 28px -6px rgba(0,0,0,.18),0 4px 12px -3px rgba(0,0,0,.12); }

* { margin:0; padding:0; box-sizing:border-box; }
.container { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; background:var(--color-bg); color:var(--color-text); line-height:1.6; max-width:1060px; margin:0 auto; padding:26px 28px 60px; }

header { text-align:center; margin:0 0 36px; position:relative; }
.page-title { color:var(--color-primary); margin:0 0 10px; font-size:30px; font-weight:600; letter-spacing:.5px; line-height:1.25; }
.page-title .subtitle { font-size:16px; display:inline-block; margin-top:4px; font-weight:500; background:linear-gradient(90deg,var(--color-accent),var(--color-accent-alt)); -webkit-background-clip:text; background-clip:text; color:transparent; letter-spacing:.5px; }

/* Description (collapsible) */
.description { background:linear-gradient(130deg,#fff8eb,#fff3dc 55%,#ffe8bd); border:1px solid #ffdca0; border-radius:var(--radius-lg); padding:16px 18px 18px; margin:0 0 24px; position:relative; box-shadow:var(--shadow-sm); overflow:hidden; }
.description:before { content:''; position:absolute; inset:0; background:linear-gradient(160deg,rgba(255,153,0,.18),rgba(255,184,77,0) 55%); mix-blend-mode:multiply; pointer-events:none; }
.description-toggle { background:transparent; border:none; cursor:pointer; font-size:13px; font-weight:600; letter-spacing:.3px; color:#8a5600; display:flex; align-items:center; gap:8px; width:100%; text-align:left; padding:2px 0; transition:.3s; }
.description-toggle:hover { color:#5d3a00; }
.description-content { margin-top:14px; font-size:13px; color:#533c14; line-height:1.55; animation:fadeSlide .45s ease; }
.description-content h3 { margin:18px 0 10px; font-size:15px; font-weight:600; color:#704a00; }
.description-content ul { margin:6px 0 14px 20px; display:flex; flex-direction:column; gap:4px; }
.description-content li { position:relative; }

/* Card Block Wrapper */
.card-block { background:var(--color-surface); border:1px solid var(--color-border); border-radius:var(--radius-lg); padding:30px 34px 34px; position:relative; box-shadow:var(--shadow-md); transition:.35s; overflow:hidden; }
.card-block:before { content:''; position:absolute; inset:0; pointer-events:none; background:radial-gradient(circle at 90% 15%,rgba(255,153,0,.18),transparent 60%); }
.card-block:hover { box-shadow:var(--shadow-hover); border-color:var(--color-accent); transform:translateY(-2px); }

/* Intro */
.intro-title { font-size:22px; font-weight:600; color:var(--color-primary); margin:0 0 18px; letter-spacing:.5px; text-align:center; position:relative; }
.intro-title:after { content:''; display:block; width:58px; height:5px; border-radius:4px; margin:10px auto 0; background:linear-gradient(90deg,var(--color-accent),var(--color-accent-alt)); }
.intro-content { font-size:14px; line-height:1.7; margin:0 0 28px; color:#333; }

/* Advantages */
.advantages { display:grid; grid-template-columns:repeat(2,1fr); gap:22px; margin-top:8px; }
.advantage-card { padding:20px 20px 22px; border-radius:14px; position:relative; background:linear-gradient(130deg,#232f3e,#2f3d4a); color:#fff; box-shadow:var(--shadow-sm); overflow:hidden; text-align:left; display:flex; flex-direction:column; gap:10px; border:1px solid #2c3947; transition:.4s; }
.advantage-card:before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 85% 20%,rgba(255,153,0,.35),transparent 60%); opacity:.9; mix-blend-mode:screen; }
.advantage-card h4 { margin:0; font-size:16px; font-weight:600; letter-spacing:.3px; display:flex; align-items:center; gap:6px; }
.advantage-card p { margin:0; font-size:12.5px; line-height:1.55; color:#e5e9ed; letter-spacing:.2px; }
.advantage-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-hover); border-color:var(--color-accent); }
.advantage-card:hover h4 { color:var(--color-accent-alt); }

/* Calculator / Sections */
.section-title { font-size:18px; font-weight:600; margin:0 0 22px; letter-spacing:.4px; position:relative; color:var(--color-primary); padding-bottom:10px; }
.accent-section:after { content:''; position:absolute; left:0; bottom:0; width:120px; height:5px; border-radius:4px; background:linear-gradient(90deg,var(--color-accent),var(--color-accent-alt)); }
.sub-section { margin-top:4px; }
.sub-section:after { content:''; position:absolute; left:0; bottom:0; width:90px; height:4px; border-radius:4px; background:linear-gradient(90deg,#d0d5db,#b6bcc3); }

.form-group { margin:0 0 20px; }
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:22px; }
.form-section { border-top:1px solid var(--color-soft-border); padding-top:24px; margin-top:34px; }
.country-section { background:linear-gradient(110deg,#f8f9fa,#f1f4f7); border:1px solid #e0e4e8; border-radius:12px; padding:18px 18px 20px; margin:0 0 18px; position:relative; overflow:hidden; }
.country-title { font-weight:600; color:var(--color-primary); margin:0 0 14px; font-size:15px; letter-spacing:.4px; }
label { display:block; margin:0 0 6px; font-weight:600; font-size:12.5px; letter-spacing:.5px; color:#4a5662; text-transform:uppercase; }
input, select { width:100%; padding:12px 14px; border:1px solid #ccd3da; border-radius:10px; font-size:13px; background:#fff; transition:.3s; box-shadow:0 1px 2px rgba(0,0,0,.04); }
input:focus, select:focus { outline:none; border-color:var(--color-accent); box-shadow:0 0 0 3px rgba(255,153,0,.25); }
input::placeholder { color:#a0a8b0; }

.price-hint { font-size:11.5px; color:#256c37; margin-top:6px; font-weight:600; letter-spacing:.3px; background:#e6f6ec; padding:6px 10px; border-radius:20px; display:inline-block; }

.calculate-btn { width:100%; background:linear-gradient(90deg,var(--color-primary),#1b2733); color:var(--color-accent-alt); padding:16px 20px; border:none; border-radius:12px; font-size:15px; font-weight:600; cursor:pointer; letter-spacing:.6px; margin-top:14px; display:flex; align-items:center; justify-content:center; gap:8px; transition:.4s; position:relative; overflow:hidden; }
.calculate-btn:before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 15% 15%,rgba(255,153,0,.3),transparent 60%); opacity:.6; transition:.5s; }
.calculate-btn:hover { transform:translateY(-2px); box-shadow:var(--shadow-hover); }
.calculate-btn:hover:before { transform:scale(1.2); }
.calculate-btn:active { transform:translateY(0); }

/* Results */
.results { margin:40px 0 0; padding-top:24px; border-top:1px dashed var(--color-soft-border); display:flex; flex-direction:column; gap:24px; }
.results-title { margin:0; font-size:20px; font-weight:600; color:var(--color-primary); letter-spacing:.5px; position:relative; }
.results-title:after { content:''; width:70px; height:5px; border-radius:4px; background:linear-gradient(90deg,var(--color-accent),var(--color-accent-alt)); display:block; margin-top:10px; }
.comparison { display:grid; grid-template-columns:1fr 1fr; gap:26px; }
.cost-item { background:linear-gradient(120deg,#f5f7fa,#f0f3f6); border:1px solid var(--color-soft-border); padding:22px 22px 24px; border-radius:14px; position:relative; display:flex; flex-direction:column; gap:6px; box-shadow:var(--shadow-sm); transition:.35s; }
.cost-item:before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 85% 20%,rgba(255,153,0,.15),transparent 65%); opacity:.9; pointer-events:none; }
.cost-item.bixd { border-left:6px solid #27ae60; }
.cost-item.current { border-left:6px solid #b42318; }
.cost-item h4 { margin:0 0 4px; font-size:13px; font-weight:600; letter-spacing:.4px; color:#4a5662; text-transform:uppercase; }
.price { font-size:26px; font-weight:700; letter-spacing:.4px; color:var(--color-primary); margin:0 0 4px; }
.discount { font-size:11px; font-weight:600; color:#256c37; letter-spacing:.4px; background:#e6f6ec; padding:4px 10px; width:fit-content; border-radius:20px; }
.cost-item:hover { transform:translateY(-4px); box-shadow:var(--shadow-hover); border-color:var(--color-accent); }

.savings { color:#fff; padding:26px 24px 28px; border-radius:16px; text-align:center; position:relative; overflow:hidden; box-shadow:0 6px 22px -6px rgba(0,0,0,.25); display:flex; flex-direction:column; gap:6px; }
.savings:before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 20% 25%,rgba(255,255,255,.18),transparent 60%); pointer-events:none; mix-blend-mode:overlay; }
.savings .amount { font-size:18px; font-weight:600; letter-spacing:.4px; }
.savings .percentage { font-size:13px; opacity:.9; letter-spacing:.4px; }
.early-bird-tag { position:absolute; top:-10px; right:14px; background:linear-gradient(90deg,#ff9900,#ffb84d); color:#232f3e; padding:6px 12px; border-radius:30px; font-size:11px; font-weight:700; letter-spacing:.6px; box-shadow:0 4px 14px -4px rgba(0,0,0,.35); }

/* Price Table */
.price-table { background:linear-gradient(110deg,#f8f9fa,#f1f4f7); border:1px solid var(--color-soft-border); border-radius:14px; padding:18px 18px 20px; margin-top:10px; box-shadow:var(--shadow-sm); }
.price-table table { width:100%; border-collapse:separate; border-spacing:0; font-size:12px; overflow:hidden; border-radius:10px; }
.price-table th { background:linear-gradient(90deg,var(--color-primary),var(--color-primary-grad-end)); color:#fff; padding:10px 8px; font-weight:600; letter-spacing:.4px; text-align:center; position:sticky; top:0; z-index:1; }
.price-table td { background:#fff; padding:10px 8px; border-top:1px solid #eef0f2; text-align:center; color:#333; }
.price-table tr:nth-child(even) td { background:#fafbfc; }
.price-table tr.highlighted td { background:linear-gradient(90deg,#ffedcc,#ffe1b0)!important; color:#4a3900; font-weight:600; box-shadow:inset 0 0 0 1px #ffcf70; }
.fixed-fee-note { font-size:11px; color:#66717c; font-style:italic; margin-top:10px; letter-spacing:.3px; }

/* Disclaimer */
.disclaimer { background:linear-gradient(120deg,#f5f7fa,#eef1f4); border:1px solid var(--color-soft-border); border-radius:14px; padding:18px 22px 22px; margin-top:50px; font-size:11.5px; color:#4a5662; line-height:1.55; box-shadow:var(--shadow-sm); position:relative; }
.disclaimer:before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 85% 15%,rgba(255,153,0,.15),transparent 60%); pointer-events:none; }
.disclaimer p { margin:0 0 4px; }
.disclaimer p strong { color:var(--color-primary); }

/* Animations */
@keyframes fadeSlide { from { opacity:0; transform:translateY(6px);} to { opacity:1; transform:translateY(0);} }

/* Responsive */
@media (max-width: 900px) { .advantages { grid-template-columns:1fr; } .form-row { grid-template-columns:1fr; } .container { padding:22px 20px 60px; } .card-block { padding:26px 26px 30px; } }
@media (max-width: 640px) { .page-title { font-size:24px; } .intro-title { font-size:20px; } .section-title { font-size:16px; } .card-block { padding:22px 20px 26px; } .calculate-btn { font-size:14px; } .comparison { grid-template-columns:1fr; } .savings { padding:22px 20px 24px; } }
@media (prefers-reduced-motion: reduce) { .advantage-card, .calculate-btn, .cost-item, .savings, .description-content { animation:none!important; transition:none!important; transform:none!important; }
  .calculate-btn:hover, .advantage-card:hover, .cost-item:hover { transform:none; } }
</style>
