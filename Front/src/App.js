import Navbar from './Navbar';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Home from './Home';
import Questions from './Questions';
import './App.css';
import Article from './Article';
import { useSelector, useDispatch } from 'react-redux';
import UsersFound from './UsersFound';
import UsersProfile from './UsersProfile';
import Profile from './Profile';
import ErrorMessage from './ErrorMessage';
import AddQuestion from './AddQuestion';
import ExpertsFound from './ExpertsFound';
import FindExperts from './FindExperts';
import TableTags from './TableTags';
import TagsResults from './TagsResults';
import Landing from './Landing';
const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector((s) => !!s.user.token);
    const dispatch = useDispatch();

    if (!isLoggedIn) {
        dispatch({
            type: 'NEW_ERROR',
            error: 'Tienes que acceder para ver esta página',
        });
        return <Redirect to="/landing" />;
    }

    return <>{children}</>;
};

function App() {
    const { pathname } = useLocation();
    const isLoggedIn = useSelector((s) => !!s.user.token);
    const user = useSelector((u) => u.user.info);
    return (
        <div className={`App ${pathname === '/landing' ? 'landing' : ''}`}>
            <ErrorMessage />

            <Navbar />

            {!isLoggedIn ? (
                <Switch>
                    <Route path="/landing" exact>
                        <Landing />
                    </Route>
                    <Route path="/">
                        <Redirect to={'/landing'} />
                    </Route>
                </Switch>
            ) : (
                <>
                    {user && <FindExperts />}
                    {user && <TableTags />}

                    {user && <Article />}
                    <main className="main">
                        <Switch>
                            <Route path="/questions/:q" exact>
                                <PrivateRoute>
                                    <Questions />
                                </PrivateRoute>
                            </Route>
                            <Route path="/temp" exact />
                            <Route path="/addQuestion" exact>
                                <PrivateRoute>
                                    <AddQuestion />
                                </PrivateRoute>
                            </Route>
                            <Route path="/profile/users/:q" exact>
                                <PrivateRoute>
                                    <UsersProfile />
                                </PrivateRoute>
                            </Route>
                            <Route path="/profile/:q">
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            </Route>

                            <Route path="/search/users/:q" exact>
                                <PrivateRoute>
                                    <UsersFound />
                                </PrivateRoute>
                            </Route>
                            <Route path="/expertsfound" exact>
                                <PrivateRoute>
                                    <ExpertsFound />
                                </PrivateRoute>
                            </Route>
                            <Route path="/tagsresults/:q" exact>
                                <PrivateRoute>
                                    <TagsResults />
                                </PrivateRoute>
                            </Route>
                            <Route path="/">
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            </Route>
                        </Switch>
                    </main>
                </>
            )}

            <footer className={isLoggedIn ? 'footer' : 'footer-long'}>
                Gapp™ - Get Answered Application{' '}
            </footer>
        </div>
    );
}

export default App;
