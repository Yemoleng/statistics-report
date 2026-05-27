import axios from 'axios'
import CryptoJS from 'crypto-js';
import {setCookies,getCookies} from '../utils/cache.js'	

const site_id = "837aae20-af1c-4244-afc4-a8cf98c50b2b"
const service = axios.create({
	baseURL: "https://api.ep365.com/mini/Api.html", // 从环境变量读取基础地址
	timeout: 15000 // 请求超时时间
})

function encrypt(str) {	
	const key = CryptoJS.enc.Utf8.parse(getCookies('keycode')); 
	var randomBytes = CryptoJS.lib.WordArray.random(8);
	var randomHex = randomBytes.toString(CryptoJS.enc.Hex);
	const iv = CryptoJS.enc.Utf8.parse(randomHex);	  
	const encrypted = CryptoJS.AES.encrypt(str, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	const ivAndCiphertext = iv.concat(encrypted.ciphertext);
	return CryptoJS.enc.Base64.stringify(ivAndCiphertext);	
}

function request(options) {
	let array = ['LoginCheck', 'CodeLogin', 'RefreshToken', 'GetIndexInfo', 'GetKey','SaveRegister','CheckUserMobile','GetMobile','ParseLocationGaoDe']
	if(!array.includes(options.data.method))
	{
		options['data']['encode_data']['token'] = getCookies('baojiaToken')
	}	
	options['data']['site_id'] = "837aae20-af1c-4244-afc4-a8cf98c50b2b"	

	options['data']['encode_data'] = encrypt(JSON.stringify(options.data.encode_data));	
	return service({
		method: options.method || 'GET',
		url: "https://api.ep365.com/mini/Api.html",
		...options
	})
}


export function get(params, options = {}) {
  return request({
    params,
    method: 'GET',
    ...options
  })
}

export function post(data, options = {}) {
    return request({
      data,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })
  }