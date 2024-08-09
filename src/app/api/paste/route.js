import { encryptSnippet } from "@/lib/crypt";
import { NextResponse } from "next/server";
import { Amplify } from "aws-amplify";
import config from "../../../../amplify_outputs.json";
import { generateClient } from "aws-amplify/api";

Amplify.configure(config);
const client = generateClient();

/**
 * Handles POST requests to create a new encrypted code snippet.
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - The response object containing the encrypted code snippet.
 */
export async function POST(request) {
  const { title, code, expire, language } = await request.json();

  const encrypted = encryptSnippet(code);

  const encryptedCode = {
    title,
    code: encrypted.encryptedText,
    iv: encrypted.iv,
    expire: expire.value,
    language: language.value,
  };

  console.log({ encryptedCode });

  const createdSnippet = await client.models.Snippet.create(encryptedCode);
  console.log({ createdSnippet, errors: createdSnippet.errors });
  const response = createdSnippet.data;

  // Build the URL
  const url = new URL(process.env.BASE_URL ?? request.headers.get("referer"));
  url.pathname = `/snippet/${response.id}`;
  console.log({ url: url.toString() });
  return NextResponse.json({
    url: url.toString(),
  });
}
