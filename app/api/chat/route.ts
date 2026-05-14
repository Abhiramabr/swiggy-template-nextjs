import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// We will initialize it inside the handler to ensure env variables are loaded.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Please set your GEMINI_API_KEY in the .env.local file.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Format ALL messages for the Gemini API
    const contents = messages.map((msg: any) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: "You are a helpful customer support assistant for Swiggy, a food delivery application. Help users with their questions about food, delivery, restaurant recommendations, and their orders in a friendly and concise manner.",
      }
    });

    return NextResponse.json({
      role: 'ai',
      content: response.text,
    });
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    
    // Provide a helpful error message if API key is missing
    if (error.message && error.message.includes('API key not valid') || error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Please set your GEMINI_API_KEY in the .env.local file.' },
          { status: 500 }
        );
    }

    return NextResponse.json(
      { error: 'An error occurred while generating a response.' },
      { status: 500 }
    );
  }
}
