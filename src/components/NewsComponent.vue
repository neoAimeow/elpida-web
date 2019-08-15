<template>
    <div class="news-component">
        <div v-if="dayType === 1" style="text-align: center;margin-top: 220px;">当天没有新闻</div>
        <div v-else v-for="(newsCase , key) in news" :key="key" @click="test(newsCase)">
            <!--                <span style="font-family: iekiexingkongzhiyi">{{newsCase.content == '' ? newsCase.title: newsCase.content}}</span>-->
            <span>{{newsCase.content == '' ? newsCase.title: newsCase.content}}</span>

            <el-divider content-position="right">
                <div>
                    <i class="el-icon-potato-strips"></i>
                    <el-divider direction="vertical"></el-divider>
                    <span style="font-family: HYZhengYuan-CEW">{{newsCase.srcStr}}</span>
                    <el-divider direction="vertical"></el-divider>
                    <span style="font-family: HYZhengYuan-CEW">{{newsCase.dateTime| dateFormat("YYYY-MM-DD HH:mm:ss")}}</span>
                </div>
            </el-divider>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'news',
        props: {
            news: Array,
            dayType: Number
        },
        data() {
            return {
                length: 0
            }
        },
        methods: {
            test(newsCase) {
                // let that = this;
                this.$ajax.get('markNewsAsImportant', {
                    params: {
                        title: newsCase.title,
                        content: newsCase.content,
                        newsDate:  this.$moment(newsCase.dateTime).format("YYYY-MM-DD HH:mm:ss"),
                        src: newsCase.src,
                        srcStr: newsCase.srcStr
                    }
                }).then(function (response) {

                });
            }
        },
        watch: {
            news() {
                // this.length = this.tableData.length;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    .news-component {
        min-height: 500px;
    }

</style>
