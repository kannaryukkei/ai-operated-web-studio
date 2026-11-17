import './styles/global.css';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <main id="main-content" tabIndex={-1} />
    </>
  );
}
