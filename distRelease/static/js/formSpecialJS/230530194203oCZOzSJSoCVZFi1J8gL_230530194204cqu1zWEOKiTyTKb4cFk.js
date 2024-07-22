//远程议题申报单
(function (){
    const exportObj = {};
    exportObj.initHandle = function (formData, formStruct, vueData) {
        if (formStruct.parameters.nodeId == '0') {
            let meetingData = dsf.util.loadSessionStore("ytText")
            let topicPk = dsf.util.loadSessionStore("topicPk")
            formData.main["C-MEETING-TOPIC-0042"].value = meetingData.value;
            formData.main["C-MEETING-TOPIC-0042"].text = meetingData.text; 
            formData.main["B0035"].value = topicPk.value; 
        }
        
    }
   
    window.spJS = exportObj;
})()