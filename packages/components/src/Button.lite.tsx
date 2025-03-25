import { useState } from '@builder.io/mitosis';

export default function Button(props: { onClick?: () => void }) {
    const [count, setCount] = useState(0);

    return <button onClick={() => setCount(count + 1)}>Click me {count}</button>;
}
