import { useDrag } from 'react-dnd';
import Image from 'next/image';

export default function DraggableItem({ item }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'clothing',
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className={`${isDragging ? 'opacity-50' : 'opacity-100'} cursor-grab`}
    >
      <Image
        src={item.src}
        alt={item.name}
        width={100}
        height={100}
        className="object-contain"
      />
    </div>
  );
}
