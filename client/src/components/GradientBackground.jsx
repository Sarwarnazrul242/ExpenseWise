export const GradientBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: -2 }}>
      <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] animate-gradient-rotate">
        <div className="absolute w-full h-full bg-gradient-to-br from-blue-800/20 via-transparent to-cyan-500/20 blur-3xl" />
        <div className="absolute w-full h-full bg-gradient-to-bl from-blue-500/10 via-transparent to-cyan-800/10 blur-3xl" />
      </div>
    </div>
  );
}; 