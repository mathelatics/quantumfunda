+++
date = '2026-10-04'
title = 'Hilbert Spaces, State Vectors & the Born Rule'
difficulty = 'medium'
language = 'python'
topic_weight = 1
subtopic_weight = 1
weight = 1
description = 'Qubit state vectors in C^2, inner products, normalization, Born rule measurement, and the geometry of the Bloch sphere.'
+++

## Problem Statement

A single qubit is modeled by a unit vector in the two-dimensional complex Hilbert space $\mathcal{H} = \mathbb{C}^2$:

$$|\psi\rangle = \alpha |0\rangle + \beta |1\rangle, \qquad \alpha, \beta \in \mathbb{C}, \quad |\alpha|^2 + |\beta|^2 = 1$$

Measuring in the computational basis yields outcomes $0$ and $1$ with **Born rule** probabilities $p(0) = |\alpha|^2$ and $p(1) = |\beta|^2$. Writing $\alpha = \cos\frac{\theta}{2}$, $\beta = e^{i\phi}\sin\frac{\theta}{2}$ parametrizes the state on the **Bloch sphere** $S^2$.

```python
import numpy as np

def qubit_state(theta: float, phi: float) -> np.ndarray:
    alpha = np.cos(theta / 2.0)
    beta = np.exp(1j * phi) * np.sin(theta / 2.0)
    return np.array([alpha, beta], dtype=complex)

def measurement_probabilities(psi: np.ndarray) -> np.ndarray:
    return np.abs(psi) ** 2
```

===EXPLANATION===

## Hilbert Space Structure and Inner Products

The space $\mathbb{C}^2$ is equipped with the complex inner product $\langle \phi | \psi \rangle = \sum_i \bar{\phi}_i \psi_i$, inducing the norm $\|\psi\| = \sqrt{\langle \psi | \psi \rangle}$. Two states are **orthogonal** iff $\langle \phi | \psi \rangle = 0$, and global phase is physically unobservable: $|\psi\rangle \equiv e^{i\gamma}|\psi\rangle$.

For a projective measurement with projectors $\{P_i\}$, $P_i P_j = \delta_{ij} P_i$ and $\sum_i P_i = I$, the Born rule reads:

$$p(i) = \langle \psi | P_i | \psi \rangle, \qquad |\psi\rangle \mapsto \frac{P_i |\psi\rangle}{\sqrt{p(i)}}$$

The **Bloch sphere** arises because any normalized qubit state, modulo global phase, is determined by two real angles $(\theta, \phi) \in [0, \pi] \times [0, 2\pi)$, and mixed states are described by density operators $\rho$ with $\operatorname{Tr}(\rho) = 1$, $\rho \succeq 0$, sitting in the closed unit ball of Hermitian trace-one operators.

===READING===

## Density Operators and Bloch Vectors in Python

A mixed state with ensemble $\{(p_k, |\psi_k\rangle)\}$ has density operator $\rho = \sum_k p_k |\psi_k\rangle\langle\psi_k|$, and any qubit density operator decomposes as $\rho = \frac{1}{2}(I + \vec{r} \cdot \vec{\sigma})$ with Bloch vector $\|\vec{r}\| \le 1$:

```python
import numpy as np

PAULI_X = np.array([[0, 1], [1, 0]], dtype=complex)
PAULI_Y = np.array([[0, -1j], [1j, 0]], dtype=complex)
PAULI_Z = np.array([[1, 0], [0, -1]], dtype=complex)

def density_operator(ensemble: list[tuple[float, np.ndarray]]) -> np.ndarray:
    rho = np.zeros((2, 2), dtype=complex)
    for p, psi in ensemble:
        psi = psi / np.linalg.norm(psi)
        rho += p * np.outer(psi, psi.conj())
    return rho

def bloch_vector(rho: np.ndarray) -> np.ndarray:
    return np.array([
        np.real(np.trace(rho @ PAULI_X)),
        np.real(np.trace(rho @ PAULI_Y)),
        np.real(np.trace(rho @ PAULI_Z)),
    ])
```

===CODE===

```python
import numpy as np

def qubit_state(theta: float, phi: float) -> np.ndarray:
    alpha = np.cos(theta / 2.0)
    beta = np.exp(1j * phi) * np.sin(theta / 2.0)
    return np.array([alpha, beta], dtype=complex)
```

===QUIZ===

## Which condition must a qubit state vector $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$ satisfy to be physically valid?
- [ ] $|\alpha| + |\beta| = 1$
- [x] $|\alpha|^2 + |\beta|^2 = 1$
- [ ] $\alpha + \beta = 1$
- [ ] $|\alpha|^2 - |\beta|^2 = 1$
Correct: B
Explanation: Normalization requires $\langle \psi | \psi \rangle = |\alpha|^2 + |\beta|^2 = 1$ so that measurement probabilities sum to one.

## For a density operator $\rho = \frac{1}{2}(I + \vec{r}\cdot\vec{\sigma})$, which property characterizes a pure state?
- [ ] $\|\vec{r}\| = 0$
- [ ] $\operatorname{Tr}(\rho) = 2$
- [x] $\|\vec{r}\| = 1$ (equivalently $\rho^2 = \rho$)
- [ ] $\det(\rho) = 1$
Correct: C
Explanation: Pure states lie on the Bloch sphere boundary $\|\vec r\| = 1$ and satisfy $\rho^2 = \rho$; mixed states have $\|\vec r\| < 1$.
