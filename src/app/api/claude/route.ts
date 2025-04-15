import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    
    // Handle direct Anthropic API format if provided
    if (requestData.messages) {
      // Get API key from environment variables
      const apiKey = process.env.ANTHROPIC_API_KEY || process.env.NEXT_PUBLIC_CLAUDE_API_KEY;
      
      if (!apiKey) {
        return NextResponse.json(
          { error: 'Claude API key not configured. Please set ANTHROPIC_API_KEY environment variable.' },
          { status: 500 }
        );
      }
      
      // Initialize Anthropic client
      const anthropic = new Anthropic({
        apiKey,
      });
      
      // Use the request body as is for direct API pass-through
      const response = await anthropic.messages.create({
        model: requestData.model || 'claude-3-5-sonnet-20240620',
        max_tokens: requestData.max_tokens || 1500,
        temperature: requestData.temperature || 0.2,
        messages: requestData.messages,
        system: requestData.system
      });
      
      // Return the entire Claude response
      return NextResponse.json(response);
    }
    // Handle legacy format with prompt
    else if (requestData.prompt) {
      const { prompt } = requestData;
      
      // Get API key from environment variables
      const apiKey = process.env.ANTHROPIC_API_KEY || process.env.NEXT_PUBLIC_CLAUDE_API_KEY;
      
      if (!apiKey) {
        return NextResponse.json(
          { error: 'Claude API key not configured. Please set ANTHROPIC_API_KEY environment variable.' },
          { status: 500 }
        );
      }
      
      // Initialize Anthropic client
      const anthropic = new Anthropic({
        apiKey,
      });
      
      // Make API call to Claude with a simple system prompt
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1500,
        temperature: 0.2,
        system: `
          You are an AI assistant helping with a heavy construction materials quote request system. 
          You are DIRECT and EFFICIENT - you ask only the most essential questions needed for a construction materials quote without any tangential inquiries. 
          You MUST always respond in valid JSON format according to the structure specified in the user's prompt.`,
        messages: [{ role: 'user', content: prompt }]
      });
      
      // Return Claude's response in legacy format
      return NextResponse.json({
        text: response.content[0].text
      });
    }
    else {
      return NextResponse.json(
        { error: 'Invalid request format. Please provide either messages array or prompt.' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Error calling Claude API:', error);
    
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}