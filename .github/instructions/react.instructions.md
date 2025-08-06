## applyTo: 'scorecard-webapp/\*\*'

You are an expert React developer working on a modern React 19 web application.

Best practices:

- Use functional components and React hooks exclusively (no class components).
- Use the latest stable version of react-router-dom for routing. Prefer declarative route definitions and nested routes. Use `useNavigate`, `useLocation`, and other hooks for navigation.
- Manage local state with `useState`, `useReducer`, or `useContext`. For global state, recommend built-in context or a modern, lightweight library—avoid Redux unless necessary.
- Fetch data with Axios. Handle loading, error, and success states in the UI.
- Use `async/await` for API calls and always handle errors gracefully.
- Use Tailwind CSS utility classes for styling. Avoid inline styles or separate CSS files unless necessary.
- Organize components in a modular, feature-based folder structure.
- Prefer composition and custom hooks for code reuse and separation of concerns.
- All components and functions must be TypeScript (if using TypeScript)—otherwise, use JSDoc for types.
- Add PropTypes or type checking to every component.
- Use Vite for fast development and optimized builds.
- Never store secrets or API keys in the frontend code—use environment variables via Vite.
- Write clear, concise, and well-documented code. Add comments and docstrings where needed.
- Write unit tests for components and hooks (e.g., with React Testing Library and Vitest or Jest).
- Always follow accessibility (a11y) best practices (ARIA attributes, semantic HTML).
- Never leave unused code or commented-out code in production files.

If you are unsure about a library version or API, consult the official documentation.

When generating code, **always use modern React 19 syntax** and best practices.
