+++
title = 'Chapter 1: Hilbert Spaces, Bra–Ket Notation & Tensor Products'
chapter = 1
weight = 1
date = '2026-10-04'
description = 'Finite-dimensional Hilbert spaces, Dirac bra–ket calculus, the Cauchy–Schwarz inequality, and tensor product state spaces for composite systems.'
+++

## 1.1 Inner Products and the Cauchy–Schwarz Inequality

Let $\mathcal{H}$ be a vector space over $\mathbb{C}$. An **inner product** $\langle \cdot | \cdot \rangle : \mathcal{H} \times \mathcal{H} \to \mathbb{C}$ (linear in the second argument, conjugate-linear in the first) induces the norm $\| |\psi\rangle \| = \sqrt{\langle \psi | \psi \rangle}$ satisfying the **Cauchy–Schwarz inequality**:

$$|\langle \phi | \psi \rangle| \le \| |\phi\rangle \| \, \| |\psi\rangle \|$$

with equality iff $|\phi\rangle$ and $|\psi\rangle$ are linearly dependent. The Dirac notation writes vectors as kets $|\psi\rangle$, their dual covectors as bras $\langle\phi|$, and the inner product as the "bra-ket" $\langle \phi | \psi \rangle$.

## 1.2 Tensor Products of State Spaces

For a composite system $AB$, the joint state space is the **tensor product** $\mathcal{H}_A \otimes \mathcal{H}_B$, with dimension $\dim(\mathcal{H}_A \otimes \mathcal{H}_B) = \dim \mathcal{H}_A \cdot \dim \mathcal{H}_B$. A $n$-qubit register lives in $(\mathbb{C}^2)^{\otimes n} \cong \mathbb{C}^{2^n}$. A state $|\Psi\rangle \in \mathcal{H}_A \otimes \mathcal{H}_B$ is **separable** if $|\Psi\rangle = |\psi\rangle_A \otimes |\phi\rangle_B$, and **entangled** otherwise. The Schmidt decomposition gives, for every bipartite pure state,

$$|\Psi\rangle = \sum_{i} \sqrt{\lambda_i}\, |a_i\rangle \otimes |b_i\rangle, \qquad \{|a_i\rangle\}, \{|b_i\rangle\} \text{ orthonormal}$$

```python
import numpy as np

def schmidt_decomposition(Psi: np.ndarray, dimA: int):
    M = Psi.reshape(dimA, -1)
    U, s, Vh = np.linalg.svd(M)
    return U, s, Vh
```
