import { onHistoryBack } from '@nzyme/dom-utils';
import { createPromise } from '@nzyme/utils';
import { PickupPoint } from '@paczkoapi/client';

interface DhlMapMessage {
    sap: string;
    name: string;
    zip: string;
    city: string;
    street: string;
    streetNo: string;
    houseNo: string;
}

export async function openDhlMap() {
    const modal = document.createElement('paczkoapi-modal');
    const iframe = document.createElement('iframe');

    iframe.src = `https://parcelshop.dhl.pl/mapa?country=PL&city=Warszawa`;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    window.addEventListener('message', handleMessage);

    const { promise, resolve } = createPromise<PickupPoint | null>();

    modal.modalTitle = 'Wybierz punkt DHL POP';
    modal.appendChild(iframe);
    modal.addEventListener('close', () => resolve(null));

    const backHandle = onHistoryBack(() => resolve(null));

    document.body.appendChild(modal);

    promise.finally(() => {
        window.removeEventListener('message', handleMessage);
        document.body.removeChild(modal);
        backHandle.cancel();
    });

    return await promise;

    function handleMessage(event: MessageEvent) {
        if (event.source !== iframe.contentWindow) {
            return;
        }

        const point = parseMessage(event.data);
        if (point) {
            resolve(point);
        }
    }

    function parseMessage(message: DhlMapMessage | string): PickupPoint | null {
        if (typeof message === 'string') {
            message = JSON.parse(message) as DhlMapMessage;
        }

        if (!message.sap) {
            return null;
        }

        let address = message.street;

        if (message.streetNo && message.houseNo) {
            address += `${message.streetNo}/${message.houseNo}`;
        } else if (message.streetNo) {
            address += ` ${message.streetNo}`;
        }

        return {
            type: 'dhl',
            id: message.sap,
            name: message.name,
            address,
            city: message.city,
        };
    }
}
