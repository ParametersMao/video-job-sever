#!/bin/bash
cd /data/rich  # 项目根目录，根据实际情况修改
pnpm build
pnpm migrate:up
pnpm i

# 检查 appServer 服务是否已经在运行,应用名称根据实际情况修改
pm2 list | grep s > /dev/null
if [ $? -ne 0 ]; then
    # 如果 appServer 服务未运行，则启动它
    pm2 start ./build/index.mjs --name appServer
else
    # 如果 appServer 服务已经在运行，则重启它
    pm2 restart appServer
fi

pm2 logs appServer
