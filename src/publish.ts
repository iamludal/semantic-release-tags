import { Config, Context } from 'semantic-release';
import { execSync } from 'child_process';

export async function publish(_: Config, { nextRelease, options }: Context) {
  const [majorNumber, minorNumber] = nextRelease.version.split('.').slice(0, 2);
  const commit = nextRelease.gitHead;
  const majorTag = options.tagFormat.replace('${version}', majorNumber);
  const minorTag = options.tagFormat.replace('${version}', `${majorNumber}.${minorNumber}`);
  execSync(`git tag --force --message ${majorTag} ${majorTag} ${commit}`);
  execSync(`git tag --force --message ${minorTag} ${minorTag} ${commit}`);
  execSync(`git push origin ${majorTag} ${minorTag} --force`);
}
