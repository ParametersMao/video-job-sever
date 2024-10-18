import type { ChatGPTAPIOptions } from 'chatgpt'
import { ChatGPTAPI } from 'chatgpt'
import { db } from '../models'

export function hasChinese(str: string) {
  const pattern = /[\u4E00-\u9FA5]/
  return pattern.test(str)
}

export async function requestChatGPT(prompts, systemMessage = '', parentMessageId = '', temperature = 0.8, model = 'gpt-3.5-turbo') {
  try {
    const options: ChatGPTAPIOptions = {
      apiKey: process.env.OPENAI_API_KEY,
      completionParams: { model },
    }
    options.maxModelTokens = 8192
    options.maxResponseTokens = 4096
    options.apiBaseUrl = `${process.env.OPENAI_API_BASE_URL}/v1`

    // setupProxy(options)
    const startTime = process.uptime() // 计时
    const api = new ChatGPTAPI({ ...options })
    const res = await api.sendMessage(
      prompts,
      {
        systemMessage,
        parentMessageId,
        timeoutMs: 20 * 1000, // 超时时间30秒
        completionParams: {
          model,
          temperature,
          top_p: 1,
          n: 3,
          frequency_penalty: 0.8,
          presence_penalty: 0.8,
        },
      },
    )
    // 记录聊天记录
    const endTime = process.uptime()
    const duration = endTime - startTime
    db.chat.create({
      uid: '',
      prompt: prompts,
      rsp: '',
      desc: '',
      duration,
    })
    return res
  }
  catch (e) {
    console.log('call chatgpt fail.', e)
    return prompts
  }
}

export async function translate(prompts) {
  if (prompts.length > 0 && hasChinese(prompts)) { // 含中文
    const res = await requestChatGPT(prompts, '将下面的非英文词组翻译成英文，要保持格式不变，保留英文、数字和标点符号等')
    return res?.text
  }
  else {
    return prompts
  }
}

// 野生动物、宠物、植物花卉、食物、自然景观、精美细节、建筑物、音乐乐器、纹理、科技元素、运动健身、神话传说、名车豪车、国家地区、节日庆典、宇宙星空等
// 自然景观：包括山脉、森林、海洋、湖泊等自然风光。建筑物：如城市景观、古建筑等。动物：如野生动物、宠物等。植物花卉：如植物、花卉等。
//   纹理：如石头、木头、纸张等。人物：如明星、运动员、历史人物等。精美细节：如植物、瓷器、珠宝等。漫画动漫：如卡通人物、漫画画面等。食物：如美食、水果、蔬菜等。音乐乐器：如吉他、钢琴等。
//   科技元素：如电路板、机器人等。运动健身：如跑步、瑜伽等。神话传说：如神仙、龙、凤等。名车豪车：如跑车、豪华轿车等。国家地区：如名胜古迹、地标建筑等。
//   节日庆典：如圣诞节、情人节、万圣节等。宇宙星空：浩瀚的宇宙和星空。等等
// 你可以选择包括但不限于以下艺术风格进行创作：sai-anime, artstyle-watercolor，chinese-ink-painting，sai-comic book，sai-line art，sai-neonpunk 等。
//  "style": "sai-anime"
export async function magicWallpaper(prompts = '') {
  return await requestChatGPT(prompts, `
  现在你是一个墙面挂画设计大师，能够创作深受用户喜爱的作品，请尽量使用具象描述，避免抽象描述，以便绘图软件识别。
  请注意，你输出的内容主要服务于一个绘画AI，它只能理解具象的描述而非抽象的概念，同时根据你对绘画AI的理解，比如它可能的训练模型、自然语言处理方式等方面，进行翻译优化。
  请使用我提供的主题，如未提供则随机使用包括但不限于以下主题或元素：野生动物、宠物、植物花卉、食物、自然景观、精美细节、建筑物、音乐乐器、纹理、科技元素、运动健身、神话传说、名车豪车、国家地区、节日庆典、宇宙星空等。
  你可以选择包括但不限于以下艺术风格进行创作：抽象画、风景画、城市景观画、黑白摄影、中国水墨、写实画、特色艺术等。
  现在请提供一些灵感，可以把你的想法和设计，使用一组关键词或短语来描述，以逗号分隔，用英文回答，并包含中文翻译。
  以 JSON 格式输出，其中 desc 字段必须为英文，desc_cn 字段必须为中文翻译，例如：
  {
    "title": "金色海岸",
    "desc": "Van Gogh, Oil painting. Golden sunset, Silhouette of palm trees, Serene beach scene, Calm ocean waves, Tropical paradise.",
    "desc_cn": "梵高，油画。金色的夕阳，棕榈树的剪影，宁静的海滩景色，平静的海浪，热带天堂"
  }
  返回结果不要包含任何冗余的字符或非法的 JSON 字符，否则应当重新生成
  `, 1)
  // return await requestChatGPT(prompts, `
  // 现在你是一个手机壁纸设计大师，能够创作深受用户喜爱的作品，请尽量使用具象描述，避免抽象描述，以便绘图软件识别。
  // 请注意，你输出的内容主要服务于一个绘画AI，它只能理解具象的描述而非抽象的概念，同时根据你对绘画AI的理解，比如它可能的训练模型、自然语言处理方式等方面，进行翻译优化。
  // 请使用我提供的主题，如未提供则随机使用包括但不限于以下主题或元素：野生动物、宠物、植物花卉、食物、自然景观、精美细节、建筑物、音乐乐器、纹理、科技元素、运动健身、神话传说、名车豪车、国家地区、节日庆典、宇宙星空等。
  // 你可以选择包括但不限于以下艺术风格进行创作：国家地理、漫画、水彩、油画、素描、连环画、卡通、插画、游戏、中国山水、中国水墨、中国工笔、中国写意、抽象艺术、赛博朋克等。
  // 可以模仿：毕加索、梵高、莫奈、达芬奇、张大千、邱莹、宫崎骏等大师的作品或自行创作。
  // 现在请提供一些灵感，可以把你的想法和设计，使用一组关键词或短语来描述，以逗号分隔，用英文回答，并包含中文翻译。
  // 以 JSON 格式输出，其中 desc 字段必须为英文，desc_cn 字段必须为中文翻译，例如：
  // {
  //   "title": "金色海岸",
  //   "desc": "Van Gogh, Oil painting. Golden sunset, Silhouette of palm trees, Serene beach scene, Calm ocean waves, Tropical paradise.",
  //   "desc_cn": "梵高，油画。金色的夕阳，棕榈树的剪影，宁静的海滩景色，平静的海浪，热带天堂"
  // }
  // 返回结果不要包含任何冗余的字符或非法的 JSON 字符，否则应当重新生成
  // `, 1)
}
