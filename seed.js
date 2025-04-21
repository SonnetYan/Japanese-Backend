const mongoose = require('mongoose');
require('dotenv').config();

// 导入模型
const Vocabulary = require('./models/Vocabulary');

// 连接到MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/japanese-learning-app')
  .then(() => console.log('MongoDB 连接成功'))
  .catch(err => {
    console.error('MongoDB 连接失败:', err);
    process.exit(1);
  });

// 示例词汇数据
const vocabularyData = [
  {
    kanji: '水',
    kana: 'みず',
    meaning: 'water',
    examples: [
      {
        japanese: '水を飲みます',
        english: 'I drink water'
      },
      {
        japanese: '水が冷たいです',
        english: 'The water is cold'
      }
    ],
    tags: ['名詞', 'N5', '自然']
  },
  {
    kanji: '食べる',
    kana: 'たべる',
    meaning: 'to eat',
    examples: [
      {
        japanese: '朝ごはんを食べます',
        english: 'I eat breakfast'
      },
      {
        japanese: '私は寿司を食べるのが好きです',
        english: 'I like to eat sushi'
      }
    ],
    tags: ['動詞', 'N5', '日常']
  },
  {
    kanji: '猫',
    kana: 'ねこ',
    meaning: 'cat',
    examples: [
      {
        japanese: '猫が好きです',
        english: 'I like cats'
      },
      {
        japanese: '彼は猫を飼っています',
        english: 'He has a cat'
      }
    ],
    tags: ['名詞', 'N5', '動物']
  },
  {
    kanji: '学校',
    kana: 'がっこう',
    meaning: 'school',
    examples: [
      {
        japanese: '学校に行きます',
        english: 'I go to school'
      },
      {
        japanese: '学校は9時に始まります',
        english: 'School starts at 9 o\'clock'
      }
    ],
    tags: ['名詞', 'N5', '場所']
  },
  {
    kanji: '美しい',
    kana: 'うつくしい',
    meaning: 'beautiful',
    examples: [
      {
        japanese: '富士山は美しいです',
        english: 'Mount Fuji is beautiful'
      },
      {
        japanese: '彼女は美しい歌を歌います',
        english: 'She sings a beautiful song'
      }
    ],
    tags: ['形容詞', 'N4', '描写']
  },
  {
    kanji: '行く',
    kana: 'いく',
    meaning: 'to go',
    examples: [
      {
        japanese: '東京に行きます',
        english: 'I go to Tokyo'
      },
      {
        japanese: '明日学校に行きますか',
        english: 'Are you going to school tomorrow?'
      }
    ],
    tags: ['動詞', 'N5', '移動']
  },
  {
    kanji: '友達',
    kana: 'ともだち',
    meaning: 'friend',
    examples: [
      {
        japanese: '彼は私の友達です',
        english: 'He is my friend'
      },
      {
        japanese: '友達と映画を見ました',
        english: 'I watched a movie with my friend'
      }
    ],
    tags: ['名詞', 'N5', '人間関係']
  },
  {
    kanji: '時間',
    kana: 'じかん',
    meaning: 'time',
    examples: [
      {
        japanese: '時間がありません',
        english: 'I don\'t have time'
      },
      {
        japanese: '時間を守ってください',
        english: 'Please be on time'
      }
    ],
    tags: ['名詞', 'N5', '抽象']
  },
  {
    kanji: '大きい',
    kana: 'おおきい',
    meaning: 'big',
    examples: [
      {
        japanese: 'これは大きい家です',
        english: 'This is a big house'
      },
      {
        japanese: '彼は大きい犬を飼っています',
        english: 'He has a big dog'
      }
    ],
    tags: ['形容詞', 'N5', '描写']
  },
  {
    kanji: '見る',
    kana: 'みる',
    meaning: 'to see; to watch',
    examples: [
      {
        japanese: 'テレビを見ます',
        english: 'I watch TV'
      },
      {
        japanese: '富士山を見たことがあります',
        english: 'I have seen Mount Fuji'
      }
    ],
    tags: ['動詞', 'N5', '感覚']
  }
];

// 清除旧数据并添加新数据
async function seedDatabase() {
  try {
    // 清除现有数据
    await Vocabulary.deleteMany({});
    console.log('已清除旧数据');

    // 插入新数据
    const result = await Vocabulary.insertMany(vocabularyData);
    console.log(`成功添加 ${result.length} 个词汇`);
    
    // 显示添加的词汇ID，方便测试
    console.log('\n添加的词汇ID:');
    result.forEach(word => {
      console.log(`- ${word.kanji || word.kana} (${word.meaning}): ${word._id}`);
    });
    
    console.log('\n现在可以使用这些ID测试API了，例如:');
    console.log(`GET http://localhost:5000/api/vocabulary/${result[0]._id}`);
    
    // 断开数据库连接
    mongoose.connection.close();
    console.log('数据库连接已关闭');
  } catch (error) {
    console.error('添加种子数据失败:', error);
    mongoose.connection.close();
  }
}

// 运行种子函数
seedDatabase(); 