import Counter from './components/Counter';
import Header from './components/header';
import Auth from './components/auth';
import UserProfile from './components/user-profile';
import { useSelector } from 'react-redux';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      <Header />
      {isAuthenticated ? <UserProfile /> : <Auth />}
      <Counter />
    </>
  );
}

export default App;
