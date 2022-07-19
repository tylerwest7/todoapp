import SignupForm from '../components/SignupForm';
import {useNavigate} from 'react-router-dom';


function SignupPage(){

    const navigate = useNavigate();

    function homeTransition(){
        navigate('/home');
    }

    return (
        <SignupForm homeTransition={homeTransition}/>
    )
}

export default SignupPage;