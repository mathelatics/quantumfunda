+++
date = '2026-10-04'
title = 'Adiabatic Quantum Computing & Trotter–Suzuki Simulation'
difficulty = 'hard'
language = 'python'
topic_weight = 3
subtopic_weight = 2
weight = 2
description = 'The adiabatic theorem, minimum spectral gaps, QUBO-to-Ising embeddings, and first-/second-order product formulas for Hamiltonian simulation.'
+++

## Problem Statement

**Adiabatic quantum computation** encodes a problem's solution in the ground state of a final Hamiltonian $H_P$ and interpolates from an easily prepared initial Hamiltonian $H_I$:

$$H(s) = (1 - s)\, H_I + s\, H_P, \qquad s = t/T \in [0, 1]$$

The **adiabatic theorem** guarantees that slowly varying evolution keeps the system in its instantaneous ground state provided

$$T \gg \frac{\max_s \|\partial_s H(s)\|}{g_{\min}^2}, \qquad g_{\min} = \min_{s \in [0,1]} \big(E_1(s) - E_0(s)\big)$$

while simulating the unitary $U(T) = \mathcal{T}\exp\big(-i\int_0^T H(t)\,dt\big)$ on a gate-based machine uses **Trotter–Suzuki** product formulas.

```python
import numpy as np

def trotter_step(HI: np.ndarray, HP: np.ndarray, s: float, dt: float) -> np.ndarray:
    from scipy.linalg import expm
    H = (1 - s) * HI + s * HP
    # First-order Trotter: split H = (1-s)HI + sHP
    return expm(-1j * (1 - s) * HI * dt) @ expm(-1j * s * HP * dt)
```

===EXPLANATION===

## Spectral Gaps and Computational Complexity

The adiabatic schedule's runtime is dominated by the **minimum instantaneous gap** $g_{\min}$. For unstructured search of $N$ items, naive linear interpolation gives $g_{\min} \sim 1/\sqrt{N}$ and hence $T \sim N$; an optimized **Roland–Cerf local schedule** $s(t)$ with $ds/dt \propto g(s)^2 / \|\partial_s H\|$ recovers $T = \mathcal{O}(\sqrt{N})$, matching Grover.

For digital simulation, the **first-order Lie–Trotter formula**

$$e^{-i(A + B)\tau} = e^{-iA\tau} e^{-iB\tau} + \mathcal{O}(\tau^2)$$

and the **second-order Strang splitting** $e^{-iA\tau/2} e^{-iB\tau} e^{-iA\tau/2} = e^{-i(A+B)\tau} + \mathcal{O}(\tau^3)$ trade per-step error against the number of digitized steps $r = T/\tau$. For $k$-sparse Hamiltonians the Taylorization/LCU construction achieves gate complexity $\tilde{\mathcal{O}}(\|H\|_{\max} T)$, exponentially improving on naive Trotter bounds in $1/\epsilon$.

===READING===

## Second-Order Strang Splitting Simulation

```python
import numpy as np
from scipy.linalg import expm

def strang_evolve(HI: np.ndarray, HP: np.ndarray, T: float, steps: int, psi0: np.ndarray) -> np.ndarray:
    dt = T / steps
    psi = psi0.copy()
    for k in range(steps):
        s = (k + 0.5) / steps
        HI_w = (1 - s) * HI
        HP_w = s * HP
        psi = expm(-1j * HI_w * dt / 2) @ expm(-1j * HP_w * dt) @ expm(-1j * HI_w * dt / 2) @ psi
    return psi
```

===CODE===

```python
def trotter_step(HI: np.ndarray, HP: np.ndarray, s: float, dt: float) -> np.ndarray:
    from scipy.linalg import expm
    return expm(-1j * (1 - s) * HI * dt) @ expm(-1j * s * HP * dt)
```

===QUIZ===

## The adiabatic algorithm's runtime scales inversely with which quantity?
- [ ] The number of qubits only
- [x] The square of the minimum spectral gap $g_{\min}^2$
- [ ] The norm of the initial state
- [ ] The temperature
Correct: B
Explanation: The adiabatic condition requires $T \gg \|\partial_s H\| / g_{\min}^2$; a closing gap demands longer runtime.

## The second-order Strang splitting approximates $e^{-i(A+B)\tau}$ with local error:
- [ ] $\mathcal{O}(\tau)$
- [ ] $\mathcal{O}(\tau^2)$
- [x] $\mathcal{O}(\tau^3)$
- [ ] $\mathcal{O}(\tau^4)$
Correct: C
Explanation: Strang splitting $e^{-iA\tau/2}e^{-iB\tau}e^{-iA\tau/2}$ cancels the second-order error term, leaving $\mathcal{O}(\tau^3)$ per step.
