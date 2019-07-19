<template>
    <div class="news-container">
        <div id="news-title" :class="barFixed == true ? 'isFixed' :''">
            <span style="font-size: 40px;">新闻</span>
            <el-divider direction="vertical"></el-divider>
            <span style="font-family: HYZhengYuan-CEW">{{date}}</span>
            <el-divider></el-divider>
        </div>

        <div class="news" v-loading="loading">
            <div class="news-icon el-icon-back"></div>

            <div id="news-content">
                <div v-for="(newsCase , key) in news" :key="key">
                    <!--                <span style="font-family: iekiexingkongzhiyi">{{newsCase.content == '' ? newsCase.title: newsCase.content}}</span>-->
                    <span>{{newsCase.content == '' ? newsCase.title: newsCase.content}}</span>

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
                news: [],
                loading: true,
                date: '',
                barFixed: false,
                // //1为
                // type: 1
            }
        },
        created: function () {
            this.date = this.$moment(this.$route.query.date, "YYYYMMDD").format("YYYY-MM-DD");
            this.request(this.$route.query.date);
        },

        methods: {
            request(date) {
                var that = this;
                this.$ajax.get('/getNews', {
                    params: {
                        tradeDate: date
                    }
                }).then(function (response) {
                    that.news = response.data.model;
                    that.loading = false;
                }).catch(function (response) {
                    console.log(response);
                    that.loading = false;
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
    #news-title {
        background-color: white;
        height: 90px;
        width: 100%;
    }
    .news-icon {
        width: 5%;
        font-size: 30px;
    }
    #news-content {
        /*background-color: red;*/
        width: 90%;
        min-height: 500px;
    }

</style>