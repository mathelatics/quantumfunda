+++
title = 'Mathematical Foundations of Quantum Computing'
description = 'Hilbert spaces, tensor products, Dirac notation, spectral theory, and the linear-algebraic foundations of qubits and density operators.'
domain = 'Quantum Foundations'
level = 'Intermediate'
date = '2026-10-04'
topic_weight = 1
cover = '/images/course_pure_mathematics.jpg'
+++

## Course Overview

**Mathematical Foundations of Quantum Computing** develops the fields of mathematics that underpin quantum theory—linear algebra, Hilbert space geometry, spectral theory, and tensor products—while translating every constructive proof into verifiable Python and Lean 4 code.

### Modules Covered

1. **Hilbert Spaces & Qubits**: State vectors in $\mathbb{C}^2$, Dirac notation $|\psi\rangle$, Born rule measurement probabilities, and density operators.
2. **Spectral Theory of Quantum States**: Unitary diagonalization of Hermitian observables, the singular value decomposition $A = U \Sigma V^\dagger$, and quantum state tomography.

===READING===

## The Born Rule in Operator Form

For a pure state $|\psi\rangle \in \mathcal{H}$ and an observable $O = \sum_i o_i |o_i\rangle\langle o_i|$, the measurement outcome statistics follow the Born rule:

$$p(o_i) = |\langle o_i | \psi \rangle|^2 = \langle \psi | o_i \rangle \langle o_i | \psi \rangle = \operatorname{Tr}\big(|\psi\rangle\langle\psi|\, |o_i\rangle\langle o_i|\big)$$

```python
import numpy as np

def born_probabilities(psi: np.ndarray, projectors: list[np.ndarray]) -> np.ndarray:
    """Measurement probabilities p_i = <psi| P_i |psi> for projectors P_i."""
    psi = psi / np.linalg.norm(psi)
    return np.array([np.real(psi.conj() @ P @ psi) for P in projectors])
```
