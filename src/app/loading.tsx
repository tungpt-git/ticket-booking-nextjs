export default function Loading() {
  return (
    <div className="absolute w-screen h-screen flex items-center justify-center">
      <span className="loading loading-ring loading-xs text-black"></span>
      <span className="loading loading-ring loading-sm text-black"></span>
      <span className="loading loading-ring loading-md text-black"></span>
      <span className="loading loading-ring loading-lg text-black"></span>
    </div>
  );
}
