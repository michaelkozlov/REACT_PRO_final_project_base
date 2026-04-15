import { SignUpForm } from 'features/auth/sign-up/ui/SignUpForm';
import { WithProtection } from 'app/store/HOCs/WithProtection';

export const SignUpPage = WithProtection(() => {
	return <SignUpForm />;
});
