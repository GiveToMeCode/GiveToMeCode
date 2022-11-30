const uniapp = `
import qs from 'qs' // 处理data
const request = (params) => {
	/*
	 * 1.初始化值
	 */
	let _self = this;
	let url = params.url;
	let method = params.method || 'GET';
	let data = params.data || {};
	data.token = "default-access_token" // default-access_token
	/*
	 *2.判断token
	 */
	if (!params.token) { // 如果没有传递token
		let token = uni.getStorageSync('token'); // 在本地查找
		if (!token) { // 如果本地没有就跳转到登录页面
			uni.navigateTo({
				url: 'pages/views/login/index'
			});
		} else {
			data.token = '179509245-9c91827e0224bdc18d0b118b8be1b5af';
		}
	}
	/*
	 * 3.添加头部
	 */
	let defaultOpot = {
		// 'Content-Type': 'application/x-www-form-urlencoded',
		'Terminal-Type': 'innerH5',
		'Content-Type': 'application/json;charset=UTF-8',
	}
	/*
	 * 4.处理 POST
	 */
	let header = {}
	method = method.toUpperCase()
	if (method == 'POST') {
		header = {
			'Content-Type': 'application/x-www-form-urlencoded',
		}
		data = qs.stringify(data)
	}
	// 5.请求地址
	const requestUrl = baseUrl.server + url;
	uni.showLoading({
		title: '加载中...'
	});
	// 6.用 Promise 创建回调
	return new Promise((resolve, reject) => {
		uni.request({
				url: requestUrl,
				method: method,
				header: Object.assign({}, defaultOpot, header),
				data: data,
				dataType: 'json',
			})
			.then(res => { // 成功
				if (res[1] && res[1].statusCode === 200) {
					let {
						data: dataType
					} = res[1]
					switch (dataType.code * 1) { // 拦截返回参数
						case 0:
							resolve(dataType)
							break;
						case 1003:
							uni.showModal({
								title: '登录已过期',
								content: '很抱歉，登录已过期，请重新登录',
								confirmText: '重新登录',
								success: function(res) {
									if (res.confirm) { // 点击确定
										//去登录页面
										
										uni.navigateTo({
											// 切记这儿需要哈pages.json保持一致；不能有.vue后缀
											url: '/pages/views/login/index'
										});
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
							break;
						case -1:
							uni.showModal({
								title: '请求数据失败',
								content: '获取数据失败！',
								confirmText: '确定',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
							break
					}
				}
			})
			.catch(err => { // 错误
				reject(err)
			})
			.finally(() => {				
				uni.hideLoading();
			})
	})
}
export default request
`;

const miniPro = `

`;
let item = ''
const axiosR = item => `export <span class="key">const ${item.name}</span> = async (obj)=>{
    	const argData = obj.data || "";
   	const [err,data] = await to(request({
        	path:'${item.path}',
       		mehod:'${item.method}',
              	data:argData
    \t}))

	return data;
  }
`

const umi = ``;

const axios = `
import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';



// auth.js
const TOKEN_KEY = '__TOKEN';
export function getTokenAUTH() {
   return localStorage.getItem(TOKEN_KEY);
}

const pendingMap = new Map();

const LoadingInstance = {
  _target: null,
  _count: 0
};

function myAxios(axiosConfig, customOptions, loadingOptions) {
  const service = axios.create({
    baseURL: process.env.NODE_, // 设置统一的请求前缀
    timeout: 6000, // 设置统一的超时时长
  });

  // 自定义配置
  let custom_options = Object.assign({
    repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
    loading: false, // 是否开启loading层效果, 默认为false
    reduct_data_format: true, // 是否开启简洁的数据结构响应, 默认为true
    error_message_show: true, // 是否开启接口错误信息展示,默认为true
    code_message_show: false, // 是否开启code不为0时的信息提示, 默认为false
  }, customOptions);

  // 请求拦截
  service.interceptors.request.use(
    config => {
      removePending(config);
      custom_options.repeat_request_cancel && addPending(config); 
      // 创建loading实例
      if (custom_options.loading) {
        LoadingInstance._count++;
        if(LoadingInstance._count === 1) {
          LoadingInstance._target = ElLoading.service(loadingOptions);
        }
      }
      // 自动携带token
      if (getTokenAUTH() && typeof window !== "undefined") {
        config.headers.Authorization = getTokenAUTH();
      }

      return config;
    }, 
    error => {
      return Promise.reject(error);
    }
  );

  // 响应拦截
  service.interceptors.response.use(
    response => {
      removePending(response.config);
      custom_options.loading && closeLoading(custom_options); // 关闭loading

      if(custom_options.code_message_show && response.data && response.data.code !== 0) {
        ElMessage({
          type: 'error',
          message: response.data.message
        })
        return Promise.reject(response.data); // code不等于0, 页面具体逻辑就不执行了
      }

      return custom_options.reduct_data_format ? response.data : response;
    },
    error => {
      error.config && removePending(error.config);
      custom_options.loading && closeLoading(custom_options); // 关闭loading
      custom_options.error_message_show && httpErrorStatusHandle(error); // 处理错误状态码
      return Promise.reject(error); // 错误继续返回给到具体页面
    }
  );

  return service(axiosConfig)
}

export default myAxios;

/**
 * 处理异常
 * @param {*} error 
 */
function httpErrorStatusHandle(error) {
  // 处理被取消的请求
  if(axios.isCancel(error)) return console.error('请求的重复请求：' + error.message);
  let message = '';
  if (error && error.response) {
    switch(error.response.status) {
      case 302: message = '接口重定向了！';break;
      case 400: message = '参数不正确！';break;
      case 401: message = '您未登录，或者登录已经超时，请先登录！';break;
      case 403: message = '您没有权限操作！'; break;
      case 404: message = 请求地址出错; break; // 在正确域名下
      case 408: message = '请求超时！'; break;
      case 409: message = '系统已存在相同数据！'; break;
      case 500: message = '服务器内部错误！'; break;
      case 501: message = '服务未实现！'; break;
      case 502: message = '网关错误！'; break;
      case 503: message = '服务不可用！'; break;
      case 504: message = '服务暂时无法访问，请稍后再试！'; break;
      case 505: message = 'HTTP版本不受支持！'; break;
      default: message = '异常问题，请联系管理员！'; break
    }
  }
  if (error.message.includes('timeout')) message = '网络请求超时！';
  if (error.message.includes('Network')) message = window.navigator.onLine ? '服务端异常！' : '您断网了！';

  ElMessage({
    type: 'error',
    message
  })
}

/**
 * 关闭Loading层实例
 * @param {*} _options 
 */
function closeLoading(_options) {
  if(_options.loading && LoadingInstance._count > 0) LoadingInstance._count--;
  if(LoadingInstance._count === 0) {
    LoadingInstance._target.close();
    LoadingInstance._target = null;
  }
}

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config 
 */
function addPending(config) {
  const pendingKey = getPendingKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingMap.has(pendingKey)) {
      pendingMap.set(pendingKey, cancel);
    }
  });
}

/**
 * 删除重复的请求
 * @param {*} config 
 */
function removePending(config) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
     const cancelToken = pendingMap.get(pendingKey);
     // 如你不明白此处为什么需要传递pendingKey可以看文章下方的补丁解释
     cancelToken(pendingKey);
     pendingMap.delete(pendingKey);
  }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config 
 * @returns 
 */
function getPendingKey(config) {
  let {url, method, params, data} = config;
  if(typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
}
`;

export const templateObj = {
	miniPro,
	uniapp,
	umi,
	axios,
	axiosR
}