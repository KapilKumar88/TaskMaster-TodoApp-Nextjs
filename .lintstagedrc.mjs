import path from 'path';

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

const lintStagedConfig = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{js,jsx,ts,tsx,css,scss}': ['prettier --write'],
};

export default lintStagedConfig;
