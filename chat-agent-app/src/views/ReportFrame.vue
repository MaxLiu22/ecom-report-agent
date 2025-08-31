<script setup>
import { ref } from 'vue';
import OverviewDirectory from '@/components/Reports/TianOffered/Overview_Directory.vue';

const activeTab = ref(0);
const activeSubSection = ref('2.1');

const tabs = [
  { id: 0, title: '欧洲站点拓展评估', key: 'evaluation' },
  { id: 1, title: '欧洲站拓展解决方案定制', key: 'solutions' },
  { id: 2, title: '政策更新', key: 'policy' },
  { id: 3, title: '行动计划', key: 'action' },
  { id: 4, title: '其他', key: 'other' }
];

const subSections = [
  { id: '2.1', title: '2.1 欧盟内部物流方案' },
  { id: '2.2', title: '2.2 英国和欧盟间物流方案' },
  { id: '2.3', title: '2.3 更多成本节约（CEE 中欧计划）' }
];

const switchTab = (tabId) => {
  activeTab.value = tabId;
  if (tabId === 1) {
    activeSubSection.value = '2.1'; // 重置到第一个子选项
  }
};

const switchSubSection = (subId) => {
  activeSubSection.value = subId;
};
</script>

<template>
  <div class="report-frame">
    <!-- Tab 导航栏 -->
    <div class="tab-navigation">
      <div class="tab-container">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-item"
          :class="{ 'active': activeTab === tab.id }"
          @click="switchTab(tab.id)"
        >
          <span class="tab-title">{{ tab.title }}</span>
          <div class="tab-indicator" v-if="activeTab === tab.id"></div>
        </div>
      </div>
    </div>

    <!-- Tab 内容区域 -->
    <div class="tab-content">
      <!-- Tab 1: 欧洲站点拓展评估 -->
      <div v-if="activeTab === 0" class="content-panel">
      <!--
        <div class="content-header">
          <h2>🌍 欧洲站点拓展评估</h2>
          <p class="content-description">全面评估您的欧洲市场拓展机会与挑战</p>
        </div> -->
        <div class="content-body">
          <OverviewDirectory />
          <!-- 欧洲站点评估表格 -->
          <div class="aws-table-container">
            <table class="aws-table" cellspacing="0" cellpadding="0">
              <thead>
                <tr class="aws-header-group">
                  <th colspan="3"></th>
                  <th class="aws-region-header aws-uk">0.英国和欧盟间物流</th>
                  <th colspan="4" class="aws-region-header aws-eu">1.EU5欧盟内物流</th>
                </tr>
                <tr class="aws-sub-header">
                  <th class="aws-th">MCID</th>
                  <th class="aws-th">账户名称</th>
                  <th class="aws-th">指标名称</th>
                  <th class="aws-th">英国</th>
                  <th class="aws-th">德国</th>
                  <th class="aws-th">意大利</th>
                  <th class="aws-th">法国</th>
                  <th class="aws-th">西班牙</th>
                </tr>
              </thead>
              <tbody>
                <tr class="aws-row">
                  <td rowspan="9" class="aws-td aws-mcid">157076946612</td>
                  <td rowspan="9" class="aws-td aws-account">Sinuolong Lighting</td>
                  <td class="aws-td aws-metric">账户健康情况</td>
                  <td class="aws-td aws-value"><span class="aws-empty">—</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                </tr>
                <tr class="aws-row">
                  <td class="aws-td aws-metric">FBA选品数量</td>
                  <td class="aws-td aws-value"><span class="aws-empty">—</span></td>
                  <td class="aws-td aws-value"><span class="aws-number">44</span></td>
                  <td class="aws-td aws-value"><span class="aws-number">41</span></td>
                  <td class="aws-td aws-value"><span class="aws-number">40</span></td>
                  <td class="aws-td aws-value"><span class="aws-number">36</span></td>
                </tr>
                <tr class="aws-row">
                  <td class="aws-td aws-metric">FBA潜在销售机会 (数量)*</td>
                  <td class="aws-td aws-value"><span class="aws-empty">—</span></td>
                  <td class="aws-td aws-value"><span class="aws-error">✗</span></td>
                  <td class="aws-td aws-value"><span class="aws-number">3</span></td>
                  <td class="aws-td aws-value"><span class="aws-number">4</span></td>
                  <td class="aws-td aws-value"><span class="aws-number">8</span></td>
                </tr>
                <tr class="aws-row">
                  <td class="aws-td aws-metric">FBA BA /3P BA %</td>
                  <td class="aws-td aws-value"><span class="aws-empty">—</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                </tr>
                <tr class="aws-row">
                  <td class="aws-td aws-metric">FBA GMS/total GMS %</td>
                  <td class="aws-td aws-value"><span class="aws-empty">—</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                </tr>
                <tr class="aws-row">
                  <td class="aws-td aws-metric">持有有效增值税号国家</td>
                  <td class="aws-td aws-value"><span class="aws-empty">—</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                </tr>
                <tr class="aws-row">
                  <td class="aws-td aws-metric">授权仓储国家</td>
                  <td class="aws-td aws-value"><span class="aws-empty">—</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                </tr>
                <tr class="aws-row">
                  <td class="aws-td aws-metric">是否启用亚马逊物流欧洲整合服务(PanEU)</td>
                  <td class="aws-td aws-value"><span class="aws-empty">—</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                  <td class="aws-td aws-value"><span class="aws-success">✓</span></td>
                </tr>
                <tr class="aws-row">
                  <td class="aws-td aws-metric">是否使用英国和欧盟之间的远程配送服务</td>
                  <td class="aws-td aws-value"><span class="aws-empty">—</span></td>
                  <td class="aws-td aws-value"><span class="aws-error">✗</span></td>
                  <td class="aws-td aws-value"><span class="aws-error">✗</span></td>
                  <td class="aws-td aws-value"><span class="aws-error">✗</span></td>
                  <td class="aws-td aws-value"><span class="aws-error">✗</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Tab 2: 欧洲站拓展解决方案定制 -->
      <div v-if="activeTab === 1" class="content-panel">
        <div class="content-header">
          <h2>🛠️ 欧洲站拓展解决方案定制</h2>
          <p class="content-description">为您量身定制的欧洲市场拓展解决方案</p>
        </div>
        
        <!-- 下拉菜单 -->
        <div class="sub-section-dropdown">
          <select 
            v-model="activeSubSection" 
            @change="switchSubSection(activeSubSection)"
            class="dropdown-select"
          >
            <option 
              v-for="section in subSections" 
              :key="section.id" 
              :value="section.id"
            >
              {{ section.title }}
            </option>
          </select>
        </div>
        
        <div class="content-body">
          <div class="solution-sections">
            <!-- 2.1 欧盟内部物流方案 -->
            <div v-if="activeSubSection === '2.1'" class="solution-section">
              <h2 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#232f3e;">2.1 欧盟内部物流方案</h2>
              <div class="solution-details">
                <!-- 欧盟内部方案介绍与对比 -->
                <div style="margin:20px 0;">
                  <h4 style="color:#333;font-size:16px;margin:10px 0;">欧洲站点拓展解决方案</h4>
                  <h5 style="color:#666;font-size:14px;margin:10px 0;">欧盟内部物流方案</h5>
                  <div style="margin:18px 0 24px 0;background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 4px 14px rgba(0, 0, 0, 0.06);position:relative;overflow:hidden;">
                    <div style="display:flex;align-items:center;gap:10px;padding:14px 18px;background:linear-gradient(135deg, #ff9d33 0%, #ff7f0e 100%);border-bottom:1px solid rgba(255, 255, 255, 0.25);">
                      <span style="background:rgba(255, 255, 255, 0.25);width:34px;height:34px;display:inline-flex;align-items:center;justify-content:center;border-radius:8px;font-size:18px;color:#fff;font-weight:600;box-shadow:0 2px 4px rgba(0, 0, 0, 0.15);">▶</span>
                      <div style="display:flex;flex-direction:column;">
                        <span style="font-size:16px;font-weight:700;color:#fff;letter-spacing:0.5px;">欧盟内部方案介绍与对比</span>
                        <span style="font-size:11px;color:#fff;opacity:0.9;">对比 EFN 与 PanEU 关键差异，突出成本/速度与准入要求</span>
                      </div>
                    </div>
                    <div style="padding:16px 18px 6px 18px;">
                      <div style="font-size:12px;color:#555;line-height:1.5;margin-bottom:14px;background:#fff9ef;border:1px solid #ffd7b3;padding:10px 12px;border-radius:8px;">
                        <strong style="color:#c05621;">说明：</strong> 下表展示卖家在不同跨国 fulfillment 模式下的入仓策略、成本结构与配送速度差异，帮助快速判断是否升级至 PanEU。
                      </div>
                  
                      <div class="table-container" style="overflow-x:auto;margin:0 0 16px 0;">
                        <table style="width:100%;border-collapse:collapse;font-size:11px;border:2px solid #ddd;margin-bottom:15px;background:#fff;" cellspacing="0" cellpadding="0">
                          <thead>
                            <tr>
                              <th rowspan="2" style="background:linear-gradient(135deg, #333 0%, #666 100%);color:white;padding:12px 8px;border:1px solid #ddd;text-align:center;width:80px;">方案类型</th>
                              <th style="background:linear-gradient(135deg, #ff8c00 0%, #ff8c00 100%);color:white;padding:12px 8px;border:1px solid #ddd;text-align:center;width:25%;">欧盟 FBA 的物流模式</th>
                              <th style="background:linear-gradient(135deg, #ff8c00 0%, #ff8c00 100%);color:white;padding:12px 8px;border:1px solid #ddd;text-align:center;width:35%;">欧盟之间的远程配送网络<br/>European Fulfillment Network (EFN)</th>
                              <th style="background:linear-gradient(135deg, #ff8c00 0%, #ff8c00 100%);color:white;padding:12px 8px;border:1px solid #ddd;text-align:center;width:35%;">⭐亚马逊物流欧洲整合服务<br/>Pan European (PanEU)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style="background:#f8f9fa;color:#333;font-weight:600;padding:10px 8px;border:1px solid #ddd;text-align:center;">简介</td>
                              <td style="padding:10px 8px;border:1px solid #ddd;font-size:10px;">卖家入仓至欧盟任一国家后，即可由此国的仓库远程配送到其他欧盟国家</td>
                              <td style="padding:10px 8px;border:1px solid #ddd;font-size:10px;">卖家入仓至欧盟任一国家后，亚马逊将货存储在卖家启用了存储服务的国家/地区的欧盟运营中心内，并自主在这些卖家地区之间分配存储，不额外收取费用</td>
                              <td style="padding:10px 8px;border:1px solid #ddd;font-size:10px;background:#fff9e6;border-left:3px solid #ff8c00;">卖家入仓至欧盟任一国家后，亚马逊将货存储在卖家启用了存储服务的国家/地区的欧盟运营中心内，并自主在这些卖家地区之间分配存储，不额外收取费用</td>
                            </tr>
                            <tr>
                              <td rowspan="2" style="background:#f8f9fa;color:#333;font-weight:600;padding:10px 8px;border:1px solid #ddd;text-align:center;">加入条件</td>
                              <td style="padding:10px 8px;border:1px solid #ddd;text-align:center;"><div style="font-weight:600;margin-bottom:5px;font-size:10px;">ASIN 设置</div><div style="font-size:9px;">需使用相同 ASIN/FNSKU#</div></td>
                              <td style="padding:10px 8px;border:1px solid #ddd;text-align:center;"><div style="font-weight:600;margin-bottom:5px;font-size:10px;">ASIN 设置</div><div style="font-size:9px;">需使用相同 ASIN/FNSKU#</div></td>
                              <td style="padding:10px 8px;border:1px solid #ddd;text-align:center;"><div style="font-weight:600;margin-bottom:5px;font-size:10px;">ASIN 设置</div><div style="font-size:9px;background:#fff9e6;padding:4px;border-radius:3px;border:1px solid #ff8c00;">德法意西需使用相同 ASIN/FNSKU#</div></td>
                            </tr>
                            <tr>
                              <td style="padding:10px 8px;border:1px solid #ddd;text-align:center;"><div style="font-weight:600;margin-bottom:5px;font-size:10px;">仓储国要求*</div><div style="font-size:9px;">仅开启一国仓储<br/>(需要1个 VAT)</div></td>
                              <td style="padding:10px 8px;border:1px solid #ddd;text-align:center;"><div style="font-weight:600;margin-bottom:5px;font-size:10px;">仓储国要求*</div><div style="font-size:9px;">仅开启一国仓储<br/>(需要1个 VAT)</div></td>
                              <td style="padding:10px 8px;border:1px solid #ddd;text-align:center;"><div style="font-weight:600;margin-bottom:5px;font-size:10px;">仓储国要求*</div><div style="font-size:9px;background:#fff9e6;padding:4px;border-radius:3px;border:1px solid #ff8c00;">需要德法意西中，至少开启2国仓储（至少2个 VAT），<br/>启用仓储的国家为PanEU，未启用国家为 EFN</div></td>
                            </tr>
                            <tr>
                              <td style="background:#f8f9fa;color:#333;font-weight:600;padding:10px 8px;border:1px solid #ddd;text-align:center;">头程物流<br/>(CN->EU FBA CC)</td>
                              <td style="padding:10px 8px;border:1px solid #ddd;text-align:center;font-size:10px;">需发货至欧盟某1个国家，成本低</td>
                              <td style="padding:10px 8px;border:1px solid #ddd;text-align:center;font-size:10px;">需发货至欧盟某1个国家，成本低</td>
                              <td style="padding:10px 8px;border:1px solid #ddd;text-align:center;font-size:10px;">需发货至欧盟某1个国家，成本低</td>
                            </tr>
                            <tr>
                              <td style="background:#f8f9fa;color:#333;font-weight:600;padding:10px 8px;border:1px solid #ddd;text-align:center;">尾程配送<br/>(FBA)</td>
                              <td style="padding:10px 8px;border:1px solid #ddd;text-align:center;font-size:10px;"><span style="background:#fff2e8;color:#ff6b35;border:1px solid #ff6b35;padding:2px 6px;border-radius:12px;font-size:9px;margin:2px;">跨境配送</span>：费用高，3-5天送达</td>
                              <td style="padding:10px 8px;border:1px solid #ddd;text-align:center;font-size:10px;"><span style="background:#fff5f0;color:#ff6b35;border:1px solid #ff6b35;padding:2px 6px;border-radius:12px;font-size:9px;margin:2px;">本地配送</span>：费用节约高达53%，1-2天送达<br/><span style="background:#fff2e8;color:#ff6b35;border:1px solid #ff6b35;padding:2px 6px;border-radius:12px;font-size:9px;margin:2px;">跨境配送</span>+<span style="background:#fff2e8;color:#ff6b35;border:1px solid #ff6b35;padding:2px 6px;border-radius:12px;font-size:9px;margin:2px;">跨境配送</span></td>
                              <td style="padding:10px 8px;border:1px solid #ddd;text-align:center;font-size:10px;"><span style="background:#fff5f0;color:#ff6b35;border:1px solid #ff6b35;padding:2px 6px;border-radius:12px;font-size:9px;margin:2px;">本地配送</span>+<span style="background:#fff2e8;color:#ff6b35;border:1px solid #ff6b35;padding:2px 6px;border-radius:12px;font-size:9px;margin:2px;">跨境配送</span></td>
                            </tr>
                          </tbody>
                        </table>
                        <div style="display:flex;flex-wrap:wrap;gap:12px;margin:4px 0 10px 0;">
                          <div style="flex:1 1 240px;background:#f1f5f9;border:1px solid #d8e0e8;padding:10px 12px;border-radius:8px;font-size:11px;line-height:1.5;">
                            <strong style="color:#334155;">何时采用 EFN：</strong><br/>单一仓储早期试水阶段 / SKU 规模较少 / 资金占用需控制。
                          </div>
                          <div style="flex:1 1 240px;background:#fff1e6;border:1px solid #ffd2af;padding:10px 12px;border-radius:8px;font-size:11px;line-height:1.5;">
                            <strong style="color:#c05621;">升级 PanEU 信号：</strong><br/>多国已有自然出单 + 跨境配送费占比高 + 核心 ASIN 库存波动导致转化下滑。
                          </div>
                          <div style="flex:1 1 240px;background:#e6f7ff;border:1px solid #b3e3ff;padding:10px 12px;border-radius:8px;font-size:11px;line-height:1.5;">
                            <strong style="color:#075985;">收益结构：</strong><br/>履约费节约 + 配送时效提升 → 转化提升 + 库存分布智能化降低缺货风险。
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- PanEU 成本节约 -->
                  <div style="margin-top:20px;padding:20px;background:#ffffff;border:1px solid #ddd;border-radius:6px;">
                    <h5 style="color:#333;font-size:14px;font-weight:600;margin:0 0 15px 0;padding-bottom:8px;border-bottom:2px solid #ff8c00;">启用PanEU国家仓储获得配送费用节约</h5>
                    <table style="width:100%;border-collapse:collapse;font-size:10px;background:#ffffff;border:1px solid #ddd;border-radius:4px;margin-bottom:10px;" cellspacing="0" cellpadding="0">
                      <thead>
                        <tr>
                          <th style="background:#333;color:white;font-weight:600;padding:10px 8px;text-align:center;border-right:1px solid #555;font-size:9px;">跨境配送国家</th>
                          <th style="background:#333;color:white;font-weight:600;padding:10px 8px;text-align:center;border-right:1px solid #555;font-size:9px;">预计可节约费用(RMB)</th>
                          <th style="background:#333;color:white;font-weight:600;padding:10px 8px;text-align:center;border-right:1px solid #555;font-size:9px;">预计节约配送费(RMB)</th>
                          <th style="background:#333;color:white;font-weight:600;padding:10px 8px;text-align:center;border-right:1px solid #555;font-size:9px;">申请VAT所需费用(RMB)**</th>
                          <th style="background:#333;color:white;font-weight:600;padding:10px 8px;text-align:center;font-size:9px;">申请VAT所需时间</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="background:#f8f9fa;color:#333;font-weight:600;padding:8px;border:1px solid #ddd;text-align:center;">FR</td>
                          <td style="color:#333;font-weight:500;padding:8px;border:1px solid #ddd;text-align:center;">6,914.51</td>
                          <td style="color:#333;font-weight:500;padding:8px;border:1px solid #ddd;text-align:center;">8,291.46</td>
                          <td style="color:#333;font-weight:500;padding:8px;border:1px solid #ddd;text-align:center;">1,376.95</td>
                          <td style="color:#333;font-size:9px;padding:8px;border:1px solid #ddd;text-align:center;">8-13 weeks</td>
                        </tr>
                        <tr style="background:#333;">
                          <td style="background:#333;color:white;font-weight:600;font-size:11px;padding:8px;border:1px solid #ddd;text-align:center;">总额</td>
                          <td style="background:#333;color:white;font-weight:600;font-size:11px;padding:8px;border:1px solid #ddd;text-align:center;">6,914.51</td>
                          <td style="background:#333;color:white;font-weight:600;font-size:11px;padding:8px;border:1px solid #ddd;text-align:center;">8,291.46</td>
                          <td style="background:#333;color:white;font-weight:600;font-size:11px;padding:8px;border:1px solid #ddd;text-align:center;">1,376.95</td>
                          <td style="background:#333;color:white;font-weight:600;font-size:11px;padding:8px;border:1px solid #ddd;text-align:center;">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              
                  <!-- 商品资格说明 -->
                  <div style="margin-top:20px;padding:20px;background:#ffffff;border:1px solid #ddd;border-radius:6px;">
                    <div style="display:flex;align-items:center;margin-bottom:15px;gap:8px;">
                      <span style="color:#ff8c00;font-size:16px;font-weight:bold;">▶</span>
                      <h4 style="color:#333;font-size:16px;font-weight:600;margin:0;">PanEU商品资格要求</h4>
                    </div>
                    <p style="color:#333;font-size:13px;line-height:1.5;margin:0 0 15px 0;">商品必须符合在欧洲各国之间运输流转的要求，以下列出不符合PanEU的商品种类：</p>
                    <table style="width:100%;border-collapse:collapse;font-size:11px;background:#ffffff;border:1px solid #ddd;" cellspacing="0" cellpadding="0">
                      <thead>
                        <tr>
                          <th style="background:#333;color:white;font-weight:600;padding:12px 10px;text-align:center;border-right:1px solid #555;width:15%;">类目</th>
                          <th style="background:#333;color:white;font-weight:600;padding:12px 10px;text-align:center;border-right:1px solid #555;width:35%;">禁售</th>
                          <th style="background:#333;color:white;font-weight:600;padding:12px 10px;text-align:center;width:50%;">限制</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="background:#f8f9fa;color:#333;font-weight:600;text-align:center;padding:10px;border:1px solid #ddd;">酒类<br/>Food</td>
                          <td style="color:#333;font-size:10px;padding:10px;border:1px solid #ddd;">一般人烹调类、春节小杂、篱笆看台</td>
                          <td style="color:#555;font-size:10px;padding:10px;border:1px solid #ddd;">除非获得EU的相关食品安全认证，否则无法在欧盟销售；<br/>如果注册EU的相关认证，存在专业工厂专业生产线认证，运输总价29周的，<br/>总价值限制为2000欧元，上述限制内商品可在全欧盟内销售。</td>
                        </tr>
                        <tr style="background:#f8f9fa;">
                          <td style="background:#f8f9fa;color:#333;font-weight:600;text-align:center;padding:10px;border:1px solid #ddd;">汽车零件<br/>Auto motive</td>
                          <td style="color:#333;font-size:10px;padding:10px;border:1px solid #ddd;">电子产品、车外后视镜(WK连接)、安规气外后电器、高正压(WK连接)、门锁(WK连接)、连接线(WK连接)、汽车工具(WK连接)、高压、安规线(WK连接)、咖啡工、基础润滑(WK连接)、门连线、下滑、工程主体</td>
                          <td style="color:#555;font-size:10px;padding:10px;border:1px solid #ddd;">汽车零件需要，手动制与当地的实验室认证，生产过程注册统一认证标识，各国最新认证文件一致性登录认证平台数据</td>
                        </tr>
                        <tr>
                          <td style="background:#f8f9fa;color:#333;font-weight:600;text-align:center;padding:10px;border:1px solid #ddd;">玩具<br/>Toys</td>
                          <td style="color:#333;font-size:10px;padding:10px;border:1px solid #ddd;">儿童用品、蒙古用、灯具、安规、轮胎、室内娱乐等</td>
                          <td style="color:#555;font-size:10px;padding:10px;border:1px solid #ddd;">玩具大类产品都需要REACH/LVD等认证，包括各类成套塑料等的测试</td>
                        </tr>
                        <tr style="background:#f8f9fa;">
                          <td style="background:#f8f9fa;color:#333;font-weight:600;text-align:center;padding:10px;border:1px solid #ddd;">喷雾类<br/>Sprays</td>
                          <td style="color:#333;font-size:10px;padding:10px;border:1px solid #ddd;">喷雾类化学、化妆品、清洁类、定制类</td>
                          <td style="color:#555;font-size:10px;padding:10px;border:1px solid #ddd;">空气方面的危险品认定REACH/LVD认证，包括各类专业技术条件销售数据</td>
                        </tr>
                        <tr>
                          <td style="background:#f8f9fa;color:#333;font-weight:600;text-align:center;padding:10px;border:1px solid #ddd;">磁铁类型类<br/>带磁性元器件</td>
                          <td style="color:#333;font-size:10px;padding:10px;border:1px solid #ddd;">消磁类功能、化感类、高灵件工厂</td>
                          <td style="color:#555;font-size:10px;padding:10px;border:1px solid #ddd;">需要达际到商务认证和相关证书，标识要符号等于产品功效现实定义，带磁类物<br/>受限，商关和欧盟等经营产品功等期效期平&lt;300克，高度&lt;360mm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <!-- PanEU 分析结果 -->
                  <div class="analysis-section" style="margin-top: 32px;">
                    <div class="section-header">
                      <h3 style="margin: 0px;">🌍 PanEU 分析结果</h3>
                      <p class="section-description" style="margin: 6px 0px 0px;">欧洲泛欧计划机会分析详情</p>
                    </div>
                    <div class="section-content">
                      <div>
                        <h4 style="color: rgb(51, 51, 51); font-size: 16px; margin: 10px 0px;">PanEU选品拓展机会分析报告</h4>
                        <p style="color: rgb(102, 102, 102); font-size: 14px; margin: 10px 0px;">基于您的PanEU Report自动生成 | 共分析 979 个ASIN</p>
                        <div style="margin: 20px 0px;">
                          <h5 style="color: rgb(51, 51, 51); font-size: 14px; margin-bottom: 15px;">PanEU ASIN 机会概览</h5>
                          <div style="overflow-x: auto;">
                            <table style="width: 100%; border-collapse: collapse; font-size: 12px; background: rgb(255, 255, 255); border: 1px solid rgb(221, 221, 221); border-radius: 4px;" cellspacing="0" cellpadding="0">
                              <thead>
                                <tr>
                                  <th style="background: rgb(51, 51, 51); color: white; padding: 12px 8px; text-align: center; border-right: 1px solid rgb(85, 85, 85);">EU4 ASIN</th>
                                  <th style="background: rgb(51, 51, 51); color: white; padding: 12px 8px; text-align: center; border-right: 1px solid rgb(85, 85, 85);">#</th>
                                  <th style="background: rgb(51, 51, 51); color: white; padding: 12px 8px; text-align: center; border-right: 1px solid rgb(85, 85, 85);">机会点及操作</th>
                                  <th style="background: rgb(51, 51, 51); color: white; padding: 12px 8px; text-align: center; border-right: 1px solid rgb(85, 85, 85);">公式</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);">可加入PanEU ASIN</td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221); text-align: center; font-weight: bold; color: rgb(255, 107, 53);">560</td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);"></td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);"></td>
                                </tr>
                                <tr>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);">缺少1至2个报价</td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221); text-align: center; font-weight: bold; color: rgb(255, 107, 53);">39</td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);">同步ASIN预计可节省0.3k RMB/年</td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);">41.71</td>
                                </tr>
                                <tr>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);">缺少3个报价</td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221); text-align: center; font-weight: bold; color: rgb(255, 107, 53);">127</td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);">同步ASIN预计可获得3.7k RMB销售额</td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);">-</td>
                                </tr>
                                <tr>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);">失效PanEU ASIN</td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221); text-align: center; font-weight: bold; color: rgb(255, 107, 53);">4</td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);">修复ASIN预计可节省0.1k RMB/年</td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);">12.84</td>
                                </tr>
                                <tr>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);">总计</td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221); text-align: center; font-weight: bold; color: rgb(255, 107, 53);">564</td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);"></td>
                                  <td style="padding: 10px 8px; border: 1px solid rgb(221, 221, 221);"></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 2.2 英国和欧盟间物流方案 -->
            <div v-if="activeSubSection === '2.2'" class="solution-section">
              <h2 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#232f3e;">2.2 英国和欧盟间物流方案</h2>
              <div class="solution-details-vertical">
                <div style="margin-top:30px;padding:20px;background:#ffffff;border:1px solid #ddd;border-radius:6px;">
                  <h4 style="color:#333;font-size:18px;font-weight:600;margin:0 0 8px 0;">英国和欧盟物流方案</h4>
                  <h5 style="color:#666;font-size:16px;font-weight:500;margin:0 0 4px 0;">英国和欧盟物流方案的对比和建议</h5>
                  <div style="display:flex;align-items:center;margin:20px 0 15px 0;gap:8px;padding:10px;background:#f8f9fa;border-radius:4px;border-left:4px solid #ff8c00;">
                    <span style="color:#ff8c00;font-size:16px;font-weight:bold;">▶</span>
                    <h4 style="color:#333;font-size:16px;font-weight:600;margin:0;line-height:1.4;">英国和欧盟间物流方案的对比和建议</h4>
                  </div>
                  <div style="background:linear-gradient(135deg, #ff8c00 0%, #ff8c00 100%);color:white;padding:8px 16px;border-radius:20px;font-size:12px;font-weight:600;text-align:center;margin:15px auto 20px auto;width:fit-content;box-shadow:0 2px 4px rgba(255, 140, 0, 0.3);">英欧双向双入驻 vs. 英国单收取2个间配送跨境运</div>
                  
                  <table style="width:100%;border-collapse:collapse;font-size:11px;background:#ffffff;border:2px solid #ff8c00;border-radius:6px;margin-top:15px;" cellspacing="0" cellpadding="0">
                    <thead>
                      <tr>
                        <th style="background:#e67e22;color:white;font-weight:600;padding:12px 10px;text-align:center;border-right:1px solid #fff;font-size:11px;width:25%;">UK&lt;-&gt;EU FBA 物流模式</th>
                        <th style="background:linear-gradient(135deg, #ff8c00 0%, #ff8c00 100%);color:white;font-weight:600;padding:12px 10px;text-align:center;border-right:1px solid #fff;font-size:11px;width:37.5%;">英国收获双选入驻<br/>Dual Inbound (DI)</th>
                        <th style="background:linear-gradient(135deg, #ff8c00 0%, #ff8c00 100%);color:white;font-weight:600;padding:12px 10px;text-align:center;font-size:11px;width:37.5%;">英国与欧盟2个间的远程配送<br/>Remote Fulfillment between the UK and EU (EURF)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="background:#f8f9fa;">
                        <td style="background:#f8f9fa;color:#333;font-weight:600;text-align:center;padding:10px 8px;border:1px solid #ddd;border-right:2px solid #ddd;">介绍</td>
                        <td style="background:#f8f9fa;color:#333;text-align:left;padding:10px 12px;border:1px solid #ddd;font-size:10px;">卖家能够将货物入列,选至英国EU配送链运营</td>
                        <td style="background:#f8f9fa;color:#333;text-align:left;padding:10px 12px;border:1px solid #ddd;font-size:10px;">卖家入驻合欧盟欧选收后任一成本国。<br/>即可以欧盟侧位者定者向任和到联欧洲盟通过当当和和</td>
                      </tr>
                      <tr style="background:#fafafa;">
                        <td style="background:#f8f9fa;color:#333;font-weight:600;text-align:center;padding:10px 8px;border:1px solid #ddd;border-right:2px solid #ddd;">头程物流 (CN-&gt;EU FBA FCs)</td>
                        <td style="color:#333;text-align:left;padding:10px 12px;border:1px solid #ddd;font-size:10px;">需要保齐英国/EU仓都要发送成本高, 成本偏对应</td>
                        <td style="color:#333;text-align:left;padding:10px 12px;border:1px solid #ddd;font-size:10px;">需要保齐英国/EU仓都要发送成本高, 成本偏对应</td>
                      </tr>
                      <tr>
                        <td style="background:#f8f9fa;color:#333;font-weight:600;text-align:center;padding:10px 8px;border:1px solid #ddd;border-right:2px solid #ddd;">尾程配送 (FBA)</td>
                        <td style="color:#333;text-align:left;padding:10px 12px;border:1px solid #ddd;font-size:10px;">需即到及优缺费见卖水电配送选供下优程收商品. 1-2天送达</td>
                        <td style="color:#333;text-align:left;padding:10px 12px;border:1px solid #ddd;font-size:10px;">有销运费, 客期间, 5-7天送达</td>
                      </tr>
                      <tr>
                        <td colspan="3" style="background:#e9ecef;color:#495057;font-weight:600;text-align:center;padding:8px;font-size:12px;border:1px solid #ddd;">加入条件</td>
                      </tr>
                      <tr style="background:#fafafa;">
                        <td style="background:#f8f9fa;color:#333;font-weight:600;text-align:center;padding:10px 8px;border:1px solid #ddd;border-right:2px solid #ddd;">ASIN 设置</td>
                        <td style="color:#333;text-align:left;padding:10px 12px;border:1px solid #ddd;font-size:10px;">应收收市已的英国DI，以设收下及环费欧提综收都配配配，具其优可<br/>可可可该中欧中是最在的优</td>
                        <td style="color:#333;text-align:left;padding:10px 12px;border:1px solid #ddd;font-size:10px;">需要配重设网英国/欧盟的DI的配配配. 部分 ASIN 无法除以设在欧应有或</td>
                      </tr>
                      <tr>
                        <td style="background:#f8f9fa;color:#333;font-weight:600;text-align:center;padding:10px 8px;border:1px solid #ddd;border-right:2px solid #ddd;">VAT 要求</td>
                        <td style="color:#333;text-align:left;padding:10px 12px;border:1px solid #ddd;font-size:10px;">需要配置2个VAT<br/>或申请提调及者收欧盟的 VAT</td>
                        <td style="color:#333;text-align:left;padding:10px 12px;border:1px solid #ddd;font-size:10px;">仅设置1个VAT<br/>或申请提调及者收欧盟VAT</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <!-- DI 分析结果区块 -->
                <div class="analysis-section">
                  <div class="section-header">
                    <h3>🔄 DI 分析结果</h3>
                    <p class="section-description">双边入库机会分析详情</p>
                  </div>
                  <div class="section-content">
                    <div>
                      <h4 style="color: rgb(51, 51, 51); font-size: 16px; margin: 10px 0px;">英国和欧盟选品拓展机会报告</h4>
                      <!-- 关键机会分析 -->
                      <div style="margin: 20px 0px; padding: 15px; background: rgb(248, 249, 250); border-radius: 6px; border-left: 4px solid rgb(255, 140, 0);">
                        <h5 style="color: rgb(51, 51, 51); font-size: 14px; margin: 0px 0px 10px;">主要机会点分析</h5>
                        <p style="color: rgb(102, 102, 102); font-size: 13px; margin: 0px 0px 10px;">基于上传的10个数据文件,我们识别出以下关键机会:</p>
                        <ul style="margin: 0px; padding-left: 20px;">
                          <li style="color: rgb(85, 85, 85); font-size: 13px; margin: 5px 0px;"><strong>高销售潜力ASIN:</strong> UK&gt;EU方向有37个ASIN在欧盟市场具有高销售潜力,预计销售额€242,290.77(12M); EU&gt;UK方向有45个ASIN在英国市场具有高销售潜力,预计销售额£59,075.44(12M)</li>
                          <li style="color: rgb(85, 85, 85); font-size: 13px; margin: 5px 0px;"><strong>全球拓展大礼包:</strong> UK&gt;EU方向有159个ASIN可获得最高€714,000.00代金券; EU&gt;UK方向有51个ASIN可获得最高£180,600.00代金券</li>
                          <li style="color: rgb(85, 85, 85); font-size: 13px; margin: 5px 0px;"><strong>远程配送优化:</strong> 目前有0个ASIN开启远程配送,其中0个达到高销售额(&gt;€100),预计可节省配送费</li>
                          <li style="color: rgb(85, 85, 85); font-size: 13px; margin: 5px 0px;"><strong>市场扩展潜力:</strong> 229个UK&gt;EU ASIN和230个EU&gt;UK ASIN都未开启远程配送,存在巨大扩展空间</li>
                        </ul>
                      </div>
                      
                      <!-- DI 数据表格 -->
                      <div style="margin-top: 32px;">
                        <h5 style="color: rgb(51, 51, 51); font-size: 14px; margin: 0px 0px 20px; font-weight: 600;">数据表</h5>
                        <div class="aws-table-container">
                          <table class="aws-table" cellspacing="0" cellpadding="0">
                            <thead>
                              <tr class="aws-sub-header">
                                <th class="aws-th" style="width: 8%;">#</th>
                                <th class="aws-th" style="width: 25%;">UK<->EU ASIN</th>
                                <th class="aws-th" style="width: 12%;">数量</th>
                                <th class="aws-th" style="width: 20%;">未来商城销售额(T300)</th>
                                <th class="aws-th" style="width: 35%;">机会点及操作</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr class="aws-row">
                                <td class="aws-td">1</td>
                                <td class="aws-td aws-metric">仅在英国本地入库的选品</td>
                                <td class="aws-td aws-value"><span class="aws-number">229</span></td>
                                <td class="aws-td aws-value">€147,966.62</td>
                                <td class="aws-td">-</td>
                              </tr>
                              <tr class="aws-row">
                                <td class="aws-td">2</td>
                                <td class="aws-td aws-metric">在欧盟有高销售潜力</td>
                                <td class="aws-td aws-value"><span class="aws-number">37</span></td>
                                <td class="aws-td aws-value">€37,932.71</td>
                                <td class="aws-td">本地入库至欧盟，预计销售额€242,290.77(12M)</td>
                              </tr>
                              <tr class="aws-row">
                                <td class="aws-td">3</td>
                                <td class="aws-td aws-metric">在欧盟有全球拓展大礼包</td>
                                <td class="aws-td aws-value"><span class="aws-number">159</span></td>
                                <td class="aws-td aws-value">€124,241.50</td>
                                <td class="aws-td">本地入库至欧盟，获取最高€714,000.00代金券</td>
                              </tr>
                              <tr class="aws-row">
                                <td class="aws-td">4</td>
                                <td class="aws-td aws-metric">未在欧盟远程销售</td>
                                <td class="aws-td aws-value"><span class="aws-number">229</span></td>
                                <td class="aws-td aws-value">€147,966.62</td>
                                <td class="aws-td">开启英国至欧盟的远程配送</td>
                              </tr>
                              <tr class="aws-row">
                                <td class="aws-td">5</td>
                                <td class="aws-td aws-metric">已在欧盟远程销售</td>
                                <td class="aws-td aws-value"><span class="aws-number">0</span></td>
                                <td class="aws-td aws-value">-</td>
                                <td class="aws-td">-</td>
                              </tr>
                              <tr class="aws-row">
                                <td class="aws-td">6</td>
                                <td class="aws-td aws-metric">远程销售额<€100</td>
                                <td class="aws-td aws-value"><span class="aws-number">0</span></td>
                                <td class="aws-td aws-value">-</td>
                                <td class="aws-td">-</td>
                              </tr>
                              <tr class="aws-row">
                                <td class="aws-td">7</td>
                                <td class="aws-td aws-metric">仅在欧盟本地入库的选品</td>
                                <td class="aws-td aws-value"><span class="aws-number">230</span></td>
                                <td class="aws-td aws-value">€199,380.99</td>
                                <td class="aws-td">-</td>
                              </tr>
                              <tr class="aws-row">
                                <td class="aws-td">8</td>
                                <td class="aws-td aws-metric">在英国有高销售潜力</td>
                                <td class="aws-td aws-value"><span class="aws-number">45</span></td>
                                <td class="aws-td aws-value">€65,497.02</td>
                                <td class="aws-td">本地入库至英国，预计销售额£59,075.44(12M)</td>
                              </tr>
                              <tr class="aws-row">
                                <td class="aws-td">9</td>
                                <td class="aws-td aws-metric">在英国有全球拓展大礼包</td>
                                <td class="aws-td aws-value"><span class="aws-number">51</span></td>
                                <td class="aws-td aws-value">€18,637.93</td>
                                <td class="aws-td">本地入库至英国，获取最高£180,600.00代金券</td>
                              </tr>
                              <tr class="aws-row">
                                <td class="aws-td">10</td>
                                <td class="aws-td aws-metric">未在英国远程销售</td>
                                <td class="aws-td aws-value"><span class="aws-number">230</span></td>
                                <td class="aws-td aws-value">€199,380.99</td>
                                <td class="aws-td">开启欧盟至英国的远程配送</td>
                              </tr>
                              <tr class="aws-row">
                                <td class="aws-td">11</td>
                                <td class="aws-td aws-metric">已在英国远程销售</td>
                                <td class="aws-td aws-value"><span class="aws-number">0</span></td>
                                <td class="aws-td aws-value">-</td>
                                <td class="aws-td">-</td>
                              </tr>
                              <tr class="aws-row">
                                <td class="aws-td">12</td>
                                <td class="aws-td aws-metric">远程销售额<£100</td>
                                <td class="aws-td aws-value"><span class="aws-number">0</span></td>
                                <td class="aws-td aws-value">-</td>
                                <td class="aws-td">-</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 2.3 更多成本节约（CEE 中欧计划） -->
            <div v-if="activeSubSection === '2.3'" class="solution-section">
              <h2 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#232f3e;">2.3 更多成本节约</h2>
              
              <!-- 成本节约折叠卡片 -->
              <div class="card-wrapper" id="cost-savings">
                <div class="card-header">
                  <div style="font-size: 24px; margin-right: 10px;">📋</div>
                  <h3 style="margin: 0px; color: rgb(0, 123, 255); font-size: 18px; font-weight: 600;">更多成本节约</h3>
                  <div class="arrow" style="color: rgb(0, 123, 255); font-size: 16px; margin-left: 10px; transition: transform 0.3s; transform: rotate(90deg);">▶</div>
                </div>
                <div id="cost-savings-content" style="display: flex; flex-direction: column; gap: 12px;">
                  <div class="section-head" style="display: flex; align-items: center; padding: 10px; background: rgb(240, 248, 255); border-radius: 8px; cursor: default; transition: 0.3s;">
                    <div style="color: rgb(0, 123, 255); font-size: 20px; margin-right: 15px; transition: transform 0.3s;">▼</div>
                    <span style="color: rgb(51, 51, 51); font-weight: 600; font-size: 14px;">借助中欧计划节约FBA费用</span>
                  </div>
                  
                  <!-- 中欧计划介绍 -->
                  <div style="display: block; margin-top: 10px; padding: 20px; background: rgb(248, 249, 250); border-radius: 8px; border-left: 3px solid rgb(0, 123, 255);">
                    <div style="margin-bottom: 20px;">
                      <p style="margin: 0px 0px 8px; font-size: 14px; color: rgb(51, 51, 51); font-weight: 600;">什么是"中欧计划"？</p>
                      <p style="margin: 0px 0px 16px; font-size: 13px; color: rgb(102, 102, 102); line-height: 1.6;">加入"中欧计划"后，亚马逊会把实际的库存不仅存储在德国的亚马逊物流中心，还将存储在波兰和捷克的物流中心。一旦中欧计划被激活，卖家的每件商品通过德国站点（Amazon.de）的产品都能享受每件0.26欧元减免，后台具体操作详见这里。</p>
                    </div>
                    
                    <!-- 中欧计划的优势 -->
                    <div style="background: linear-gradient(135deg, rgb(233, 247, 239) 0%, rgb(245, 252, 248) 100%); padding: 16px 18px; border-radius: 10px; margin-bottom: 16px; border: 1px solid rgb(201, 238, 221); position: relative; overflow: hidden;">
                      <div style="position: absolute; inset: 0px; background: repeating-linear-gradient(45deg, rgba(40, 167, 69, 0.06) 0px, rgba(40, 167, 69, 0.06) 8px, rgba(255, 255, 255, 0) 8px, rgba(255, 255, 255, 0) 16px);"></div>
                      <div style="position: relative; display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                        <span style="display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; background: rgb(40, 167, 69); color: rgb(255, 255, 255); border-radius: 8px; font-size: 16px; box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px;">✓</span>
                        <p style="margin: 0px; font-size: 14px; color: rgb(21, 87, 36); font-weight: 700; letter-spacing: 0.5px;">中欧计划的优势</p>
                      </div>
                      <ul style="position: relative; list-style: none; padding: 0px; margin: 0px; display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: rgb(21, 87, 36);">
                        <li style="display: flex; gap: 6px;"><span style="color: rgb(40, 167, 69); font-weight: 600;">■</span><span>节省 FBA 费用（每件 €0.26 减免），适用于通过德国站点发出的订单（含跨境 EFN 配送）</span></li>
                        <li style="display: flex; gap: 6px;"><span style="color: rgb(40, 167, 69); font-weight: 600;">■</span><span>提升对德国南部及东欧消费者的配送时效（1–2 天可达）</span></li>
                        <li style="display: flex; gap: 6px;"><span style="color: rgb(40, 167, 69); font-weight: 600;">■</span><span>所有符合条件订单享受 Prime 购物体验，提高转化</span></li>
                      </ul>
                    </div>
                    
                    <!-- 重要提示 -->
                    <div style="background: rgb(209, 236, 241); border: 1px solid rgb(190, 229, 235); border-radius: 6px; padding: 12px; margin-bottom: 15px;">
                      <div style="display: flex; align-items: flex-start;">
                        <div style="font-size: 16px; margin-right: 8px; margin-top: 2px;">📋</div>
                        <div>
                          <p style="margin: 0px; font-size: 12px; color: rgb(12, 84, 96); font-weight: 600;">重要提示：如果要在波兰和捷克和其他国家储存，您必须在每个国家注册增值税。因此，建议实际在激活CEE之前先注册波兰及捷克的VAT税号。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- CEE 成本分析结果区块 -->
              <div class="analysis-section">
                <div class="section-header">
                  <h3>💰 CEE 成本分析结果</h3>
                  <p class="section-description">中欧计划成本效益分析详情</p>
                </div>
                <div class="section-content">
                  <div class="aws-table-container">
                    <table class="aws-table" cellspacing="0" cellpadding="0">
                      <thead>
                        <tr class="aws-sub-header">
                          <th class="aws-th" style="width: 38%;">指标</th>
                          <th class="aws-th" style="width: 22%;">数值</th>
                          <th class="aws-th">说明</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="aws-row">
                          <td class="aws-td aws-metric">德国商城过去12个月已售商品数量</td>
                          <td class="aws-td aws-value"><span class="aws-number">20,000</span></td>
                          <td class="aws-td">历史销量 (件)</td>
                        </tr>
                        <tr class="aws-row">
                          <td class="aws-td aws-metric">中欧计划预计节约费用€</td>
                          <td class="aws-td aws-value"><span class="aws-number">5,200</span></td>
                          <td class="aws-td">按每件 €0.26 估算</td>
                        </tr>
                        <tr class="aws-row">
                          <td class="aws-td aws-metric">VAT注册成本€</td>
                          <td class="aws-td aws-value"><span class="aws-number">600</span></td>
                          <td class="aws-td">波兰 + 捷克 预估一次性</td>
                        </tr>
                        <tr class="aws-row">
                          <td class="aws-td aws-metric">VAT注册所需时间：4～6周</td>
                          <td class="aws-td" colspan="2" style="text-align: left;">请预留时间提前启动，避免影响计划生效</td>
                        </tr>
                        <tr class="aws-row" style="background: #fff8e1; border: 2px solid #ffb74d;">
                          <td class="aws-td aws-metric" style="font-weight: 700; color: #e65100;">最终节约的费用€</td>
                          <td class="aws-td aws-value" style="font-weight: 700; color: #e65100; font-size: 16px;"><span class="aws-number" style="background: #ffcc02; color: #1a1a1a;">4,600</span></td>
                          <td class="aws-td" style="font-weight: 600; color: #e65100;">预计节约 - VAT 成本</td>
                        </tr>
                      </tbody>
                    </table>
                    <div style="margin-top: 16px; padding: 12px; background: #f8f9fa; border-radius: 6px; font-size: 12px; color: #666;">
                      <strong>说明：</strong>若销量增长或参与更多跨境订单，节约金额会进一步提升。
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Tab 3: 政策更新 -->
      <div v-if="activeTab === 2" class="content-panel">
        <div class="content-header">
          <h2>📢 政策更新</h2>
          <p class="content-description">最新的欧盟政策变化和影响分析</p>
        </div>
        <div class="content-body">
          <!-- 政策更新图片区域 -->
          <div class="policy-card">
            <a href="https://mp.weixin.qq.com/s?__biz=MzkxNzI4NjI5OQ==&mid=2247619861&idx=1&sn=817af8fb84f74681699dc32d95cd6f30&chksm=c0faaf330e446a2765b87002bde225f90919cd3ce9a9cebcc32ddbddfa2a48421e1c89592081&from=industrynews&version=4.1.7.6056&platform=win#rd" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none; width: 100%;">
              <img src="/src/assets/政策更新.png" alt="政策更新" style="width: 100%; height: auto; border-radius: 6px;" />
            </a>
          </div>
        </div>
      </div>

      <!-- Tab 4: 行动计划 -->
      <div v-if="activeTab === 3" class="content-panel">
        <div class="content-header">
          <h2>🎯 行动计划</h2>
          <p class="content-description">基于分析结果的具体实施路线图</p>
        </div>
        <div class="content-body">
          <div class="aws-table-container">
            <table class="aws-table" cellspacing="0" cellpadding="0">
              <thead>
                <tr class="aws-sub-header">
                  <th class="aws-th" style="width: 10%;">优先级</th>
                  <th class="aws-th" style="width: 25%;">行动</th>
                  <th class="aws-th" style="width: 10%;">时间</th>
                  <th class="aws-th" style="width: 55%;">读取判断逻辑</th>
                </tr>
              </thead>
              <tbody>
                <tr class="aws-row">
                  <td class="aws-td aws-value"><span class="aws-number priority-1">1</span></td>
                  <td class="aws-td aws-metric">合规 - new policy (NL/IT)</td>
                  <td class="aws-td aws-value">1个月</td>
                  <td class="aws-td">意大利税号需注意</td>
                </tr>
                <tr class="aws-row">
                  <td class="aws-td aws-value"><span class="aws-number priority-2">2</span></td>
                  <td class="aws-td aws-metric">合规 - 开了仓储没开税号</td>
                  <td class="aws-td aws-value">3个月</td>
                  <td class="aws-td">
                    <div class="logic-item">• 德国、意大利、法国、西班牙已经合规开启了PanEU所有的仓储，无需额外操作。</div>
                  </td>
                </tr>
                <tr class="aws-row">
                  <td class="aws-td aws-value"><span class="aws-number priority-3">3</span></td>
                  <td class="aws-td aws-metric">cost saving - pan-EU placement</td>
                  <td class="aws-td aws-value">3个月</td>
                  <td class="aws-td">
                    <div class="logic-item">• 可开启 FR 仓储，获得配送费用节约 15451.09 RMB</div>
                    <div class="logic-item">• 可开启 DE 仓储，获得配送费用节约 18712 RMB</div>
                  </td>
                </tr>
                <tr class="aws-row">
                  <td class="aws-td aws-value"><span class="aws-number priority-4">4</span></td>
                  <td class="aws-td aws-metric">cost saving - pan-EU ASIN parity</td>
                  <td class="aws-td aws-value">1个月</td>
                  <td class="aws-td">同步 560 ASIN，获得配送费用节约€, 同步商品到DE/FR/IT/ES四国，启用PanEU服务</td>
                </tr>
                <tr class="aws-row">
                  <td class="aws-td aws-value"><span class="aws-number priority-5">5</span></td>
                  <td class="aws-td aws-metric">cost saving - CEE</td>
                  <td class="aws-td aws-value">3个月</td>
                  <td class="aws-td">可开启中欧计划，获得配送费用节约€4600</td>
                </tr>
                <tr class="aws-row">
                  <td class="aws-td aws-value"><span class="aws-number priority-6">6</span></td>
                  <td class="aws-td aws-metric">incentive - DI (GSI)</td>
                  <td class="aws-td aws-value">1个月</td>
                  <td class="aws-td di-shared-logic" rowspan="2">
                    <div class="logic-section">
                      <div class="logic-title">高销售潜力ASIN:</div>
                      <div class="logic-content">UK>EU方向有37个ASIN在欧盟市场具有高销售潜力,预计销售额€242,290.77(12M); EU>UK方向有45个ASIN在英国市场具有高销售潜力,预计销售额£59,075.44(12M)</div>
                    </div>
                    <div class="logic-section">
                      <div class="logic-title">全球拓展大礼包:</div>
                      <div class="logic-content">UK>EU方向有159个ASIN可获得最高€714,000.00代金券; EU>UK方向有51个ASIN可获得最高£180,600.00代金券</div>
                    </div>
                    <div class="logic-section">
                      <div class="logic-title">远程配送优化:</div>
                      <div class="logic-content">目前有0个ASIN开启远程配送,其中0个达到高销售额(>€100),预计可节省配送费</div>
                    </div>
                    <div class="logic-section">
                      <div class="logic-title">市场扩展潜力:</div>
                      <div class="logic-content">229个UK>EU ASIN和230个EU>UK ASIN都未开启远程配送,存在巨大扩展空间</div>
                    </div>
                  </td>
                </tr>
                <tr class="aws-row">
                  <td class="aws-td aws-value"><span class="aws-number priority-7">7</span></td>
                  <td class="aws-td aws-metric">sales uplift - DI (MPG)</td>
                  <td class="aws-td aws-value">3个月</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </div>

      <!-- Tab 5: 其他-->
      <div v-if="activeTab === 4" class="content-panel">
        <div class="content-header">
          <h2>🎯 其他</h2>
          <p class="content-description">话术</p>
        </div>
        <div class="content-body">
          <!-- AM pitching 话术表格 -->
          <div style="margin-bottom: 40px;">
            <div style="background: #4a90e2; color: white; padding: 12px 20px; border-radius: 8px 8px 0 0; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span>📖</span>
                <span style="font-weight: 600; font-size: 16px;">AM pitching 话术</span>
              </div>
              <span style="font-size: 14px;">▼</span>
            </div>
            <div class="aws-table-container pitching-table" style="margin: 0; border-radius: 0 0 8px 8px;">
              <table class="aws-table" cellspacing="0" cellpadding="0">
                <thead>
                  <tr class="aws-sub-header">
                    <th class="aws-th" style="width: 20%;">卖家群体</th>
                    <th class="aws-th" style="width: 25%;">阻碍说明</th>
                    <th class="aws-th" style="width: 55%;">话术要点</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="aws-row">
                    <td class="aws-td aws-metric">Inbound</td>
                    <td class="aws-td aws-value">-</td>
                    <td class="aws-td aws-value">-</td>
                  </tr>
                  <tr class="aws-row">
                    <td class="aws-td aws-metric">Not Listing Parity</td>
                    <td class="aws-td aws-value">Asin Parity：卖同一品但Asin编号不一致</td>
                    <td class="aws-td aws-value" style="text-align: left; padding-left: 16px;">
                      1）了解卖家为什么用不同ASIN，为了规避合规/差评同步风险？<br/>
                      2）介绍使用相同ASIN的benefit：<br/>
                      &nbsp;&nbsp;&nbsp;a) 后台同步销售数据和评价，提高综合排名、流量，且有助于第二市场的冷启动<br/>
                      &nbsp;&nbsp;&nbsp;b) 降低生产/备货成本，加强库存弹性<br/>
                      &nbsp;&nbsp;&nbsp;c) 相同ASIN可以享受亚马逊FBA相关物流福利，比如泛欧，英国和欧盟之间的远程配送<br/>
                      3）如果卖家感兴趣，牵引卖家ASIN merge或未来备货时使用相同SKU
                    </td>
                  </tr>
                  <tr class="aws-row">
                    <td class="aws-td aws-value">-</td>
                    <td class="aws-td aws-value">Listing&Asin Parity：卖不同产品</td>
                    <td class="aws-td aws-value" style="text-align: left; padding-left: 16px;">如果您认为直接发货到欧盟风险比较大的变化，可以先行使用英国与欧盟之间的跨境配送进行试水，如果卖的比较好或者曝光量比较高的话，可以再直接发货过去</td>
                  </tr>
                  <tr class="aws-row">
                    <td class="aws-td aws-value">-</td>
                    <td class="aws-td aws-value">同步但不可售</td>
                    <td class="aws-td aws-value" style="text-align: left; padding-left: 16px;">1）库存问题（ex：缺货）：您需要尽快补货，长期缺货会影响您的账户健康度评分</td>
                  </tr>
                  <tr class="aws-row">
                    <td class="aws-td aws-metric">有Incentive（band D/E卖家）</td>
                    <td class="aws-td aws-value">-</td>
                    <td class="aws-td aws-value" style="text-align: left; padding-left: 16px;">此次活动截止日期是2025年12月，为商家邀请制，您可以用这笔现金作为对岸的启动资金，对冲单一市场波动风险</td>
                  </tr>
                  <tr class="aws-row">
                    <td class="aws-td aws-metric">Not inbound</td>
                    <td class="aws-td aws-value">-</td>
                    <td class="aws-td aws-value">-</td>
                  </tr>
                  <tr class="aws-row">
                    <td class="aws-td aws-metric">EU>UK</td>
                    <td class="aws-td aws-value">-</td>
                    <td class="aws-td aws-value">-</td>
                  </tr>
                  <tr class="aws-row">
                    <td class="aws-td aws-metric">No VAT</td>
                    <td class="aws-td aws-value">经营意愿低，对于对岸市场销售预期低/卖进过销售表现不佳</td>
                    <td class="aws-td aws-value" style="text-align: left; padding-left: 16px;">
                      <strong>Incentive:</strong><br/>
                      您可以用这笔现金覆盖合规或广告成本，对冲单一市场波动风险。此次活动截止日期是2025年12月，为商家邀请制，为避免政策变化，建议您尽快参与<br/><br/>
                      <strong>Others:</strong><br/>
                      1）潜力大：亚马逊英国站体量接近德国站，语言友好，有13%的电商年复合增长率，有极高的销售和利润增长空间<br/>
                      2）双边入库优势：一旦找到热销品，可以双边入库享受本地配送费和Prime资格，提高商品转化率和搜索排名<br/>
                      3）利用远程配送低成本测试：可以先通过远程配送将欧盟商品销售到英国，无需额外库存。2024年2月起，亚马逊下调了欧盟到英国的远程配送费26-59%，成本更低
                    </td>
                  </tr>
                  <tr class="aws-row">
                    <td class="aws-td aws-value">-</td>
                    <td class="aws-td aws-value">缺乏运营人员/资金等资源开启对岸市场</td>
                    <td class="aws-td aws-value" style="text-align: left; padding-left: 16px;">
                      <strong>Incentive:</strong><br/>
                      您可以用这笔现金作为对岸的启动资金，对冲单一市场波动风险<br/><br/>
                      <strong>Others:</strong><br/>
                      1）可以先通过远程配送将欧盟商品销售到英国，无需额外库存和运营人员<br/>
                      2）亚马逊有丰富的培训资源和客户经理支持，帮助您快速上手英国市场运营
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Pitch flow (Blurb) 表格 -->
          <div>
            <div style="background: #4a90e2; color: white; padding: 12px 20px; border-radius: 8px 8px 0 0; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span>📖</span>
                <span style="font-weight: 600; font-size: 16px;">Pitch flow (Blurb)</span>
              </div>
              <span style="font-size: 14px;">▼</span>
            </div>
            <div class="aws-table-container" style="margin: 0; border-radius: 0 0 8px 8px;">
              <table class="aws-table" cellspacing="0" cellpadding="0">
                <thead>
                  <tr class="aws-sub-header">
                    <th class="aws-th" style="width: 15%;">步骤</th>
                    <th class="aws-th" style="width: 85%;">内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="aws-row">
                    <td class="aws-td aws-metric">开场</td>
                    <td class="aws-td" style="text-align: left; padding-left: 16px;">您好，我是亚马逊的客户经理，今天联系您是想了解一下您在跨境电商业务方面的情况</td>
                  </tr>
                  <tr class="aws-row">
                    <td class="aws-td aws-metric">了解现状</td>
                    <td class="aws-td" style="text-align: left; padding-left: 16px;">请问您目前在欧洲站点的销售情况？对于拓展欧洲市场有什么想法吗？</td>
                  </tr>
                  <tr class="aws-row">
                    <td class="aws-td aws-metric">识别机会</td>
                    <td class="aws-td" style="text-align: left; padding-left: 16px;">根据您的情况，我发现您有一些很好的机会...</td>
                  </tr>
                  <tr class="aws-row">
                    <td class="aws-td aws-metric">提供方案</td>
                    <td class="aws-td" style="text-align: left; padding-left: 16px;">针对您的情况，我们有以下几个建议...</td>
                  </tr>
                  <tr class="aws-row">
                    <td class="aws-td aws-metric">跟进行动</td>
                    <td class="aws-td" style="text-align: left; padding-left: 16px;">如果您感兴趣，我们可以进一步讨论实施方案的细节</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.report-frame {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Tab 导航栏样式 */
.tab-navigation {
  background-color: #232f3e;
  border-bottom: none;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(35, 47, 62, 0.15);
}

.tab-container {
  display: flex;
  gap: 0;
  width: 100%;
  margin: 0;
}

.tab-item {
  position: relative;
  padding: 16px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
  white-space: nowrap;
}

.tab-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.tab-item.active {
  color: #ff9900;
  border-bottom-color: #ff9900;
  background-color: rgba(255, 153, 0, 0.1);
}

.tab-title {
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
}

.tab-item.active .tab-title {
  color: #ff9900;
  font-weight: 600;
}

.tab-indicator {
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #ff9900;
  border-radius: 2px 2px 0 0;
}

/* 内容区域样式 */
.tab-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  background-color: #fafafa;
}

.content-panel {
  width: 100%;
  max-width: none;
  margin: 0;
  height: 80vh;
  padding: 20px;
  animation: fadeIn 0.4s ease-in;
  box-sizing: border-box;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-header {
  text-align: center;
  margin-bottom: 40px;
}

.content-header h2 {
  font-size: 32px;
  color: #232f3e;
  margin: 0 0 16px 0;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.content-description {
  font-size: 18px;
  color: #5a6c7d;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
}

.content-body {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e8ed;
  box-sizing: border-box;
  margin: 0 auto;
  width: 100%;
}

/* Amazon风格下拉菜单样式 */
.sub-section-dropdown {
  padding: 16px 20px;
  margin-bottom: 0;
  background-color: #f7f8fa;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: 12px;
}

.sub-section-dropdown::before {
  content: "选择章节:";
  font-size: 13px;
  font-weight: 700;
  color: #0f1111;
  font-family: "Amazon Ember", Arial, sans-serif;
  white-space: nowrap;
}

.dropdown-select {
  min-width: 280px;
  max-width: 400px;
  padding: 8px 32px 8px 12px;
  font-size: 13px;
  font-weight: 400;
  color: #0f1111;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23565959' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6,9 12,15 18,9'></polyline></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
  border: 1px solid #d5d9d9;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: all 0.15s ease;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-family: "Amazon Ember", Arial, sans-serif;
  line-height: 20px;
}

.dropdown-select:hover {
  border-color: #ff9900;
  box-shadow: 0 0 0 2px rgba(255, 153, 0, 0.3);
}

.dropdown-select:focus {
  border-color: #ff9900;
  box-shadow: 0 0 0 2px rgba(255, 153, 0, 0.5), inset 0 1px 2px rgba(15, 17, 17, 0.15);
}

.dropdown-select:active {
  background-color: #f7f8fa;
  border-color: #ff9900;
}

.dropdown-select option {
  padding: 8px 12px;
  font-size: 13px;
  color: #0f1111;
  background-color: #ffffff;
  font-family: "Amazon Ember", Arial, sans-serif;
  line-height: 20px;
}

.dropdown-select option:hover {
  background-color: #f3f3f3;
}

.dropdown-select option:checked {
  background-color: #ff9900;
  color: #ffffff;
  font-weight: 700;
}

/* 评估卡片样式 */
.evaluation-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.eval-card {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  border: 1px solid #e1e8ed;
}

.eval-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(35, 47, 62, 0.15);
  border-color: #ff9900;
}

.card-icon {
  font-size: 32px;
  margin-bottom: 16px;
}

.eval-card h3 {
  font-size: 20px;
  color: #232f3e;
  margin: 0 0 12px 0;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.eval-card p {
  font-size: 15px;
  color: #5a6c7d;
  margin: 0;
  line-height: 1.6;
  font-weight: 400;
}

/* 解决方案样式 */
.solution-sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.solution-section {
  border-left: 4px solid #ff9900;
  padding-left: 24px;
  background-color: #ffffff;
  padding: 24px;
  border-radius: 0 8px 8px 0;
  border: 1px solid #e1e8ed;
  border-left: 4px solid #ff9900;
}

.solution-section h3 {
  font-size: 22px;
  color: #232f3e;
  margin: 0 0 16px 0;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.solution-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.solution-details-vertical {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: #fafafa;
  border-radius: 6px;
  border: 1px solid #e1e8ed;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.detail-item:hover {
  background-color: #fff3e6;
  border-color: #ff9900;
}

.detail-icon {
  font-size: 18px;
  width: 24px;
  text-align: center;
  color: #ff9900;
}

/* 政策更新样式 */
.policy-updates {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.update-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  border-left: 4px solid #ff9900;
  border: 1px solid #e1e8ed;
  border-left: 4px solid #ff9900;
}

.update-date {
  font-size: 14px;
  font-weight: 600;
  color: #ff9900;
  white-space: nowrap;
  min-width: 80px;
}

.update-content {
  flex: 1;
}

.update-content h4 {
  font-size: 20px;
  color: #232f3e;
  margin: 0 0 8px 0;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.update-content p {
  font-size: 15px;
  color: #5a6c7d;
  margin: 0 0 12px 0;
  line-height: 1.6;
}

.impact-tag {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.impact-tag.high {
  background-color: #d73027;
  color: white;
}

.impact-tag.medium {
  background-color: #ff9900;
  color: white;
}

.impact-tag.low {
  background-color: #146eb4;
  color: white;
}

/* 行动计划样式 */
.action-timeline {
  position: relative;
  padding-left: 40px;
}

.action-timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, #232f3e, #ff9900);
}

.timeline-item {
  position: relative;
  margin-bottom: 40px;
  padding-left: 40px;
}

.timeline-marker {
  position: absolute;
  left: -28px;
  top: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: white;
  z-index: 1;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.timeline-marker.phase1 {
  background-color: #232f3e;
}

.timeline-marker.phase2 {
  background-color: #146eb4;
}

.timeline-marker.phase3 {
  background-color: #ff9900;
}

.timeline-marker.phase4 {
  background-color: #d73027;
}

.timeline-content {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e1e8ed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.timeline-content h3 {
  font-size: 22px;
  color: #232f3e;
  margin: 0 0 16px 0;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.action-list {
  margin: 0;
  padding-left: 20px;
}

.action-list li {
  font-size: 15px;
  color: #5a6c7d;
  margin-bottom: 10px;
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .report-frame {
    font-size: 14px;
  }
  
  .tab-navigation {
    padding: 0 12px;
  }
  
  .tab-container {
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .tab-item {
    padding: 12px 16px;
    font-size: 14px;
    border-radius: 6px 6px 0 0;
  }
  
  .content-panel {
    padding: 16px 12px;
  }
  
  .content-header h2 {
    font-size: 28px;
  }
  
  .content-description {
    font-size: 16px;
  }
  
  .content-body {
    padding: 16px 12px;
  }
  
  .evaluation-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .eval-card {
    padding: 20px;
  }
  
  .solution-section {
    padding: 20px;
  }
  
  .solution-details {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .update-item {
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }
  
  .action-timeline {
    padding-left: 24px;
  }
  
  .timeline-item {
    padding-left: 24px;
  }
  
  .timeline-marker {
    left: -20px;
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  
  .timeline-content {
    padding: 20px;
  }
  
  /* 移动端下拉菜单调整 */
  .sub-section-dropdown {
    padding: 12px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .sub-section-dropdown::before {
    font-size: 12px;
  }
  
  .dropdown-select {
    min-width: 100%;
    max-width: 100%;
    font-size: 12px;
    padding: 6px 28px 6px 10px;
    background-size: 10px;
    background-position: right 8px center;
  }
}

/* 现代化表格样式 - 基于用户提供的设计 */
.aws-table-container {
  margin: 24px 0;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: none;
}

.aws-table {
  width: 100%;
  border-collapse: collapse;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #333333;
}

/* 表头样式 - 深色背景 */
.aws-header-group {
  background: #2c3e50;
}

.aws-region-header {
  background: #34495e;
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  padding: 16px 20px;
  text-align: center;
  border: none;
  position: relative;
}

.aws-region-header.aws-uk {
  background: #5a6c7d;
}

.aws-region-header.aws-eu {
  background: #34495e;
}

.aws-sub-header {
  background: #2c3e50;
}

.aws-th {
  background: #2c3e50;
  color: #ffffff;
  font-weight: 500;
  font-size: 13px;
  padding: 16px 20px;
  text-align: center;
  border: none;
  white-space: nowrap;
}

/* 表体样式 - 简洁的灰白配色 */
.aws-row {
  border: none;
  transition: background-color 0.2s ease;
}

.aws-row:nth-child(odd) {
  background: #f8f9fa;
}

.aws-row:nth-child(even) {
  background: #ffffff;
}

.aws-row:hover {
  background: #e8f4f8;
}

.aws-td {
  padding: 16px 20px;
  border: none;
  vertical-align: middle;
  font-size: 13px;
  line-height: 1.5;
  text-align: center;
}

/* 特殊单元格样式 */
.aws-mcid {
  background: #f1f3f4;
  font-weight: 600;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  color: #2c3e50;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.aws-account {
  background: #f1f3f4;
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  font-size: 14px;
}

.aws-metric {
  font-weight: 500;
  color: #333333;
  text-align: left;
  padding-left: 24px;
  background: #f8f9fa;
  font-size: 13px;
}

.aws-value {
  text-align: center;
  font-size: 14px;
}

/* 状态指示器样式 - 更现代的设计 */
.aws-success {
  color: #27ae60;
  font-weight: 600;
  font-size: 18px;
  display: inline-block;
  width: auto;
  height: auto;
  background: none;
  border: none;
  border-radius: 0;
}

.aws-error {
  color: #e74c3c;
  font-weight: 600;
  font-size: 18px;
  display: inline-block;
  width: auto;
  height: auto;
  background: none;
  border: none;
  border-radius: 0;
}

.aws-empty {
  color: #bdc3c7;
  font-weight: 400;
  font-size: 16px;
}

.aws-number {
  color: #2c3e50;
  font-weight: 600;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  background: none;
  padding: 0;
  border: none;
  border-radius: 0;
  font-size: 14px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .aws-table-container {
    margin: 16px 0;
    border-radius: 6px;
  }
  
  .aws-table {
    font-size: 12px;
  }
  
  .aws-th,
  .aws-td {
    padding: 12px 16px;
    font-size: 12px;
  }
  
  .aws-region-header {
    padding: 12px 16px;
    font-size: 12px;
  }
  
  .aws-success,
  .aws-error {
    font-size: 16px;
  }
  
  .aws-number {
    font-size: 12px;
  }
  
  .aws-mcid {
    font-size: 11px;
  }
  
  .aws-metric {
    padding-left: 16px;
    font-size: 12px;
  }
}

/* 卡片样式 - 用于CEE成本节约部分 */
.card-wrapper {
  margin: 20px 0;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.card-header:hover {
  background: #e9ecef;
}

.section-head {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #f0f8ff;
  border-radius: 8px;
  margin: 8px 0;
}

/* 分析部分样式 */
.analysis-section {
  margin: 32px 0;
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e8ed;
}

.section-header {
  margin-bottom: 20px;
  text-align: center;
}

.section-header h3 {
  font-size: 22px;
  color: #232f3e;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.section-description {
  font-size: 14px;
  color: #5a6c7d;
  margin: 0;
}

.section-content {
  margin-top: 20px;
}

/* 行动计划表格特殊样式 */

.logic-item {
  margin: 4px 0;
  line-height: 1.5;
  font-size: 13px;
  color: #333;
}

.di-shared-logic {
  background: #f8f9fa !important;
  padding: 16px !important;
}

.logic-section {
  margin-bottom: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
}

.logic-section:last-child {
  border-bottom: none;
}

.logic-title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
  font-size: 13px;
}

.logic-content {
  font-size: 12px;
  color: #555;
  line-height: 1.5;
  margin-left: 8px;
}

/* AM pitching 话术表格统一背景色 */
.pitching-table .aws-row {
  background: #ffffff !important;
}

.pitching-table .aws-row:hover {
  background: #e8f4f8 !important;
}
</style>
