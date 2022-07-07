import { Config, Context } from 'semantic-release';
import resolveConfig from './lib/resolve-config';
import { Octokit } from '@octokit/core';
import parseGithubUrl from './lib/parse-github-url';

export async function prepare(_: Config, context: Context) {
  const { githubToken, tagFormat, repositoryUrl } = resolveConfig(context);
  const { nextRelease, logger } = context;
  const [major] = nextRelease.version.split('.');
  const sha = nextRelease.gitHead;
  const finalTag = tagFormat.replace('${version}', major);
  const ref = `tags/${finalTag}`;
  const octokit = new Octokit({ auth: githubToken });
  const { owner, repo } = parseGithubUrl(repositoryUrl);

  try {
    await octokit.request('GET /repos/{owner}/{repo}/git/ref/{ref}', {
      owner,
      repo,
      ref,
    });

    logger.log(`Tag ${finalTag} already exists, updating it.`);

    await octokit.request('PATCH /repos/{owner}/{repo}/git/refs/{ref}', {
      owner,
      repo,
      ref,
      sha,
      force: true,
    });

    logger.log(`Updated tag ${finalTag} to point to ${sha}`);
  } catch (error: any) {
    if (error.status !== 404) throw error;

    logger.log(`Tag ${finalTag} does not exist, creating it.`);

    await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
      owner,
      repo,
      sha,
      ref: `refs/${ref}`,
    });

    logger.log(`Created tag ${finalTag} on ${sha}`);
  }
}
