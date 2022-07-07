import { Context } from 'semantic-release';

export default ({ env, options }: Context) => ({
  githubToken: env.GH_TOKEN || env.GITHUB_TOKEN,
  tagFormat: options.tagFormat,
  repositoryUrl: options.repositoryUrl,
});
