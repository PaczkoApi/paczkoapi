import { onUpdate, useState } from '@builder.io/mitosis';

export interface Option {
    id: string;
    name: string;
    address: string;
    distance: string;
    price?: string;
    value: string;
}

interface Address {
    street: string;
    city: string;
    country: string;
}

interface PointSelectorProps {
    address: Address;
    value?: string;
    onChange?: (value: string) => void;
    classPrefix?: string;
    disabled?: boolean;
    'aria-label'?: string;
    'aria-describedby'?: string;
}

export default function PointSelector(props: PointSelectorProps) {
    const [options, setOptions] = useState([] as Option[]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Simulate fetching options based on address
    onUpdate(() => fetchOptions(), [props.address]);

    if (loading) {
        return (
            <div
                className={className('radio-loading')}
                role="status"
            >
                <div className={className('spinner')} />
                <span className="sr-only">Loading pickup points...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div
                role="alert"
                className={className('radio-error')}
            >
                {error}
            </div>
        );
    }

    return (
        <div
            className={className('radio-group')}
            role="radiogroup"
            aria-label={props['aria-label']}
            aria-describedby={props['aria-describedby']}
        >
            {options.map(option => {
                return (
                    <label
                        key={option.id}
                        className={className('radio-option')}
                    >
                        <input
                            type="radio"
                            value={option.value}
                            checked={props.value === option.value}
                            onChange={value => props.onChange?.(value.target.value)}
                            className={className('radio-input')}
                        />
                        <span className={className('radio-control')} />
                        <div className={className('radio-content')}>
                            <div className={className('radio-details')}>
                                <span className={className('radio-name')}>{option.name}</span>
                                <span className={className('radio-address')}>{option.address}</span>
                                <span className={className('radio-distance')}>
                                    {option.distance}
                                </span>
                            </div>
                            {option.price && (
                                <span className={className('radio-price')}>{option.price}</span>
                            )}
                        </div>
                    </label>
                );
            })}
        </div>
    );

    function className(name: string) {
        return `${props.classPrefix || 'papi'}-${name}`;
    }

    async function fetchOptions() {
        setLoading(true);
        setError(null);

        try {
            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulated response based on address
            const mockOptions: Option[] = [
                {
                    id: '1',
                    name: 'Central Post Office',
                    address: `Near ${props.address.street}`,
                    distance: '0.8 km away',
                    price: '€2.99',
                    value: 'central-post',
                },
                {
                    id: '2',
                    name: 'Shopping Mall Pickup',
                    address: `${props.address.city} Mall, Floor 1`,
                    distance: '1.2 km away',
                    price: '€3.99',
                    value: 'mall',
                },
                {
                    id: '3',
                    name: 'Local Store',
                    address: `${props.address.street} Corner Store`,
                    distance: '0.3 km away',
                    value: 'local-store',
                },
            ];

            setOptions(mockOptions);
        } catch (err) {
            setError('Failed to fetch options');
        } finally {
            setLoading(false);
        }
    }
}
