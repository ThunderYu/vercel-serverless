import type { VercelRequest, VercelResponse } from "@vercel/node";
import { simpleGit } from "simple-git";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { repo } = request.query;
  if (!repo) {
    return response.end(`Error! no repo parameter`);
  }
  if (typeof repo === "string" && !repo.endsWith(".git")) {
    return response.end(`Error! repo not ends with '.git'`);
  }
  if (Array.isArray(repo)) {
    return response.end(`Error! repo should not be an array`);
  }

  try {
    await simpleGit().clone(repo, {
      "--depth": 1,
    });
  } catch (e) {
    console.error(e);
    return response.end(`Error! ${repo} clone failed`);
  }

  return response.end(`${repo} clone success!`);
}
