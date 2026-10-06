+++
title = 'Welcome to Quantum Funda: Mathematics of Quantum Computing'
date = '2026-10-04'
domain = 'Quantum Foundations'
author = 'Quantum Funda Research'
description = 'Bridging the mathematical foundations, computation, algorithms, and optimization of quantum theory.'
cover = '/images/blog_welcome_mathcode.jpg'
+++

Quantum computing is, at its core, applied mathematics: **linear algebra** for state spaces, **analysis** for continuous evolution, **group theory** for symmetries, and **optimization** for near-term algorithms. Under the Dirac formalism every postulate is a theorem of Hilbert space geometry.

At **Quantum Funda**, every concept is presented through two complementary lenses:

1. **Formal Mathematical Rigor**: Definitions, lemmas, and theorems typeset cleanly in LaTeX alongside machine-checkable statements in **Lean 4**.
2. **Executable Computation**: Reference implementations in **Python**, **C**, and **Lean 4** that turn abstract theorems into working quantum numerics.

## The Four Pillars

1. **Mathematical Foundations**: Hilbert spaces, tensor products, spectral theory, and quantum information theory.
2. **Quantum Computation**: Circuit models, unitary gate algebras, measurement, and entanglement.
3. **Quantum Algorithms**: Quantum Fourier transforms, Grover amplification, phase estimation, and Hamiltonian simulation.
4. **Quantum Optimization**: QAOA, variational eigensolvers, adiabatic schedules, and the geometry of quantum landscapes.

## A First Identity: The Global Phase

Physically distinct states differ by more than a global phase. For any $\gamma \in \mathbb{R}$ and state $|\psi\rangle$,

$$|\psi'\rangle = e^{i\gamma}|\psi\rangle \implies \langle \psi' | O | \psi' \rangle = \langle \psi | e^{-i\gamma} O e^{i\gamma} | \psi \rangle = \langle \psi | O | \psi \rangle$$

for every observable $O$—the mathematical reason projective Hilbert space, not the sphere, is the true state space.

---

*Continue exploring with our courses on the Mathematical Foundations of Quantum Computing, Quantum Computation & Algorithms, and Quantum Optimization.*
