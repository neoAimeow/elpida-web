<template>
    <div class="quotation-container">

        <el-dialog width="70%" title="当日新闻" :visible.sync="newsVisible">
            <NewsComponent :news="news"  v-loading="newsLoading" ></NewsComponent>
        </el-dialog>

        <div id="quotation-title">
            <div class="quotation-title-inner">
                <div class="quotation-title-left">
                    <span style="font-size: 40px;">当天行情</span>
                    <el-divider direction="vertical"></el-divider>
                    <span style="font-family: HYZhengYuan-CEW">{{date}}</span>
                </div>

                <div class="quotation-title-right">
                    <el-row :gutter="gutter">
                        <el-col :span="6">
                            <el-button icon="el-icon-news" @click="newsButtonClicked">当日新闻</el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-button icon="el-icon-help" @click="reloadButtonClicked">重新分析</el-button>
                        </el-col>
                        <el-col :span="6">
                            <el-date-picker @change="dateChange" v-model="date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-col>
                    </el-row>

                </div>
            </div>

            <el-divider></el-divider>
        </div>

        <div id="quotation-body">
            <div class="quotation" v-loading="loading">
                <div class="quotation-icon">
                    <i @click="goYesterday" class="el-icon-back"></i>
                </div>

                <div id="quotation-content">
                    <div v-if="dayType === 1 || isEmpty" style="text-align: center;margin-top: 220px;">当天没有行情</div>
                    <div v-else class="quotation-content-main">
                        <el-row :gutter="gutter">
                            <el-col :lg="12" :xl="12" :xs="24" :sm="24" :md="24">
                                <StockTable title="涨停票" :tableData="stockData.limitUpStocks == null ? [] : stockData.limitUpStocks"></StockTable>
                            </el-col>
                            <el-col :lg="12" :xl="12" :xs="24" :sm="24" :md="24">
                                <StockTable title="一字板" :tableData="stockData.topStocks == null ? [] : stockData.topStocks"></StockTable>
                            </el-col>

                        </el-row>

                        <el-row :gutter="gutter" style="margin-top: 30px;">
                            <el-col :lg="12" :xl="12" :xs="24" :sm="24" :md="24">
                                <StockTable title="跌停票" :tableData="stockData.limitDownStocks == null ? [] : stockData.limitDownStocks"></StockTable>
                            </el-col>
                            <el-col :lg="12" :xl="12" :xs="24" :sm="24" :md="24">
                                <StockTable title="炸板票" :tableData="stockData.explodeStocks == null ? [] : stockData.explodeStocks"></StockTable>
                            </el-col>
                        </el-row>

                        <el-row :gutter="gutter" style="margin-top: 30px;">
                            <el-col :lg="6" :xl="6" :xs="12" :sm="12" :md="12">
                                <SimpleStockTable title="跌停票" :tableData="stockData.explodeStocks == null ? [] : stockData.explodeStocks"></SimpleStockTable>
                            </el-col>
                            <el-col :lg="6" :xl="6" :xs="12" :sm="12" :md="12">
                                <SimpleStockTable title="炸板票" :tableData="stockData.explodeStocks == null ? [] : stockData.explodeStocks"></SimpleStockTable>
                            </el-col>
                            <el-col :lg="6" :xl="6" :xs="12" :sm="12" :md="12">
                                <SimpleStockTable title="跌停票" :tableData="stockData.explodeStocks == null ? [] : stockData.explodeStocks"></SimpleStockTable>
                            </el-col>
                            <el-col :lg="6" :xl="6" :xs="12" :sm="12" :md="12">
                                <SimpleStockTable title="炸板票" :tableData="stockData.explodeStocks == null ? [] : stockData.explodeStocks"></SimpleStockTable>
                            </el-col>
                        </el-row>


                        <!--                        <StockTable title="跌停票" :tableData="stockData.limitDownStocks"></StockTable>-->
<!--                        <StockTable title="炸板票" :tableData="stockData.explodeStocks"></StockTable>-->
<!--                        <div>-->
<!--                        </div>-->
                    </div>
                </div>
                <div style="text-align: right;" class="quotation-icon">
                    <i @click="goTomorrow" v-if="dayType === -1" class="el-icon-right"></i>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import StockTable from '@/components/StockTable.vue'
    import SimpleStockTable from '@/components/SimpleStockTable.vue'
    import NewsComponent from '@/components/NewsComponent.vue'

    export default {
        name: 'quotation',
        data() {
            return {
                stockData: {},
                loading: true,
                date: '',
                // 0为同一天，1表示将来，-1表示过去
                dayType: 0,
                yesterdayDateStr: '',
                tomorrowDateStr: '',
                dialogVisible: false,
                isEmpty: false,
                gutter: 20,
                newsVisible: false,
                news: [],
                newsLoading: true
            }
        },
        created: function () {
            this.loadData();
        },
        components: {
            StockTable,
            SimpleStockTable,
            NewsComponent
        },
        watch: {
            "$route": "loadData"
        },
        methods: {
            newsButtonClicked() {
                this.news = [];
                this.newsLoading = true;
                this.requestNews(this.$route.query.date);
                this.newsVisible = true;
            },
            reloadButtonClicked() {
                this.handleDate('analysis', this.$route.query.date);
            },
            loadData() {
                this.handleDate('get', this.$route.query.date);
            },

            handleDate(type, date) {
                this.stockData = {};
                this.isEmpty = false;
                this.loading = true;
                this.date = this.$moment(date, "YYYYMMDD").format("YYYY-MM-DD");
                let nowTime = this.$moment(new Date()).format("YYYY-MM-DD");
                if (this.$moment(nowTime, "YYYY-MM-DD").isSame(this.date)) {
                    this.dayType = 0;
                } else if (this.$moment(nowTime, "YYYY-MM-DD").isBefore(this.date)) {
                    this.dayType = 1;
                } else {
                    this.dayType = -1
                }

                this.tomorrowDateStr = this.$moment(this.date).add(1, 'days').format("YYYYMMDD");
                this.yesterdayDateStr = this.$moment(this.date).subtract(1, 'days').format("YYYYMMDD");

                if (type === 'get') {
                    this.request(date);
                } else {
                    this.request(date, '/analyzeStockDataWithTradeData');
                }
            },

            request(date, uri = '/getAnalysisResult') {
                let that = this;
                this.$ajax.get(uri, {
                    params: {
                        tradeDate: date
                    }
                }).then(function (response) {
                    console.log(response)
                    that.loading = false;
                    if (response.data.success == true) {
                        that.stockData = response.data.model;
                    } else {
                        that.isEmpty = true;
                    }

                }).catch(function () {
                    that.loading = false;
                    that.isEmpty = true;
                });
            },

            requestNews(date) {
                var that = this;
                this.$ajax.get('/getNews', {
                    params: {
                        tradeDate: date
                    }
                }).then(function (response) {
                    that.news = response.data.model;
                    that.newsLoading = false;
                }).catch(function () {
                    that.newsLoading = false;
                });
            },

            goYesterday() {
                this.$router.push({query: {date: this.yesterdayDateStr}});
            },

            goTomorrow() {
                this.$router.push({query: {date: this.tomorrowDateStr}});
            },

            dateChange() {
                let dateStr = this.$moment(this.date, 'YYYY-MM-DD').format('YYYYMMDD');
                this.$router.push({query: {date: dateStr}});
            }
        }
    }
</script>


<style>

    .quotation {
        display: flex;
        flex-direction: row;
        justify-content: center;
        /*align-items: center;*/
    }

    #quotation-title {
        background-color: white;
        height: 90px;
        width: 100%;
    }

    .quotation-title-inner {
        display: flex;
        flex-direction: row;
        justify-content: space-between	;
        align-items: flex-end;
    }

    .quotation-icon {
        width: 5%;
        font-size: 30px;
    }
    #quotation-body {
        margin-top: 15px;
    }

    #quotation-content {
        /*background-color: red;*/
        width: 90%;
        min-height: 500px;
    }

    .quotation-content-main {
        /*display: flex;*/
        /*flex-direction: row;*/
        /*justify-content: center	;*/
        /*align-items: center;*/
    }

</style>
