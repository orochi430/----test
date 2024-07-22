<!-- 待签收公文 -->
<template>
  <div class="receipt-readonly">
    <van-cell-group v-if="info">
      <van-cell :value="info.B0001?info.B0001.value || '':''" title="文件标题" />
      <van-cell :value="info['200311114615V9cbR2NNYL7eDw00HSx'].value!='' ? info['200311114615V9cbR2NNYL7eDw00HSx'].value || info['FWDW_NAME_PD'].value : ''" title="来文单位" />
      <van-cell :value="info['C-R-RCV-0001']?info['C-R-RCV-0001'].value || '':''" title="来文文号" />
      <van-cell :value="info['C-R-RCV-0009']?info['C-R-RCV-0009'].value || '':''" title="来文日期" />
      <van-cell :value="info['C-R-RCV-0010']?info['C-R-RCV-0010'].value || '':''" title="收文日期" />
      <van-cell :value="info.B0003?info.B0003.value || '':''" title="收文编号" />
      <van-cell :value="info.B0006?info.B0006.text || '':''" title="紧急程度" />
      <van-cell :value="info.B0018?info.B0018.value || '':''" title="办理期限" />
    </van-cell-group>
  </div>
</template>

<script>
  export default {
    name: "SignFileReadonly",
    props: ['info']
  };
</script>