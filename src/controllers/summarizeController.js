import OpenAI from "openai";

const openaiSummarize = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const summarize = async (req, res) => {
    const to_summarize = req.body.file ?? req.body.text;
    const percent = req.body.percent;
    const prompt = `Summarize the following text: ${to_summarize} to ${percent}% of its original length, only response with the resumen, dont include the original text.`;
    const completion = await openaiSummarize.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o",
    });
    return res.json({ summary: completion.choices[0].message.content });
};
