+++
title = 'Quantum Optimization & Variational Algorithms'
description = 'QAOA, variational quantum eigensolvers, Hamiltonian engineering, adiabatic quantum computation, and the landscape mathematics of quantum optimization.'
domain = 'Quantum Optimization'
level = 'Advanced'
date = '2026-10-04'
topic_weight = 3
cover = '/images/course_lean4_proofs.jpg'
+++

## Course Overview

**Quantum Optimization & Variational Algorithms** formalizes optimization over quantum state space: QUBO and Ising formulations, parameterized quantum circuits, gradient estimation on quantum Hardware, and adiabatic pathways.

### Syllabus

1. **QAOA & Combinatorial Optimization**: MaxCut as an Ising Hamiltonian, alternating cost/mixer unitaries, and parameter optimization landscapes.
2. **Adiabatic Quantum Computing & Trotterization**: The adiabatic theorem, spectral gap scaling, and product-formula simulation of quantum evolution.

===READING===

## Cost Hamiltonian for MaxCut

For a graph $G = (V, E)$, MaxCut seeks $z \in \{\pm 1\}^{|V|}$ maximizing $\sum_{(i,j) \in E} (1 - z_i z_j)/2$, encoded in the cost Hamiltonian:

$$H_C = \sum_{(i,j) \in E} \frac{1}{2}(Z_i Z_j \cdot(-1) + I) \;=\; \sum_{(i,j)\in E} \frac{I - Z_i Z_j}{2}$$

QAOA prepares $|\gamma, \beta\rangle = \prod_{l=1}^{p} e^{-i\beta_l H_M} e^{-i\gamma_l H_C} |+\rangle^{\otimes n}$ with mixer $H_M = \sum_i X_i$ and classical optimization of $(\gamma, \beta)$.

```python
import numpy as np

def cut_expectation(gamma: float, beta: float, edges: list[tuple[int, int]], n: int) -> float:
    # Single-layer QAOA expected cut value under the standard triangle-free bound
    val = 0.0
    for (i, j) in edges:
        val += 0.5 * (1.0 - np.cos(4 * beta) * np.sin(2 * gamma) * np.sin(2 * gamma))
    return val
```
