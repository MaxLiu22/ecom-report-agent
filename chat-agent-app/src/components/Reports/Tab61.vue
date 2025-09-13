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
                    申请VAT所需费用(RMB)
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
                  <!-- 遍历每个国家 -->
                  <tr v-for="countryObj in panEUResult.cost_save.value" :key="Object.keys(countryObj)[0]">
                    <td
                      style="background: #f8f9fa; color: #333; font-weight: 600; padding: 8px; border: 1px solid #ddd; text-align: center;"
                    >
                      {{ Object.keys(countryObj)[0] }}
                    </td>
                    <td
                      style="color: #333; font-weight: 500; padding: 8px; border: 1px solid #ddd; text-align: center;"
                    >
                      {{ formatNumber(Object.values(countryObj)[0][0]) }}
                    </td>
                    <td
                      style="color: #333; font-weight: 500; padding: 8px; border: 1px solid #ddd; text-align: center;"
                    >
                      {{ formatNumber(Object.values(countryObj)[0][1]) }}
                    </td>
                    <td
                      style="color: #333; font-weight: 500; padding: 8px; border: 1px solid #ddd; text-align: center;"
                    >
                      {{ formatNumber(Object.values(countryObj)[0][2]) }}
                    </td>
                    <td
                      style="color: #333; font-size: 9px; padding: 8px; border: 1px solid #ddd; text-align: center;"
                    >
                      {{ Object.values(countryObj)[0][3] }}
                    </td>
                  </tr>

                  <!-- 总额行 -->
                  <tr>
                    <td
                      style="background: #f1f3f5; color: #222; font-weight: 700; padding: 8px; border: 1px solid #ddd; text-align: center;"
                    >
                      总额
                    </td>
                    <td
                      v-for="(item, idx) in panEUResult.cost_save['总额']"
                      :key="idx"
                      style="color: #222; font-weight: 600; padding: 8px; border: 1px solid #ddd; text-align: center;"
                    >
                      {{ item === '-' ? '-' : formatNumber(item) }}
                    </td>
                  </tr>

              </tbody>
            </table>


          </div>
          <div v-else style="text-align: center; padding: 20px; color: #999">暂无成本节约数据</div>
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
                  举例
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
                  原因
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
                  食品<br />Food
                </td>
                <td style="color: #333; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  一般人类食品、食品补充剂、婴儿食品
                </td>
                <td style="color: #555; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  欧盟法规(包括EUI0等)要求食品必须有当地语言标签。<br />
                  由于目前无法确保规模合规，所有食品(更广义上的可食用品)默认被排除在泛欧销售之外。<br />
                  含馆饮料、酒待和加啡因额外税收要求而被排除
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
                  子类别产品<br />Subcat
                </td>
                <td style="color: #333; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  医疗设备、婴儿汽车座椅(仅限英国)、BB枪/气枪/彩单枪、自电子烟配件、化肥、家具(仅限美国)、燃气烧烤炉、礼品卡、用药品、宠物药品、机油、金刚石切制片
                </td>
                <td style="color: #555; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  欧盟国家法律差异非本地库存可能带来家全和客户信任/公关风险，目无可扩展机制确保符合相关国内要求
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
                  危险品<br />Hazmat
                </td>
                <td style="color: #333; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  清洁剂、医疗设备、化肥、衣药、粘合剂、害虫控制设备
                </td>
                <td style="color: #555; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  无法大规模验证REACH/CLP合规性，包括多语言安全数据表和本地语言标签要求
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
                  物理特性<br />physical(H&B)
                </td>
                <td style="color: #333; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  重型非分类、轻型大件、真正重型大件
                </td>
                <td style="color: #555; font-size: 10px; padding: 10px; border: 1px solid #ddd">
                  成本和运输眼制排除重型大件物品，标准因国家而异(如荷兰周长>300cm，其他>360cm)
                </td>
              </tr>
              <!-- <tr>
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
              </tr> -->
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
    <div class="analysis-section" style="margin-top: 32px" v-if="panEUResult">
      <div class="section-header">
        <h3 style="margin: 0">🌍 PanEU 分析结果</h3>
        <p class="section-description" style="margin: 6px 0 0">欧洲泛欧计划机会分析详情</p>
      </div>
      <div class="section-content">
        <div>
          <!-- <h4 style="color: #333; font-size: 16px; margin: 10px 0" v-if="panEUResult.report_title">
            {{ panEUResult.report_title }}
          </h4>
          <p
            style="color: #666; font-size: 14px; margin: 10px 0"
            v-if="panEUResult.report_subtitle"
          >
            {{ panEUResult.report_subtitle }}
          </p> -->
          <div v-if="panEUResult.excel_data" style="margin: 20px 0">
            <h5 style="color: #333; font-size: 14px; margin-bottom: 15px">PanEU ASIN 机会概览</h5>
            <div style="overflow-x: auto">
              <table
                style="
                  width: 100%;
                  border-collapse: collapse;
                  font-size: 12px;
                  background: #ffffff;
                  border: 1px solid #ddd;
                  border-radius: 4px;
                "
              >
                <thead>
                  <tr>
                    <th
                      v-for="header in panEUResult.excel_data.headers.slice(0, 4)"
                      :key="header"
                      style="
                        background: #333;
                        color: white;
                        padding: 12px 8px;
                        text-align: center;
                        border-right: 1px solid #555;
                      "
                    >
                      {{ header }}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(row, idx) in panEUResult.excel_data.rows" :key="idx">
                    <td
                      :rowspan="parseInt(1)"
                      :style="{
                        background: '#f8f9fa',
                        fontWeight: 600,
                        textAlign: 'center',
                        padding: '8px',
                        border: '1px solid #ddd',
                        paddingLeft: (row.indentLevel || 0) * 20 + 'px',
                        width: '140px' 
                      }"
                    >
                      {{ row.metric }}
                    </td>
                    <td
                      style="text-align: center; border: 1px solid #ddd;" 
                    >
                      {{ row.count }}
                    </td>
                    <td
                      v-if="row.operationPoint"
                      :rowspan="parseInt(row.operationPointRowspan || 1)"
                      v-html="row.operationPoint"
                      style="text-align: left; border: 1px solid #ddd; padding: 8px; color: #555;"
                    ></td>
                    <td
                      v-if="row.action"
                      :rowspan="parseInt(row.actionRowspan || 1)"
                      v-html="row.action"
                      style="text-align: left; border: 1px solid #ddd; padding: 8px; color: #007bff;"
                    ></td>
                  </tr>
                </tbody>

              </table>



            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="analysis-section" v-else style="margin-top: 32px">
      <div class="section-header">
        <h3 style="margin: 0">🌍 PanEU 分析结果</h3>
      </div>
      <div class="section-content" style="text-align: center; color: #999; font-size: 13px">
        暂无 PanEU 分析数据
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tab61',
  props: {
    panEUResult: { type: Object, default: null },
  },
  methods: {
    // 格式化数字，添加千位分隔符
    formatNumber(num) {
      if (typeof num !== 'number') return num
      return num.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    },

    formatNumber2(value) {
      if (value === '-' || value === undefined || value === null) {
        return '-';
      }
      const num = Number(value);
      if (isNaN(num)) return value; // 保留原始
      return num.toLocaleString();
    }


  },
}
</script>
<style scoped>
.sub-tab-panel {
  background: #fff;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}
.sub-tab-panel h2 {
  margin: 0 0 12px;
  font-size: 22px;
  color: #232f3e;
}
.sub-tab-panel p {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #444;
}
.analysis-section {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}
.analysis-section + .analysis-section {
  margin-top: 24px;
}
.analysis-section .section-header {
  background: #f8f9fa;
  padding: 18px 20px;
  border-bottom: 1px solid #e0e0e0;
}
.analysis-section .section-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #232f3e;
  margin: 0;
}
.analysis-section .section-description {
  font-size: 13px;
  color: #232f3e;
}
.analysis-section .section-content {
  padding: 20px 24px;
}
</style>
