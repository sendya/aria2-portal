<template>
  <a-descriptions class="setting-list" bordered :column="1" size="middle">
    <a-descriptions-item label="Portal 版本">1.0.0@5be57b1</a-descriptions-item>
    <a-descriptions-item label="语言">
      <a-select default-value="zh-CN" style="width: 100%">
        <a-select-option key="zh-CN">简体中文</a-select-option>
        <a-select-option key="en-US">English</a-select-option>
      </a-select>
    </a-descriptions-item>
    <a-descriptions-item label="主题">
      <a-select default-value="zh-CN" style="width: 100%">
        <a-select-option key="zh-CN">浅色</a-select-option>
        <a-select-option key="en-US">暗色</a-select-option>
      </a-select>
    </a-descriptions-item>
    <a-descriptions-item label="页面标题">
      <a-input default-value="${downspeed}, ${upspeed} - ${title}" />
    </a-descriptions-item>
    <a-descriptions-item label="页面标题更新间隔">
      <a-select default-value="5" style="width: 100%">
        <a-select-option value="0">禁用</a-select-option>
        <a-select-option value="5">5秒</a-select-option>
        <a-select-option value="10">10秒</a-select-option>
        <a-select-option value="15">15秒</a-select-option>
        <a-select-option value="30">30秒</a-select-option>
        <a-select-option value="60">60秒</a-select-option>
      </a-select>
    </a-descriptions-item>
    <a-descriptions-item label="全局状态更新间隔">
      <a-select default-value="1" style="width: 100%">
        <a-select-option value="0">禁用</a-select-option>
        <a-select-option value="1">1秒</a-select-option>
        <a-select-option value="5">5秒</a-select-option>
        <a-select-option value="10">10秒</a-select-option>
        <a-select-option value="15">15秒</a-select-option>
        <a-select-option value="30">30秒</a-select-option>
        <a-select-option value="60">60秒</a-select-option>
      </a-select>
    </a-descriptions-item>
    <a-descriptions-item label="任务信息更新间隔">
      <a-select default-value="1" style="width: 100%">
        <a-select-option value="0">禁用</a-select-option>
        <a-select-option value="1">1秒</a-select-option>
        <a-select-option value="5">5秒</a-select-option>
        <a-select-option value="10">10秒</a-select-option>
        <a-select-option value="15">15秒</a-select-option>
        <a-select-option value="30">30秒</a-select-option>
        <a-select-option value="60">60秒</a-select-option>
      </a-select>
    </a-descriptions-item>
  </a-descriptions>
</template>

<style lang="less" scoped>
.setting-list {
  :deep(.ant-descriptions-item-label) {
    width: 260px;
  }
}
</style>
