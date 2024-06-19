import OpenAI from "openai";

let openaiChat = null;

const startChat = async (req, res) => {
    openaiChat = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `You are Pow Zen a meditation guide, that help
    persons to study and make another activities, you are a guide for them,
    you can help them to study, to do homework, to do exercise, to meditate,
    and you can give them tips and advices, you can also chat with them,
    you need to start with a message that introduce you to the user, with this
    example 'Hola! Soy Pow Zen, te ayudaré con el equilibrio necesario para estudiar. Consulta lo que quieras',
    you need to speak on Spanish and not sent to long messages.`;
    const completion = await openaiChat.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4o",
    });
    return res.json({ message: completion.choices[0].message.content });
};

const chat = async (req, res) => {
    const message = req.body.message;
    const completion = await openaiChat.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-4o",
    });
    return res.json({ message: completion.choices[0].message.content });
}

export { startChat, chat };