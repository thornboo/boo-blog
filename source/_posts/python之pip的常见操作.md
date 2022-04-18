---
title: python之pip的常见操作
date: 2022-04-18 21:20:26
tags: python
---

### 一、pip切换镜像源

1. 临时切换（加上 -i 即可）： **`pip install 包名 -i`** https://pypi.tuna.tsinghua.edu.cn/simple

2. 永久切换（全局修改）：找到 `pip.exe` 程序所在的文件夹目录并进入，创建 `pip.ini` 文件并在 `pip.ini` 文件中输入以下内容：

```
[global]

index-url = https://pypi.tuna.tsinghua.edu.cn/simple

[install]

trusted-host = pypi.tuna.tsinghua.edu.cn
```

### 二、pip常用命令

1. 查看配置信息： **`pip config list`**
2. 查看已安装的包： **`pip list`**
3. 拉取指定版本： **`pip install 包名 = 版本号`**
4. pip更新升级： **`python -m pip install --upgrade pip`**
5. 显示包所在的目录： **`pip show -f <包名>`**
6. 查询可升级的包： **`pip list -o`**
