import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const { parents } = await request.json();
  const prompt = parents.map(({ title, abstract }) => `Title: ${title}\nAbstract: ${abstract}\n`).join('\n') + "\nGenerate a new research paper title and abstract. Get inspired by the research of the given papers, and include new contributions.:";

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const generatedText = response.data.choices[0].message.content;
    console.log(generatedText);
    const [newTitle, newAbstract] = generatedText.split('\n').filter(Boolean).map((line) => line.replace(/^(Title|Abstract):\s*/, ''));
    return NextResponse.json({ title: newTitle, abstract: newAbstract });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate paper' }, { status: 500 });
  }
}