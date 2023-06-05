import Prompt from "@models/prompt";
import { connectToDb } from "@utils/db";

export const GET = async (req, res) => {
  try {
    await connectToDb();
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompts", { status: 500 });
  }
};
