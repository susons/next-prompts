import Prompt from "@models/prompt";
import { connectToDb } from "@utils/db";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();

    const prompt = await Prompt.findById(params.id);
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompt", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDb();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDb();

    const existingPrompt = await Prompt.findByIdAndRemove(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};
