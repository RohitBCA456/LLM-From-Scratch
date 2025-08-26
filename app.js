import express from "express";
import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Check if API key is configured
if (!process.env.GOOGLE_API_KEY) {
  console.error("GOOGLE_API_KEY is not set in environment variables");
  process.exit(1);
}

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0,
  apiKey: process.env.GOOGLE_API_KEY,
});

app.post("/translate", async (req, res) => {
  try {
    const { text, targetLanguage = "Italian" } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // Create the system instruction
    const systemTemplate = `Translate the following from English into {language}`;

    // Create the prompt template
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["user", "{text}"],
    ]);

    // Fill the template with the actual text
    const promptValue = await promptTemplate.invoke({
      language: targetLanguage,
      text: text,
    });

    console.log("Prompt Value:", promptValue.toChatMessages());

    // Call the LLM with the prompt value
    const response = await model.invoke(promptValue);

    res.json({
      original: text,
      translated: response.content,
      targetLanguage,
    });
  } catch (error) {
    console.error("LLM Error:", error);
    res
      .status(500)
      .json({ error: "Failed to process translation", details: error.message });
  }
});

// Simple test route
app.get("/test", async (req, res) => {
  try {
    const messages = [
      new SystemMessage(
        "You are a helpful assistant. Respond with 'Hello from LLM!'"
      ),
      new HumanMessage("Say hello"),
    ];

    const response = await model.invoke(messages);
    //     const stream = await model.stream(messages);

    //     const chunks = [];
    //     for await (const chunk of stream) {
    //       chunks.push(chunk);
    //       console.log(`${chunk.content}|`);
    //     }
    res.json({ message: response.content });
  } catch (error) {
    console.error("Test Error:", error);
    res
      .status(500)
      .json({ error: "Failed to test LLM", details: error.message });
  }
});

export { app };
