export default function Cube3D({ size = 130 }: { size?: number }) {
  const half = size / 2;
  const face = 'absolute inset-0 border border-white/30 bg-white/5';
  return (
    <div className="hidden shrink-0 lg:block" style={{ perspective: '800px' }} aria-hidden>
      <div className="animate-spin3d relative mx-auto" style={{ width: size, height: size, transformStyle: 'preserve-3d' }}>
        <div className={face} style={{ transform: `translateZ(${half}px)` }} />
        <div className={face} style={{ transform: `rotateY(180deg) translateZ(${half}px)` }} />
        <div className={face} style={{ transform: `rotateY(90deg) translateZ(${half}px)` }} />
        <div className={face} style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }} />
        <div className={face} style={{ transform: `rotateX(90deg) translateZ(${half}px)` }} />
        <div className={face} style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }} />
      </div>
    </div>
  );
}