export default function DoubleArrow() {
  return (
    <a className="scroll-cue fade-out" href="#ellie" aria-label="Scroll to Ellie's story">
      <span>Discover the story</span>
      <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M19 5 12 12 5 5M19 13l-7 7-7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
