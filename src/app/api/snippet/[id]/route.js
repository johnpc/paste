import { decryptSnippet } from '@/lib/crypt'
import { NextResponse } from 'next/server'
import { Amplify } from "aws-amplify";
import config from "../../../../../amplifyconfiguration.json";
import { generateClient } from "aws-amplify/api";

Amplify.configure(config);
const client = generateClient();

/**
 * Retrieves a snippet by ID from the database and returns it as a JSON response.
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} The response object containing the snippet data as JSON.
 */
export async function GET(request, context) {
  const id = context.params.id

  const foundSnippet = await client.models.Snippet.get({id});
  const response = foundSnippet.data;

  let snippet = null

  if (response) {
    const expireDate = new Date(Date.now() + response.expire.value * 1000)
    if (response.expire.value !== 0 && expireDate < new Date()) {
      // Delete the expired snippet
      await client.models.Snippet.delete({id});
      snippet = {
        expired: true
      }
    } else {
      snippet = {
        expire: response.expire,
        language: response.language,
        title: response.title,
        code: decryptSnippet(response.code, response.iv)
      }
    }
  }

  return NextResponse.json(snippet)
}
