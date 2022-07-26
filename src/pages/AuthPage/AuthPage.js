import LoginForm from '../../components/LoginForm';
export default function AuthPage({ setUser, showLogin }) {

    return (
        <div className='signInBlock' >
            <div className='innerSignIn'>
                {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
            </div>
        </div>
    );
}