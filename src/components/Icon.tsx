export const IconDisc = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-12 h-12"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M6 12c0-1.7.7-3.2 1.8-4.2"></path>
    <circle cx="12" cy="12" r="2"></circle>
    <path d="M18 12c0 1.7-.7 3.2-1.8 4.2"></path>
  </svg>
);

export const IconPause = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8"
  >
    <rect x="14" y="4" width="4" height="16" rx="1" />
    <rect x="6" y="4" width="4" height="16" rx="1" />
  </svg>
);

export const Icons = {
  IconDisc,
  IconPause,
};

export default Icons;
