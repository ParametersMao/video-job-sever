#!/bin/bash

# 将场景图片重命名、压缩、上传cdn并输出配置文件
# 输入:
#    imageDir: 原始图片主目录,包含子目录，每个子目录对应一个场景
#    startID: 场景编号起始值,比如之前的场景id是tpl_10，则场景编号起始值为11，startID则为11
#    uploadCDN: 是否为上传cdn的图片名称, 0-不是, 1-是。生成压缩图选1，生成原图选0

# access_key="tbSGaQZQY59EoNnALEBB5ykNeNk1PdzQO7qIKVxs"
# secret_key="Vcn0lJilqPndmcTGX38w7rFtBlD8zCwlOYcUOgE9"
# name="Default"
if [ $# -ne 3 ]; then
        echo "Usage $0 imageDir startID uploadCDN"
        exit
fi

dir=$1
id=$2

ls ${dir}|while read file; do
    number=$(echo "${file}" | sed 's/\(^[0-9.]*\).*/\1/')
    text=$(echo "${file}" | sed 's/^[0-9.]*\(.*\)/\1/')
    converted_number=$(echo "$number" | awk -F '.' '{ printf "%d.%02d", $1, $2 }')
    newname="${converted_number}${text}"
    if [ "$file" != "$newname" ]; then
      mv ${dir}/${file} ${dir}/${newname}
    fi
done

ls ${dir}|while read file; do
        # 重命名目录
        newname=$(echo "${file}" | sed 's/[0-9.]//g'| sed 's/ //g')

if [ $3 == 1 ]; then
        cat << EOF
        {
        id: 'tpl_${id}',
        title: '${newname}',
        children: [
EOF
fi

        suffix=0
        ls ${dir}/${file}|while read f; do
                let suffix+=1
                new_name="${newname}_${suffix}.png"
                cdn_name="tpl-${id}-${suffix}.png"

                # 原图重名为 哈利波特_1.jpg 哈利波特_2.jpg
                if [ $3 == 0 ]; then 
                  if [ "${f}" != "${new_name}" ]; then
                      mv ${dir}/${file}/${f} ${dir}/${file}/${new_name}
                  fi
                fi

                # 压缩图重名为 tpl-1-1.jpg tpl-1-2.jpg
                if [ $3 == 1 ]; then 
                  if [ "${f}" != "${cdn_name}" ]; then
                      mv ${dir}/${file}/${f} ${dir}/${file}/${cdn_name}
                  fi
                   
                fi
                if [ $3 == 1 ]; then
                cat << EOF
                {
                url: 'https://cdn.growingth.com/pic-upload/${cdn_name}',
                },
EOF
fi
        done

if [ $3 == 1 ]; then
        cat << EOF
                ],
        },
EOF
fi 
let id+=1
done