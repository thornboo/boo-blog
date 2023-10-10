---
title: 【RocketMQ】RocketMQ存储结构设计 - shanml - 博客园
date: '2023-10-10 09:45:17'
updated: '2023-10-10 09:58:09'
permalink: /post/rocketmq-rocketmq-storage-structure-design-shanml-blog-park-zmavt4.html
comments: true
toc: true
---



# 【RocketMQ】RocketMQ存储结构设计 - shanml - 博客园

---

* [https://www.cnblogs.com/shanml/p/17703297.html](https://www.cnblogs.com/shanml/p/17703297.html)
* CommitLog 生产者向Broker发送的消息，会以顺序写的方式，写入CommitLog文件，CommitLog文件的根目录由配置参数storePathRootDir决定，默认每一个CommitLog的文件大小为1G，如果文件写满会新建一个CommitLog文件，以该文件中第一条消息的偏移量为文
* 2023-10-10 09:45:17

---

### CommitLog

　　生产者向Broker发送的消息，会以顺序写的方式，写入CommitLog文件，CommitLog文件的根目录由配置参数storePathRootDir决定，默认每一个CommitLog的文件大小为1G，如果文件写满会新建一个CommitLog文件，以该文件中第一条消息的偏移量为文件名，小于20位用0补齐：  
​![](assets/net-img-2612945-20230914193652163-372047212-20231010094517-s89cpqh.png)  
比如第一个文件中第一条消息的偏移量为0，那么第一个文件的名称为00000000000000000000，当这个文件存满之后，需要重新建立一个CommitLog文件，一个文件大小为1G，  
1GB = 1024*1024*1024 = 1073741824 Bytes，所以下一个文件就会被命名为00000000001073741824。

#### 数据格式

　　CommitLog中存储的每条消息的数据格式如下：

* 消息总长度，占4个字节；
* 魔数，占4个字节；
* 消息体CRC校验和，占4个字节；
* 队列ID，占4个字节；
* 标识，占4个字节；
* 队列的偏移量，占8个字节；
* 消息在文件的物理偏移量，占8个字节；
* 系统标识，占4个字节；
* 发送消息的时间戳，占8个字节；
* 发送消息的主机地址，占8个字节；
* 存储时间戳，占8个字节；
* 存储消息的主机地址，占8个字节；
* 消息的重试次数，占4个字节；
* 事务相关偏移量，占8个字节；
* 消息内容的长度，占4个字节；
* 消息内容，由于消息内容不固定，所以长度不固定；
* 主题名称的长度，占1个字节；
* 主题名称内容，长度不固定；
* 消息属性长度，占2个字节；
* 消息属性内容，长度不固定；

　　​![](assets/net-img-2612945-20231008072516949-1033589554-20231010094517-3nuyt4f.png)​

　　RocketMQ一般会保存一个物理偏移量offSet，从CommitLog中获取消息内容。

### ConsumeQueue

　　RocketMQ在消息存储的时候将消息顺序写入CommitLog文件，如果想根据Topic对消息进行查找，需要扫描所有CommitLog文件，这种方式性能低下，所以RocketMQ又设计了ConsumeQueue存储消息的逻辑偏移量，offset逻辑偏移量从0开始编号，进行递增，消息写入CommitLog以后，会构建对应的 ConsumeQueue文件。  
在RocketMQ的存储文件目录下，有一个consumequeue文件夹，里面按Topic分组，每个Topic一个文件夹，Topic文件夹内是该Topic的所有消息队列，以消息队列ID命名文件夹，每个消息队列都有自己对应的ConsumeQueue文件：  
​![](assets/net-img-2612945-20230914193845640-1021183829-20231010094518-hrjdooy.png)​

　　ConsumeQueue中存储的每条数据大小是固定的，总共20个字节，数据格式如下：  
​![](assets/net-img-2612945-20230914193804963-1569934890-20231010094518-r753hyn.png)​

* 消息在CommitLog文件的偏移量，占用8个字节；
* 消息大小，占用4个字节；
* 消息Tag的hashcode值，用于tag过滤，占用8个字节；

　　​![](assets/net-img-2612945-20230914193926546-2070261772-20231010094518-cpwx1h9.png)​

　　**消费进度**  
消费者在拉取消息进行消费的时候，就是通过这个ConsumeQueue实现的，消费者在向Broker发送消息拉取请求之前，需要知道应该从哪条消息开始消费，对于广播模式，消息的消费进度保存在消费者端本地，对于集群模式，消息的消费进度保存在Broker中，所以拉取某个消息队列的消息之前，会向Broker发送请求，获取该消息队列的消费进度，消费进度在RocketMQ的存储目录中有一个对应的文件，叫`consumerOffset.json`​，里面的offsetTable中保存了每个消息队列的消费进度，这个消费进度值对应的就是ConsumeQueue中的逻辑偏移量，它由定时任务定时进行持久化：

```json
{
	"offsetTable":{
		"TestTopic@TestTopicGroup":{ // 主题名称@消费者组名称
            0:0, // 每个消息队列对应的消费进度，Key中的0表示队列0，value中的0表示消息在ConsumeQueue中的逻辑偏移量
            1:1,
            2:1,
            3:0  
		}
	}
}
```

　　拿到消息队列对应的消费进度时，就可以根据这个值从Broker拉取消息，Broker收到请求后，会根据这个值从ConsumeQueue中获取此条消息在CommitLog中的物理偏移量，根据物理偏移量再从CommitLog中获取消息内容返回给消费者。

　　​![](assets/net-img-2612945-20231004120013724-695219800-20231010094518-wsxnokn.png)​

　　总结

　　**当消息写入CommitLog之后会构建对应的ConsumeQueue文件，每个消息队列MessageQueue都会有一个对应的ConsumeQueue文件，ConsumeQueue文件中的offset记录的是消息的逻辑索引，从0开始编号进行递增，比如存入了3条消息，那么对应的offset分别为0、1、2，消费者在消费的时候拿到的消费进度就是这个offset，然后根据offset从ConsumeQueue文件中获取数据，里面记录了消息在CommitLog文件中的物理偏移量，之后就可以从CommitLog中获取消息内容。**

　　**消费者消费完毕之后，会保存这个消费进度，对于集群模式，消费进度会保存在Borker端，Broker会定时将消费进度进行持久化，如果消费者刚启动的时候，会向Broker发起请求获取之前记录的消费进度。**

### IndexFile

　　为了便于消息查找，RocketMQ还设计了IndexFile，支持根据Key对消息进行查找，在发送消息的时候可以设置一个唯一Keys值，用于标识这条消息，之后就可以根据这个Keys值对消息进行查找。

> Keys: 服务器会根据 keys 创建哈希索引，设置后，可以在 Console 系统根据 Topic、Keys 来查询消息，由于是哈希索引，请尽可能保证 key 唯一，例如订单号，商品 Id 等。

```java
   Message msg = new Message(topic, RandomUtils.getStringByUUID().getBytes());
   // 订单Id
   String orderId = "20034568923546";
   msg.setKeys(orderId);
```

#### IndexFile文件结构

　　每个indexFile文件的大小是固定的，一个IndexFile文件大约可以保存2000W个消息的索引，IndexFile的文件结构如下：  
​![](assets/net-img-2612945-20230914193955264-893081424-20231010094518-irv0ib5.png)​

　　**IndexHeader**  
index header记录indexFile文件的整体信息，占40个字节，有以下信息：  
​![](assets/net-img-2612945-20230914194033788-1306920799-20231010094518-a3xj55l.png)​

* beginTimestamp：当前indexFile文件中第一条消息的存储时间；
* endTimestamp：当前indexFile文件中最后一条消息存储时间；
* beginPhyoffset：当前indexFile文件中第一条消息在Commitlog中的偏移量；
* endPhyoffset：当前indexFile文件中最后一条消息在commitlog中的偏移量；
* hashSlotCount：已经使用的hash槽的个数；
* indexCount：索引项中记录的所有消息索引总数；

　　**hash slot**  
RocketMQ在每个IndexFile文件中划分了500W个hash槽，在向文件中添加消息索引的时候，会取出消息的Keys（实际会使用Topic + "#" + key进行拼装做为IndexFile文件的Key）计算hash值，然后对hash槽总数取余，来判断应该放到哪个hash槽。

　　**index item**  
索引项中记录每个Key的索引信息，有以下部分组成：  
​![](assets/net-img-2612945-20230914194050605-222613465-20231010094519-hfltf50.png)​

* keyHash：消息的key计算出来的的hashcode值，
* phyOffset：消息在CommitLog中的物理偏移量；
* timeDiff：消息的存储时间减去IndexHeader中的beginTimestamp（当前indexFile文件中第一条消息的存储时间）；
* preIndexNo：当哈希冲突的时候，用于指向上一个索引，可以看做当哈希冲突的时候，使用一个链表将该哈希槽下的所有元素串起来，使用头插法增加新的元素；

　　**消息索引添加**  
举个例子，比如现在有一条消息，它的Key值1，假设哈希槽的个数为10，这里对哈希计算简化，直接用1对哈希槽个数取余，得到值为0，那么这条消息将落入哈希槽0的位置，然后会在索引项区域建立该消息的索引信息：  
​![](assets/net-img-2612945-20230914194116293-785640873-20231010094519-lhthz17.png)​

　　如果新增一条消息2，它的Key值为2，用2对哈希槽个数取余，依旧得到哈希槽0，此时产生哈希冲突，将哈希槽0处存储的值改为消息2的索引项，并将消息2索引项中的preIndexNo指向消息1的索引项，形成一个链表：  
​![](assets/net-img-2612945-20230914194126167-364022403-20231010094519-ubn7e03.png)​

　　**参考**  
[孤翁-进阶篇 RocketMQ 原理之key查询](https://juejin.cn/post/7068808709254119431)  
[迟钝先生-RocketMQ的Index File](https://www.cnblogs.com/roylee666/p/15766236.html)
