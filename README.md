# semantic-release-tags

[![npm latest version](https://img.shields.io/npm/v/semantic-release-tags/latest.svg)](https://www.npmjs.com/package/semantic-release-tags)

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to update `major`
and `minor` tags up when a new release is created.


| Step      | Description                      |
| --------- | -------------------------------- |
| `success` | Update `major` and `minor` tags. |


## Usage

### Installation

```bash
$ npm install --save-dev semantic-release-tags
$ yarn add --dev semantic-release-tags
```

### Configuration

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/git",
    "@semantic-release/github"
    "semantic-release-tags"
  ]
}
```
