import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    return NextResponse.json({
      configured: false,
      error: "Missing GITHUB_USERNAME",
    });
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "FybreWorks-Site",
    };

    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=public`,
      {
        cache: "no-store",
        headers,
      },
    );

    if (!res.ok) {
      return NextResponse.json({
        configured: false,
        error: `GitHub API error: ${res.status} ${res.statusText}`,
      });
    }

    const repos = await res.json();

    // Filter out forks if desired, but for now include all public repos
    const filteredRepos = repos.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      html_url: repo.html_url,
      updated_at: repo.updated_at,
      stargazers_count: repo.stargazers_count,
      fork: repo.fork,
    }));

    return NextResponse.json({
      configured: true,
      repos: filteredRepos,
    });
  } catch (err) {
    return NextResponse.json({
      configured: false,
      error: `Fetch error: ${err}`,
    });
  }
}
