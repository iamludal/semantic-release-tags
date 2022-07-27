import { Config, Context } from 'semantic-release';
import { execSync } from 'child_process';

export async function publish(_: Config, { nextRelease, options }: Context) {
  const major = nextRelease.version.split('.')[0];
  const commit = nextRelease.gitHead;
  const finalTag = options.tagFormat.replace('${version}', major);
  execSync(`git tag --force --message ${finalTag} ${finalTag} ${commit}`);
  execSync(`git push origin ${finalTag} --force`);
}
