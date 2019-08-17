<template>
    <div class="news-case-component">
        <div @click="mark(newsCase)">
            <!--                <span style="font-family: iekiexingkongzhiyi">{{newsCase.content == '' ? newsCase.title: newsCase.content}}</span>-->
            <span v-bind:class="{blackFont:newsCase.isMark, redFont:newsCase.isMark}">{{newsCase.content == '' ? newsCase.title: newsCase.content}}</span>

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
            newsCase: Object
        },
        data() {
            return {
                length: 0
            }
        },
        methods: {
            mark(newsCase) {
                if (newsCase.isMark) {
                    this.unMarkNewsAsImportant(newsCase);
                } else {
                    this.markNewsAsImportant(newsCase);
                }
            },
            markNewsAsImportant(newsCase) {
                // let that = this;
                this.$ajax.get('markNewsAsImportant', {
                    params: {
                        id: newsCase.id
                    }
                }).then(function (response) {
                    newsCase.isMark = response.data.model;
                    console.log(response);
                });
            },

            unMarkNewsAsImportant(newsCase) {
                // let that = this;
                this.$ajax.get('unMarkNewsAsImportant', {
                    params: {
                        id: newsCase.id
                    }
                }).then(function (response) {
                    newsCase.isMark = response.data.model;
                    console.log(response);

                });
            }
        },
        watch: {

        }
    }
</script>

<style scoped>

    .blackFont {
        color:black;
    }

    .redFont {
        color:red;
    }
</style>
