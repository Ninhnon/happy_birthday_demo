import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const messagesFilePath = path.join(
  process.cwd(),
  "src",
  "data",
  "messages.json"
);

// Helper function to read messages from file
const readMessages = async () => {
  try {
    const data = await fs.readFile(messagesFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading messages:", error);
    // If file doesn't exist, return empty array
    return [];
  }
};

// Helper function to write messages to file
const writeMessages = async (messages: unknown[]) => {
  await fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2));
};

// GET /api/messages
export async function GET() {
  try {
    const messages = await readMessages();

    // Sort messages by timestamp (newest first)
    const sortedMessages = messages.sort(
      (
        a: { timestamp: string | number | Date },
        b: { timestamp: string | number | Date }
      ) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json(sortedMessages);
  } catch (error) {
    console.error("Error reading messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST /api/messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    const messages = await readMessages();

    const newMessage = {
      id: messages.length + 1,
      name: name.trim(),
      message: message.trim(),
      time: "Just now",
      avatar: name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase(),
      timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);
    await writeMessages(messages);

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}
