type LogoProps = {
    className?: string;
  };
  
  export default function Logo({ className }: LogoProps) {
    return (
      <svg
        viewBox="0 0 76.56 140.46"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className={className}
      >
        <path d="M47.38,70.57H5.75v65.88h65.88c-13.39,0-24.25-29.49-24.25-65.88ZM38.69,112.23c-4.82,0-8.73-3.91-8.73-8.73s3.91-8.73,8.73-8.73,8.73,3.91,8.73,8.73-3.91,8.73-8.73,8.73Z" />
        <path d="M63.89,36.8c0-4.27,3.46-7.74,7.74-7.74V3.86H5.75v65.88h65.88v-25.2c-4.27,0-7.74-3.46-7.74-7.74ZM38.69,45.53c-4.82,0-8.73-3.91-8.73-8.73s3.91-8.73,8.73-8.73,8.73,3.91,8.73,8.73-3.91,8.73-8.73,8.73Z" />
      </svg>
    );
  }
  