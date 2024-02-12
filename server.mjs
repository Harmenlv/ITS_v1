import cors from 'cors';
import express from 'express';

import { pipeline } from '@xenova/transformers';
// const generator = await pipeline('text-generation', 'Xenova/distilgpt2');
const generator = await pipeline('text2text-generation', 'Xenova/LaMini-T5-61M');
const app = express();

// 或者，可以只允许来自特定源的CORS请求
// app.use(cors({ origin: 'http://localhost:8080' }));

// ... 其他的中间件和路由处理器 ...
// 启用所有CORS请求
// app.use(cors());
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json()); // 用于解析JSON格式的请求体

app.post('/submit_content', async (req, res) => { // 添加async关键字
    // console.log(req);
    console.log(req.body);
    const text_content = req.body.text_content; // 假设请求体中有一个text字段
    console.log(`text_content: ${text_content}`);
    if (typeof text_content !== 'string') {
        res.status(400).json({ message: "Invalid input" });
    }
    else
    {
        try {

            // const output = await generator(text_content, { // 使用text_content作为输入
            //   temperature: 2,
            //   max_new_tokens: 10,
            //   repetition_penalty: 1.5,
            //   no_repeat_ngram_size: 2,
            //   num_beams: 2,
            //   num_return_sequences: 2,
            // });

            const output = await generator(text_content, {
                max_new_tokens: 200,
              });
            console.log(output);
    
            res.json({ message: output, status: "success" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error", status: "error" });
        }
    }

});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});