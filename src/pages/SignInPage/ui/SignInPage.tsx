import { SignInForm } from 'features/auth/sing-in/ui/SignInForm';
import { WithProtection } from 'app/store/HOCs/WithProtection';

export const SignInPage = WithProtection(() => {
	return <SignInForm />;
});
