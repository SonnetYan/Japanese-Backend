const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const vocabularyRoutes = require('./routes/vocabulary');
const userProgressRoutes = require('./routes/userProgress');

const app = express();
const PORT = process.env.PORT || 5001;

// 自定义CORS中间件，不使用cors包
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // 处理preflight请求
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 中间件
app.use(bodyParser.json());
app.use(express.json());

// 连接到 MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Atlas connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// 路由
app.use('/api/vocabulary', vocabularyRoutes);
app.use('/api/progress', userProgressRoutes);

// 首页路由
app.get('/', (req, res) => {
  res.send('Japanese Learning App API');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 