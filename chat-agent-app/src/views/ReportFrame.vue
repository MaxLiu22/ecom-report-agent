<script setup>
import { ref } from 'vue';

const activeTab = ref(0);

const tabs = [
  { id: 0, title: '欧洲站点拓展评估', key: 'evaluation' },
  { id: 1, title: '欧洲站拓展解决方案定制', key: 'solutions' },
  { id: 2, title: '政策更新', key: 'policy' },
  { id: 3, title: '行动计划', key: 'action' }
];

const switchTab = (tabId) => {
  activeTab.value = tabId;
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
        <div class="content-header">
          <h2>🌍 欧洲站点拓展评估</h2>
          <p class="content-description">全面评估您的欧洲市场拓展机会与挑战</p>
        </div>
        <div class="content-body">
          <div class="evaluation-overview">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #FF8C00; margin: 20px 0;">
              <h4 style="color: #333; font-size: 18px; font-weight: 600; margin: 0 0 15px 0;">本报告包含以下分析内容：</h4>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; margin-top: 15px;">
                <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0;">
                  <h5 style="color: #FF6B35; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">🌍 站点拓展评估</h5>
                  <p style="color: #666; font-size: 13px; line-height: 1.4; margin: 0;">欧洲站点拓展解决方案对比分析，包括PanEU、EFN等物流模式</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0;">
                  <h5 style="color: #FF6B35; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">📊 PanEU机会分析</h5>
                  <p style="color: #666; font-size: 13px; line-height: 1.4; margin: 0;">147个ASIN的PanEU同步机会，预计节省€3,313,102.44</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0;">
                  <h5 style="color: #FF6B35; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">🎯 双边入库分析</h5>
                  <p style="color: #666; font-size: 13px; line-height: 1.4; margin: 0;">英国-欧盟双向入库机会，高潜力选品识别</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0;">
                  <h5 style="color: #FF6B35; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">📈 DI分析报告</h5>
                  <p style="color: #666; font-size: 13px; line-height: 1.4; margin: 0;">双向分析数据，包含销售潜力和成本优化建议</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Dashboard表格预览 -->
          <div class="dashboard-preview" style="margin-top: 30px;">
            <h3 style="color: #333; font-size: 20px; margin-bottom: 20px; border-bottom: 2px solid #FF8C00; padding-bottom: 10px;">📊 Dashboard文件预览</h3>
            <div class="table-container" style="overflow-x: auto;">
              <table class="excel-table" style="width: 100%; border-collapse: collapse; font-size: 11px; background: #ffffff; border: 1px solid #ddd; border-radius: 4px;">
                <thead>
                  <tr>
                    <th style="background: #333; color: white; padding: 12px 8px; text-align: center;"></th>
                    <th style="background: #333; color: white; padding: 12px 8px; text-align: center;"></th>
                    <th style="background: #333; color: white; padding: 12px 8px; text-align: center;"></th>
                    <th style="background: #FF8C00; color: white; padding: 12px 8px; text-align: center;">0.英国和欧盟间物流</th>
                    <th colspan="3" style="background: #FF8C00; color: white; padding: 12px 8px; text-align: center;">1.EU5欧盟内物流</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="mcid-row">
                    <td class="row-label mcid-label" style="background: #fff5f0; color: #FF6B35; font-weight: bold; padding: 10px 8px; text-align: center;">MCID</td>
                    <td style="background: #f8f9fa; padding: 10px 8px;">账户名称</td>
                    <td style="background: #f8f9fa; padding: 10px 8px;"></td>
                    <td style="background: #f8f9fa; padding: 10px 8px; text-align: center;">英国</td>
                    <td style="background: #f8f9fa; padding: 10px 8px; text-align: center;">德国</td>
                    <td style="background: #f8f9fa; padding: 10px 8px; text-align: center;">意大利</td>
                    <td style="background: #f8f9fa; padding: 10px 8px; text-align: center;">法国</td>
                    <td style="background: #f8f9fa; padding: 10px 8px; text-align: center;">西班牙</td>
                  </tr>
                  <tr>
                    <td class="row-label" style="background: #f8f9fa; padding: 10px 8px;">157076946612</td>
                    <td style="padding: 10px 8px;">Sinuolong Lighting</td>
                    <td style="padding: 10px 8px;">账户健康情况</td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                  </tr>
                  <tr>
                    <td class="row-label" style="background: #f8f9fa; padding: 10px 8px;"></td>
                    <td style="padding: 10px 8px;"></td>
                    <td style="padding: 10px 8px;">FBA选品数量</td>
                    <td style="text-align: center; padding: 10px 8px;">116</td>
                    <td style="text-align: center; padding: 10px 8px;">46</td>
                    <td style="text-align: center; padding: 10px 8px;">24</td>
                    <td style="text-align: center; padding: 10px 8px;">19</td>
                    <td style="text-align: center; padding: 10px 8px;">12</td>
                  </tr>
                  <tr>
                    <td class="row-label" style="background: #f8f9fa; padding: 10px 8px;"></td>
                    <td style="padding: 10px 8px;"></td>
                    <td style="padding: 10px 8px;">FBA潜在销售机会 (数量)*</td>
                    <td style="text-align: center; padding: 10px 8px;">46</td>
                    <td style="text-align: center; padding: 10px 8px;">116</td>
                    <td style="text-align: center; padding: 10px 8px;">138</td>
                    <td style="text-align: center; padding: 10px 8px;">143</td>
                    <td style="text-align: center; padding: 10px 8px;">150</td>
                  </tr>
                  <tr>
                    <td class="row-label" style="background: #f8f9fa; padding: 10px 8px;"></td>
                    <td style="padding: 10px 8px;"></td>
                    <td style="padding: 10px 8px;">持有有效增值税号国家</td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #333; font-size: 18px; font-weight: bold;">✗</span></td>
                  </tr>
                  <tr>
                    <td class="row-label" style="background: #f8f9fa; padding: 10px 8px;"></td>
                    <td style="padding: 10px 8px;"></td>
                    <td style="padding: 10px 8px;">授权仓储国家</td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #333; font-size: 18px; font-weight: bold;">✗</span></td>
                  </tr>
                  <tr>
                    <td class="row-label" style="background: #f8f9fa; padding: 10px 8px;"></td>
                    <td style="padding: 10px 8px;"></td>
                    <td style="padding: 10px 8px;">是否启用亚马逊物流欧洲整合服务(PanEU)</td>
                    <td style="text-align: center; padding: 10px 8px;"></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #FF6B35; font-size: 18px; font-weight: bold;">✓</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #333; font-size: 18px; font-weight: bold;">✗</span></td>
                  </tr>
                  <tr>
                    <td class="row-label" style="background: #f8f9fa; padding: 10px 8px;"></td>
                    <td style="padding: 10px 8px;"></td>
                    <td style="padding: 10px 8px;">是否使用英国和欧盟之间的远程配送服务</td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #333; font-size: 18px; font-weight: bold;">✗</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #333; font-size: 18px; font-weight: bold;">✗</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #333; font-size: 18px; font-weight: bold;">✗</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #333; font-size: 18px; font-weight: bold;">✗</span></td>
                    <td style="text-align: center; padding: 10px 8px;"><span style="color: #333; font-size: 18px; font-weight: bold;">✗</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: 欧洲站拓展解决方案定制 -->
      <div v-if="activeTab === 1" class="content-panel">
        <div class="content-header">
          <h2>🛠️ 欧洲站拓展解决方案定制</h2>
          <p class="content-description">为您量身定制的欧洲市场拓展解决方案</p>
        </div>
        <div class="content-body">
          <div class="solution-sections">
            <div class="solution-section">
              <h3>2.1 欧盟内部物流方案</h3>
              <div class="solution-details">
                <!-- 欧盟内部方案介绍与对比 -->
                <div style="margin: 20px 0;">
                  <h4 style="color: #333; font-size: 16px; margin: 10px 0;">欧洲站点拓展解决方案</h4>
                  <h5 style="color: #666; font-size: 14px; margin: 10px 0;">欧盟内部物流方案</h5>
                  
                  <div style="display: flex; align-items: center; margin: 15px 0; gap: 8px; padding: 10px; background: #f8f9fa; border-radius: 4px; border-left: 4px solid #FF8C00;">
                    <span style="color: #FF8C00; font-size: 16px; font-weight: bold;">▶</span>
                    <h4 style="color: #333; font-size: 16px; font-weight: 600; margin: 0; line-height: 1.4;">欧盟内部方案介绍与对比</h4>
                  </div>
                  
                  <div class="table-container" style="overflow-x: auto; margin: 20px 0;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px; border: 2px solid #ddd; margin-bottom: 15px;">
                      <thead>
                        <tr>
                          <th rowspan="2" style="background: linear-gradient(135deg, #333 0%, #666 100%); color: white; padding: 12px 8px; border: 1px solid #ddd; text-align: center; width: 80px;">方案类型</th>
                          <th style="background: linear-gradient(135deg, #FF8C00 0%, #FF8C00 100%); color: white; padding: 12px 8px; border: 1px solid #ddd; text-align: center; width: 25%;">欧盟 FBA 的物流模式</th>
                          <th style="background: linear-gradient(135deg, #FF8C00 0%, #FF8C00 100%); color: white; padding: 12px 8px; border: 1px solid #ddd; text-align: center; width: 35%;">欧盟之间的远程配送网络<br/>European Fulfillment Network (EFN)</th>
                          <th style="background: linear-gradient(135deg, #FF8C00 0%, #FF8C00 100%); color: white; padding: 12px 8px; border: 1px solid #ddd; text-align: center; width: 35%;">⭐亚马逊物流欧洲整合服务<br/>Pan European (PanEU)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="background: #f8f9fa; color: #333; font-weight: 600; padding: 10px 8px; border: 1px solid #ddd; text-align: center;">简介</td>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; font-size: 10px;">卖家入仓至欧盟任一国家后，即可由此国的仓库远程配送到其他欧盟国家</td>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; font-size: 10px;">卖家入仓至欧盟任一国家后，亚马逊将货存储在卖家启用了存储服务的国家/地区的欧盟运营中心内，并自主在这些卖家地区之间分配存储，不额外收取费用</td>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; font-size: 10px; background: #fff9e6; border-left: 3px solid #FF8C00;">卖家入仓至欧盟任一国家后，亚马逊将货存储在卖家启用了存储服务的国家/地区的欧盟运营中心内，并自主在这些卖家地区之间分配存储，不额外收取费用</td>
                        </tr>
                        <tr>
                          <td rowspan="2" style="background: #f8f9fa; color: #333; font-weight: 600; padding: 10px 8px; border: 1px solid #ddd; text-align: center;">加入条件</td>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center;"><div style="font-weight: 600; margin-bottom: 5px; font-size: 10px;">ASIN 设置</div><div style="font-size: 9px;">需使用相同 ASIN/FNSKU#</div></td>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center;"><div style="font-weight: 600; margin-bottom: 5px; font-size: 10px;">ASIN 设置</div><div style="font-size: 9px;">需使用相同 ASIN/FNSKU#</div></td>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center;"><div style="font-weight: 600; margin-bottom: 5px; font-size: 10px;">ASIN 设置</div><div style="font-size: 9px; background: #fff9e6; padding: 4px; border-radius: 3px; border: 1px solid #FF8C00;">德法意西需使用相同 ASIN/FNSKU#</div></td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center;"><div style="font-weight: 600; margin-bottom: 5px; font-size: 10px;">仓储国要求*</div><div style="font-size: 9px;">仅开启一国仓储<br/>(需要1个 VAT)</div></td>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center;"><div style="font-weight: 600; margin-bottom: 5px; font-size: 10px;">仓储国要求*</div><div style="font-size: 9px;">仅开启一国仓储<br/>(需要1个 VAT)</div></td>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center;"><div style="font-weight: 600; margin-bottom: 5px; font-size: 10px;">仓储国要求*</div><div style="font-size: 9px; background: #fff9e6; padding: 4px; border-radius: 3px; border: 1px solid #FF8C00;">需要德法意西中，至少开启2国仓储（至少2个 VAT），<br/>启用仓储的国家为PanEU，未启用国家为 EFN</div></td>
                        </tr>
                        <tr>
                          <td style="background: #f8f9fa; color: #333; font-weight: 600; padding: 10px 8px; border: 1px solid #ddd; text-align: center;">头程物流<br/>(CN->EU FBA CC)</td>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center; font-size: 10px;">需发货至欧盟某1个国家，成本低</td>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center; font-size: 10px;">需发货至欧盟某1个国家，成本低</td>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center; font-size: 10px;">需发货至欧盟某1个国家，成本低</td>
                        </tr>
                        <tr>
                          <td style="background: #f8f9fa; color: #333; font-weight: 600; padding: 10px 8px; border: 1px solid #ddd; text-align: center;">尾程配送<br/>(FBA)</td>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center; font-size: 10px;"><span style="background: #fff2e8; color: #FF6B35; border: 1px solid #FF6B35; padding: 2px 6px; border-radius: 12px; font-size: 9px; margin: 2px;">跨境配送</span>：费用高，3-5天送达</td>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center; font-size: 10px;"><span style="background: #fff5f0; color: #FF6B35; border: 1px solid #FF6B35; padding: 2px 6px; border-radius: 12px; font-size: 9px; margin: 2px;">本地配送</span>：费用节约高达53%，1-2天送达<br/><span style="background: #fff2e8; color: #FF6B35; border: 1px solid #FF6B35; padding: 2px 6px; border-radius: 12px; font-size: 9px; margin: 2px;">跨境配送</span>+<span style="background: #fff2e8; color: #FF6B35; border: 1px solid #FF6B35; padding: 2px 6px; border-radius: 12px; font-size: 9px; margin: 2px;">跨境配送</span></td>
                          <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center; font-size: 10px;"><span style="background: #fff5f0; color: #FF6B35; border: 1px solid #FF6B35; padding: 2px 6px; border-radius: 12px; font-size: 9px; margin: 2px;">本地配送</span>+<span style="background: #fff2e8; color: #FF6B35; border: 1px solid #FF6B35; padding: 2px 6px; border-radius: 12px; font-size: 9px; margin: 2px;">跨境配送</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- PanEU成本节约计算 -->
                  <div style="margin-top: 20px; padding: 20px; background: #ffffff; border: 1px solid #ddd; border-radius: 6px;">
                    <h5 style="color: #333; font-size: 14px; font-weight: 600; margin: 0 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #FF8C00;">启用PanEU国家仓储获得配送费用节约</h5>
                    
                    <table style="width: 100%; border-collapse: collapse; font-size: 10px; background: #ffffff; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
                      <thead>
                        <tr>
                          <th style="background: #333; color: white; font-weight: 600; padding: 10px 8px; text-align: center; border-right: 1px solid #555; font-size: 9px;">跨境配送国家</th>
                          <th style="background: #333; color: white; font-weight: 600; padding: 10px 8px; text-align: center; border-right: 1px solid #555; font-size: 9px;">预计可节约费用(RMB)</th>
                          <th style="background: #333; color: white; font-weight: 600; padding: 10px 8px; text-align: center; border-right: 1px solid #555; font-size: 9px;">预计节约配送费(RMB)</th>
                          <th style="background: #333; color: white; font-weight: 600; padding: 10px 8px; text-align: center; border-right: 1px solid #555; font-size: 9px;">申请VAT所需费用(RMB)**</th>
                          <th style="background: #333; color: white; font-weight: 600; padding: 10px 8px; text-align: center; font-size: 9px;">申请VAT所需时间</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="background: #f8f9fa; color: #333; font-weight: 600; padding: 8px; border: 1px solid #ddd; text-align: center;">FR</td>
                          <td style="color: #333; font-weight: 500; padding: 8px; border: 1px solid #ddd; text-align: center;">6,914.51</td>
                          <td style="color: #333; font-weight: 500; padding: 8px; border: 1px solid #ddd; text-align: center;">8,291.46</td>
                          <td style="color: #333; font-weight: 500; padding: 8px; border: 1px solid #ddd; text-align: center;">1,376.95</td>
                          <td style="color: #333; font-size: 9px; padding: 8px; border: 1px solid #ddd; text-align: center;">8-13 weeks</td>
                        </tr>
                        <tr style="background: #333;">
                          <td style="background: #333; color: white; font-weight: 600; font-size: 11px; padding: 8px; border: 1px solid #ddd; text-align: center;">总额</td>
                          <td style="background: #333; color: white; font-weight: 600; font-size: 11px; padding: 8px; border: 1px solid #ddd; text-align: center;">6,914.51</td>
                          <td style="background: #333; color: white; font-weight: 600; font-size: 11px; padding: 8px; border: 1px solid #ddd; text-align: center;">8,291.46</td>
                          <td style="background: #333; color: white; font-weight: 600; font-size: 11px; padding: 8px; border: 1px solid #ddd; text-align: center;">1,376.95</td>
                          <td style="background: #333; color: white; font-weight: 600; font-size: 11px; padding: 8px; border: 1px solid #ddd; text-align: center;">-</td>
                        </tr>
                      </tbody>
                    </table>
              </div>
              
                  <!-- PanEU商品资格说明 -->
                  <div style="margin-top: 20px; padding: 20px; background: #ffffff; border: 1px solid #ddd; border-radius: 6px;">
                    <div style="display: flex; align-items: center; margin-bottom: 15px; gap: 8px;">
                      <span style="color: #FF8C00; font-size: 16px; font-weight: bold;">▶</span>
                      <h4 style="color: #333; font-size: 16px; font-weight: 600; margin: 0;">PanEU商品资格要求</h4>
                    </div>
                    
                    <p style="color: #333; font-size: 13px; line-height: 1.5; margin: 0 0 15px 0;">
                      商品必须符合在欧洲各国之间运输流转的要求，以下列出不符合PanEU的商品种类：
                    </p>
                    
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px; background: #ffffff; border: 1px solid #ddd;">
                      <thead>
                        <tr>
                          <th style="background: #333; color: white; font-weight: 600; padding: 12px 10px; text-align: center; border-right: 1px solid #555; width: 15%;">类目</th>
                          <th style="background: #333; color: white; font-weight: 600; padding: 12px 10px; text-align: center; border-right: 1px solid #555; width: 35%;">禁售</th>
                          <th style="background: #333; color: white; font-weight: 600; padding: 12px 10px; text-align: center; width: 50%;">限制</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="background: #f8f9fa; color: #333; font-weight: 600; text-align: center; padding: 10px; border: 1px solid #ddd;">酒类<br/>Food</td>
                          <td style="color: #333; font-size: 10px; padding: 10px; border: 1px solid #ddd;">一般人烹调类、春节小杂、篱笆看台</td>
                          <td style="color: #555; font-size: 10px; padding: 10px; border: 1px solid #ddd;">除非获得EU的相关食品安全认证，否则无法在欧盟销售；<br/>如果注册EU的相关认证，存在专业工厂专业生产线认证，运输总价29周的，<br/>总价值限制为2000欧元，上述限制内商品可在全欧盟内销售。</td>
                        </tr>
                        <tr style="background: #f8f9fa;">
                          <td style="background: #f8f9fa; color: #333; font-weight: 600; text-align: center; padding: 10px; border: 1px solid #ddd;">汽车零件<br/>Auto motive</td>
                          <td style="color: #333; font-size: 10px; padding: 10px; border: 1px solid #ddd;">电子产品、车外后视镜(WK连接)、安规气外后电器、高正压(WK连接)、门锁(WK连接)、连接线(WK连接)、汽车工具(WK连接)、高压、安规线(WK连接)、咖啡工、基础润滑(WK连接)、门连线、下滑、工程主体</td>
                          <td style="color: #555; font-size: 10px; padding: 10px; border: 1px solid #ddd;">汽车零件需要，手动制与当地的实验室认证，生产过程注册统一认证标识，各国最新认证文件一致性登录认证平台数据</td>
                        </tr>
                        <tr>
                          <td style="background: #f8f9fa; color: #333; font-weight: 600; text-align: center; padding: 10px; border: 1px solid #ddd;">玩具<br/>Toys</td>
                          <td style="color: #333; font-size: 10px; padding: 10px; border: 1px solid #ddd;">儿童用品、蒙古用、灯具、安规、轮胎、室内娱乐等</td>
                          <td style="color: #555; font-size: 10px; padding: 10px; border: 1px solid #ddd;">玩具大类产品都需要REACH/LVD等认证，包括各类成套塑料等的测试</td>
                        </tr>
                        <tr style="background: #f8f9fa;">
                          <td style="background: #f8f9fa; color: #333; font-weight: 600; text-align: center; padding: 10px; border: 1px solid #ddd;">喷雾类<br/>Sprays</td>
                          <td style="color: #333; font-size: 10px; padding: 10px; border: 1px solid #ddd;">喷雾类化学、化妆品、清洁类、定制类</td>
                          <td style="color: #555; font-size: 10px; padding: 10px; border: 1px solid #ddd;">空气方面的危险品认定REACH/LVD认证，包括各类专业技术条件销售数据</td>
                        </tr>
                        <tr>
                          <td style="background: #f8f9fa; color: #333; font-weight: 600; text-align: center; padding: 10px; border: 1px solid #ddd;">磁铁类型类<br/>带磁性元器件</td>
                          <td style="color: #333; font-size: 10px; padding: 10px; border: 1px solid #ddd;">消磁类功能、化感类、高灵件工厂</td>
                          <td style="color: #555; font-size: 10px; padding: 10px; border: 1px solid #ddd;">需要达际到商务认证和相关证书，标识要符号等于产品功效现实定义，带磁类物<br/>受限，商关和欧盟等经营产品功等期效期平<300克，高度<360mm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="solution-section">
              <h3>2.2 英国和欧盟间物流方案</h3>
              <div class="solution-details">
                <!-- 英国和欧盟间物流方案对比 -->
                <div style="margin-top: 30px; padding: 20px; background: #ffffff; border: 1px solid #ddd; border-radius: 6px;">
                  <h4 style="color: #333; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">英国和欧盟物流方案</h4>
                  <h5 style="color: #666; font-size: 16px; font-weight: 500; margin: 0 0 4px 0;">英国和欧盟物流方案的对比和建议</h5>
                  
                  <div style="display: flex; align-items: center; margin: 20px 0 15px 0; gap: 8px; padding: 10px; background: #f8f9fa; border-radius: 4px; border-left: 4px solid #FF8C00;">
                    <span style="color: #FF8C00; font-size: 16px; font-weight: bold;">▶</span>
                    <h4 style="color: #333; font-size: 16px; font-weight: 600; margin: 0; line-height: 1.4;">英国和欧盟间物流方案的对比和建议</h4>
                  </div>
                  
                  <div style="background: linear-gradient(135deg, #FF8C00 0%, #FF8C00 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; text-align: center; margin: 15px auto 20px auto; width: fit-content; box-shadow: 0 2px 4px rgba(255, 140, 0, 0.3);">
                    英欧双向双入驻 vs. 英国单收取2个间配送跨境运
                  </div>
                  
                  <table style="width: 100%; border-collapse: collapse; font-size: 11px; background: #ffffff; border: 2px solid #FF8C00; border-radius: 6px; margin-top: 15px;">
                    <thead>
                      <tr>
                        <th style="background: #e67e22; color: white; font-weight: 600; padding: 12px 10px; text-align: center; border-right: 1px solid #fff; font-size: 11px; width: 25%;">UK<->EU FBA 物流模式</th>
                        <th style="background: linear-gradient(135deg, #FF8C00 0%, #FF8C00 100%); color: white; font-weight: 600; padding: 12px 10px; text-align: center; border-right: 1px solid #fff; font-size: 11px; width: 37.5%;">英国收获双选入驻<br/>Dual Inbound (DI)</th>
                        <th style="background: linear-gradient(135deg, #FF8C00 0%, #FF8C00 100%); color: white; font-weight: 600; padding: 12px 10px; text-align: center; font-size: 11px; width: 37.5%;">英国与欧盟2个间的远程配送<br/>Remote Fulfillment between the UK and EU (EURF)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="background: #f8f9fa;">
                        <td style="background: #f8f9fa; color: #333; font-weight: 600; text-align: center; padding: 10px 8px; border: 1px solid #ddd; border-right: 2px solid #ddd;">介绍</td>
                        <td style="background: #f8f9fa; color: #333; text-align: left; padding: 10px 12px; border: 1px solid #ddd; font-size: 10px;">卖家能够将货物入列,选至英国EU配送链运营</td>
                        <td style="background: #f8f9fa; color: #333; text-align: left; padding: 10px 12px; border: 1px solid #ddd; font-size: 10px;">卖家入驻合欧盟欧选收后任一成本国。<br/>即可以欧盟侧位者定者向任和到联欧洲盟通过当当和和</td>
                      </tr>
                      <tr style="background: #fafafa;">
                        <td style="background: #f8f9fa; color: #333; font-weight: 600; text-align: center; padding: 10px 8px; border: 1px solid #ddd; border-right: 2px solid #ddd;">头程物流 (CN->EU FBA FCs)</td>
                        <td style="color: #333; text-align: left; padding: 10px 12px; border: 1px solid #ddd; font-size: 10px;">需要保齐英国/EU仓都要发送成本高, 成本偏对应</td>
                        <td style="color: #333; text-align: left; padding: 10px 12px; border: 1px solid #ddd; font-size: 10px;">需要保齐英国/EU仓都要发送成本高, 成本偏对应</td>
                      </tr>
                      <tr>
                        <td style="background: #f8f9fa; color: #333; font-weight: 600; text-align: center; padding: 10px 8px; border: 1px solid #ddd; border-right: 2px solid #ddd;">尾程配送 (FBA)</td>
                        <td style="color: #333; text-align: left; padding: 10px 12px; border: 1px solid #ddd; font-size: 10px;">需即到及优缺费见卖水电配送选供下优程收商品. 1-2天送达</td>
                        <td style="color: #333; text-align: left; padding: 10px 12px; border: 1px solid #ddd; font-size: 10px;">有销运费, 客期间, 5-7天送达</td>
                      </tr>
                      <tr>
                        <td colspan="3" style="background: #e9ecef; color: #495057; font-weight: 600; text-align: center; padding: 8px; font-size: 12px; border: 1px solid #ddd;">加入条件</td>
                      </tr>
                      <tr style="background: #fafafa;">
                        <td style="background: #f8f9fa; color: #333; font-weight: 600; text-align: center; padding: 10px 8px; border: 1px solid #ddd; border-right: 2px solid #ddd;">ASIN 设置</td>
                        <td style="color: #333; text-align: left; padding: 10px 12px; border: 1px solid #ddd; font-size: 10px;">应收收市已的英国DI，以设收下及环费欧提综收都配配配，具其优可<br/>可可可该中欧中是最在的优</td>
                        <td style="color: #333; text-align: left; padding: 10px 12px; border: 1px solid #ddd; font-size: 10px;">需要配重设网英国/欧盟的DI的配配配. 部分 ASIN 无法除以设在欧应有或</td>
                      </tr>
                      <tr>
                        <td style="background: #f8f9fa; color: #333; font-weight: 600; text-align: center; padding: 10px 8px; border: 1px solid #ddd; border-right: 2px solid #ddd;">VAT 要求</td>
                        <td style="color: #333; text-align: left; padding: 10px 12px; border: 1px solid #ddd; font-size: 10px;">需要配置2个VAT<br/>或申请提调及者收欧盟的 VAT</td>
                        <td style="color: #333; text-align: left; padding: 10px 12px; border: 1px solid #ddd; font-size: 10px;">仅设置1个VAT<br/>或申请提调及者收欧盟VAT</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="solution-section">
              <h3>2.3 PanEU机会分析</h3>
              <div class="solution-details">
                <!-- PanEU ASIN同步机会表格 -->
                <div style="margin: 20px 0;">
                  <h4 style="color: #333; font-size: 18px; margin-bottom: 20px;">卖家应用: 同步PanEU ASIN获得配送节约及销售机会</h4>
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 20px 0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <thead>
                      <tr>
                        <th style="width: 20%; background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white; padding: 15px 12px; text-align: left;">机会类别</th>
                        <th style="width: 10%; text-align: center; background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white; padding: 15px 12px;">数量</th>
                        <th style="width: 35%; background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white; padding: 15px 12px; text-align: left;">详细描述</th>
                        <th style="width: 20%; background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white; padding: 15px 12px; text-align: left;">行动建议</th>
                        <th style="width: 15%; text-align: right; background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white; padding: 15px 12px;">预计节省费用(€/年)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style="background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white;">
                        <td style="padding: 15px 12px; font-weight: bold;">总计</td>
                        <td style="text-align: center; font-weight: bold; padding: 15px 12px;">147</td>
                        <td style="padding: 15px 12px;">
                          因缺少部分国家活跃offer，面临失去泛欧资格风险。<br/><br/>
                          (泛欧资格中断后有14天宽限期，需在期限内恢复四国销售状态)
                        </td>
                        <td style="padding: 15px 12px;">
                          尽快恢复德法意西四国失效offer，通过LOSG/BIL工具快速实现ASIN同步
                        </td>
                        <td style="text-align: right; color: white; font-weight: bold; font-size: 16px; padding: 15px 12px;">€3,313,102.44</td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">可以加入PanEU的Asin</td>
                        <td style="text-align: center; color: #FF6B35; font-weight: bold; padding: 15px 12px; border: 1px solid #e8e8e8;">134</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">
                          134个Asin 没有同步四国选品，导致：<br/>
                          1. 未同步选品的国家产生远程配送费，不能享受本地配送费<br/>
                          2. 转化率低于本地配送Asin
                        </td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">在德法意西四国同步选品，以获取PanEU福利（本地配送费）</td>
                        <td style="text-align: right; color: #FF6B35; font-weight: bold; padding: 15px 12px; border: 1px solid #e8e8e8;">€2,943,634.00</td>
                      </tr>
                      <tr style="background: #f8f9fa;">
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">缺少1-2个国家的选品同步</td>
                        <td style="text-align: center; color: #FF6B35; font-weight: bold; padding: 15px 12px; border: 1px solid #e8e8e8;">52</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;"></td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">仅需同步1-2国选品</td>
                        <td style="text-align: right; color: #FF6B35; font-weight: bold; padding: 15px 12px; border: 1px solid #e8e8e8;">€773.14</td>
                      </tr>
                      <tr>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">缺少3个国家的选品同步（仅在德国销售）</td>
                        <td style="text-align: center; color: #FF6B35; font-weight: bold; padding: 15px 12px; border: 1px solid #e8e8e8;">82</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;"></td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">需同步3国选品</td>
                        <td style="text-align: right; color: #FF6B35; font-weight: bold; padding: 15px 12px; border: 1px solid #e8e8e8;">€368,563.34</td>
                      </tr>
                      <tr style="background: #f8f9fa;">
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">PanEU福利失效的Asin</td>
                        <td style="text-align: center; color: #FF6B35; font-weight: bold; padding: 15px 12px; border: 1px solid #e8e8e8;">13</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">
                          13个Asin 部分国家offer失效，面临失去泛欧福利的风险。<br/><br/>
                          (泛欧资格中断后有14天宽限期，需在期限内恢复四国销售状态)
                        </td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">
                          尽快恢复德法意西四国失效offer，通过LOSG/BIL工具快速实现ASIN同步
                        </td>
                        <td style="text-align: right; color: #FF6B35; font-weight: bold; padding: 15px 12px; border: 1px solid #e8e8e8;">€131.96</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="solution-section">
              <h3>2.4 双边入库机会</h3>
              <div class="solution-details">
                <!-- DI双向分析数据表 -->
                <div style="margin: 20px 0;">
                  <h4 style="color: #333; font-size: 18px; margin-bottom: 20px;">DI 双向分析数据表</h4>
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 20px 0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <thead>
                      <tr>
                        <th style="width: 5%; text-align: center; background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white; padding: 15px 12px;">#</th>
                        <th style="width: 35%; background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white; padding: 15px 12px;">UK<=>EU ASIN</th>
                        <th style="width: 10%; text-align: center; background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white; padding: 15px 12px;">数量</th>
                        <th style="width: 20%; text-align: center; background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white; padding: 15px 12px;">来源总销售额(30D)</th>
                        <th style="width: 30%; background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white; padding: 15px 12px;">机会点及操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8;">1</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">仅在英国本地入库的选品</td>
                        <td style="text-align: center; color: #FF6B35; font-weight: bold; padding: 15px 12px; border: 1px solid #e8e8e8;">229</td>
                        <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8;">€147967</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">-</td>
                      </tr>
                      <tr>
                        <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8;">2</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">在欧盟有高销售潜力</td>
                        <td style="text-align: center; color: #FF6B35; font-weight: bold; padding: 15px 12px; border: 1px solid #e8e8e8;">37</td>
                        <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8;">€37933</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">本地入库至欧盟,预计销售额€242k (12M)</td>
                      </tr>
                      <tr>
                        <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8;">3</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">在欧盟有全球拓展大礼包</td>
                        <td style="text-align: center; color: #FF6B35; font-weight: bold; padding: 15px 12px; border: 1px solid #e8e8e8;">159</td>
                        <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8;">€124242</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">本地入库至欧盟, 获取最高€714k代金券</td>
                      </tr>
                      <tr>
                        <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8;">4</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">未在欧盟远程销售</td>
                        <td style="text-align: center; color: #FF6B35; font-weight: bold; padding: 15px 12px; border: 1px solid #e8e8e8;">225</td>
                        <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8;">€142307</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">开启英国至欧盟的远程配送</td>
                      </tr>
                      <tr>
                        <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8;">5</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">在英国有高销售潜力</td>
                        <td style="text-align: center; color: #FF6B35; font-weight: bold; padding: 15px 12px; border: 1px solid #e8e8e8;">45</td>
                        <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8;">€65497</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">本地入库至英国,预计销售额£59k (12M)</td>
                      </tr>
                      <tr>
                        <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8;">6</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">在英国有全球拓展大礼包</td>
                        <td style="text-align: center; color: #FF6B35; font-weight: bold; padding: 15px 12px; border: 1px solid #e8e8e8;">51</td>
                        <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8;">€18638</td>
                        <td style="padding: 15px 12px; border: 1px solid #e8e8e8;">本地入库至英国, 获取最高£181k代金券</td>
                      </tr>
                    </tbody>
                  </table>
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
          <!-- 政策更新时间线 -->
          <div class="policy-updates" style="margin-top: 30px;">
            <div class="update-item" style="display: flex; gap: 20px; padding: 20px; background: #ffffff; border-radius: 8px; border-left: 4px solid #ff9900; border: 1px solid #e1e8ed; margin-bottom: 20px;">
              <div class="update-date" style="font-size: 14px; font-weight: 600; color: #ff9900; white-space: nowrap; min-width: 80px;">2025年1月</div>
              <div class="update-content" style="flex: 1;">
                <h4 style="font-size: 20px; color: #232f3e; margin: 0 0 8px 0; font-weight: 600;">VAT申请流程优化</h4>
                <p style="font-size: 15px; color: #5a6c7d; margin: 0 0 12px 0; line-height: 1.6;">欧盟简化了VAT申请流程，预计申请时间从8-13周缩短至6-10周</p>
                <span class="impact-tag medium" style="display: inline-block; padding: 6px 16px; border-radius: 16px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; background-color: #ff9900; color: white;">中等影响</span>
              </div>
            </div>

            <div class="update-item" style="display: flex; gap: 20px; padding: 20px; background: #ffffff; border-radius: 8px; border-left: 4px solid #ff9900; border: 1px solid #e1e8ed; margin-bottom: 20px;">
              <div class="update-date" style="font-size: 14px; font-weight: 600; color: #ff9900; white-space: nowrap; min-width: 80px;">2024年12月</div>
              <div class="update-content" style="flex: 1;">
                <h4 style="font-size: 20px; color: #232f3e; margin: 0 0 8px 0; font-weight: 600;">PanEU资格审核加严</h4>
                <p style="font-size: 15px; color: #5a6c7d; margin: 0 0 12px 0; line-height: 1.6;">亚马逊加强了PanEU资格审核，要求四国同时活跃销售的时间延长至30天</p>
                <span class="impact-tag high" style="display: inline-block; padding: 6px 16px; border-radius: 16px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; background-color: #d73027; color: white;">高影响</span>
              </div>
            </div>

            <div class="update-item" style="display: flex; gap: 20px; padding: 20px; background: #ffffff; border-radius: 8px; border-left: 4px solid #ff9900; border: 1px solid #e1e8ed;">
              <div class="update-date" style="font-size: 14px; font-weight: 600; color: #ff9900; white-space: nowrap; min-width: 80px;">2024年11月</div>
              <div class="update-content" style="flex: 1;">
                <h4 style="font-size: 20px; color: #232f3e; margin: 0 0 8px 0; font-weight: 600;">远程配送费用调整</h4>
                <p style="font-size: 15px; color: #5a6c7d; margin: 0 0 12px 0; line-height: 1.6;">英国-欧盟远程配送费用平均上涨8%，本地配送优势进一步凸显</p>
                <span class="impact-tag low" style="display: inline-block; padding: 6px 16px; border-radius: 16px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; background-color: #146eb4; color: white;">低影响</span>
              </div>
            </div>
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
          <!-- 主要机会点分析 -->
          <div style="background: #ffffff; border: 1px solid #e8e8e8; border-radius: 8px; margin: 20px 0; padding: 25px;">
            <div style="margin-bottom: 20px; border-bottom: 2px solid #f0f8ff; padding-bottom: 15px;">
              <h3 style="color: #333; font-size: 20px; font-weight: 600; margin: 0; display: flex; align-items: center; gap: 8px;">🎯 主要机会点分析</h3>
            </div>
            
            <div style="margin-bottom: 25px;">
              <div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #FF8C00;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="color: #FF6B35; font-weight: bold; font-size: 16px;">•</span>
                  <strong style="color: #333; font-size: 14px; font-weight: 600;">高销售潜力ASIN:</strong>
                </div>
                <p style="color: #555; font-size: 13px; line-height: 1.6; margin: 0; padding-left: 24px;">
                  UK>EU方向有37个ASIN在欧盟市场具有高销售潜力，预计销售额€242k；EU>UK方向有45个ASIN在英国市场具有高销售潜力，预计销售额£59k
                </p>
              </div>
              
              <div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #FF8C00;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="color: #FF6B35; font-weight: bold; font-size: 16px;">•</span>
                  <strong style="color: #333; font-size: 14px; font-weight: 600;">全球拓展大礼包激励资源:</strong>
        </div>
                <p style="color: #555; font-size: 13px; line-height: 1.6; margin: 0; padding-left: 24px;">
                  UK>EU方向有159个ASIN可获得最高€714k代金券；EU>UK方向有51个ASIN可获得最高£181k代金券
                </p>
      </div>
              
              <div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #FF8C00;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="color: #FF6B35; font-weight: bold; font-size: 16px;">•</span>
                  <strong style="color: #333; font-size: 14px; font-weight: 600;">远程配送优化:</strong>
                </div>
                <p style="color: #555; font-size: 13px; line-height: 1.6; margin: 0; padding-left: 24px;">
                  目前有11个ASIN开启远程配送，其中1个达到高销售量，预计可节省配送费
                </p>
              </div>
              
              <div style="margin: 15px 0; padding: 15px; background: #f8f9fa; border-radius: 6px; border-left: 4px solid #FF8C00;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <span style="color: #FF6B35; font-weight: bold; font-size: 16px;">•</span>
                  <strong style="color: #333; font-size: 14px; font-weight: 600;">市场扩展潜力:</strong>
                </div>
                <p style="color: #555; font-size: 13px; line-height: 1.6; margin: 0; padding-left: 24px;">
                  225个UK>EU ASIN和230个EU>UK ASIN尚未开启远程配送，存在巨大扩展空间
                </p>
              </div>
            </div>
          </div>

          <!-- 行动计划时间线 -->
          <div class="action-timeline" style="position: relative; padding-left: 40px;">
            <div style="content: ''; position: absolute; left: 20px; top: 0; bottom: 0; width: 3px; background: linear-gradient(to bottom, #232f3e, #ff9900);"></div>
            
            <div class="timeline-item" style="position: relative; margin-bottom: 40px; padding-left: 40px;">
              <div class="timeline-marker phase1" style="position: absolute; left: -28px; top: 0; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; color: white; z-index: 1; border: 3px solid white; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); background-color: #232f3e;">1</div>
              <div class="timeline-content" style="background-color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e1e8ed; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                <h3 style="font-size: 22px; color: #232f3e; margin: 0 0 16px 0; font-weight: 600;">优先本地入库</h3>
                <ul class="action-list" style="margin: 0; padding-left: 20px;">
                  <li style="font-size: 15px; color: #5a6c7d; margin-bottom: 10px; line-height: 1.6;">对37个EU高销售潜力ASIN和45个UK高销售潜力ASIN进行本地入库</li>
                  <li style="font-size: 15px; color: #5a6c7d; margin-bottom: 10px; line-height: 1.6;">预计总销售额€242k + £59k</li>
                  <li style="font-size: 15px; color: #5a6c7d; margin-bottom: 10px; line-height: 1.6;">优先级：高 - 直接影响销售收入</li>
                </ul>
              </div>
            </div>

            <div class="timeline-item" style="position: relative; margin-bottom: 40px; padding-left: 40px;">
              <div class="timeline-marker phase2" style="position: absolute; left: -28px; top: 0; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; color: white; z-index: 1; border: 3px solid white; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); background-color: #146eb4;">2</div>
              <div class="timeline-content" style="background-color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e1e8ed; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                <h3 style="font-size: 22px; color: #232f3e; margin: 0 0 16px 0; font-weight: 600;">激励资源利用</h3>
                <ul class="action-list" style="margin: 0; padding-left: 20px;">
                  <li style="font-size: 15px; color: #5a6c7d; margin-bottom: 10px; line-height: 1.6;">充分利用全球拓展大礼包激励资源</li>
                  <li style="font-size: 15px; color: #5a6c7d; margin-bottom: 10px; line-height: 1.6;">总计€714k + £181k代金券</li>
                  <li style="font-size: 15px; color: #5a6c7d; margin-bottom: 10px; line-height: 1.6;">降低初期投入成本，提高ROI</li>
                </ul>
              </div>
            </div>

            <div class="timeline-item" style="position: relative; margin-bottom: 40px; padding-left: 40px;">
              <div class="timeline-marker phase3" style="position: absolute; left: -28px; top: 0; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; color: white; z-index: 1; border: 3px solid white; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); background-color: #ff9900;">3</div>
              <div class="timeline-content" style="background-color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e1e8ed; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                <h3 style="font-size: 22px; color: #232f3e; margin: 0 0 16px 0; font-weight: 600;">远程配送开启</h3>
                <ul class="action-list" style="margin: 0; padding-left: 20px;">
                  <li style="font-size: 15px; color: #5a6c7d; margin-bottom: 10px; line-height: 1.6;">为455个未开启远程配送的ASIN开启远程配送功能</li>
                  <li style="font-size: 15px; color: #5a6c7d; margin-bottom: 10px; line-height: 1.6;">扩大市场覆盖，测试市场反应</li>
                  <li style="font-size: 15px; color: #5a6c7d; margin-bottom: 10px; line-height: 1.6;">为后续本地入库决策提供数据支撑</li>
                </ul>
              </div>
            </div>

            <div class="timeline-item" style="position: relative; margin-bottom: 40px; padding-left: 40px;">
              <div class="timeline-marker phase4" style="position: absolute; left: -28px; top: 0; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; color: white; z-index: 1; border: 3px solid white; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); background-color: #d73027;">4</div>
              <div class="timeline-content" style="background-color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e1e8ed; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                <h3 style="font-size: 22px; color: #232f3e; margin: 0 0 16px 0; font-weight: 600;">成本优化</h3>
                <ul class="action-list" style="margin: 0; padding-left: 20px;">
                  <li style="font-size: 15px; color: #5a6c7d; margin-bottom: 10px; line-height: 1.6;">对已开启远程配送且销售额>€100的1个ASIN考虑本地入库</li>
                  <li style="font-size: 15px; color: #5a6c7d; margin-bottom: 10px; line-height: 1.6;">节省配送成本，提升配送时效</li>
                  <li style="font-size: 15px; color: #5a6c7d; margin-bottom: 10px; line-height: 1.6;">持续监控和优化物流成本结构</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 行动排序表格 -->
          <div style="margin-top: 30px; padding: 20px; background: #ffffff; border: 1px solid #e8e8e8; border-radius: 8px;">
            <h3 style="color: #333; font-size: 20px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
              <span style="color: #FF6B35;">📋</span>
              行动排序与时间安排
            </h3>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 20px 0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <thead>
                <tr>
                  <th style="width: 10%; text-align: center; background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white; padding: 15px 12px;">排名</th>
                  <th style="width: 25%; background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white; padding: 15px 12px;">行动</th>
                  <th style="width: 15%; text-align: center; background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white; padding: 15px 12px;">时间</th>
                  <th style="width: 50%; background: linear-gradient(135deg, #FF6B35 0%, #FF4500 100%); color: white; padding: 15px 12px;">读取判断逻辑 (from 上面生成好的table的data)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: #fff5f0;">
                  <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: bold; color: #FF6B35;">1</td>
                  <td style="padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: 600;">合规 - new policy (NL/IT)</td>
                  <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: 500;">1个月</td>
                  <td style="padding: 15px 12px; border: 1px solid #e8e8e8; color: #555;">意大利税号需注意</td>
                </tr>
                <tr>
                  <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: bold; color: #FF6B35;">2</td>
                  <td style="padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: 600;">合规 - 开了仓储没开税号</td>
                  <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: 500;">3个月</td>
                  <td style="padding: 15px 12px; border: 1px solid #e8e8e8; color: #555;">
                    在意大利，您已经合规开启了PanEU所有的仓储，无需额外操作。<br/>
                    在英国，您已经合规开启了PanEU所有的仓储，无需额外操作。<br/>
                    在德国，您已经合规开启了PanEU所有的仓储，无需额外操作。<br/>
                    在法国，您已经合规开启了PanEU所有的仓储，无需额外操作。<br/>
                    对于西班牙，需上传过应税号，可以开启西班牙国家仓储享受本地配送费。
                  </td>
                </tr>
                <tr style="background: #f8f9fa;">
                  <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: bold; color: #FF6B35;">3</td>
                  <td style="padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: 600;">cost saving - pan-EU placement</td>
                  <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: 500;">3个月</td>
                  <td style="padding: 15px 12px; border: 1px solid #e8e8e8; color: #555;"></td>
                </tr>
                <tr>
                  <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: bold; color: #FF6B35;"></td>
                  <td style="padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: 600;">cost saving - pan-EU ASIN parity</td>
                  <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: 500;">1个月</td>
                  <td style="padding: 15px 12px; border: 1px solid #e8e8e8; color: #555;"></td>
                </tr>
                <tr style="background: #f8f9fa;">
                  <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: bold; color: #FF6B35;"></td>
                  <td style="padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: 600;">cost saving - CEE</td>
                  <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: 500;">3个月</td>
                  <td style="padding: 15px 12px; border: 1px solid #e8e8e8; color: #555;"></td>
                </tr>
                <tr>
                  <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: bold; color: #FF6B35;">4</td>
                  <td style="padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: 600;">incentive - DI (GSI)</td>
                  <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: 500;">1个月</td>
                  <td style="padding: 15px 12px; border: 1px solid #e8e8e8; color: #555;"></td>
                </tr>
                <tr style="background: #f8f9fa;">
                  <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: bold; color: #FF6B35;">5</td>
                  <td style="padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: 600;">sales uplift - DI (MPG)</td>
                  <td style="text-align: center; padding: 15px 12px; border: 1px solid #e8e8e8; font-weight: 500;">3个月</td>
                  <td style="padding: 15px 12px; border: 1px solid #e8e8e8; color: #555;"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- PanEU同步行动建议 -->
          <div style="margin-top: 30px; padding: 20px; background: #fff5f0; border: 2px solid #FF6B35; border-radius: 8px;">
            <h3 style="color: #333; font-size: 20px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
              <span style="color: #FF6B35;">⚡</span>
              紧急行动：PanEU资格保护
            </h3>
            <div style="background: white; padding: 15px; border-radius: 6px; margin-bottom: 15px;">
              <h4 style="color: #FF6B35; font-size: 16px; margin: 0 0 10px 0;">立即执行（14天内）：</h4>
              <ul style="margin: 0; padding-left: 20px; color: #555;">
                <li style="margin-bottom: 8px;">恢复13个失效ASIN的德法意西四国销售状态</li>
                <li style="margin-bottom: 8px;">使用LOSG/BIL工具快速实现134个ASIN的四国同步</li>
                <li style="margin-bottom: 8px;">预计节省费用：€3,313,102.44/年</li>
              </ul>
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
}
</style>
