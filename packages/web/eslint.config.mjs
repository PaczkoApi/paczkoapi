import { imports, packageJson, typescript } from '@nzyme/eslint';

export default [
    //
    ...typescript({
        project: ['./tsconfig.json', './tsconfig.node.json'],
    }),
    ...imports(),
    ...packageJson(),
];
