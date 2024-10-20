import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ShopifyProducts from './ShopifyProducts';

interface ComponentItem {
  id: string;
  content: string | React.ReactNode;
}

const DragAndDropEditor: React.FC = () => {
  const [components, setComponents] = useState<ComponentItem[]>([
    { id: 'component1', content: 'Header' },
    { id: 'component2', content: 'Image' },
    { id: 'component3', content: 'Text Block' },
    { id: 'component4', content: <ShopifyProducts /> },
  ]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setComponents(items);
  };

  return (
    <div className="drag-and-drop-editor">
      <h2>Landing Page Editor</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="components">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {components.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DragAndDropEditor;