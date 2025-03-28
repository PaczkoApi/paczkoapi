import { imports, packageJson, typescript } from '@nzyme/eslint';

export default [
    //
    ...typescript(),
    ...imports(),
    ...packageJson(),
];
