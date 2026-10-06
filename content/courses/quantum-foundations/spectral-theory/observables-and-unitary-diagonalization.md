+++
date = '2026-10-04'
title = 'Spectral Theory of Observables & Unitary Diagonalization'
difficulty = 'hard'
language = 'python'
topic_weight = 1
subtopic_weight = 2
weight = 2
description = 'Spectral decomposition of Hermitian observables, the SVD, and principal axis analysis of quantum states via eigendecomposition.'
+++

## Problem Statement

Every Hermitian observable $O \in \mathbb{C}^{n \times n}$ ($O = O^\dagger$) admits a unitary diagonalization with real eigenvalues $\lambda_1 \ge \dots \ge \lambda_n$:

$$O = U \Lambda U^\dagger = \sum_{i=1}^{n} \lambda_i\, |u_i\rangle\langle u_i|, \qquad U^\dagger U = I_n$$

By the Eckart–Young–Mirsky theorem, the best rank-$k$ approximation to a general operator $A$ is obtained by truncating its **singular value decomposition** $A = U \Sigma V^\dagger = \sum_i \sigma_i u_i v_i^\dagger$.

```python
import numpy as np

def truncated_svd(A: np.ndarray, k: int):
    U, s, Vh = np.linalg.svd(A, full_matrices=False)
    Ak = (U[:, :k] * s[:k]) @ Vh[:k, :]
    return Ak, np.sqrt(np.sum(s[k:] ** 2))
```

===EXPLANATION===

## From Hermiticity to the Spectral Theorem

Let $O = O^\dagger$. For any eigenpair $O|u_i\rangle = \lambda_i |u_i\rangle$, taking adjoints gives $\lambda_i = \lambda_i^*$, so eigenvalues are real. Eigenspaces for distinct eigenvalues are orthogonal:

$$\lambda_i \langle u_j | u_i \rangle = \langle u_j | O | u_i \rangle = \lambda_j \langle u_j | u_i \rangle \;\Rightarrow\; \langle u_j | u_i \rangle = 0 \quad (\lambda_i \ne \lambda_j)$$

Completing each eigenspace to an orthonormal basis yields the unitary matrix $U$ in $O = U \Lambda U^\dagger$. The expected value of $O$ in state $|\psi\rangle$ is then:

$$\langle O \rangle_\psi = \langle \psi | O | \psi \rangle = \sum_i \lambda_i\, |\langle u_i | \psi \rangle|^2$$

so the **variance** $\operatorname{Var}(O) = \langle O^2 \rangle - \langle O \rangle^2$ governs measurement uncertainty—the basis of the Heisenberg uncertainty relation $\Delta A \, \Delta B \ge \tfrac{1}{2}|\langle [A, B] \rangle|$.

===READING===

## Power Iteration for Dominant Eigenpairs of Observables

The dominant eigenpair of a Hermitian $O$ follows the power iteration $v_{k+1} = O v_k / \|O v_k\|$. For a density operator $\rho$, this extracts the principal pure-state component:

```python
import numpy as np

def dominant_eigenpair(O: np.ndarray, tol: float = 1e-10, max_iter: int = 500):
    v = np.ones(O.shape[0], dtype=complex)
    v /= np.linalg.norm(v)
    lam = 0.0
    for _ in range(max_iter):
        w = O @ v
        lam_new = np.vdot(v, w).real
        w_norm = np.linalg.norm(w)
        if w_norm == 0:
            break
        v_new = w / w_norm
        if abs(lam_new - lam) < tol:
            return lam_new, v_new
        lam, v = lam_new, v_new
    return lam, v
```

===CODE===

```python
import numpy as np

def truncated_svd(A: np.ndarray, k: int):
    U, s, Vh = np.linalg.svd(A, full_matrices=False)
    Ak = (U[:, :k] * s[:k]) @ Vh[:k, :]
    return Ak, np.sqrt(np.sum(s[k:] ** 2))
```

===QUIZ===

## What is guaranteed about the eigenvalues of a Hermitian operator $O = O^\dagger$?
- [ ] They are purely imaginary
- [x] They are all real
- [ ] They all have unit modulus
- [ ] They are degenerate
Correct: B
Explanation: Hermiticity implies $\lambda = \langle u | O | u \rangle = \langle u | O^\dagger | u \rangle = \bar{\lambda}$, so $\lambda \in \mathbb{R}$.

## Which condition holds for a unitary operator $U$?
- [ ] $U^\dagger U = -I$
- [ ] $U^2 = I$ always
- [x] $U^\dagger U = U U^\dagger = I$
- [ ] $\det(U) = 0$
Correct: C
Explanation: Unitarity $U^\dagger U = I$ preserves inner products and norms, exactly the property quantum gates must satisfy.
