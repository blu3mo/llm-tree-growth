import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const { parents, criteria } = await request.json();
  const prompt = `
${parents.map(({ title, abstract }) => `# Prior Related Works\n Title: ${title}\nAbstract: ${abstract}\n`).join('\n')}
# Task
Generate a new research paper title and abstract. Get inspiration from the research of the given papers, but make sure to clearly state your novelty and contributions.

Then, as a harsh reviewer, evaluate the generated title and abstract based on the following criteria:
${criteria}

Provide a critical, harsh yet valid evaluation comment and a evaluation score (0-100).

Return the response in the following JSON format:
{
  "title": "...",
  "abstract": "...",
  "evaluation": {
    "comments": "...",
    "score": int from 0 to 100. Make 50 the default average score.
  }
}
`;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      response_format: { "type": "json_object" },
    });

    const generatedText = response.data.choices[0].message.content;
    const generatedJson = JSON.parse(generatedText);
    console.log(generatedJson);

    return NextResponse.json({
        title: generatedJson.title,
        abstract: generatedJson.abstract,
        score: (generatedJson.evaluation.score / 100.0) || 0.5,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate paper' }, { status: 500 });
  }
}