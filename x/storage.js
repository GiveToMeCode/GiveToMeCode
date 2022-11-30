
import config from "./config.js";

let intfaceColl = JSON.parse(localStorage.getItem(config.storageKey)) || config.storageValue;



const folderExist = (name) => intfaceColl.find(item => item.floderName == name ? true : false);


const unqie = (key) => {
    let value = localStorage.getItem(key);
    return value ? true : false;
}

export const setStorage = (value) => {
    localStorage.setItem(config.storageKey, JSON.stringify(value))
}

/**
 * 遍历文件节点名称
 */
export const mapStorage = () => {

    let resArr = [];
    intfaceColl.forEach(item => {
        resArr.push(item.floderName)
    });
    return {
        resArr,
        intfaceColl
    };
}

/**
 * 页面ui 渲染
 * {name,path,query,body,headers}
 */
export const toTree = function () {
    let srcArr = mapStorage().intfaceColl;
    let treeArr = [];
    srcArr.forEach((item, index) => {
        if (item.intface) {
            treeArr.push({
                label: item.floderName,
                children: [
                    {
                        label: item.intface[index].name,
                        name: "register",
                        path: "/test",
                        method: "get",
                        query: {
                            xxx: 'xxx'
                        },
                        body: {
                            username: 'zhu',
                            password: "xxsa1213"
                        },
                        header: {

                        }
                    }
                ]
            })
        } else {
            treeArr.push({ label: item.floderName })
        }
    })
    return treeArr;
}

/**
 * 
 * @param {*} floderName 文件名称
 */
export const mkdir = (name) => {
    let bool = folderExist(name);
    let msg = "",
        code = 0;
    if (!bool) {
        intfaceColl.push({ floderName: name })
        setStorage(intfaceColl)
        msg = "操作成功";
        code = 200
    } else {
        msg = "文件夹已经存在"
    }
    return {
        msg,
        code
    };
}

/**
 * 
 * @param {*} floder 文件夹
 * @param {*} file 文件
 */
export const reSet = (floder, file) => {
    intfaceColl.forEach(item => {
        if (item.label == floder) {
            item.intface.push(file)
        }
    })

}

export const init = () => {
    localStorage.setItem(config.storageKey, JSON.stringify(config.storageValue))
}