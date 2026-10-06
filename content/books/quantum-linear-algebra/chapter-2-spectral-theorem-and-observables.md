+++
title = 'Chapter 2: The Spectral Theorem, Rayleigh Quotients & Quantum Observables'
chapter = 2
weight = 2
date = '2026-10-04'
description = 'Spectral theorem for Hermitian and unitary operators, Courant–Fischer minimax, measurement statistics, and Rayleigh-quotient iteration.'
+++

## 2.1 The Spectral Theorem for Hermitian Matrices

Every Hermitian matrix $O \in \mathbb{C}^{n \times n}$ ($O^\dagger = O$) admits a unitary diagonalization with real eigenvalues $\lambda_1 \ge \lambda_2 \ge \cdots \ge \lambda_n$:

$$O = U \Lambda U^\dagger = \sum_{i=1}^n \lambda_i |u_i\rangle\langle u_i|, \qquad U^\dagger U = I_n$$

Unitary operators $V$ (satisfying $V^\dagger V = I$) diagonalize similarly with eigenvalues on the unit circle, $\mu_i = e^{i\theta_i}$.

## 2.2 Courant–Fischer Variational Principle

The **Rayleigh quotient** $R_O(x) = \frac{x^\dagger O x}{x^\dagger x}$ characterizes eigenvalues via the **Courant–Fischer minimax theorem**:

$$\lambda_k = \max_{\substack{U \subseteq \mathbb{C}^n \\ \dim(U) = k}} \;\min_{\substack{x \in U \\ x \ne 0}} \frac{x^\dagger O x}{x^\dagger x}$$

Because $\nabla R_O(u_i) = 0$ at every eigenvector $u_i$, **Rayleigh Quotient Iteration** achieves cubic convergence near any simple eigenvalue. In quantum mechanics this variational principle yields the **variational method for ground-state energy**: $E_0 = \min_{|\psi\rangle} \langle \psi | H | \psi \rangle$.

```python
import numpy as np

def rayleigh_quotient(O: np.ndarray, x: np.ndarray) -> float:
    return float(np.real(x.conj() @ O @ x) / (x.conj() @ x))
```
