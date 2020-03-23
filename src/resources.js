const debug = process.env.NODE_ENV === 'development' ? true : false;
// 测试环境地址
if (debug) {
    // var host = 'https://api.guangyangyundong.com/api';
    // var host = 'http://120.77.72.16:8080/api';
    // var host = 'http://192.168.1.107:8080/api';
    // var host = 'http://119.23.236.252:8080/panda_loan';
    // var host = 'http://192.168.2.116:8080'; //倪军本级
    // var host = 'http://47.94.250.23:8080/panda_loan'
    // var host = 'http://192.168.199.166:8080';
    var host = 'http://192.168.2.171:8080/panda_loan'; //胡文琦本机
    // var host = ' http://47.104.109.123:8080/panda_loan'; // 新的测试环境地址
    // var host = 'http://192.168.2.171:8080/panda_loan';
    // var host = 'http://119.23.12.36:8081/panda_loan';
    // var host = 'http://47.104.109.123:8080/panda_loan'
    // var host = 'http://192.168.2.116:8080/panda_loan';
    // var host = 'https://api.pinganzhiyuan.com/gray';
    // var host = 'https://api.pinganzhiyuan.com/panda_loan';
} else {
    //正式环境地址 !!!注意，复制这里的地址的时候要去掉 https 中的 “s”，特此标记。
    //var host = 'http://119.23.12.36:8081/panda_loan';
    var host = 'https://api.pinganzhiyuan.com/panda_loan';
    // var host = ' http://47.104.109.123:8080/panda_loan'; // 新的测试环境地址
}
console.warn('当前resource: ', host);

let resources = {
    host: host,
    // graphQL查询Api
    graphQlApi: `${host}\/graphql`,
    users(id) {
        return `${host}\/users\/${id}`
    },
    imageCode() {
        return `${host}\/imageCaptchas`
    },
    smsCaptcha() {
        return `${host}\/smsCaptcha`
    },
    token() {
        return `${host}\/tokens`
    },
    landingPage() {
        return `${host}\/landingPage`
    },
    recordUrl() {
        return `${host}\/recordH5`
    },
    h5DownloadUrl() {
        return `${host}\/h5DownloadUrl`
    },
    recordDownload() {
        return `${host}\/recordDownload`
    }
};

export default resources;