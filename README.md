# Quantum Funda 

**Math Code Center** is an ultra-lightweight, 100% static academic platform for pure and applied mathematics, formal theorem proving in **Lean 4**, and scientific computing in **Python**, **C**, and **Rust**.

Designed for zero-backend deployment on **GitHub Pages** and **GitLab Pages**, all interactive features—including KaTeX math rendering, Lean 4 / multi-language syntax highlighting, Global Quick Search (`Ctrl+K`), automatic "On This Page" section outlines, and interactive self-check quizzes—run instantaneously in the browser.

Note
---

## Navigation & Reader Features

- **Global Quick-Jump Search (`Ctrl+K` or `/`)**: Instant command palette in the top navigation bar to jump to any course, lesson, book, chapter, or essay across the platform.
- **Unified Library (`/library/`)**: Searchable and filterable catalog across all courses, lessons, multi-chapter books, and research essays.
- **Interactive Courses (`/courses/`)**: Browse the full Courses Catalog with domain filters and syllabus previews, or enter the Course Studio featuring collapsible curriculum trees, Lecture & Proofs, Reading & Code switchers, interactive quizzes with step-by-step proof explanations, and Previous/Next lesson navigation.
- **Mathematical Monographs (`/books/`)**: Multi-chapter academic books with a persistent chapter sidebar, automatic "On This Page" section outline, and Previous/Next chapter cards.
- **Research Essays (`/blog/`)**: Long-form technical articles with native inline (`$...$`) and display (`$$...$$`) LaTeX rendering, automatic section outlines, and Previous/Next essay navigation.

---

## Adding New Courses, Books, or Articles

You can scaffold new content in seconds using the built-in generator commands (or by adding `.md` files directly under `content/`):

```bash
# Create a new blog essay in content/blog/
npm run new:article -- "Title of Your Mathematical Essay"

# Create a new multi-chapter book in content/books/
npm run new:book -- "Title of Your Monograph"

# Add a new chapter to an existing book
npm run new:chapter -- <book-slug> "Title of New Chapter"

# Create a new course in content/courses/
npm run new:course -- "Title of Your Course"

# Add a new lesson to an existing course
npm run new:lesson -- <course-slug> "Title of New Lesson"

# Rebuild static site into public/
npm run build
```

See [`project.md`](./project.md) for full details on Markdown frontmatter (`+++` TOML or `---` YAML), LaTeX math blocks, Lean 4 code blocks, and interactive quiz syntax.

---

## Local Development & Deployment

```bash
npm install
npm run build
npm run dev
```

- **GitHub Pages**: `.github/workflows/deploy.yml` automatically builds and deploys `./public` on pushes to `main` or `master`.
- **GitLab Pages**: `.gitlab-ci.yml` automatically builds and publishes `./public`.
