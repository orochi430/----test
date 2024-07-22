<template>
    <van-popup v-model="isShow" position="bottom" get-container="#app" round>
        <!-- <div class="header">
            <van-nav-bar title="请假" left-text="取消" @click-left="cancel" />
        </div> -->
        <van-nav-bar :title="text" left-text="取消" @click-left="close" />
        <div class="itemSheet sheetBox">
            <div class="reasonBox">
                <van-field v-model="message" type="textarea" :placeholder="placeholder" rows="10"/>
            </div>
        </div>
        <div class="footer">
            <van-button type="theme" block @click="submitFun">确认</van-button>
        </div>
    </van-popup>
</template>

<script>
export default {
    data() {
        return {
            isShow: false,
            message: "",
            text: '提醒',
            placeholder: '请输入'
        }
    },
    methods: {
        show(text, message, placeholder) {
            this.text = text || this.text;
            this.message = message || this.message;
            this.placeholder = placeholder || this.placeholder;
            this.isShow = true;
        },
        submitFun() {
        },
        close() {
            this.isShow = false
        }
    },
}
</script>

<style lang="scss" scoped>
.footer {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
}

.itemSheet {
    font-size: 16x;

}
.disfr { 
    display: flex;
}
.fc {
    display: flex;
    flex-direction: column;
}

.ac {
    align-items: center;
}

.jsb {
    justify-content: space-between;
}

.jc {
    justify-content: center;
}

.flex1 {
    flex: 1;
}

.sheetBox {
    padding: 15px;
    font-size: var(--font_size_3);

    .van-cell__value {
        height: 24px;
        background: #e5e5e5;
    }

    .dateRange {
        .line {
            width: 20px;
            height: 1px;
            background: #cecece;
            margin: 0 15px;
        }
    }
}

.peopleSec {
    height: 36px;
    padding-left: 10px;
    border: 1px solid rgb(235, 239, 245);
    border-radius: 3px;
    overflow-x: scroll;
    overflow-y: hidden;

    .secItem {
        padding: 4px 10px;
        margin: 0 4px;
        white-space: nowrap;
        background: white;
        border-radius: 18px;
    }
}

.btnBox {
    padding: 15px;
}

.searchSheet {
    height: 500px;

    .van-action-sheet__content {
        height: 100%;
    }
}

.sheetBox {
    overflow-y: auto;

    .van-cell {
        padding: 10px 0;
    }

    .van-field__body {
        border-radius: 5px;
        overflow: hidden;
    }

    .van-field__control {
        height: 36px;
        background: #ebeff5;
        padding-left: 10px;
    }

    .peopleSec {
        span {
            margin: 0 5px;
            white-space: nowrap;
        }
    }

    .peopleSec+.van-button {
        height: 36px;
    }

}

.btnBox {
    .van-button--normal {
        padding: 0 40px;
    }
}

.selectSearch {
    display: flex;
    flex-direction: column;

    .van-action-sheet__content {
        flex: 1;
        overflow-y: auto;
        padding: 0 15px;

        .van-checkbox {
            margin: 15px 0;
        }
    }
}

.reasonBox {
    .van-field__control {
        height: 300px;
    }
}
</style>
