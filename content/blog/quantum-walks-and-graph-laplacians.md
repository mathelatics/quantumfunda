+++
title = 'Quantum Walks on Graphs: Quantum Laplacian Dynamics & Search'
date = '2026-10-02'
domain = 'Quantum Computation'
author = 'Quantum Funda Research'
description = 'From the classical graph Laplacian to the continuous-time quantum walk Hamiltonian, and its O(√N) hitting-time advantage on graphs.'
cover = '/images/blog_spectral_graph_laplacian.jpg'
+++

Given an undirected weighted graph $G = (V, E, w)$ with $|V| = n$, its **combinatorial graph Laplacian** is the symmetric positive semidefinite matrix $L \in \mathbb{R}^{n \times n}$:

$$L = D - A, \qquad D_{ii} = \sum_{j=1}^n A_{ij}$$

For any real vector $x \in \mathbb{R}^n$, the quadratic form measures total squared variation across edges:

$$x^\top L x = \sum_{\{i,j\} \in E} w_{ij}(x_i - x_j)^2 \ge 0$$

## From Classical Random Walks to Quantum Walks

The classical continuous-time random walk on $G$ evolves a probability vector by $\frac{d}{dt} p(t) = -L p(t)$, a dissipative heat equation. The **continuous-time quantum walk** instead promotes $-L$ to a Hamiltonian and evolves by the Schrödinger equation:

$$i\frac{d}{dt} |\psi(t)\rangle = -L\, |\psi(t)\rangle \quad\Longrightarrow\quad |\psi(t)\rangle = e^{iLt} |\psi(0)\rangle$$

Because $L$ is real symmetric, $e^{iLt}$ is unitary: probability is coherently redistributed rather than diffused, and amplitude interference can produce quadratically faster hitting times. Childs et al. showed a continuous-time quantum walk on a specially constructed graph exponentially outperforms any classical algorithm.

## Spectral Gap and Transport

Ordering the Laplacian eigenvalues $0 = \lambda_1 \le \lambda_2 \le \dots \le \lambda_n$, the Fiedler value $\lambda_2$ controls classical mixing. Quantum transport is governed instead by the phases $e^{i\lambda_k t}$; commensurate gaps enable perfect state transfer between vertices, e.g. on the path graph $P_n$ at times $t = \pi/2$.

```python
import numpy as np
from scipy.linalg import expm

def quantum_walk_evolution(L: np.ndarray, t: float, psi0: np.ndarray) -> np.ndarray:
    return expm(1j * L * t) @ psi0
```
