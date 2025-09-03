// api/feed.js
/**
 * 处理HTTP请求的函数
 * @param {Object} req - HTTP请求对象，包含请求方法、body等信息
 * @param {Object} res - HTTP响应对象，用于发送响应数据
 * @returns {void}
 */
export default function handler(req, res) {
  // 只处理POST请求
  if (req.method === 'POST') {
    const { key } = req.body;

    // 验证请求密钥，如果密钥不匹配则返回403未授权错误
    if (key !== 'your-secret-key') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // 记录接收到feed命令的时间
    console.log('Feed command received at:', new Date().toISOString());

    // 返回成功响应
    return res.status(200).json({ success: true, message: 'Feeding started' });
  }

  // 对于非POST请求，返回405方法不允许错误
  res.status(405).end();
}