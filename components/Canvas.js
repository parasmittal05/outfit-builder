import { useDrop } from 'react-dnd';
import Image from 'next/image';

export default function Canvas({ canvasItems, onDrop }) {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'clothing',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      onDrop(item, offset);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      id="canvas-area"
      ref={dropRef}
      className={`relative w-[300px] h-[500px] rounded-xl shadow-md transition-colors ${
        isOver ? 'border-2 border-indigo-500 bg-indigo-50' : 'border-2 border-dashed border-gray-300 bg-white'
      }`}
    >
      {canvasItems.map((item, i) => (
        <div
          key={i}
          className="absolute w-[100px] h-[100px] rounded-md overflow-hidden"
          style={{ top: item.y - 50, left: item.x - 50 }}
        >
          <Image src={item.src} alt={item.name} fill className="object-contain" />
        </div>
      ))}
    </div>
  );
}
