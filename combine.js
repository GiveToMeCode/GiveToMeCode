import {templateObj} from "./template.js"
let importTemp = ``



const prodReq = (arr)=>{
    let res = '';
    arr.forEach(item =>{
        res += templateObj.axiosR(item)
    })
    return res;
}

const queryParam = (obj) => {
    if (!Object.getOwnPropertyNames(obj)) {
        return "";
    }
    let jsonObj = JSON.stringify(obj).replace(/["|{|}]/g, "").replace(/:/g, "=").replace(/,/g, "&")
    return '?' + jsonObj;
}


export const prodFunc = (arr) => {
    let str =  prodReq(arr);
    console.log(str)
    const templateHead = `
    import {to} from 'await-to-js';   
    import request from '@/utils/request';

    ${str}
    `;
    return templateHead;
}

//老张说的最好不要用id
const getValue = (label, className) => {
    let value = document.getElementsByClassName(className).value;

}


export const test = async (obj) => {
    const argData = obj.data || "";
    const [err, data] = await to(request({
        path: '/test?xxx=xxx',
        mehod: 'get',        
    }))
}