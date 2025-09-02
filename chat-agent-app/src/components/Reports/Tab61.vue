<template>
  <div class="sub-tab-panel">
    <!-- 2.1 欧盟内部物流方案 内容开始 -->
    <h2 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #232f3e">
      2.1 欧盟内部物流方案
    </h2>
    <div class="solution-details">
      <!-- 欧盟内部方案介绍与对比 -->
      <div style="margin: 20px 0">
        <!-- <h4 style="color: #333; font-size: 16px; margin: 10px 0">欧洲站点拓展解决方案</h4>
        <h5 style="color: #666; font-size: 14px; margin: 10px 0">欧盟内部物流方案</h5> -->
        <div
          style="
            margin: 18px 0 24px 0;
            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
            position: relative;
            overflow: hidden;
          "
        >
          <div
            style="
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 14px 18px;
              background: #232f3e;
              border-bottom: 1px solid rgba(255, 255, 255, 0.25);
            "
          >
            <span
              style="
                background: rgba(255, 255, 255, 0.25);
                width: 34px;
                height: 34px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                font-size: 18px;
                color: #fff;
                font-weight: 600;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
              "
              >▶</span
            >
            <div style="display: flex; flex-direction: column">
              <span style="font-size: 16px; font-weight: 700; color: #fff; letter-spacing: 0.5px"
                >欧盟内部方案介绍与对比</span
              >
              <span style="font-size: 11px; color: #fff; opacity: 0.9"
                >对比 EFN 与 PanEU 关键差异，突出成本/速度与准入要求</span
              >
            </div>
          </div>
          <div style="padding: 16px 18px 6px 18px">
            <div
              style="
                font-size: 12px;
                color: #555;
                line-height: 1.5;
                margin-bottom: 14px;
                background: #f8f9fa;
                border: 1px solid #ddd;
                padding: 10px 12px;
                border-radius: 8px;
              "
            >
              <strong style="color: #333">说明：</strong> 下表展示卖家在不同跨国 fulfillment
              模式下的入仓策略、成本结构与配送速度差异，帮助快速判断是否升级至 PanEU。
            </div>
            <div class="table-container" style="overflow-x: auto; margin: 0 0 16px 0">
              <table
                style="
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 11px;
                  border: 2px solid #ddd;
                  margin-bottom: 15px;
                  background: #fff;
                "
              >
                <thead>
                  <tr>
                    <th
                      rowspan="2"
                      style="
                        background: #232f3e;
                        color: white;
                        padding: 12px 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                        width: 80px;
                      "
                    >
                      方案类型
                    </th>
                    <th
                      style="
                        background: #232f3e;
                        color: white;
                        padding: 12px 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                        width: 25%;
                      "
                    >
                      欧盟 FBA 的物流模式
                    </th>
                    <th
                      style="
                        background: #232f3e;
                        color: white;
                        padding: 12px 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                        width: 35%;
                      "
                    >
                      欧盟之间的远程配送网络<br />European Fulfillment Network (EFN)
                    </th>
                    <th
                      style="
                        background: #232f3e;
                        color: white;
                        padding: 12px 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                        width: 35%;
                      "
                    >
                      ⭐亚马逊物流欧洲整合服务<br />Pan European (PanEU)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style="
                        background: #f8f9fa;
                        color: #333;
                        font-weight: 600;
                        padding: 10px 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                      "
                    >
                      简介
                    </td>
                    <td style="padding: 10px 8px; border: 1px solid #ddd; font-size: 10px">
                      卖家入仓至欧盟任一国家后，即可由此国的仓库远程配送到其他欧盟国家
                    </td>
                    <td style="padding: 10px 8px; border: 1px solid #ddd; font-size: 10px">
                      卖家入仓至欧盟任一国家后，亚马逊将货存储在卖家启用了存储服务的国家/地区的欧盟运营中心内，并自主在这些卖家地区之间分配存储，不额外收取费用
                    </td>
                    <td
                      style="
                        padding: 10px 8px;
                        border: 1px solid #ddd;
                        font-size: 10px;
                        background: #f8f9fa;
                        border-left: 3px solid #333;
                      "
                    >
                      卖家入仓至欧盟任一国家后，亚马逊将货存储在卖家启用了存储服务的国家/地区的欧盟运营中心内，并自主在这些卖家地区之间分配存储，不额外收取费用
                    </td>
                  </tr>
                  <tr>
                    <td
                      rowspan="2"
                      style="
                        background: #f8f9fa;
                        color: #333;
                        font-weight: 600;
                        padding: 10px 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                      "
                    >
                      加入条件
                    </td>
                    <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center">
                      <div style="font-weight: 600; margin-bottom: 5px; font-size: 10px">
                        ASIN 设置
                      </div>
                      <div style="font-size: 9px">需使用相同 ASIN/FNSKU#</div>
                    </td>
                    <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center">
                      <div style="font-weight: 600; margin-bottom: 5px; font-size: 10px">
                        ASIN 设置
                      </div>
                      <div style="font-size: 9px">需使用相同 ASIN/FNSKU#</div>
                    </td>
                    <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center">
                      <div style="font-weight: 600; margin-bottom: 5px; font-size: 10px">
                        ASIN 设置
                      </div>
                      <div
                        style="
                          font-size: 9px;
                          background: #f8f9fa;
                          padding: 4px;
                          border-radius: 3px;
                          border: 1px solid #333;
                        "
                      >
                        德法意西需使用相同 ASIN/FNSKU#
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center">
                      <div style="font-weight: 600; margin-bottom: 5px; font-size: 10px">
                        仓储国要求*
                      </div>
                      <div style="font-size: 9px">仅开启一国仓储<br />(需要1个 VAT)</div>
                    </td>
                    <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center">
                      <div style="font-weight: 600; margin-bottom: 5px; font-size: 10px">
                        仓储国要求*
                      </div>
                      <div style="font-size: 9px">仅开启一国仓储<br />(需要1个 VAT)</div>
                    </td>
                    <td style="padding: 10px 8px; border: 1px solid #ddd; text-align: center">
                      <div style="font-weight: 600; margin-bottom: 5px; font-size: 10px">
                        仓储国要求*
                      </div>
                      <div
                        style="
                          font-size: 9px;
                          background: #f8f9fa;
                          padding: 4px;
                          border-radius: 3px;
                          border: 1px solid #333;
                        "
                      >
                        需要德法意西中，至少开启2国仓储（至少2个 VAT），<br />启用仓储的国家为PanEU，未启用国家为
                        EFN
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        background: #f8f9fa;
                        color: #333;
                        font-weight: 600;
                        padding: 10px 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                      "
                    >
                      头程物流<br />(CN->EU FBA CC)
                    </td>
                    <td
                      style="
                        padding: 10px 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                        font-size: 10px;
                      "
                    >
                      需发货至欧盟某1个国家，成本低
                    </td>
                    <td
                      style="
                        padding: 10px 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                        font-size: 10px;
                      "
                    >
                      需发货至欧盟某1个国家，成本低
                    </td>
                    <td
                      style="
                        padding: 10px 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                        font-size: 10px;
                      "
                    >
                      需发货至欧盟某1个国家，成本低
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        background: #f8f9fa;
                        color: #333;
                        font-weight: 600;
                        padding: 10px 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                      "
                    >
                      尾程配送<br />(FBA)
                    </td>
                    <td
                      style="
                        padding: 10px 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                        font-size: 10px;
                      "
                    >
                      <span
                        style="
                          background: #f8f9fa;
                          color: #333;
                          border: 1px solid #333;
                          padding: 2px 6px;
                          border-radius: 12px;
                          font-size: 9px;
                          margin: 2px;
                        "
                        >跨境配送</span
                      >：费用高，3-5天送达
                    </td>
                    <td
                      style="
                        padding: 10px 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                        font-size: 10px;
                      "
                    >
                      <span
                        style="
                          background: #f8f9fa;
                          color: #333;
                          border: 1px solid #333;
                          padding: 2px 6px;
                          border-radius: 12px;
                          font-size: 9px;
                          margin: 2px;
                        "
                        >本地配送</span
                      >：费用节约高达53%，1-2天送达<br /><span
                        style="
                          background: #f8f9fa;
                          color: #333;
                          border: 1px solid #333;
                          padding: 2px 6px;
                          border-radius: 12px;
                          font-size: 9px;
                          margin: 2px;
                        "
                        >跨境配送</span
                      >+<span
                        style="
                          background: #f8f9fa;
                          color: #333;
                          border: 1px solid #333;
                          padding: 2px 6px;
                          border-radius: 12px;
                          font-size: 9px;
                          margin: 2px;
                        "
                        >跨境配送</span
                      >
                    </td>
                    <td
                      style="
                        padding: 10px 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                        font-size: 10px;
                      "
                    >
                      <span
                        style="
                          background: #f8f9fa;
                          color: #333;
                          border: 1px solid #333;
                          padding: 2px 6px;
                          border-radius: 12px;
                          font-size: 9px;
                          margin: 2px;
                        "
                        >本地配送</span
                      >+<span
                        style="
                          background: #f8f9fa;
                          color: #333;
                          border: 1px solid #333;
                          padding: 2px 6px;
                          border-radius: 12px;
                          font-size: 9px;
                          margin: 2px;
                        "
                        >跨境配送</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 12px; margin: 4px 0 10px 0">
              <div
                style="
                  flex: 1 1 240px;
                  background: #f1f5f9;
                  border: 1px solid #d8e0e8;
                  padding: 10px 12px;
                  border-radius: 8px;
                  font-size: 11px;
                  line-height: 1.5;
                "
              >
                <strong style="color: #334155">何时采用 EFN：</strong><br />单一仓储早期试水阶段 /
                SKU 规模较少 / 资金占用需控制。
              </div>
              <div
                style="
                  flex: 1 1 240px;
                  background: #f8f9fa;
                  border: 1px solid #ddd;
                  padding: 10px 12px;
                  border-radius: 8px;
                  font-size: 11px;
                  line-height: 1.5;
                "
              >
                <strong style="color: #333">升级 PanEU 信号：</strong><br />多国已有自然出单 +
                跨境配送费占比高 + 核心 ASIN 库存波动导致转化下滑。
              </div>
              <div
                style="
                  flex: 1 1 240px;
                  background: #e6f7ff;
                  border: 1px solid #b3e3ff;
                  padding: 10px 12px;
                  border-radius: 8px;
                  font-size: 11px;
                  line-height: 1.5;
                "
              >
                <strong style="color: #075985">收益结构：</strong><br />履约费节约 + 配送时效提升 →
                转化提升 + 库存分布智能化降低缺货风险。
              </div>
            </div>
          </div>
        </div>
        <!-- PanEU 成本节约 -->
        <div
              style="
                margin-top: 20px;
                padding: 20px;
                background: #ffffff;
                border: 1px solid #ddd;
                border-radius: 6px;
              "
            >
              <h5
                style="
                  color: #333;
                  font-size: 14px;
                  font-weight: 600;
                  margin: 0 0 15px 0;
                  padding-bottom: 8px;
                  border-bottom: 2px solid #333;
                "
              >
                启用PanEU国家仓储获得配送费用节约
              </h5>
              <div v-if="panEUResult && panEUResult.cost_save">
                <table
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 10px;
                    background: #ffffff;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    margin-bottom: 10px;
                  "
                >
                  <thead>
                    <tr>
                      <th
                        style="
                          background: #333;
                          color: white;
                          font-weight: 600;
                          padding: 10px 8px;
                          text-align: center;
                          border-right: 1px solid #555;
                          font-size: 9px;
                        "
                      >
                        跨境配送国家
                      </th>
                      <th
                        style="
                          background: #333;
                          color: white;
                          font-weight: 600;
                          padding: 10px 8px;
                          text-align: center;
                          border-right: 1px solid #555;
                          font-size: 9px;
                        "
                      >
                        预计可节约费用(RMB)
                      </th>
                      <th
                        style="
                          background: #333;
                          color: white;
                          font-weight: 600;
                          padding: 10px 8px;
                          text-align: center;
                          border-right: 1px solid #555;
                          font-size: 9px;
                        "
                      >
                        预计节约配送费(RMB)
                      </th>
                      <th
                        style="
                          background: #333;
                          color: white;
                          font-weight: 600;
                          padding: 10px 8px;
                          text-align: center;
                          border-right: 1px solid #555;
                          font-size: 9px;
                        "
                      >
                        申请VAT所需费用(RMB)**
                      </th>
                      <th
                        style="
                          background: #333;
                          color: white;
                          font-weight: 600;
                          padding: 10px 8px;
                          text-align: center;
                          font-size: 9px;
                        "
                      >
                        申请VAT所需时间
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- 动态生成国家行 -->
                    <tr v-for="(data, country) in panEUResult.cost_save.value[0]" :key="country">
                      <td
                        style="
                          background: #f8f9fa;
                          color: #333;
                          font-weight: 600;
                          padding: 8px;
                          border: 1px solid #ddd;
                          text-align: center;
                        "
                      >
                        {{ country }}
                      </td>
                      <td
                        style="
                          color: #333;
                          font-weight: 500;
                          padding: 8px;
                          border: 1px solid #ddd;
                          text-align: center;
                        "
                      >
                        {{ formatNumber(data[0]) }}
                      </td>
                      <td
                        style="
                          color: #333;
                          font-weight: 500;
                          padding: 8px;
                          border: 1px solid #ddd;
                          text-align: center;
                        "
                      >
                        {{ formatNumber(data[1]) }}
                      </td>
                      <td
                        style="
                          color: #333;
                          font-weight: 500;
                          padding: 8px;
                          border: 1px solid #ddd;
                          text-align: center;
                        "
                      >
                        {{ formatNumber(data[2]) }}
                      </td>
                      <td
                        style="
                          color: #333;
                          font-size: 9px;
                          padding: 8px;
                          border: 1px solid #ddd;
                          text-align: center;
                        "
                      >
                        {{ data[3] }}
                      </td>
                    </tr>
                    <!-- 总额行 -->
                    <tr style="background: #333">
                      <td
                        style="
                          background: #333;
                          color: white;
                          font-weight: 600;
                          font-size: 11px;
                          padding: 8px;
                          border: 1px solid #ddd;
                          text-align: center;
                        "
                      >
                        总额
                      </td>
                      <td
                        style="
                          background: #333;
                          color: white;
                          font-weight: 600;
                          font-size: 11px;
                          padding: 8px;
                          border: 1px solid #ddd;
                          text-align: center;
                        "
                      >
                        {{ formatNumber(panEUResult.cost_save['总额'][0]) }}
                      </td>
                      <td
                        style="
                          background: #333;
                          color: white;
                          font-weight: 600;
                          font-size: 11px;
                          padding: 8px;
                          border: 1px solid #ddd;
                          text-align: center;
                        "
                      >
                        {{ formatNumber(panEUResult.cost_save['总额'][1]) }}
                      </td>
                      <td
                        style="
                          background: #333;
                          color: white;
                          font-weight: 600;
                          font-size: 11px;
                          padding: 8px;
                          border: 1px solid #ddd;
                          text-align: center;
                        "
                      >
                        {{ formatNumber(panEUResult.cost_save['总额'][2]) }}
                      </td>
                      <td
                        style="
                          background: #333;
                          color: white;
                          font-weight: 600;
                          font-size: 11px;
                          padding: 8px;
                          border: 1px solid #ddd;
                          text-align: center;
                        "
                      >
                        {{ panEUResult.cost_save['总额'][3] }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-else style="text-align: center; padding: 20px; color: #999;">
                暂无成本节约数据
              </div>
            </div>
        <!-- 商品资格说明 -->
        <div
          style="
            margin-top: 20px;
            padding: 20px;
            background: #ffffff;
            border: 1px solid #ddd;
            border-radius: 6px;
          "
        >
          <div style="display: flex; align-items: center; margin-bottom: 15px; gap: 8px">
            <span style="color: #333; font-size: 16px; font-weight: bold">▶</span>
            <h4 style="color: #333; font-size: 16px; font-weight: 600; margin: 0">
              PanEU商品资格要求
            </h4>
          </div>
          <p style="color: #333; font-size: 13px; line-height: 1.5; margin: 0 0 15px 0">
            商品必须符合在欧洲各国之间运输流转的要求，以下列出不符合PanEU的商品种类：
          </p>
          <table
            style="
              width: 100%;
              border-collapse: collapse;
              font-size: 11px;
              background: #ffffff;
              border: 1px solid #ddd;
            "
          >
            <thead>
              <tr>
                <th
                  style="
                    background: #333;
                    color: white;
                    font-weight: 600;
                    padding: 12px 10px;
                    text-align: center;
                    border-right: 1px solid #555;
                    width: 15%;
                  "
                >
                  类目
                </th>
                <th
                  style="
                    background: #333;
                    color: white;
                    font-weight: 600;
                    padding: 12px 10px;
                    text-align: center;
                    border-right: 1px solid #555;
                    width: 35%;
                  "
                >
                  禁售
                </th>
                <th
                  style="
                    background: #333;
                    color: white;
                    font-weight: 600;
                    padding: 12px 10px;
                    text-align: center;
                    width: 50%;
                  "
                >
                  限制
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style="
                    background: #f8f9fa;
                    color: #333;
                    font-weight: 600;
                    text-align: center;
                    padding: 10px;
                    border: 1px solid #ddd;
                  "
                >
                  酒类<br />Food
                </td>
                <td style="color: #333; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  一般人烹调类、春节小杂、篱笆看台
                </td>
                <td style="color: #555; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  除非获得EU的相关食品安全认证，否则无法在欧盟销售；<br />如果注册EU的相关认证，存在专业工厂专业生产线认证，运输总价29周的，<br />总价值限制为2000欧元，上述限制内商品可在全欧盟内销售。
                </td>
              </tr>
              <tr style="background: #f8f9fa">
                <td
                  style="
                    background: #f8f9fa;
                    color: #333;
                    font-weight: 600;
                    text-align: center;
                    padding: 10px;
                    border: 1px solid #ddd;
                  "
                >
                  汽车零件<br />Auto motive
                </td>
                <td style="color: #333; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  电子产品、车外后视镜(WK连接)、安规气外后电器、高正压(WK连接)、门锁(WK连接)、连接线(WK连接)、汽车工具(WK连接)、高压、安规线(WK连接)、咖啡工、基础润滑(WK连接)、门连线、下滑、工程主体
                </td>
                <td style="color: #555; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  汽车零件需要，手动制与当地的实验室认证，生产过程注册统一认证标识，各国最新认证文件一致性登录认证平台数据
                </td>
              </tr>
              <tr>
                <td
                  style="
                    background: #f8f9fa;
                    color: #333;
                    font-weight: 600;
                    text-align: center;
                    padding: 10px;
                    border: 1px solid #ddd;
                  "
                >
                  玩具<br />Toys
                </td>
                <td style="color: #333; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  儿童用品、蒙古用、灯具、安规、轮胎、室内娱乐等
                </td>
                <td style="color: #555; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  玩具大类产品都需要REACH/LVD等认证，包括各类成套塑料等的测试
                </td>
              </tr>
              <tr style="background: #f8f9fa">
                <td
                  style="
                    background: #f8f9fa;
                    color: #333;
                    font-weight: 600;
                    text-align: center;
                    padding: 10px;
                    border: 1px solid #ddd;
                  "
                >
                  喷雾类<br />Sprays
                </td>
                <td style="color: #333; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  喷雾类化学、化妆品、清洁类、定制类
                </td>
                <td style="color: #555; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  空气方面的危险品认定REACH/LVD认证，包括各类专业技术条件销售数据
                </td>
              </tr>
              <tr>
                <td
                  style="
                    background: #f8f9fa;
                    color: #333;
                    font-weight: 600;
                    text-align: center;
                    padding: 10px;
                    border: 1px solid #ddd;
                  "
                >
                  磁铁类型类<br />带磁性元器件
                </td>
                <td style="color: #333; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  消磁类功能、化感类、高灵件工厂
                </td>
                <td style="color: #555; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  需要达际到商务认证和相关证书，标识要符号等于产品功效现实定义，带磁类物<br />受限，商关和欧盟等经营产品功等期效期平<300克，高度<360mm
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 合规风险图片
        <div style="margin-top: 20px; padding: 20px; background: #ffffff; border: 1px solid #ddd; border-radius: 6px;">
          <div style="text-align: center;">
            <img src="/src/assets/合规风险.jpg" alt="合规风险" style="width: 100%; max-width: 1200px; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
          </div>
        </div> -->
      </div>
    </div>
    <!-- 内容结束 -->
    <!-- PanEU 分析结果（追加展示） -->
    <div class="analysis-section" style="margin-top:32px;" v-if="panEUResult">
      <div class="section-header">
        <h3 style="margin:0;">🌍 PanEU 分析结果</h3>
        <p class="section-description" style="margin:6px 0 0;">欧洲泛欧计划机会分析详情</p>
      </div>
      <div class="section-content">
        <div>
          <h4 style="color:#333; font-size:16px; margin:10px 0;" v-if="panEUResult.report_title">{{ panEUResult.report_title }}</h4>
          <p style="color:#666; font-size:14px; margin:10px 0;" v-if="panEUResult.report_subtitle">{{ panEUResult.report_subtitle }}</p>
          <div v-if="panEUResult.excel_data" style="margin:20px 0;">
            <h5 style="color:#333; font-size:14px; margin-bottom:15px;">PanEU ASIN 机会概览</h5>
            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:12px; background:#ffffff; border:1px solid #ddd; border-radius:4px;">
                <thead>
                  <tr>
                    <th v-for="header in panEUResult.excel_data.headers.slice(0, 5)" :key="header" style="background:#333; color:white; padding:12px 8px; text-align:center; border-right:1px solid #555;">{{ header }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in panEUResult.excel_data.rows" :key="row.metric">
                    <td style="padding:10px 8px; border:1px solid #ddd;">{{ row.metric }}</td>
                    <td style="padding:10px 8px; border:1px solid #ddd; text-align:center; font-weight:bold; color:#333;">{{ row.count }}</td>
                    <td style="padding:10px 8px; border:1px solid #ddd;">{{ row.operationPoint }}</td>
                    <td style="padding:10px 8px; border:1px solid #ddd;">{{ row.action }}</td>
                    <td style="padding:10px 8px; border:1px solid #ddd;">{{ row.description }}</td>
                    <!-- <td style="padding:10px 8px; border:1px solid #ddd;">{{ row.formula }}</td> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="analysis-section" v-else style="margin-top:32px;">
      <div class="section-header">
        <h3 style="margin:0;">🌍 PanEU 分析结果</h3>
      </div>
      <div class="section-content" style="text-align:center; color:#999; font-size:13px;">暂无 PanEU 分析数据</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tab61',
  props: {
    panEUResult: { type: Object, default: null }
  },
  methods: {
    // 格式化数字，添加千位分隔符
    formatNumber(num) {
      if (typeof num !== 'number') return num;
      return num.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  }
}
</script>
<style scoped>
.sub-tab-panel { background:#fff; padding:24px; border:1px solid #e5e7eb; border-radius:10px; }
.sub-tab-panel h2 { margin:0 0 12px; font-size:22px; color:#232f3e; }
.sub-tab-panel p { margin:0; font-size:14px; line-height:1.6; color:#444; }
.analysis-section { background:#ffffff; border:1px solid #e0e0e0; border-radius:8px; overflow:hidden; }
.analysis-section + .analysis-section { margin-top:24px; }
.analysis-section .section-header { background:#f8f9fa; padding:18px 20px; border-bottom:1px solid #e0e0e0; }
.analysis-section .section-header h3 { font-size:18px; font-weight:600; color:#232f3e; margin:0; }
.analysis-section .section-description { font-size:13px; color:#232f3e; }
.analysis-section .section-content { padding:20px 24px; }
</style>
