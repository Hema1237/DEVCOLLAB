import React, { useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

function KanbanBoard() {

  const [tasks, setTasks] = useState({

    todo: [
      { id: "1", text: "Build Login UI" },
      { id: "2", text: "Create Dashboard" }
    ],

    progress: [
      { id: "3", text: "Setup WebSockets" }
    ],

    done: [
      { id: "4", text: "JWT Authentication" }
    ]
  });

  const onDragEnd = (result) => {

    if (!result.destination) return;

    const sourceColumn =
      tasks[result.source.droppableId];

    const destColumn =
      tasks[result.destination.droppableId];

    const sourceItems = [...sourceColumn];
    const destItems = [...destColumn];

    const [removed] = sourceItems.splice(
      result.source.index,
      1
    );

    destItems.splice(
      result.destination.index,
      0,
      removed
    );

    setTasks({
      ...tasks,
      [result.source.droppableId]: sourceItems,
      [result.destination.droppableId]: destItems
    });
  };

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">
        DevCollab Kanban Board
      </h1>

      <DragDropContext onDragEnd={onDragEnd}>

        <div className="grid grid-cols-3 gap-6">

          {Object.entries(tasks).map(
            ([columnId, columnTasks]) => (

              <Droppable
                droppableId={columnId}
                key={columnId}
              >

                {(provided) => (

                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-800 p-4 rounded-lg min-h-[500px]"
                  >

                    <h2 className="text-3xl font-bold mb-5">

                      {columnId === "todo"
                        ? "To Do"
                        : columnId === "progress"
                        ? "In Progress"
                        : "Done"}

                    </h2>

                    {columnTasks.map(
                      (task, index) => (

                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >

                          {(provided) => (

                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}

                              className="bg-blue-600 p-4 rounded mb-4"
                            >
                              {task.text}
                            </div>

                          )}

                        </Draggable>

                      )
                    )}

                    {provided.placeholder}

                  </div>

                )}

              </Droppable>

            )
          )}

        </div>

      </DragDropContext>

    </div>
  );
}

export default KanbanBoard;