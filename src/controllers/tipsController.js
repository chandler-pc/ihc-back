import OpenAI from "openai";

const openaiTips = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const tips = async (req, res) => {
    const prompt = `Return only an inspiring message that can motivate someone who is studying or doing homework, the message can be about physical or emotional health, in Spanish.`;
    const completion = await openaiTips.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4o",
    });
    return res.json({ tip: completion.choices[0].message.content });
};

const phrase = async (req, res) => {
    const prompt = `Return only an inspiring and motivate famous phrase in Spanish.`;
    const completion = await openaiTips.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4o",
    });
    return res.json({ phrase: completion.choices[0].message.content });
}

export { tips, phrase };
