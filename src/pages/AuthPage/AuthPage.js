import LoginForm from '../../components/LoginForm/LoginForm'
import SignUpForm from '../../components/SignUpForm';
export default function AuthPage({ setUser, showLogin }) {

    return (
        <div className='signInBlock' >
            <div className='innerSignIn'>
                {console.log(showLogin)}
                {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
            </div>
        </div>
    );
}