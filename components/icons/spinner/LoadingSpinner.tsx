import './loadingspinner.scss'

interface LoadingSpinnerProps {
    height: string,
    width: string,
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ height, width }) => {
  return (
    <svg className='loading-spinner' viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height='256' width='256'/><line fill="none" stroke="#e2e2e2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="128" x2="128" y1="32" y2="64"/><line fill="none" stroke="#1b1b1b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="224" x2="192" y1="128" y2="128"/><line fill="none" stroke="#303030" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="195.9" x2="173.3" y1="195.9" y2="173.3"/><line fill="none" stroke="#474747" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="128" x2="128" y1="224" y2="192"/><line fill="none" stroke="#5e5e5e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="60.1" x2="82.7" y1="195.9" y2="173.3"/><line fill="none" stroke="#777777" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="32" x2="64" y1="128" y2="128"/><line fill="none" stroke="#ababab" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" x1="60.1" x2="82.7" y1="60.1" y2="82.7"/></svg>
  )
}

export default LoadingSpinner