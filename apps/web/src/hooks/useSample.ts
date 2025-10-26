import { useState } from "react";

export function useSample() {
    const [count, setCount] = useState(0);
    const increment = () => setCount((c) => c + 1);
    return { count, increment };
}
