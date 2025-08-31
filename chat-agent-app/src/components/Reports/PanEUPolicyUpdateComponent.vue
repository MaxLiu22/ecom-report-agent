<template>
  <div class="paneu-policy-container">
 
   </div>
 </template>
 
 <script setup>
 import ASINStatusManagementComponent from './ASINStatusManagementComponent.vue'
 
 // 组件名称
 defineOptions({
   name: 'PanEUPolicyUpdateComponent'
 })
 </script>

<style scoped>
.paneu-policy-container {
  margin: 20px 0;
}

.policy-section {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8e8;
  margin: 20px 0;
  overflow: hidden;
}

.policy-header {
  background: #232f3e;
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  gap: 12px;
}

.orange-arrow {
  color: #FF8C00;
  font-size: 20px;
  font-weight: bold;
}

.policy-title {
  color: #333;
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
}

.policy-content {
  padding: 25px;
}

/* 更新框样式 */
.update-box {
  background: #fff7e6;
  border: 2px dashed #FFB84D;
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
}

.update-info {
  margin-bottom: 15px;
}

.asin-count {
  margin-bottom: 10px;
}

.label {
  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.count-number {
  color: #FF8C00;
  font-size: 18px;
  font-weight: bold;
  margin-left: 5px;
}

.current-status {
  line-height: 1.6;
}

.status-text {
  color: #333;
  font-size: 14px;
}

.attention-highlight {
  background: #FFE066;
  color: #333;
  font-weight: 600;
  font-size: 14px;
  padding: 2px 4px;
  border-radius: 3px;
}

/* 关键节点样式 */
.key-point {
  background: #f0f8ff;
  padding: 12px 15px;
  border-radius: 6px;
  margin: 20px 0;
  border-left: 4px solid #1890ff;
}

.point-label {
  color: #333;
  font-weight: 600;
  font-size: 14px;
}

.point-date {
  color: #FF8C00;
  font-weight: bold;
  font-size: 16px;
  margin: 0 8px;
}

.point-description {
  color: #555;
  font-size: 14px;
}

/* 注意事项样式 */
.notice-section {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  margin: 20px 0;
  border-left: 4px solid #28a745;
}

.notice-label {
  color: #333;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
}

.notice-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.notice-text {
  color: #555;
  font-size: 14px;
}

.gpsr-link {
  color: #007bff;
  text-decoration: underline;
  font-size: 14px;
}

.gpsr-link:hover {
  color: #0056b3;
}

/* 详细信息样式 */
.detailed-info {
  margin-top: 25px;
}

.info-section {
  background: #f8f9ff;
  border: 1px solid #e3f2fd;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.title-text {
  color: #333;
  font-size: 16px;
  font-weight: 600;
  flex: 1;
}

.new-badge {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.section-content {
  margin-top: 15px;
}

.content-text {
  color: #555;
  font-size: 13px;
  line-height: 1.6;
  margin: 12px 0;
  text-align: justify;
}

/* 重要提醒样式 */
.important-reminders {
  margin-top: 25px;
}

.reminder-item {
  padding: 12px 15px;
  border-radius: 6px;
  margin: 10px 0;
}

.reminder-item.highlight {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-left: 4px solid #f39c12;
}

.reminder-item.warning {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-left: 4px solid #dc3545;
}

.reminder-text {
  color: #333;
  font-size: 13px;
  line-height: 1.5;
  font-weight: 500;
}

.reminder-item.highlight .reminder-text {
  color: #856404;
}

.reminder-item.warning .reminder-text {
  color: #721c24;
}

/* 统一表格样式 */
.paneu-table,
.policy-table,
.update-table {
  width: 100% !important;
  border-collapse: collapse !important;
  font-size: 13px !important;
  background: white !important;
  margin: 0 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.paneu-table th,
.policy-table th,
.update-table th {
  background: #232f3e;
  color: white !important;
  font-weight: 600 !important;
  padding: 15px 12px !important;
  text-align: center !important;
  border: 1px solid #e0e0e0 !important;
  font-size: 13px !important;
  line-height: 1.4 !important;
}

.paneu-table td,
.policy-table td,
.update-table td {
  padding: 12px !important;
  border: 1px solid #e0e0e0 !important;
  vertical-align: top !important;
  background: white !important;
  color: #333 !important;
  font-size: 12px !important;
  line-height: 1.5 !important;
}

.paneu-table tbody tr:nth-child(even),
.policy-table tbody tr:nth-child(even),
.update-table tbody tr:nth-child(even) {
  background: #f8f9fa !important;
}

.paneu-table:hover tbody tr,
.policy-table:hover tbody tr,
.update-table:hover tbody tr {
  background: white !important;
}

.paneu-table tbody tr:nth-child(even):hover,
.policy-table tbody tr:nth-child(even):hover,
.update-table tbody tr:nth-child(even):hover {
  background: #f8f9fa !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .policy-content {
    padding: 15px;
  }
  
  .update-box {
    padding: 15px;
  }
  
  .section-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .new-badge {
    align-self: flex-start;
  }
  
  .notice-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .key-point {
    padding: 10px 12px;
  }
  
  .point-date {
    margin: 0 5px;
    font-size: 14px;
  }
}
</style>
