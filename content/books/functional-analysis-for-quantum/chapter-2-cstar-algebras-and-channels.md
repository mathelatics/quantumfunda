+++
title = 'Chapter 2: C*-Algebras, Quantum Channels & Riesz Representations'
chapter = 2
weight = 2
date = '2026-10-04'
description = 'C*-algebra axioms, the Riesz representation theorem, complete positivity, and Kraus operator decompositions.'
+++

## 2.1 The Riesz Representation Theorem

Let $\mathcal{H}$ be a Hilbert space with inner product $\langle \cdot, \cdot \rangle_{\mathcal{H}}$ and norm $\|u\|_{\mathcal{H}} = \sqrt{\langle u, u \rangle_{\mathcal{H}}}$. For every bounded linear functional $\ell \in \mathcal{H}^*$, there exists a unique $u_\ell \in \mathcal{H}$ such that:

$$\ell(v) = \langle u_\ell, v \rangle_{\mathcal{H}} \quad \forall v \in \mathcal{H}, \qquad \|u_\ell\|_{\mathcal{H}} = \|\ell\|_{\mathcal{H}^*}$$

This is the rigorous license for writing measurement functionals and quantum states in bra–ket form.

## 2.2 C*-Algebras and Completely Positive Maps

A **C\*-algebra** $\mathcal{A}$ is a Banach $*$-algebra satisfying $\|a^* a\| = \|a\|^2$; the bounded operators $\mathcal{B}(\mathcal{H})$ form the canonical example. A quantum channel is a linear map $\mathcal{E} : \mathcal{B}(\mathcal{H}_A) \to \mathcal{B}(\mathcal{H}_B)$ that is **completely positive** (CP) and **trace-preserving** (TP). By the **Kraus representation theorem**, every such channel admits operators $\{K_i\}$ with $\sum_i K_i^\dagger K_i = I$ and:

$$\mathcal{E}(\rho) = \sum_i K_i \rho K_i^\dagger$$

```python
import numpy as np

def apply_channel(rho: np.ndarray, kraus: list[np.ndarray]) -> np.ndarray:
    return sum(K @ rho @ K.conj().T for K in kraus)
```
