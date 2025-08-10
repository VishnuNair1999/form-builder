import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateForm from './pages/CreateForm';
import PreviewForm from './pages/PreviewForm';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import MyForms from './pages/ MyForms';
import DashBoard from './pages/DashBoard';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<DashBoard/>} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/preview/:id" element={<PreviewForm />} />
          <Route path="/myforms" element={<MyForms />} />
        </Routes>
      </Router>
    </Provider>
  );
}
