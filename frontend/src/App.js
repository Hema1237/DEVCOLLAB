import KanbanBoard from "./KanbanBoard";
import Chat from "./components/Chat";

function App() {

  return (

    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-5xl font-bold mb-4 text-center">
        🚀 DevCollab
      </h1>

      <p className="text-xl text-center mb-10">
        Real-Time Team Collaboration Platform
      </p>

      <KanbanBoard />

      <div className="mt-10">
        <Chat />
      </div>

    </div>
  );
}

export default App;