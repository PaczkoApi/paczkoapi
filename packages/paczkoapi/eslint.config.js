import { imports, jsdoc, packageJson, typescript } from '@nzyme/eslint';

export default [
    //
    ...typescript({ project: ['./tsconfig.json', './tsconfig.node.json'] }),
    ...jsdoc(),
    ...imports(),
    ...packageJson(),
];
