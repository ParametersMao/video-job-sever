#!/bin/bash

cd /data/rich # 项目根目录，根据实际情况修改
pnpm build
pnpm migrate:up
pnpm i
pm2 start ./build/index.mjs --name appServer # 启动 appServer 服务
pm2 logs appServer
