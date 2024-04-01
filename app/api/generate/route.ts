import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generatePaper(parents: { title: string; abstract: string }[]) {
  const prompt = `
${parents.map(({ title, abstract }) => `# Prior Related Works\n Title: ${title}\nAbstract: ${abstract}\n`).join('\n')}
# Task
Generate a new research paper title and abstract. Get inspiration from the research of the given papers, but make sure to clearly state your novelty and contributions.

Return the response in the following JSON format:
{
  "title": "...",
  "abstract": "..."
}
`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    response_format: { "type": "json_object" },
  });

  const generatedText = response.data.choices[0].message.content;
  return JSON.parse(generatedText);
}

async function evaluatePaper(paper: { title: string; abstract: string }, criteria: string) {
  const prompt = `
# Generated Paper
Title: ${paper.title}
Abstract: ${paper.abstract}

# Task
As a harsh reviewer, evaluate the generated title and abstract based on the following criteria:
${criteria}

Provide a critical, harsh yet valid evaluation comment and a evaluation score (0-100).

Return the response in the following JSON format:
{
  "comments": "...",
  "score": int from 0 to 100. Make 50 the default average score.
}
`;

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    response_format: { "type": "json_object" },
  });

  const generatedText = response.data.choices[0].message.content;
  return JSON.parse(generatedText);
}

export async function POST(request: Request) {
  const { parents, criteria } = await request.json();

  try {
    const generatedPaper = await generatePaper(parents);
    const evaluation = await evaluatePaper(generatedPaper, criteria);

    return NextResponse.json({
      title: generatedPaper.title,
      abstract: generatedPaper.abstract,
      score: (evaluation.score / 100.0) || 0.5,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate and evaluate paper' }, { status: 500 });
  }
}