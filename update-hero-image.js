#!/usr/bin/env node

/**
 * 自动更新 Hero.tsx 中的图片URL
 * 使用方法: node update-hero-image.js <图片URL>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageUrl = process.argv[2];

if (!imageUrl) {
  console.error('❌ 请提供图片URL');
  console.log('使用方法: node update-hero-image.js <图片URL>');
  process.exit(1);
}

const heroPath = path.join(__dirname, 'components', 'Hero.tsx');

if (!fs.existsSync(heroPath)) {
  console.error(`❌ 文件不存在: ${heroPath}`);
  process.exit(1);
}

let content = fs.readFileSync(heroPath, 'utf8');

// 替换图片URL
// 匹配 src="/images/portrait.jpg" 或任何其他本地路径
const oldPattern = /src=["']([^"']+)["']/;
const newSrc = `src="${imageUrl}"`;

if (oldPattern.test(content)) {
  content = content.replace(oldPattern, newSrc);
  fs.writeFileSync(heroPath, content, 'utf8');
  console.log('✅ 已更新 Hero.tsx 中的图片URL');
  console.log(`📷 新URL: ${imageUrl}`);
} else {
  // 如果没找到，尝试查找 img 标签
  const imgPattern = /<img\s+([^>]*src=["'])([^"']+)(["'][^>]*)>/;
  if (imgPattern.test(content)) {
    content = content.replace(imgPattern, (match, before, oldSrc, after) => {
      return `<img ${before}${imageUrl}${after}>`;
    });
    fs.writeFileSync(heroPath, content, 'utf8');
    console.log('✅ 已更新 Hero.tsx 中的图片URL');
    console.log(`📷 新URL: ${imageUrl}`);
  } else {
    console.error('❌ 无法找到图片标签，请手动更新');
    process.exit(1);
  }
}

