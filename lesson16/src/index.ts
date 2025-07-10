const re = /\p{L}+/usg;
const rnd = Math.random();
const rnd1= Math.round(1.2);
const rnd3 = Math.random();
console.log(rnd);


type BenchmarkResult = {
    50: number;
    90: number;
    95: number;
    99: number;
    avg: number;
};

function $benchmark(func: (...args: any[]) => any, args: any[], repeats: number, warmingRepeats: number): BenchmarkResult {
    // Warm-up phase
    for (let i = 0; i < warmingRepeats; i++) {
        func(...args);
    }

    // Measure performance
    const durations: number[] = [];

    for (let i = 0; i < repeats; i++) {
        const start = performance.now();
        func(...args);
        const end = performance.now();
        durations.push(end - start);
    }

    // Sort durations for percentile calculation
    durations.sort((a, b) => a - b);

    // Calculate percentiles using linear interpolation
    const getPercentile = (percentile: number): number => {
        const index = (percentile / 100) * (repeats - 1);
        const floored = Math.floor(index);
        const ceiling = Math.ceil(index);

        if (floored === ceiling) {
            return durations[floored];
        }

        const fraction = index - floored;
        return durations[floored] + fraction * (durations[ceiling] - durations[floored]);
    };

    // Return benchmark results
    return {
        50: getPercentile(50),
        90: getPercentile(90),
        95: getPercentile(95),
        99: getPercentile(99),
        avg: durations.reduce((sum, duration) => sum + duration, 0) / durations.length
    };
}

// Example usage
const result = $benchmark!(
    (a: number, b: number) => {
        let sum = 0;

        for (let i = 0; i < 1_000_000; i++) {
            sum += a * b;
        }

        return sum;
    },
    [100, 200], // Arguments for the test function
    100,       // Number of benchmark iterations
    10         // Number of warm-up iterations
);

// {50, 90, 95, 99, avg}
console.log(`Performance result: ${JSON.stringify(result, null, 2)}`);
