const params = {
    mp_app_id: 123,
    query_page_num: 1,
    query_page_size: 10,
    businesss: {
      code: 800050,
    }
  }
  
const str = "{\"app_id\":\"{{params.mp_app_id}}\",\"search_name\":\"\",\"page_index\":\"{{params.query_page_num}}\",\"page_size\":\"{{params.query_page_size}}\",\"code\":\"{{params.business.code}}\"}"