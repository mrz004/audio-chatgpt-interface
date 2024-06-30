import { OpenAI } from "openai";

const messages = [
  {
    role: "system",
    content:
      "You are a expert health consultant. Guide the user with his health issues. Suggest a good doctor if needed.",
  },
];
// const messages = [];

const openai = new OpenAI({
  apiKey: YOUR-API-KEY,
  dangerouslyAllowBrowser: true,
});

const askOpenAI = async (text) => {
  messages.push({ role: "user", content: text });
  // console.log(messages);
  // messages.push({ role: "user", message: text });
  try {
    const response = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    const generatedText = response?.choices[0]?.message?.content;
    messages.push({ role: "assistant", content: generatedText });
    // console.log(response);
    // console.log(generatedText);

    return generatedText;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "Error generating response.";
  }
};

export default askOpenAI;
