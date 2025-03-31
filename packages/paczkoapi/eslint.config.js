import { imports, jsdoc, packageJson, typescript } from '@nzyme/eslint';

export default [
    //
    ...typescript({ project: ['./tsconfig.json'] }),
    ...jsdoc(),
    ...imports(),
    ...packageJson(),
];
