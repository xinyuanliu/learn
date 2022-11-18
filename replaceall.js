const params = {
    mp_app_id: '123',
    query_page_num: 1,
    query_page_size: 10,
    business: {
        code: '800050',
    },
}

fn(obj, json)

const s = {
    a: "{{params.mp_app_id}}",
    b: "{{params.query_page_num}}",
    c: "{{params.business}}",
    d: ["{{params.mp_app_id}}", 2, 3],
    e: "{\"app_id\":{{params.mp_app_id}},\"search_name\":\"\",\"page_index\":{{params.query_page_num}},\"page_size\":{{params.query_page_size}},\"code\":{{params.business.code}},\"business\": {{params.business}}}",
    f: {
        g: "{{params.mp_app_id}}",
    }
}

// =>
const result = {
    a: "123",
    b: 1,
    c: {
        code: '800050',
    },
    d: ['123', 2, 3],
    e: "{\"app_id\":\"123\",\"search_name\":\"\",\"page_index\":1,\"page_size\":10,\"code\":\"800050\",\"business\":{\"code\":\"800050\"}}",
}
