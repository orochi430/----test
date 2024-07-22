<!-- 督办（弃用） -->
<template>
  <div class="receipt-readonly">
    <van-cell-group v-if="info">
      <van-cell title="督办标题" :value="info.B0001?info.B0001.value || '暂无':'暂无'" />
      <van-cell title="督办类型" :value="info['C-DB-0020']?info['C-DB-0020'].text || '暂无':'暂无'" />
      <van-cell title="督办要求" :value="info['C-DB-0007']?info['C-DB-0007'].value || '暂无':'暂无'" />
      <van-cell title="主办部门" :value="info['C-DB-0001']?info['C-DB-0001'].text || '暂无':'暂无'" />
      <van-cell title="协办部门" :value="info['C-DB-0002']?info['C-DB-0002'].text || '暂无':'暂无'" />
      <van-cell title="紧急程度" :value="info.B0006?info.B0006.text || '暂无':'暂无'" />
      <van-cell title="办理时限" :value="info.B0019?info.B0019.value || '暂无':'暂无'" />
      <van-cell title="是否定期反馈" :value="info.B0054?info.B0054.text || '暂无':'暂无'" />
      <van-cell title="反馈开始日期" :value="info['C-DB-0014']?info['C-DB-0014'].value || '暂无':'暂无'" />
      <van-cell title="反馈周期" :value="info['C-DB-0011']?info['C-DB-0011'].value?info['C-DB-0011'].value+info['C-DB-0011'].text : '暂无':'暂无'" />
      <van-cell title="办结提醒" :value="info['C-DB-0031']?info['C-DB-0031'].value || '暂无':'暂无'" />
      <van-cell title="反馈提醒" :value="info['C-DB-0030']?info['C-DB-0030'].value || '暂无':'暂无'" />
    </van-cell-group>
  </div>
</template>

<script>
  export default {
    name: 'SuperviseReadonly',
    props: ['info']
  }
</script>
