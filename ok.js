function convertJson(originData, data) {
    const result = {};
    Object.entries(originData).forEach(([key, value]) => {
        if (typeof value === 'string' && /{{\w+\.[\w.]+}}/.test(value)) {
            result[key] = convertString(value, data);
        } else if ({}.toString.call(value) === '[object Array]') {
            // 数组，遍历每个元素看下是否还有需要转换的
            result[key] = convertArray(value, data);
        } else if ({}.toString.call(value) === '[object Object]') {
            // json，递归看下里层是否还有需要转换的
            result[key] = convertJson(value, data);
        } else {
            result[key] = value;
        }
    });
    return result;
}

function convertString(originValue, data) {
    return originValue.replaceAll(/{{\w+\.([\w.]+)}}/g, (_, key) => {
        const kdata = getDataFromJsonByKeyChain(key, data);
        const typeofData = {}.toString.call(kdata);
        if (typeofData === '[object Array]' || typeofData === '[object Object]')
            return JSON.stringify(kdata);
        return typeof kdata === 'string' ? `${kdata}` : kdata;
    });
}

function convertArray(originValue, data) {
    return originValue.map((v) => {
        if (typeof v === 'string' && /{{\w+\.[\w.]+}}/.test(v)) {
            return convertString(v, data);
        }

        if ({}.toString.call(v) === '[object Object]') {
            return convertJson(v, data);
        }

        if ({}.toString.call(v) === '[object Array]') {
            return convertArray(v, data);
        }

        return v;
    });
}

// 从json中拿数据
function getDataFromJsonByKeyChain(keyChain, data) {
    const keys = keyChain.match(/(?=<{{)?(\w+(?=\.)?)+(?=}})?/g);

    if (!keys) return '';

    let result = data;
    keys.forEach((key) => {
        result = result[key];
    });
    return result;
}

const params = {
    mp_app_id: '123',
    query_page_num: 1,
    query_page_size: 10,
    business: {
        code: '800050',
    },
};

const s = {
    a: '{{params.mp_app_id}}',
    b: '{{params.query_page_num}}',
    c: '{{params.business}}',
    d: ['{{params.mp_app_id}}', 2, 3],
    e: '{"app_id":{{params.mp_app_id}},"search_name":"","page_index":{{params.query_page_num}},"page_size":{{params.query_page_size}},"code":{{params.business.code}},"business": {{params.business}}}',
    f: {
        g: '{{params.mp_app_id}}',
    },
};

const result = convertJson(s, params);
console.log(result);
