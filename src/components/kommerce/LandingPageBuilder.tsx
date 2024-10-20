import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ShopifyStorefrontAPI } from '../../lib/shopifyApi';
import ProductList from './ProductList';

interface ComponentItem {
  id: string;
  type: string;
  content: string | React.ReactNode;
}

const LandingPageBuilder: React.FC = () => {
  const [components, setComponents] = useState<ComponentItem[]>([
    { id: 'header', type: 'header', content: 'Header' },
    { id: 'text', type: 'text', content: 'Text Block' },
    { id: 'image', type: 'image', content: 'Image Placeholder' },
    { id: 'products', type: 'products', content: <ProductList /> },
  ]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setComponents(items);
  };

  return (
    <div className="landing-page-builder">
      <h2>Landing Page Builder</h2>
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

export default LandingPageBuilder;