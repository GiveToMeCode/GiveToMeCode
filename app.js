import config from "./config.js"
import api from "./request.js";
import { prodFunc } from "./combine.js"
import { mapStorage, toTree, mkdir, init } from "./storage.js";
import { prettyFormat } from "./utils.js";

import {templateObj} from "./template.js"


console.log(toTree())
let request = api.request();

const reactive = Vue.reactive;
const ref = Vue.ref;
const watch = Vue.watch
const raw = Vue.toRaw;
let paramArr = ref([]);



const queryParam = (obj) => {
    if (!Object.getOwnPropertyNames(obj)) {
        return "";
    }

    let jsonObj = JSON.stringify(obj).replace(/["|{|}]/g, "").replace(/:/g, "=").replace(/,/g, "&")
    return '?' + jsonObj;
}


const difSet = (props) => {
    let dialogVisible = ref(false)
    let createFloder = ref(false)
    const testData = "i am test Data"
    let URL = ref("")
    let compPath = ref("");
    let first = ref("");
    const activeName = ref('first')
    const rActiveName = ref('Body')
    let cfz = ref("uniapp")
    let responseData = ref('')
    let localFloder = [{ name: "测试接口" }];
    let reqMethods = ref("GET")
    let sValue = ref("GET")
    let rjson = ref("")
    let intName = ref("")
    let floderTree = ref(toTree())
    // let rules = {
    //     name:[{required:true,message:"请输入接口名称",trigger:'blur'}]
    // }
    let loading = ref(false)
    let detailFloader = ref("登录")
    let floderName = ref("");
    let input1 = ref("")
    let exportsStr = ref("")
    let baseUrl = ref("http://localhost/test")
    let env = ref("")
    let testEnv = ref("")
    let str = ref("")
    let envS = [{
        name:"测试环境"
    },{
        name:"正式环境"
    }]
    let fz = templateObj.uniapp
    return {
        cfz,
        fz,
        str,
        envS,
        testEnv,
        input1,
        baseUrl,
        floderName,
        createFloder,
        detailFloader,
        env,
        // rules,
        intName,
        loading,
        baseUrl,
        options: config.options,
        testData,
        paramArr,
        addCheck: true,
        checkFlag: true,
        URL,
        compPath,
        first,
        activeName,
        rActiveName,
        responseData,
        localFloder,
        floderTree,
        reqMethods,
        sValue,
        rjson,
        dialogVisible,
        exportsStr,
        // checkAll:true,
        // initCheck:true
    }
}

const App = {
    mounted() {
        init()
    },
    setup: difSet,
    computed: {

        checkAll() {
            return (!this.paramArr.find((item) => item?.checked == false))
        },
        combineParam() {
            let queryObj = {};
            this.paramArr.forEach(item => {
                if (item.checked != false) {
                    queryObj[item.key] = item.value
                }
            })
            let str = queryParam(queryObj)
            return this.URL + str;
        },
        floders() {
            let res = [];
            this.floderTree.map(item => res.push(item.label))
            return res;
        },
        reqName(){
            let reg = /http/g;
            let reg1 = /\/.*/g;
            if(reg){
                return this.URL.match(reg1).join("").split("/")[1]
            }else{
                return this.URL.match(reg1).join("").split("/")[3]
            }
        }
    },
    methods: {
        changeFz(e){
            this.cfz = e.props.name;
            if(this.cfz == 'uniapp'){
                this.fz = templateObj.uniapp
            }
            if(this.cfz == "axios"){
                this.fz = templateObj.axios;

            }
        },
        //收集页面参数
        getArg(){

        },
        selectEnv(e){
            if(e == "测试环境"){
                this.baseUrl = this.env 
            }else{
                this.baseUrl = this.testEnv 
            }
        },
        exports(children) {
            console.log(children)
            this.exportsStr = prodFunc(raw(children));
            this.rActiveName = "控制台"
        },
        addR() {
            // this.loading = true;
            this.reqMethods = "GET"
            this.compPath = ""
            // setTimeout(()=>{
            //     this.loading = false                
            // },1000)
        },
        createF() {
            this.createFloder = true;
            this.floderName = ""

        },
        iFname(e) {
            this.floderName = e
        },
        selectFloder(e) {
            this.detailFloader = e;
        },
        fConfirm() {
            if (this.floderName == "") {
                this.$message("文件夹名称不能为空");
            } else {
                this.createFloder = false;
                let { code, msg } = mkdir(this.floderName)
                if (code == 200) {
                    this.$message({ type: 'success', message: msg })
                    this.floderTree.push({ label: this.floderName })

                } else {
                    this.$message({ type: 'error', message: msg })

                }
            }
        },
        Confirm() {
            if (this.intName == "") {
                this.$message("请求名称不能为空");
            }
            this.dialogVisible = false;

            this.floderTree.filter((item, index) => {
                if (item.label == this.detailFloader) {
                    // this.floderTree[index].intface = [];
                    if (item.children) {
                        item.children.push({
                            label: this.intName,
                            name: this.reqName,
                            path: this.compPath,
                            method: this.reqMethods,
                            body: {
                                username: 'zhu',
                                password: "xxsa1213"
                            },
                            header: {

                            }
                        })
                        console.log(item.children)
                    } else {
                        item.children = [];
                        item.children.push({
                            label: this.intName,

                        })
                    }
                }
            })
        },
        addIntface() { },
        save() {
                if(this.URL == ""){
                this.$message("请求路径错误或路径为空")
                return;
            }
            this.intName = this.reqName;
            this.dialogVisible = true;

        },
        selectChange(e) {
            this.sValue = e;
        },
        //文件节点点击
        handleNodeClick(e) {
            if (e.$treeNodeId == 2) {
                this.compPath = "http://thankparents.cn/test";
                this.reqMethods = "POST";
                this.sValue = "POST"
            }
            console.log(e.$treeNodeId)
        },
        addt() {
            this.floderTree[0].children.push({
                label: "注册",

            })
            console.log(this.floderTree)
        },
        blurUrl() {
            this.compPath = this.URL;
        },
        inputValue() {
            this.compPath = this.combineParam;
            // console.log(this.paramArr)
        },
        tt(e) {
            console.log(e)
        },
        async send({ name, method, path, query, body, header }) {
            if(this.URL == ""){
                this.$message("请求路径错误或路径为空")
                return;
            }
            this.localFloder.pop()
            this.responseData = await request("http://localhost:3000/test", "get")
            this.rjson = prettyFormat(JSON.stringify(this.responseData))
            if (name == "") {
                this.$message({
                    message: "方法名不能为空",
                    type: "error",
                })
            }

        },
        //取消全选
        sigleSelect() {
            // var checkAll = this.paramArr.find(item => item.checked == false);
            // if(!checkAll.checked){
            //     this.checkAll = false;
            // }else{
            //     this.checkAll = true;

            // }
        },
        cancelAll() {
            this.checkFlag = !this.checkFlag;

            if (this.checkFlag) {
                this.checkAll = false;
                this.paramArr.map(item => {
                    item.checked = false;
                })
            } else {
                this.checkAll = true;

                this.paramArr.map(item => {
                    item.checked = true;
                })
            }

        },
        addParam(e) {

            this.paramArr.push({
                icon: '',
                checked: true,
                key: this.first,
                value: ''
            })
            this.first = ""

            this.$nextTick(() => {
                var input = document.getElementById('' + this.paramArr.length - 1)
                input.focus()
            })
            this.compPath = this.combineParam
        },
        inputClear(index) {
            this.paramArr = this.paramArr.filter((_, i) => index !== i);
            console.log(this.paramArr)
        },

    },
};


const app = Vue.createApp(App);

app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount("#app");