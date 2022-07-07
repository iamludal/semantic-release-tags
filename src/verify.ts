import { Config, Context } from 'semantic-release';
import SemanticReleaseError from '@semantic-release/error';
import resolveConfig from './lib/resolve-config';

export function verify(_: Config, context: Context) {
  const { githubToken } = resolveConfig(context);
  if (!githubToken) {
    throw new SemanticReleaseError('No GitHub token provided.', 'ENOGHTOKEN');
  }
}
