export default function Loading() {
  return (
    <div className="absolute w-screen h-screen flex items-center justify-center">
      <span className="animate-bounce text-3xl font-medium animation-delay-0 text-primary">
        F
      </span>
      <span className="animate-bounce text-3xl font-medium animation-delay-100 text-secondary">
        R
      </span>
      <span className="animate-bounce text-3xl font-medium animation-delay-200 text-accent">
        I
      </span>
      <span className="animate-bounce text-3xl font-medium animation-delay-300 text-red-500">
        E
      </span>
      <span className="animate-bounce text-3xl font-medium animation-delay-400 text-info">
        N
      </span>
      <span className="animate-bounce text-3xl font-medium animation-delay-500 text-success">
        D
      </span>
      <span className="animate-bounce text-3xl font-medium animation-delay-600 text-warning">
        S
      </span>
    </div>
  );
}
