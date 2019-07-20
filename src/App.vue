<script src="../.eslintrc.js"></script>
<template>
    <div id="app">
        <el-container>
            <el-header>
                <el-menu class="menu" mode="horizontal"
                         router>
<!--                    :to="{path:'/homepage/classicCaseInside2',query: {id: item.id}}"-->
                    <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item :index="menuStr">新闻</el-menu-item>
                    <el-menu-item :index="quotationStr">当天行情</el-menu-item>
<!--                    <el-menu-item index="/reflection">复盘日记</el-menu-item>-->
                </el-menu>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>
                <el-divider><I class="el-icon-data-analysis"></I></el-divider>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                menuStr: 'news',
                quotationStr: 'quotation'
            }
        },
        created: function () {
            let date = this.$moment().utc().format('YYYYMMDD');
            this.menuStr = 'news?date=' + date;
            this.quotationStr = 'quotation?date=' + date;
        }
    }
</script>

<style>

    html, body, #app {
        height: 100%;
    }

    body {
        margin: 0;
        padding: 0;
    }

    * {
        font-family: "TW-Sung-98_1","PingFang SC";
    }

    .el-header, .el-footer {
        line-height: 60px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-main {
        height: 100%;
    }


</style>

