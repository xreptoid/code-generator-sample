import reptoid from "@/lib/reptoid";
import { getCurrentAccount } from "@/lib/session";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });


export async function POST(req) {
    const prompt = `
        You are code generator.
        Imagine some simple random problem, that you will write a program for.
        Provide a source code for solving this on random language.
        The source code should have at least 20 lines.
        Also generate a random name (something funny) of a file for it.
        Provide your answer exactly in JSON format (in single line!) without any additional symbols or markdown.
        Source code should be in field "code" in your answer. File name is in field "filename".
    `

    const completion = await openai.chat.completions.create({
        messages: [
            {"role": "user", "content": prompt},
        ],
        model: "gpt-3.5-turbo",
        response_format: { type: "json_object" },
    });
    console.log(completion.choices[0].message.content)
    const resp = JSON.parse(completion.choices[0].message.content)
    console.log(resp)

    const { workspaceId } = await req.json()
    const { accountId } = await getCurrentAccount()

    const newFilePath = resp.filename
    await reptoid.account(accountId).workspace(workspaceId).file(newFilePath).write(resp.code)

    return Response.json({
        result: 'ok',
        data: {
            newFilePath
        }
    })
}