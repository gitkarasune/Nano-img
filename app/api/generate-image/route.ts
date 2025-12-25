import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenRouter API key is not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://img-nano.vercel.app', // Optional: for OpenRouter rankings
        'X-Title': 'Img Nano', // Optional: for OpenRouter rankings
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        modalities: ['image', 'text'],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate image', details: errorData },
        { status: response.status }
      );
    }

    const result = await response.json();

    // Extract image URL from the response
    // Based on the user provided example:
    // result.choices[0].message.images[0].image_url.url

    let imageUrl = null;
    if (result.choices && result.choices.length > 0) {
      const message = result.choices[0].message;
      if (message.images && message.images.length > 0) {
        imageUrl = message.images[0].image_url.url;
      }
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image generated in response' },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl });

  } catch (error) {
    console.error('Error in generate-image route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
