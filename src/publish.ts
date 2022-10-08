import { Config, Context } from 'semantic-release';
import { execSync } from 'child_process';

export async function publish(_: Config, { nextRelease, options, logger }: Context) {
  const { version } = nextRelease;

  // In case of pre-release, don't move tags
  if (version.includes('-')) {
    logger.log('Pre-release detected, skipping tag move');
    return;
  }

  const [majorNumber, minorNumber] = version.split('.').slice(0, 2);
  const commit = nextRelease.gitHead;
  const majorTag = options.tagFormat.replace('${version}', majorNumber);
  const minorTag = options.tagFormat.replace('${version}', `${majorNumber}.${minorNumber}`);

  logger.log(`Tagging commit ${commit} with ${majorTag} and ${minorTag}`);

  execSync(`git tag --force --message ${majorTag} ${majorTag} ${commit}`);
  execSync(`git tag --force --message ${minorTag} ${minorTag} ${commit}`);
  execSync(`git push origin ${majorTag} ${minorTag} --force`);
}
