import type { PickupPoint } from '@paczkoapi/client';
import { mapInpostPoint } from '@paczkoapi/common';

import type { InpostPointData } from '@nzyme/apis/inpost';
import { loadScript, loadStyles, onHistoryBack } from '@nzyme/dom-utils';
import { assertValue, createPromise } from '@nzyme/utils';

interface EasyPackApi {
    init(params: EasyPackInitParams): void;
    mapWidget(element: string, callback: (point: InpostPointData) => void): void;
}

interface EasyPackInitParams {
    map: {
        defaultLocation?: [number, number];
    };
    display: {
        showTypesFilters?: boolean;
    };
}

export async function openInpostMap(location?: { latitude: number; longitude: number }) {
    const modal = document.createElement('paczkoapi-modal');
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    const { promise, resolve } = createPromise<PickupPoint | null>();

    modal.modalTitle = 'Wybierz Paczkomat InPost';
    modal.appendChild(iframe);
    modal.addEventListener('close', () => resolve(null));

    const backHandle = onHistoryBack(() => resolve(null));

    document.body.appendChild(modal);

    const iframeDocument = assertValue(iframe.contentDocument);
    const iframeWindow = assertValue(iframe.contentWindow) as Window & { easyPack: EasyPackApi };

    const viewport = iframeDocument.createElement('meta');
    viewport.name = 'viewport';
    viewport.content = 'width=device-width,initial-scale=1,minimum-scale=1';
    iframeDocument.head.appendChild(viewport);
    iframeDocument.body.style.margin = '0';
    iframeDocument.body.style.overflow = 'hidden';

    const inpostMap = document.createElement('div');
    inpostMap.id = 'inpost-map';
    inpostMap.style.width = '100%';
    inpostMap.style.height = '100vh';

    iframeDocument.body.appendChild(inpostMap);

    await Promise.all([
        loadStyles('https://geowidget.easypack24.net/css/easypack.css', {
            document: iframeDocument,
        }),
        loadScript('https://geowidget.easypack24.net/js/sdk-for-javascript.js', {
            document: iframeDocument,
        }),
    ]);

    iframeWindow.easyPack.init({
        map: location ? { defaultLocation: [location.latitude, location.longitude] } : {},
        display: {
            // Filters take a lot of space on mobile
            showTypesFilters: false,
        },
    });

    iframeWindow.easyPack.mapWidget(inpostMap.id, point => {
        resolve(mapInpostPoint(point));
    });

    void promise.finally(() => {
        document.body.removeChild(modal);
        backHandle.cancel();
    });

    return await promise;
}
