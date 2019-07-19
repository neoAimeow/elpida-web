<template>
    <div class="news-container">
        <div class="news-date">
            <span style="font-family: HYZhengYuan-CEW; font-size: 40px;">新闻</span>
            <el-divider direction="vertical"></el-divider>
            <span style="font-family: HYZhengYuan-CEW">2019-08-27</span>
        </div>
        <el-divider></el-divider>

        <div class="news">
            <div class="news-icon el-icon-back"></div>

            <div id="news-content">
                <div v-for="(newsCase , key) in news" :key="key">
                    <!--                <span style="font-family: iekiexingkongzhiyi">{{newsCase.content == '' ? newsCase.title: newsCase.content}}</span>-->
                    <span style="font-family: iekiexingkongzhiyi">{{newsCase.content == '' ? newsCase.title: newsCase.content}}</span>

                    <el-divider content-position="right">
                        <div>
                            <i class="el-icon-potato-strips"></i>
                            <el-divider direction="vertical"></el-divider>
                            <span style="font-family: HYZhengYuan-CEW">{{newsCase.src}}</span>
                            <el-divider direction="vertical"></el-divider>
                            <span style="font-family: HYZhengYuan-CEW">{{newsCase.dateTime| dateFormat("YYYY-MM-DD HH:mm:ss")}}</span>
                        </div>
                    </el-divider>
                </div>
            </div>
            <div style="text-align: right;" class="news-icon el-icon-right"></div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'news',
        data() {
            return {
                news: []
            }
        },
        created: function () {
            this.request();
        },
        methods: {
            request() {
                var that = this;

                this.$ajax.get('/getNews', {
                    params: {
                        tradeDate: '20190617'
                    }
                }).then(function (response) {
                    that.news = response.data.model;
                }).catch(function (response) {
                    console.log(response);
                });
            }
        }
    }
</script>

<style>
    .news {
        display: flex;
        flex-direction: row;
        justify-content: center;
        /*align-items: center;*/
    }
    .news-icon {
        width: 5%;
        font-size: 30px;
    }
    #news-content {
        /*background-color: red;*/
        width: 90%;
    }
</style>