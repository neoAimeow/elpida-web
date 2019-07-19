<template>
    <div class="quotation">
        <h1>This is an quotation page</h1>
    </div>
</template>

<script>
    export default {
        name: 'app',

        created: function () {
            this.request();
        },
        methods: {
            request() {
                // this.$ajax.get('/analyzeStockDataWithTradeData', {
                //     params: {
                //         tradeDate: '20190617'
                //     }
                // }).then(function (response) {
                //     console.log(response);
                // }).catch(function (response) {
                //     console.log(response);
                // });
            }
        }
    }
</script>

<style>



</style>
