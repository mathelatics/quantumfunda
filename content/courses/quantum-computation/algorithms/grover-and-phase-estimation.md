+++
date = '2026-10-04'
title = 'Grover Amplitude Amplification & Phase Estimation'
difficulty = 'hard'
language = 'python'
topic_weight = 2
subtopic_weight = 2
weight = 2
description = 'Geometric picture of Grover iteration, O(sqrt(N)) query complexity, and quantum phase estimation via the QFT.'
+++

## Problem Statement

Given an oracle $O_w$ marking a unique solution $|w\rangle$ in an $N$-dimensional search space, **Grover's algorithm** rotates the uniform superposition toward $|w\rangle$. Starting from

$$|s\rangle = \frac{1}{\sqrt{N}} \sum_{x=0}^{N-1} |x\rangle, \qquad \sin\theta = \frac{1}{\sqrt{N}}$$

a single Grover iterate is the reflection composition $G = (2|s\rangle\langle s| - I)(I - 2|w\rangle\langle w|)$, and after $k$ iterations the success amplitude is $\sin((2k+1)\theta)$. Choosing $k \approx \frac{\pi}{4\theta} \approx \frac{\pi}{4}\sqrt{N}$ yields quadratic speedup over classical search.

```python
import numpy as np

def grover_success_probability(N: int, k: int) -> float:
    theta = np.arcsin(1.0 / np.sqrt(N))
    return np.sin((2 * k + 1) * theta) ** 2
```

===EXPLANATION===

## The Geometry of Inversion About the Mean

Write the uniform superposition in the two-dimensional plane spanned by the marked state $|w\rangle$ and the uniform superposition of non-marked states $|s'\rangle$. Each oracle reflection flips the sign of $|w\rangle$'s amplitude, and the diffusion operator $2|s\rangle\langle s| - I$ reflects about $|s\rangle$. The composition is a rotation by $2\theta$ in this plane:

$$G = R_s(2\theta) \quad \text{where } \sin\theta = \langle w | s \rangle = \frac{1}{\sqrt{N}}$$

After $k$ iterations the overlap with the marked state is $\sin((2k+1)\theta)$, maximized near $(2k+1)\theta = \pi/2$, i.e. $k \approx \pi\sqrt{N}/4$ iterations, reaching success probability near 1 with **query complexity** $\Theta(\sqrt{N})$—and the BBBV lower bound proves this is optimal up to constants.

## Quantum Phase Estimation

For a unitary $U$ with eigenstate $U|u\rangle = e^{2\pi i \phi}|u\rangle$, **phase estimation** encodes $\phi$ into an ancilla register via controlled-$U^{2^j}$ operations followed by an inverse QFT, extracting $\phi$ to $m$ bits with $m$ ancilla qubits and $\mathcal{O}(2^m)$ controlled gates.

===READING===

## A Tiny Grover Simulation in Python

```python
import numpy as np

def simulate_grover(N: int, marked: int, iterations: int) -> np.ndarray:
    s = np.ones(N, dtype=complex) / np.sqrt(N)
    oracle_sign = np.ones(N); oracle_sign[marked] = -1.0
    state = s.copy()
    for _ in range(iterations):
        state = oracle_sign * state              # oracle reflection
        mean = np.mean(state)
        state = 2 * mean - state                 # diffusion (inversion about mean)
    return np.abs(state) ** 2
```

===CODE===

```python
def grover_success_probability(N: int, k: int) -> float:
    theta = np.arcsin(1.0 / np.sqrt(N))
    return np.sin((2 * k + 1) * theta) ** 2
```

===QUIZ===

## After $k$ Grover iterations on $N$ items with one marked element, the success probability is approximately:
- [ ] $1 - e^{-k/N}$
- [x] $\sin^2((2k+1)\theta)$, $\sin\theta = 1/\sqrt{N}$
- [ ] $k/N$
- [ ] $1 - (1 - 1/N)^k$
Correct: B
Explanation: Each Grover iterate rotates the state by $2\theta$ toward the marked state, giving amplitude $\sin((2k+1)\theta)$.

## How many Grover iterations are needed to find one marked item among $N$ with high probability?
- [ ] $\mathcal{O}(N)$
- [ ] $\mathcal{O}(\log N)$
- [x] $\mathcal{O}(\sqrt{N})$
- [ ] $\mathcal{O}(N^2)$
Correct: C
Explanation: The optimal choice is $k \approx \frac{\pi}{4}\sqrt{N}$ iterations.
