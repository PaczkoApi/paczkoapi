import { imports, jsdoc, typescript } from '@nzyme/eslint';
import mitosisPlugin from '@builder.io/mitosis';

export default [
    //
    mitosisPlugin.configs.recommended,
    ...typescript({ project: ['./tsconfig.json', './tsconfig.tests.json'] }),
    ...jsdoc(),
    ...imports(),
];
