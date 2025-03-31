import type { JSX as StencilJSX, VNode } from '@stencil/core';
import type { FunctionalUtilities } from '@stencil/core/internal';

// https://github.com/stenciljs/core/issues/5306#issuecomment-1924152084

declare module '@stencil/core' {
    export namespace h.JSX {
        type Element = VNode;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface FunctionalComponent<T = {}> {
        (props: T, children: VNode[], utils: FunctionalUtilities): VNode;
    }
}

declare namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntrinsicElements extends StencilJSX.IntrinsicElements {}
}
