import LoginForm from '../../components/LoginForm/LoginForm';
export default function AuthPage({ setUser, showLogin }) {

    return (
        <div className='signInBlock' >
            <div className='innerSignIn'>
                {showLogin ? <LoginForm setUser={setUser} /> : ""}
            </div>
        </div>
    );
}