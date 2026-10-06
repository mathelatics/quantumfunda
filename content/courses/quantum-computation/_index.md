+++
title = 'Quantum Computation & Quantum Algorithms'
description = 'Quantum circuits, unitary gate composition, quantum phase estimation, Grover amplitude amplification, and the mathematics of quantum speedup.'
domain = 'Quantum Computation'
level = 'Advanced'
date = '2026-10-04'
topic_weight = 2
cover = '/images/course_applied_computing.jpg'
+++

## Course Overview

**Quantum Computation & Quantum Algorithms** bridges the circuit model of quantum computation with the mathematics of interference: unitary gate algebra, amplitude amplification, phase estimation, and entanglement-based speedups.

### Syllabus

1. **Quantum Circuits & Unitary Gates**: The Pauli group, Hadamard–phase–CNOT universality, and local unitary evolution $|\psi(t)\rangle = U|\psi(0)\rangle$ with $U^\dagger U = I$.
2. **Quantum Algorithms**: Quantum Fourier Transform, Grover's geometric amplitude amplification with quadratic query speedup, and phase estimation for eigenvalue problems.

===READING===

## Local Hamiltonian Evolution

For a time-independent Hamiltonian $H$, the Schrödinger equation $i\hbar \frac{d}{dt}|\psi(t)\rangle = H|\psi(t)\rangle$ has solution $|\psi(t)\rangle = e^{-iHt/\hbar}|\psi(0)\rangle$ with $U(t) = e^{-iHt/\hbar}$ unitary because $H$ is Hermitian:

```python
import numpy as np
from scipy.linalg import expm

def time_evolution(H: np.ndarray, t: float, psi0: np.ndarray, hbar: float = 1.0) -> np.ndarray:
    return expm(-1j * H * t / hbar) @ psi0
```
