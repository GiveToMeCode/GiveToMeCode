//简单配置axios
const request = () => async (path, method) => {

    const res = await axios[method](path);

    return res.data;
}


export default {
    request
}

const login = async (obj)=>{
    const argData = obj.data || "";
    const [err,data] = await to(request({
        path:'/test?xxx=xxx',
        mehod:'get',
        header:'[object Object]',
    }))
}
 const register = async (obj)=>{
    const argData = obj.data || "";
    const [err,data] = await to(request({
        path:'/test?xxx=xxx',
        mehod:'get',
        header:'[object Object]',
    }))
}
