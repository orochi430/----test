// 农业农村部 部发文
(function () {
  const exportObj = {};

  exportObj.initHandle = function (formData, formStruct, vueData) {
    if (formData.main['B0001'] && formData.main['B0001'].value) {
      dsf.url.setTitle(formData.main['B0001'].value)
    }
    let controlEditOpinions = formStruct.controls.filter(item => item.controlType == 'controlEditOpinion')
    if (controlEditOpinions) controlEditOpinions.forEach(item => item.showLable = false)
    const cssRule = `
      .pad_layout_box {font-family: '楷体';}
      .pad_layout_box .control_label{font-family: '方正书宋_GBK';}
      .pad_layout_box .control_mobile_fl{font-family: '方正书宋_GBK';}
      #ctr_4IQqiZkPn26fdTH6 .controlTextBox {font-family: '方正书宋_GBK';}
      #ctr_zGDRUL7JZFq0OSIX .control_label, #ctr_lz7tu8xP7JUHVCbM .control_label, #ctr_5hJj5y5adrFSnPFU .control_label, #ctr_mXRs775A6DZoLu2w .control_mobile_fl,
      #ctr_NdiKMGu311RqwvLM .control_mobile_fl, #ctr_BuJkVnxu0pbwqmRO .controlRadio, #ctr_A6sa5ptmrHfod1Eh .control_mobile_fl, #ctr_ET6No7nt0xwtiDEi .control_mobile_fl,
      #ctr_ElQYCxfE3EmPrO7M .control_mobile_fl {font-family: '黑体';}
      .van-col {min-height: 0;}
      .formLayout {border-top: 0 !important; max-width: 603px; margin: 16px auto !important;}
      .formLayout >.box >.padLeftRight:first-child::before, .formLayout>.box>.padLeftRight:last-child::after { border: 0; }
      #ctr_zGDRUL7JZFq0OSIX::after, #ctr_lz7tu8xP7JUHVCbM::after, #ctr_4IQqiZkPn26fdTH6::after { border: 0; }
      #ctr_4IQqiZkPn26fdTH6 { padding: 0.35rem 0!important;}
      #ctr_5hJj5y5adrFSnPFU::after { border-bottom: 3px solid; }
      #ctr_5hJj5y5adrFSnPFU ::after, #ctr_zGDRUL7JZFq0OSIX ::after, #ctr_lz7tu8xP7JUHVCbM ::after, #ctr_RddjCbsSFx4CyXWE ::after, #ctr_NQFWVA9QMUjmAv0Y ::after,
      #ctr_O9nBqPKzmufTMrJK ::after, #ctr_IgvmPXHwHoD8LKjm ::after, #ctr_jpkktlcG30WSFJBE ::after, #ctr_BuJkVnxu0pbwqmRO ::after,
      #ctr_n49QaH1fCXgbfOa1 ::after, #ctr_UsrgRyEWEGi8KLvU ::after, #ctr_wReVSmkmAYrf0xKv ::after, #ctr_I6CgMAfERCiQZQN2 ::after,
      #ctr_a3T4BnK92F4kE6q9 ::after, #ctr_hn6fZcst6PQLiMim ::after, #ctr_Hx8lzHPBHEgAYM0U ::after, #ctr_YIjQejZ3iiM1xILL ::after,
      #ctr_7MWruRNsz3O3YPBO ::after, #ctr_NPiGUbPykwlAkiKq ::after, #ctr_Lce5c5kflxpWW8a8 ::after, #ctr_irhzRVygDuy5ZGvj ::after,
      #ctr_IgvmPXHwHoD8LKjm ::after, #ctr_smuTMtRxXEU7Bqgp ::after, #ctr_zaPQ57QXb0MOiiJu ::after, #ctr_NPiGUbPykwlAkiKq ::after,
      #ctr_A6sa5ptmrHfod1Eh ::after, #ctr_ET6No7nt0xwtiDEi ::after, #ctr_ElQYCxfE3EmPrO7M ::after, #ctr_OPxyZV1qc5ICyppL ::after, #ctr_RATrhaULuBviq3Nv ::after,
      #ctr_DGa4nKuYD8SLQyqL ::after, #ctr_ydQXFyAyEMHpGvLB ::after, #ctr_FEr41Zxo7X80CE0M ::after, #ctr_xtukW5BXZz5S1nHP ::after, #ctr_wtNWsGwIevEiTb37 ::after, 
      #ctr_ic7WGwJW5ova0pia ::after, #ctr_Na5xmXPFWG32KugQ ::after, #ctr_XGHjcfmAkFplIrtB ::after, #ctr_3JRRk88ivPourtbG ::after, #ctr_iKcC2BZm5xdSLOks ::after,
      #ctr_3U28khNHKzAHBXbi ::after, #ctr_A3WTxkD4z2bpCFqt ::after, #ctr_X7TLgYjBAxXambwk ::after, #ctr_11804QOH2uTiJJp0 ::after, #ctr_NXQ0BBuNR5IPezLi ::after, 
      #ctr_gp8TJEJC7DesHWsz ::after, #ctr_ip3rZzmahYRYYxaN ::after, #ctr_9ym7y86D30yWTHhL ::after, #ctr_Hm6qSzV92dm80Tie ::after, #ctr_ulplHLh83E5zoQyY ::after,
		  #ctr_DWyI0pMJmG6NRZ81 ::after, #ctr_LjFiMb0WPdndBp7Z ::after, #ctr_dEtqRhCqQaQGlJF6 ::after { border: 0;}
      #ctr_jpkktlcG30WSFJBE::after, #ctr_BuJkVnxu0pbwqmRO::after, #ctr_n49QaH1fCXgbfOa1::after, #ctr_UsrgRyEWEGi8KLvU::after, #ctr_wReVSmkmAYrf0xKv::after, #ctr_I6CgMAfERCiQZQN2::after,
      #ctr_a3T4BnK92F4kE6q9::after, #ctr_hn6fZcst6PQLiMim::after, #ctr_Hx8lzHPBHEgAYM0U::after, #ctr_YIjQejZ3iiM1xILL::after, #ctr_7MWruRNsz3O3YPBO::after, #ctr_NPiGUbPykwlAkiKq::after,
      #ctr_Lce5c5kflxpWW8a8::after, #ctr_irhzRVygDuy5ZGvj::after, #ctr_O9nBqPKzmufTMrJK::after, #ctr_IgvmPXHwHoD8LKjm::after, #ctr_BJjYhGuSVKYpLX5M::after, #ctr_smuTMtRxXEU7Bqgp::after,
      #ctr_zaPQ57QXb0MOiiJu::after, #ctr_A6sa5ptmrHfod1Eh::after, #ctr_ET6No7nt0xwtiDEi::after, #ctr_ElQYCxfE3EmPrO7M::after, #ctr_OPxyZV1qc5ICyppL::after, #ctr_RATrhaULuBviq3Nv::after,
      #ctr_DGa4nKuYD8SLQyqL::after, #ctr_ydQXFyAyEMHpGvLB::after, #ctr_FEr41Zxo7X80CE0M::after, #ctr_xtukW5BXZz5S1nHP::after, #ctr_wtNWsGwIevEiTb37::after, #ctr_ic7WGwJW5ova0pia::after,
      #ctr_Na5xmXPFWG32KugQ::after, #ctr_XGHjcfmAkFplIrtB::after, #ctr_3JRRk88ivPourtbG::after, #ctr_iKcC2BZm5xdSLOks::after, #ctr_3U28khNHKzAHBXbi::after, #ctr_A3WTxkD4z2bpCFqt::after,
      #ctr_X7TLgYjBAxXambwk::after, #ctr_mXRs775A6DZoLu2w::after, #ctr_NdiKMGu311RqwvLM::after, #ctr_RThh0SLlmlC31Gtm::after, #ctr_a6ZFd2uRPBd34Z97::after, #ctr_DzOjDOjt83nPC2W7::after,
      #ctr_Don20t1KnFUlTYgp::after, #ctr_6YfBem9iDeKU75bZ::after, #ctr_TZi8aOx7YKpdd3He::after, #ctr_TkfvXl9S0g1pc6WV::after, #ctr_bt2tTmojVzpzSQn3::after, #ctr_hXkZQMpGikZc8gGI::after,
      #ctr_11804QOH2uTiJJp0::after, #ctr_Fyy6pPpDvdv9A3QK::after, #ctr_9ym7y86D30yWTHhL::after, #ctr_igJAi66AaGXkQFty::after, #ctr_OQvxoW5xhMvKRKhV::after, #ctr_RddjCbsSFx4CyXWE::after, 
      #ctr_m1rw7T2xbEWL3Gko::after, #ctr_sfGylv6NTYAoGl1B::after, #ctr_BjmECWh3RgVFw755::after, #ctr_LjFiMb0WPdndBp7Z::after, #ctr_sfGylv6NTYAoGl1B::after {border-bottom: 0;}
      #ctr_ET6No7nt0xwtiDEi, #ctr_gp8TJEJC7DesHWsz, #ctr_ulplHLh83E5zoQyY, #ctr_wWaPICOlGGwxeXmQ {border-top: 1px solid ${vueData.formMeta.parameters.formColor};}
      #ctr_wWaPICOlGGwxeXmQ, #ctr_TeSJphY9RZe4nZnl, #ctr_Yfvo2yBX6MEo2Htl {border-left: 0; border-right: 0;}
      #ctr_NQFWVA9QMUjmAv0Y {min-height: 50px;}
      #ctr_9ym7y86D30yWTHhL {border-top: 1px dashed}
      #ctr_2tbx6jIFIHzY6Ryk::after, #ctr_AyPnY04xjHa6qPxt::after, #ctr_7UhhrbovVFtWJKuC::after {border-bottom: 3px solid;}
      #row1_col2::before {border: 0;}
      .pad_layout_box .control_mobile_fl {padding: 0 !important;}
      .pad_layout_box .van-col:last-child {padding: 0.04rem 0.12rem !important;}
      .pad_layout_box .control_label {min-height: 0.5rem !important;padding-left: 0.12rem;}
      .pad_layout_box .control_mobile_fl span {font-size:0.32rem}
      .controlOpinionView .opinionText {text-indent: 2em;margin-top: 0 !important;}
	    #ctr_RATrhaULuBviq3Nv, #ctr_FEr41Zxo7X80CE0M, #ctr_Na5xmXPFWG32KugQ, #ctr_3U28khNHKzAHBXbi, #ctr_qLkjrzIj5V7JhTvw {min-height: 2em;}
	    .controlOpinionView .opinionBox:first-child { margin-top: 0 !important;}
	    #ctr_zaPQ57QXb0MOiiJu .control_label, #ctr_Yfvo2yBX6MEo2Htl .control_label {padding: 0!important;}
      #ctr_5hJj5y5adrFSnPFU {padding-bottom: 3px !important;}
      #ctr_DWyI0pMJmG6NRZ81, #ctr_dEtqRhCqQaQGlJF6 {border-top: 1px dashed ${vueData.formMeta.parameters.formColor};}
      #ctr_dEtqRhCqQaQGlJF6 .van-col--8, #ctr_dEtqRhCqQaQGlJF6 .van-col--16 {width: 50%;}
      #ctr_BuJkVnxu0pbwqmRO .van-field__control {color: ${vueData.formMeta.parameters.formColor} !important; font-size: 0.34rem; font-weight: 600;}
      #ctr_zGDRUL7JZFq0OSIX .controlRadio .van-radio .van-radio__label {font-size: 0.28rem;}
      #row4_col2 {display: flex; flex-direction: column;}
      #ctr_NQFWVA9QMUjmAv0Y {flex: 1;}
      `;
    let resetStyle = document.createElement("style");
    resetStyle.type = "text/css";
    vueData.$el.appendChild(resetStyle);
    resetStyle.innerHTML = cssRule;

  }
  
  window.spJS = exportObj;
})();
