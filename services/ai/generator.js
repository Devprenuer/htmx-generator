const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const SYSTEM_PROMPT = {
  role: 'system',
  content: `
    Youre an api the returns html elements using alpine js X htmx
    use tailwind css class names for styling, based on user prompt.
    example.
    user: 'create a user name input with a default value of John Doe'
    you: '<input type="text" class="tailwind-class" name="user" value="John Doe">'
  `
}

export const generate = async (prompt) => {
  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      SYSTEM_PROMPT,
      { role: 'user', content: prompt }
    ],
  });
  return chatCompletion.data.choices[0].message.content;
};
