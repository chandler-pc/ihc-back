import OpenAI from "openai";

const opeanAISearch = new OpenAI(process.env.OPENAI_API_KEY);

const search = async (req, res) => {
    const url = new URL("https://api.bing.microsoft.com/v7.0/search");
    url.searchParams.append('q', req.query.q);
    url.searchParams.append('count', 10);

    const bingResponse = await fetch(url, {
        method: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY
        }
    });

    const bingResults = await bingResponse.json();

    const prompt = `Response on spanish. The following is a list of the top 10 search results for the query
    ${req.query.q} on Bing: You need to parse this and return the results maybe explaining
    the title and the link. ${JSON.stringify(bingResults)}`;
    const completion = await opeanAISearch.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-4o",
    });

    return res.json({ searchResults: completion.choices[0].message.content });
};

export { search };