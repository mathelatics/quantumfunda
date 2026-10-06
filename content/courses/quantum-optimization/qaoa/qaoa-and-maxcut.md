+++
date = '2026-10-04'
title = 'QAOA & the MaxCut Ising Hamiltonian'
difficulty = 'medium'
language = 'python'
topic_weight = 3
subtopic_weight = 1
weight = 1
description = 'QUBO/Ising encodings of combinatorial problems, the QAOA ansatz, expectation landscapes, and classical optimization loops.'
+++

## Problem Statement

Given a $d$-regular graph $G=(V,E)$, **MaxCut** maximizes the number of edges crossing a bipartition. Encoding $z_v \in \{\pm 1\}$ by the $Z_v$ Pauli operators turns the objective into the Ising **cost Hamiltonian**:

$$H_C = \sum_{(u,v)\in E} \frac{I - Z_u Z_v}{2}, \qquad H_M = \sum_v X_v$$

The depth-$p$ **QAOA** state is

$$|\gamma, \beta\rangle = e^{-i\beta_p H_M} e^{-i\gamma_p H_C} \cdots e^{-i\beta_1 H_M} e^{-i\gamma_1 H_C} |+\rangle^{\otimes n}$$

and the measured cut size is $C(\gamma, \beta) = \langle \gamma, \beta | H_C | \gamma, \beta \rangle$, optimized classically.

```python
import numpy as np

def qaoa_cost(gamma: np.ndarray, beta: np.ndarray, zz_edges: np.ndarray) -> float:
    """Expected MaxCut cost for a depth-1 approx on a triangle-free graph."""
    return float(np.mean(0.5 * (1.0 - np.cos(4 * beta[0]) * np.sin(2 * gamma[0]) ** 2) * len(zz_edges)))
```

===EXPLANATION===

## Variational Principle and the Energy Landscape

By the variational principle, $C(\gamma,\beta) \le C_{\max}$ for any parameters, so maximizing the expected cut over the QAOA manifold is a rigorous heuristic. For depth $p=1$ on triangle-free graphs, the expected fraction of cut edges per edge is:

$$\langle C_{uv} \rangle = \frac{1}{2} + \frac{1}{2} \sin(4\beta)\sin(2\gamma)\cos^{d_u - 1}(2\gamma)\cos^{d_v - 1}(2\gamma)$$

viewing each edge independently. The classical outer loop—gradient descent, COBYLA, or Bayesian optimization over the $2p$ angles—defines a **barren landscape** question: for random deep circuits the gradient variance vanishes exponentially in $n$, motivating shallow structured ansätze and problem-informed initialization.

===READING===

## Parameter Optimization Loop for QAOA in Python

```python
import numpy as np
from scipy.optimize import minimize

def run_qaoa(cost_fn, p: int, seed: int = 0):
    rng = np.random.default_rng(seed)
    x0 = rng.uniform(0, np.pi, size=2 * p)
    best = minimize(lambda x: -cost_fn(x[:p], x[p:]), x0, method='COBYLA',
                    options={'maxiter': 400})
    return best.x, -best.fun
```

===CODE===

```python
def qaoa_cost(gamma: np.ndarray, beta: np.ndarray, edges: int, p: int = 1) -> float:
    return float(np.mean(0.5 * (1.0 - np.cos(4 * beta[0]) * np.sin(2 * gamma[0]) ** 2) * edges))
```

===QUIZ===

## The QAOA cost Hamiltonian for MaxCut assigns an eigenvalue of 1 to each edge that is:
- [ ] Inside the same partition
- [x] Cut by the partition (endpoints in different parts)
- [ ] Incident to a degree-1 node
- [ ] Induced by the mixer
Correct: B
Explanation: $\frac{I - Z_u Z_v}{2}$ has eigenvalue $1$ exactly when $Z_u Z_v = -1$, i.e. the endpoints are in different partitions.

## Why is the variational principle central to QAOA?
- [ ] It guarantees convergence to the global optimum
- [x] The expected cost of any variational state upper-bounds the achievable optimum, certifying the result
- [ ] It removes the need for classical optimization
- [ ] It makes the circuit shallower
Correct: B
Explanation: $\langle H_C \rangle \le \lambda_{\max}(H_C)$ for every trial state, giving a verifiable bound.
