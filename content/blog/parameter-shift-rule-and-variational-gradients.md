+++
title = 'Gradients of Variational Circuits: The Parameter-Shift Rule'
date = '2026-10-01'
domain = 'Quantum Optimization'
author = 'Quantum Funda Research'
description = 'Exact gradient evaluation for parameterized quantum circuits without finite-difference truncation error, via the parameter-shift rule.'
cover = '/images/blog_autodiff_dual_numbers.jpg'
+++

Classical finite differences approximate $f'(x) \approx \frac{f(x+h)-f(x)}{h}$, suffering from subtractive cancellation as $h \to 0$. **Quantum variational algorithms** face the same problem on hardware, and the exact, machine-precision alternative is the **parameter-shift rule**.

## Gates with Two-Eigenvalue Generators

Many variational ansatz gates have the form $U(\theta) = e^{-i\theta G/2}$ where the generator $G$ has eigenvalues $\pm 1$ (e.g. $G \in \{X, Y, Z\}$). For an expectation value $f(\theta) = \langle 0 | U(\theta)^\dagger O\, U(\theta) | 0 \rangle$, expanding the two eigenvalues of $G$ gives:

$$f(\theta) = a \cos(\theta/2 + b) + c \cos(b) \;\Rightarrow\; f'(\theta) = \frac{f(\theta + \pi/2) - f(\theta - \pi/2)}{2}$$

The shift $\pi/2$ is exact—there is no step-size bias, unlike classical finite differences.

## Generalization to Higher-Order Rules

If the generator has eigenvalue gap $r = \lambda_{\max} - \lambda_{\min} > 2$, the two-term rule fails; one instead needs $2r + 1$ function evaluations and solves the linear system determined by the frequencies in the Fourier expansion of $f$:

$$f(\theta) = \sum_{k=0}^{r} c_k \cos\big(k(\theta - \phi)\big)$$

Each coefficient is recovered from evaluations at shifted angles, in exact analogy with the spectral differentiation matrix—yet every evaluation is a quantum circuit run.

```python
import numpy as np

def parameter_shift_gradient(f, theta: float) -> float:
    shift = np.pi / 2.0
    return 0.5 * (f(theta + shift) - f(theta - shift))
```

## Dual Numbers Connection

The parameter-shift rule is the quantum analogue of forward-mode automatic differentiation: both propagate exact directional derivatives through a computation graph without symbolic algebra. The commutative ring of dual numbers $\mathbb{D} = \mathbb{R}[\varepsilon]/(\varepsilon^2)$ provides the classical algebra of this propagation, with $\varepsilon^2 = 0$ enforcing first-order exactness; the parameter-shift rule achieves the same exactness through trigonometric shifting on quantum hardware.
