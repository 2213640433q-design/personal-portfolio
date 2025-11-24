#!/usr/bin/env node

/**
 * 图片上传脚本 - 使用 Imgur API
 * 使用方法: node upload-image.js <图片路径>
 */

import fs from 'fs';
import https from 'https';

const imagePath = process.argv[2];

if (!imagePath) {
  console.error('❌ 请提供图片路径');
  console.log('使用方法: node upload-image.js <图片路径>');
  console.log('示例: node upload-image.js ./my-photo.jpg');
  process.exit(1);
}

if (!fs.existsSync(imagePath)) {
  console.error(`❌ 文件不存在: ${imagePath}`);
  process.exit(1);
}

// Imgur 客户端ID（匿名上传，无需注册）
// 这是公开的客户端ID，用于匿名上传
const IMGUR_CLIENT_ID = '546c25a59c58ad7';

console.log('📤 正在上传图片到 Imgur...');

const imageData = fs.readFileSync(imagePath);
const base64Image = imageData.toString('base64');

const postData = JSON.stringify({
  image: base64Image,
  type: 'base64'
});

const options = {
  hostname: 'api.imgur.com',
  path: '/3/image',
  method: 'POST',
  headers: {
    'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      if (response.success && response.data) {
        const imageUrl = response.data.link;
        console.log('\n✅ 上传成功！');
        console.log('📷 图片URL:', imageUrl);
        console.log('\n请复制上面的URL，然后更新 Hero.tsx 中的图片路径。');
        console.log('\n或者运行以下命令自动更新:');
        console.log(`node update-hero-image.js "${imageUrl}"`);
      } else {
        console.error('❌ 上传失败:', response.data?.error || '未知错误');
        if (response.data?.error) {
          console.error('错误详情:', response.data.error);
        }
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ 解析响应失败:', error.message);
      console.error('响应内容:', data);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ 请求失败:', error.message);
  process.exit(1);
});

req.write(postData);
req.end();

