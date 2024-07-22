<template>
<van-empty :description="_description" :image="_image" />
</template>

<script>
export default {
    name: "empty",
    props: ["description","image"],
    data() {
        return {
            _description:"",
            _image:""
        }
    },
    created() {
        this._description=this.description||"暂无数据"
        this._image=this.image||"static/images/empty.png"

    }
};
</script>

<style lang="scss" scoped>

</style>
