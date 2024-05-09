import './App.css';
import Fileupload from "./components/imageupload";
import ListImages from "./components/listimages";

function App() {
  return (
    <div class="flex max-h-full">
      <Fileupload/>
      <ListImages/>
    </div>
  );
}

export default App;
